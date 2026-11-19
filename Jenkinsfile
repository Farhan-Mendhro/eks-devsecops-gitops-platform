
pipeline {
    agent any

    // Check GitHub for new commits approximately every five minutes.
    triggers {
        pollSCM('H/5 * * * *')
    }

    // Skip Jenkins' automatic checkout because we perform it explicitly below.
    options {
        skipDefaultCheckout(true)
    }

    // Keep shared pipeline settings in one place.
    environment {
        SONAR_SCANNER_TOOL = 'Sonar'
        SONAR_SERVER_CONFIG = 'Sonar'
        SONAR_PROJECT_KEY = 'synopsis'
        SONAR_SOURCES = 'frontend,backend'

        OWASP_TOOL_NAME = 'OWASP'

        DOCKER_CREDENTIALS_ID = 'Docker-token'
        DOCKERHUB_USERNAME = 'farhan249'

        IMAGE_PREFIX = 'synopsis'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        // Download the configured GitHub repository.
        stage('Git Checkout') {
            steps {
                checkout scm

                // Identify commits automatically created by the CD pipeline.
                script {
                    def commitMessage = sh(
                        script: 'git log -1 --pretty=%s',
                        returnStdout: true
                    ).trim()

                    env.SKIP_CI = commitMessage.startsWith(
                        'GitOps: update Synopsis images to '
                    ) ? 'true' : 'false'

                    echo "Skip CI: ${env.SKIP_CI}"
                }
            }
        }

        // Run application CI only when the commit is not from the CD pipeline.
        stage('CI Pipeline') {
            when {
                expression {
                    env.SKIP_CI != 'true'
                }
            }

            stages {

                // Display the image version assigned by Jenkins.
                stage('Generate Image Tag') {
                    steps {
                        echo "Image tag: ${IMAGE_TAG}"
                    }
                }

                // Scan project files for configuration issues, vulnerabilities and secrets.
                stage('Trivy Filesystem Scan') {
                    steps {
                        sh 'trivy fs --scanners misconfig --severity HIGH,CRITICAL .'
                        sh 'trivy fs --scanners vuln,secret --severity HIGH,CRITICAL .'
                    }
                }

                // Check application dependencies against known vulnerabilities.
                stage('OWASP Dependency Check') {
                    steps {
                        dependencyCheck(
                            odcInstallation: env.OWASP_TOOL_NAME,
                            stopBuild: true
                        )

                        // Publish the report without blocking on vulnerability findings.
                        dependencyCheckPublisher(
                            pattern: '**/dependency-check-report.xml',
                            stopBuild: false
                        )
                    }
                }

                // Analyze frontend and backend source code using SonarQube.
                stage('SonarQube Analysis') {
                    steps {
                        withSonarQubeEnv(env.SONAR_SERVER_CONFIG) {
                            sh "${tool(name: env.SONAR_SCANNER_TOOL)}/bin/sonar-scanner -Dsonar.projectKey=${env.SONAR_PROJECT_KEY} -Dsonar.sources=${env.SONAR_SOURCES}"
                        }
                    }
                }

                // Check the SonarQube result without blocking on a failed quality gate.
                stage('SonarQube Quality Gate') {
                    steps {
                        timeout(time: 15, unit: 'MINUTES') {
                            waitForQualityGate abortPipeline: false
                        }
                    }
                }

                // Build the frontend and backend Docker images.
                stage('Docker Build') {
                    steps {
                        sh 'docker build -t "$IMAGE_PREFIX-frontend:$IMAGE_TAG" ./frontend'
                        sh 'docker build -t "$IMAGE_PREFIX-backend:$IMAGE_TAG" ./backend'
                    }
                }

                // Scan both Docker images and display security findings.
                stage('Trivy Image Scan') {
                    steps {
                        sh 'trivy image --scanners vuln,secret --severity HIGH,CRITICAL "$IMAGE_PREFIX-frontend:$IMAGE_TAG"'
                        sh 'trivy image --scanners vuln,secret --severity HIGH,CRITICAL "$IMAGE_PREFIX-backend:$IMAGE_TAG"'
                    }
                }

                // Authenticate with Docker Hub and publish both images.
                stage('Docker Push') {
                    steps {
                        withCredentials([
                            string(
                                credentialsId: env.DOCKER_CREDENTIALS_ID,
                                variable: 'DOCKERHUB_TOKEN'
                            )
                        ]) {
                            sh '''
                                set +x

                                printf '%s' "$DOCKERHUB_TOKEN" | docker login --username "$DOCKERHUB_USERNAME" --password-stdin

                                docker tag "$IMAGE_PREFIX-frontend:$IMAGE_TAG" "$DOCKERHUB_USERNAME/$IMAGE_PREFIX-frontend:$IMAGE_TAG"
                                docker push "$DOCKERHUB_USERNAME/$IMAGE_PREFIX-frontend:$IMAGE_TAG"

                                docker tag "$IMAGE_PREFIX-backend:$IMAGE_TAG" "$DOCKERHUB_USERNAME/$IMAGE_PREFIX-backend:$IMAGE_TAG"
                                docker push "$DOCKERHUB_USERNAME/$IMAGE_PREFIX-backend:$IMAGE_TAG"
                            '''
                        }
                    }
                }

                // Start CD automatically and pass the image version.
                stage('Trigger CD') {
                    steps {
                        build job: 'Synopsis CD',
                            parameters: [
                                string(name: 'IMAGE_TAG', value: env.IMAGE_TAG)
                            ],
                            wait: true,
                            propagate: true
                    }
                }
            }
        }
    }

    // Remove the Docker Hub login session after the pipeline finishes.
    post {
        always {
            sh 'docker logout || true'
        }
    }
}
