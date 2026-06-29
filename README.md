# React Portfolio — CI/CD GitOps Pipeline

> A production-grade CI/CD pipeline deploying a React portfolio to Kubernetes using GitHub Actions and ArgoCD.

---

## Live Architecture

```
git push
   ↓
GitHub repository updated
   ↓
GitHub Actions → builds Docker image → pushes to Docker Hub → updates deployment.yaml → pushes to GitHub
   ↓
ArgoCD detects deployment.yaml changed
   ↓
API Server → etcd → Controller → Scheduler → Kubelet → pulls new image → new pods running
   ↓
NodePort service → Browser ✅
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **React + Vite** | Frontend framework |
| **Tailwind CSS** | Styling |
| **Docker** | Containerization (2-stage build) |
| **Nginx** | Serves React build inside container |
| **Docker Hub** | Container image registry |
| **Kubernetes (Minikube)** | Container orchestration |
| **ArgoCD** | GitOps continuous delivery |
| **GitHub Actions** | CI pipeline (build + push + update manifest) |

---

## Repository Structure

```
my-portfolio/
├── src/                        # React source code
├── public/                     # Static assets
├── dist/                       # Vite build output
├── Dockerfile                  # 2-stage Docker build
├── nginx.conf                  # Nginx config for React Router
├── k8s/
│   ├── deployment.yaml         # Kubernetes deployment (2 replicas)
│   ├── service.yaml            # NodePort service
│   └── ingress.yaml            # Nginx ingress
├── .github/
│   └── workflows/
│       └── ci.yaml             # GitHub Actions CI pipeline
├── package.json
├── vite.config.js
└── README.md
```

---

## CI/CD Pipeline — How It Works

### CI — GitHub Actions (`.github/workflows/ci.yaml`)

Triggers automatically on every push to `main` branch.

**Steps:**
1. Checkout code onto GitHub Actions Ubuntu runner
2. Login to Docker Hub using repository secrets
3. Build Docker image and push to Docker Hub with version tag (`${{ github.run_number }}`)
4. Update image tag in `k8s/deployment.yaml` using `sed`
5. Commit and push updated manifest back to GitHub

### CD — ArgoCD

ArgoCD polls the GitHub repository every 3 minutes.

**Steps:**
1. Detects change in `k8s/deployment.yaml`
2. Runs `kubectl apply` against the Kubernetes API server
3. Kubernetes pulls new image from Docker Hub
4. Old pods terminate, new pods start with updated image
5. Portfolio accessible at NodePort URL

---

## Docker — 2-Stage Build

```dockerfile
# Stage 1 — Build React app
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Why 2-stage?**
- Stage 1 uses Node.js to build the React app
- Stage 2 uses lightweight Nginx to serve only the built files
- Final image size: ~93MB instead of ~500MB+ with Node.js included

---

## Kubernetes Manifests

### Deployment (`k8s/deployment.yaml`)
- 2 replicas for high availability
- Resource requests and limits defined
- Image tag updated automatically by GitHub Actions on every push

### Service (`k8s/service.yaml`)
- NodePort type for external access
- Routes traffic to pods via label selector `app: my-portfolio`

### Ingress (`k8s/ingress.yaml`)
- Nginx ingress controller
- Host-based routing via `portfolio.local`
- Handles React Router client-side routing

---

## Setup Guide

### Prerequisites

- Minikube installed and running
- `kubectl` configured
- Docker Desktop or Docker Engine
- Docker Hub account
- GitHub account

---

### Step 1 — Start Minikube

```bash
minikube start
```

---

### Step 2 — Install ArgoCD

```bash
kubectl create namespace argocd

kubectl apply -n argocd --server-side --force-conflicts \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Wait for all pods to be running:

```bash
kubectl get pods -n argocd -w
```

---

### Step 3 — Expose ArgoCD UI

```bash
kubectl patch svc argocd-server -n argocd \
  -p '{"spec": {"type": "NodePort"}}'
```

Get the URL:

```bash
minikube service argocd-server -n argocd
```

---

### Step 4 — Get ArgoCD Admin Password

```bash
kubectl get secret argocd-initial-admin-secret -n argocd \
  -o jsonpath="{.data.password}" | base64 --decode
```

Login at `https://<minikube-ip>:<nodeport>` with username `admin`.

---

### Step 5 — Add GitHub Secrets

In your GitHub repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|--------|-------|
| `DOCKERHUB_USERNAME` | your Docker Hub username |
| `DOCKERHUB_TOKEN` | your Docker Hub access token |

---

### Step 6 — Create ArgoCD Application

In ArgoCD UI → New App:

| Field | Value |
|-------|-------|
| Application Name | `my-portfolio` |
| Project | `default` |
| Sync Policy | `Automatic` |
| Repository URL | `https://github.com/Sharath-1863/my-portfolio` |
| Revision | `HEAD` |
| Path | `k8s` |
| Cluster URL | `https://kubernetes.default.svc` |
| Namespace | `default` |

Enable **PRUNE RESOURCES** and **SELF HEAL**.

---

### Step 7 — Trigger the Pipeline

Make any change and push:

```bash
git add .
git commit -m "your change"
git pull origin main   # always pull before push
git push origin main
```

Watch GitHub Actions → ArgoCD → Kubernetes update automatically.

---

## Accessing the Portfolio

```bash
# Get the NodePort URL
minikube service my-portfolio-svc

# Or directly
http://192.168.49.2:32194
```

---

## Verify Deployment

```bash
# Check pods
kubectl get pods

# Check deployment revision
kubectl get deploy my-portfolio

# Check image tag
kubectl describe pod -l app=my-portfolio | grep Image
```

---

## Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| `git push` rejected | GitHub Actions auto-committed ahead of you | Run `git pull origin main` first |
| ArgoCD not syncing | Still on `latest` tag (no file change detected) | Use versioned tags like `${{ github.run_number }}` |
| Portfolio shows old version | Browser cache | Hard refresh `Ctrl + Shift + R` |
| Minikube not reachable | Minikube stopped | Run `minikube start` |
| GitHub Actions 403 error | Missing write permissions | Add `permissions: contents: write` to `ci.yaml` |

---

## Key Concepts Learned

| Concept | What It Means |
|---------|--------------|
| **GitOps** | Git is the single source of truth — ArgoCD syncs cluster to match Git |
| **2-stage Docker build** | Build in Node.js, serve in Nginx — smaller final image |
| **NodePort** | Exposes a Kubernetes service on a static port on the node IP |
| **ArgoCD Auto Sync** | Automatically deploys when it detects a Git change |
| **github.run_number** | Unique integer incrementing on every pipeline run — used as image version tag |
| **Control plane** | Brain of Kubernetes — API server, Scheduler, Controller, etcd |
| **Worker node** | Runs the actual containers — Kubelet pulls and manages pods |

---

## What's Next

- [ ] Deploy to AWS EKS (production Kubernetes)
- [ ] Add Horizontal Pod Autoscaler (HPA)
- [ ] Set up separate manifests repository
- [ ] Add Slack notifications via ArgoCD
- [ ] Add health checks (liveness + readiness probes)

---

*Built by Sharath Chandra C | Cloud & Infrastructure Engineer*
*Completed: June 2026*
