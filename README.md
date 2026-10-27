# FitForge

A Fitness Progress Tracker built with the MERN Stack concept, designed to help users log workouts, track body measurements, monitor progress, and visualize fitness goals.

## Author

| Roll No. | Name | GitHub Username |
|---|---|---|
| 24ESKCS107 | Devansh Fagna | itsDevansh10 |

## About

FitForge is a fitness tracking website that provides workout information and fitness progress features. The project also demonstrates DevOps practices, including Continuous Integration, Docker containerization, deployment, monitoring, and Kubernetes orchestration.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Version Control:** Git and GitHub
- **CI/CD:** GitHub Actions and Jenkins
- **Containerization:** Docker and Docker Hub
- **Deployment:** Render
- **Monitoring:** Prometheus, Blackbox Exporter, Grafana
- **Orchestration:** Kubernetes using Kind

## Live URL

Live URL: https://fit-forge-ar7z.onrender.com

## Docker

The Docker image is available on Docker Hub:

[devanshcodes07/fitforge](https://hub.docker.com/r/devanshcodes07/fitforge)

Pull the image:

```bash
docker pull devanshcodes07/fitforge:latest
```

Run the container:

```bash
docker run -d --name fitforge -p 8080:80 devanshcodes07/fitforge:latest
```

Open http://localhost:8080 in your browser.

To stop the container:

```bash
docker stop fitforge
docker rm fitforge
```

## Monitoring

FitForge availability is monitored using Prometheus, Blackbox Exporter, and Grafana.

Start the monitoring stack from the project root:

```bash
docker compose -f monitoring/docker-compose.yml up -d
```

Open the monitoring interfaces:

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3000

Grafana provides a dashboard for website availability, HTTP probe status, and response time.

Stop the monitoring stack:

```bash
docker compose -f monitoring/docker-compose.yml down
```

## Kubernetes Deployment

The Kubernetes manifests are available in the `k8s/` directory.

Apply the Deployment and Service:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Check the deployment:

```bash
kubectl get deployments
kubectl get pods
kubectl get services
```

Access the website locally:

```bash
kubectl port-forward service/fitforge-service 8081:80
```

Open http://localhost:8081 in your browser.

## Project Structure

```text
FitForge/
├── .github/workflows/   # CI workflow
├── docs/                # Deployment and project screenshots
├── images/              # Website images
├── k8s/                 # Kubernetes manifests
├── monitoring/          # Prometheus and Grafana configuration
├── scripts/             # Automation and hygiene scripts
├── Dockerfile
├── docker-compose.yml
├── Makefile
├── README.md
└── index.html
```

## Screenshots

Project and deployment evidence is available in the `docs/` directory, including:

- Website deployment
- Docker image verification
- Monitoring dashboard
- Kubernetes deployment status
- Website running through Kubernetes

## DevOps Milestones

- **M1–M3:** Git workflow, pull requests, and CI automation
- **M4:** Jenkins integration
- **M5:** Docker containerization and image publishing
- **M6:** Live deployment and monitoring configuration
- **M7:** Kubernetes Deployment and Service manifests

