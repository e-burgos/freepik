# Docker — Guía de uso

Docker se utiliza exclusivamente para el **entorno de desarrollo local**, levantando los servicios de infraestructura (base de datos, cache) con un solo comando, sin necesidad de instalarlos en el sistema operativo.

El backend y el frontend **no se contienen** en Docker durante el desarrollo — se ejecutan con Nx directamente para aprovechar el hot reload y la caché de tareas.

---

## Servicios gestionados por Docker

| Servicio             | Imagen               | Puerto | Descripción                        |
| -------------------- | -------------------- | ------ | ---------------------------------- |
| PostgreSQL           | `postgres:16-alpine` | `5432` | Base de datos principal            |
| Redis                | `redis:7-alpine`     | `6379` | Cache y gestión de sesiones        |
| pgAdmin _(opcional)_ | `dpage/pgadmin4`     | `5050` | UI para gestionar la base de datos |

---

## Archivo `docker-compose.yml`

Ubicado en la raíz del monorepo:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: freepik-db
    restart: unless-stopped
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: freepik_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: freepik-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  pgadmin:
    image: dpage/pgadmin4
    container_name: freepik-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@freepik.local
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    profiles:
      - tools

volumes:
  postgres_data:
  redis_data:
```

---

## Comandos principales

```bash
# Levantar servicios de infraestructura
docker compose up -d

# Levantar también pgAdmin (perfil opcional)
docker compose --profile tools up -d

# Ver estado de los contenedores
docker compose ps

# Ver logs de un servicio
docker compose logs -f postgres

# Detener todos los servicios
docker compose down

# Eliminar volúmenes (reset completo de datos)
docker compose down -v
```

---

## Flujo de desarrollo completo

```bash
# 1. Levantar infraestructura
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Ejecutar migraciones
pnpm nx run api:db:migrate

# 4. Levantar backend y frontend en paralelo
pnpm nx run-many -t serve --projects=api,web --parallel
```

---

## Uso en CI/CD

En los pipelines de GitHub Actions, Docker se usa para levantar PostgreSQL y Redis como servicios durante la ejecución de tests de integración, sin necesidad de infraestructura externa.

```yaml
# Ejemplo en .github/workflows/ci.yml
services:
  postgres:
    image: postgres:16-alpine
    env:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: freepik_db_test
    ports:
      - 5432:5432
  redis:
    image: redis:7-alpine
    ports:
      - 6379:6379
```
