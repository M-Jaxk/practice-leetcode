# Auth-Service Production Deployment Guide

## Architecture

```
Browser → dailyneeditems.com → Gateway (port 80/443) → frontend:80
Browser → api.dailyneeditems.com/auth/* → Gateway → authservice-nginx:80 → authservice-php:9000
```

---

## Files Created

| File | Purpose |
|------|---------|
| `docker-compose-prod.yml` | Production compose (3 services: app, mysql, nginx) |
| `prod.env` | Docker-level env vars (network, containers, DB) |
| `docker/prod/Dockerfile` | Multi-stage PHP-FPM image build |
| `docker/prod/entrypoint.sh` | Production entrypoint (migrations + php-fpm) |
| `docker/prod/nginx/Dockerfile` | Nginx image with baked-in config |
| `docker/prod/nginx/default.conf` | PHP-FPM proxy config |
| `docker/prod/mysql/Dockerfile` | MySQL image (extends mysql:8.0) |
| `.github/workflows/deploy.yml` | CI/CD: build 3 images + deploy to VPS |

---

## GitHub Secrets Required

| Secret | Contains |
|--------|----------|
| `DOCKER_USERNAME` | `yelinnoo` |
| `DOCKER_TOKEN` | Docker Hub PAT |
| `AUTH_PROD_ENV` | Full `prod.env` content |
| `AUTH_LARAVEL_ENV` | Full `src/.env` content (with `APP_KEY` + `JWT_SECRET`) |
| `SERVER_HOST` | VPS IP |
| `SERVER_USER` | `root` |
| `SERVER_SSH_KEY` | Private SSH key |
| `SERVER_PORT` | `22` |

---

## Full Deploy Steps

**1. Build & push images**
```bash
docker build -t yelinnoo/authservice-app:latest -f docker/prod/Dockerfile .
docker build -t yelinnoo/authservice-nginx:latest -f docker/prod/nginx/Dockerfile docker/prod/nginx
docker build -t yelinnoo/authservice-mysql:latest -f docker/prod/mysql/Dockerfile docker/prod/mysql
docker push yelinnoo/authservice-app:latest
docker push yelinnoo/authservice-nginx:latest
docker push yelinnoo/authservice-mysql:latest
```

**2. On VPS — clone & deploy**
```bash
cd /var/www/html/microservices
git clone git@github.com:Microservice-ITV/auth-service.git
cd auth-service
cat > prod.env <<EOF
# paste AUTH_PROD_ENV content
EOF
cat > src/.env <<EOF
# paste AUTH_LARAVEL_ENV content
EOF
```

**3. Start services**
```bash
docker compose -f docker-compose-prod.yml --env-file prod.env pull
docker compose -f docker-compose-prod.yml --env-file prod.env up -d
```

**4. Verify**
```bash
docker ps --filter "name=authservice"
docker exec authservice-php php artisan route:list
curl -k -X POST https://api.dailyneeditems.com/auth/api/v1/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```

**5. Reload gateway**
```bash
docker exec microservices-gateway nginx -s reload
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `pgrep` healthcheck fails | `docker exec authservice-php apt-get install -y procps` |
| `APP_KEY` missing | `docker exec authservice-php php artisan key:generate --force` |
| `JWT_SECRET` missing | `docker exec authservice-php php artisan jwt:secret --force` |
| Gateway 404 | Check `proxy_pass` has no trailing `/` |
| SSL cert not for subdomain | `certbot certonly --manual --preferred-challenges dns -d *.dailyneeditems.com` |

---

## Gateway Config Template

```nginx
server {
    listen 443 ssl;
    server_name api.dailyneeditems.com;

    ssl_certificate /etc/letsencrypt/live/dailyneeditems.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dailyneeditems.com/privkey.pem;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location /auth/ {
        proxy_pass http://authservice-nginx:80/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /orders/ {
        proxy_pass http://order-service:8001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Cheatsheet

```
# Docker
docker compose -f docker-compose-prod.yml --env-file prod.env up -d
docker compose -f docker-compose-prod.yml --env-file prod.env down
docker compose -f docker-compose-prod.yml --env-file prod.env pull
docker ps --filter "name=authservice"
docker logs authservice-php

# Inside container
docker exec authservice-php php artisan route:list
docker exec authservice-php php artisan key:generate --show
docker exec authservice-php php artisan jwt:secret --show
docker exec authservice-php cat storage/logs/laravel.log | tail -50

# Gateway
docker exec microservices-gateway nginx -s reload
docker exec microservices-gateway ls /etc/nginx/conf.d/

# Test
curl -k -X POST https://api.dailyneeditems.com/auth/api/v1/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```
