
@Library('devsecops-jenkins-shared-library') _

// Run on any available Jenkins machine.
pipeline {
    agent any

    // Prevent overlapping CI builds.
    options {
        disableConcurrentBuilds()
    }

    // Check GitHub for new commits every five minutes.
    triggers {
        pollSCM('H/2 * * * *')
    }

    // Shared settings used by the pipeline.
    environment {
        // SonarScanner installation name in Jenkins.
        SONAR_SCANNER_TOOL = 'Sonar'

        // SonarQube server configuration name in Jenkins.
        SONAR_SERVER_CONFIG = 'Sonar'

        // SonarQube project identifier.
        SONAR_PROJECT_KEY = 'synopsis'

        // Application folders to analyze.
        SONAR_SOURCES = 'frontend,backend'

        // Docker Hub username.
        DOCKERHUB_USERNAME = 'farhan249'

        // Common name for both Docker images.
        IMAGE_PREFIX = 'synopsis'

        // Use the Jenkins build number as the image version.
        IMAGE_TAG = "${BUILD_NUMBER}"

        // Complete frontend image name.
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_PREFIX}-frontend:${IMAGE_TAG}"

        // Complete backend image name.
        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_PREFIX}-backend:${IMAGE_TAG}"
    }

    stages {

        // Run application CI only when application files or the Jenkinsfile change.
        stage('Application CI') {
            when {
                anyOf {
                    changeset 'frontend/**'
                    changeset 'backend/**'
                    changeset 'Jenkinsfile*'
                    triggeredBy 'UserIdCause'
                }
            }

            stages {

                // 1. Scan project files for vulnerabilities, secrets and configuration problems.
                stage('Trivy File Scan') {
                    steps {
                        trivyFilesystemScan()
                    }
                }

                // 2. Check third-party packages for known vulnerabilities.
                stage('OWASP Dependency Check') {
                    steps {
                        dependencyCheckScan()
                    }
                }

                // 3. Analyze frontend and backend source code using SonarQube.
                stage('SonarQube Scan') {
                    steps {
                        sonarQubeScan(
                            scannerTool: "${SONAR_SCANNER_TOOL}",
                            serverConfig: "${SONAR_SERVER_CONFIG}",
                            projectKey: "${SONAR_PROJECT_KEY}",
                            sources: "${SONAR_SOURCES}"
                        )
                    }
                }

                // 4. Build the frontend and backend Docker images.
                stage('Docker Build') {
                    steps {
                        dockerBuild()
                    }
                }

                // 5. Scan both Docker images for vulnerabilities and secrets.
                stage('Trivy Image Scan') {
                    steps {
                        trivyImageScan()
                    }
                }

                // 6. Log in to Docker Hub and upload both images.
                stage('Docker Push') {
                    steps {
                        dockerPush()
                    }
                }

                // 7. Start CD and send it the new image version.
                stage('Trigger CD') {
                    steps {
                        build job: 'Synopsis-CD',
                            parameters: [string(name: 'IMAGE_TAG', value: "${IMAGE_TAG}")],
                            wait: false
                    }
                }
            }
        }
    }
}
