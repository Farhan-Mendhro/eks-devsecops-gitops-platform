export type Service = { slug: string; n: string; title: string; blurb: string; stat: { v: string; l: string }; stack: string[]; long: string; deliver: string[] };

export const SERVICES: Service[] = [
  { slug: 'cloud-devops', n: '01', title: 'Cloud & DevOps', blurb: 'Infrastructure, CI/CD and monitoring so every release is boring and every outage is short.', stat: { v: '99.98%', l: 'uptime across client apps' }, stack: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Jenkins'], long: 'We design the cloud foundation and the delivery pipeline together, so code reaches production through one repeatable path. Everything is defined as code, reviewed in pull requests and observable from day one.', deliver: ['Landing zone and network design', 'Infrastructure as code, versioned modules', 'CI/CD pipeline with quality gates', 'Cost and capacity review'] },
  { slug: 'kubernetes-gitops', n: '02', title: 'Kubernetes & GitOps', blurb: 'Production clusters on EKS with Argo CD, so deploys are commits and drift is visible.', stat: { v: '< 5 min', l: 'commit to running pod' }, stack: ['EKS', 'Argo CD', 'Helm', 'Kustomize', 'Kubernetes'], long: 'Clusters are easy to create and hard to run. We build EKS platforms with sane defaults, GitOps delivery and clear rollback, then hand over runbooks your team can follow at 3 a.m.', deliver: ['EKS cluster and node strategy', 'Argo CD app-of-apps layout', 'Helm charts and environment overlays', 'Rollout and rollback runbooks'] },
  { slug: 'devsecops', n: '03', title: 'DevSecOps', blurb: 'Security checks that live inside the pipeline instead of after it.', stat: { v: '0', l: 'critical CVEs shipped' }, stack: ['Trivy', 'SonarQube', 'OWASP', 'Snyk', 'Falco'], long: 'We wire secret scanning, dependency checks, static analysis and image scanning into the pipeline, tuned so developers read the results and the build fails only for things that matter.', deliver: ['Pipeline security gates', 'Image and dependency policy', 'Secrets management', 'Threat model and review'] },
  { slug: 'observability', n: '04', title: 'Observability', blurb: 'Metrics, logs and traces tied to service level objectives.', stat: { v: '-62%', l: 'alert noise after tuning' }, stack: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Alertmanager'], long: 'Dashboards are not observability. We define what good looks like for users, instrument for it, and alert on error-budget burn so people are paged only when it matters.', deliver: ['SLI and SLO definition', 'Prometheus and Grafana stack', 'Burn-rate alerting', 'On-call handbook'] },
  { slug: 'platform-engineering', n: '05', title: 'Platform Engineering', blurb: 'Golden paths and self-service so product teams ship without filing tickets.', stat: { v: '3 days', l: 'to first deploy for new teams' }, stack: ['Backstage', 'Crossplane', 'Terraform', 'Argo CD'], long: 'We build the internal platform that product teams choose to use: opinionated templates, guardrails by default, and the metrics to prove it is working.', deliver: ['Service templates', 'Self-service environments', 'Guardrails as code', 'Adoption metrics'] },
  { slug: 'cloud-security', n: '06', title: 'Cloud Security', blurb: 'Least-privilege IAM, network boundaries and audit trails on AWS.', stat: { v: '100%', l: 'workloads on scoped roles' }, stack: ['IAM', 'IRSA', 'GuardDuty', 'CloudTrail', 'Vault'], long: 'We review and rebuild identity, networking and secrets so a compromised workload cannot reach what it should not, and every access is traceable.', deliver: ['IAM and IRSA redesign', 'Network segmentation', 'Secrets and key management', 'Audit and detection setup'] },
];

export const TICKER = ['Kubernetes', 'Terraform', 'Argo CD', 'Prometheus', 'Grafana', 'Docker', 'Helm', 'Trivy', 'SonarQube', 'GitHub Actions', 'AWS EKS', 'Jenkins', 'OpenTelemetry', 'Vault', 'Ansible', 'Crossplane'];

export const STAGES = [
  { n: '01', title: 'Audit the setup', body: 'We read your repos, pipelines and cloud account and list what is risky, slow or manual.', when: 'Week 1' },
  { n: '02', title: 'Automate deploys', body: 'One pipeline from commit to cluster, with tests and security gates on the way.', when: 'Week 2 - 3' },
  { n: '03', title: 'Add monitoring', body: 'Metrics, logs and SLO alerts so you hear about problems before users do.', when: 'Week 3 - 4' },
  { n: '04', title: 'Tune costs', body: 'Right-size, schedule and clean up. Then hand over docs and runbooks.', when: 'Week 5' },
];

export const PLANS = [
  { n: '01', name: 'Pipeline Sprint', tag: 'Fixed price', price: '$6,000', unit: 'one-off', pitch: 'Get one service from laptop to cluster with a real pipeline.', items: ['Audit of current setup', 'CI/CD with security gates', 'Containerised deploy to Kubernetes', '30 days of support'] },
  { n: '02', name: 'Platform Team', tag: 'Most chosen', price: '$14,500', unit: 'per month', pitch: 'A senior squad that owns your platform roadmap.', items: ['2 senior engineers', 'GitOps and observability build-out', 'Two-week sprints with demos', 'Cancel with 30 days notice'] },
  { n: '03', name: 'Reliability Retainer', tag: 'Keep it healthy', price: '$4,000', unit: 'per month', pitch: 'Keep a live platform fast, secure and cheap.', items: ['Monitoring and on-call help', 'Patching and upgrades', 'Cost and security reviews', '20 engineering hours'] },
];

export const FAQ = [
  ['How fast can you start?', 'Usually within two weeks. We keep a small bench so a new project never waits on hiring.'],
  ['Who owns the code?', 'You do, from the first commit. Everything lives in your GitHub and your cloud account.'],
  ['Which clouds do you work on?', 'AWS first, with Kubernetes on EKS. GCP and Azure on request.'],
  ['Can you take over an existing setup?', 'Yes. We start with a one-week audit, fix what is risky, then keep shipping.'],
  ['What happens after launch?', 'Hand over with documentation, or stay on a monthly retainer for monitoring and upgrades.'],
];

export const VALUES = [
  ['Boring releases', 'If a deploy is exciting, something is wrong. We design for the release nobody notices.'],
  ['Everything as code', 'Infrastructure, pipelines and policy live in Git, reviewed like any other change.'],
  ['Security in the path', 'Checks run in the pipeline by default, not as an audit at the end.'],
  ['Documented handover', 'You should not need us to run what we build. Runbooks are part of the deliverable.'],
];
