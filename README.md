# Freepik Clone — MVP

Este proyecto es un **clon MVP de Freepik**, la plataforma de recursos gráficos digitales. El objetivo es replicar las funcionalidades esenciales de la plataforma original, priorizando una experiencia de usuario fluida y una arquitectura escalable que permita crecer hacia versiones más completas.

---

## ¿Qué es este proyecto?

Freepik Clone MVP es una aplicación web que permite a los usuarios **explorar, buscar y descargar recursos gráficos digitales** (imágenes, vectores, iconos y plantillas), con soporte para autenticación, planes de suscripción y generación de contenido mediante Inteligencia Artificial.

---

## Módulos principales del MVP

El MVP está compuesto por **9 módulos funcionales**: `auth`, `resources`, `search`, `upload`, `download`, `subscription`, `ai`, `collections` y `admin`.

> Descripción detallada de cada módulo, funcionalidades y estrategia de IA por fase:
> **[docs/modules.md](docs/modules.md)**

---

## Roadmap MVP

```
v0.1 — Base
  ├── Setup del proyecto (monorepo o estructura modular)
  ├── Autenticación básica
  └── Catálogo de recursos estático

v0.2 — Funcionalidad core
  ├── Buscador con filtros
  ├── Sistema de descargas
  └── Carga de recursos

v0.3 — Monetización y IA
  ├── Planes de suscripción + Mercado Pago
  ├── Generador de imágenes con IA
  └── Herramientas de edición básica

v1.0 — MVP completo
  ├── Panel de administración
  ├── Colecciones y favoritos
  └── Optimización de rendimiento y SEO
```

---

## Gestión del monorepo — Nx + pnpm

Este repositorio es un **monorepo gestionado con [Nx](https://nx.dev)** (última versión) y **[pnpm](https://pnpm.io)** como package manager, organizando todas las apps y librerías bajo un mismo repositorio con caché inteligente, ejecución paralela y CI optimizado con `nx affected`.

> Estructura del workspace, beneficios de Nx y comandos principales:
> **[docs/nx-monorepo.md](docs/nx-monorepo.md)**

---

## Metodología — Spec Driven Development con GitHub Spec Kit

Este proyecto adopta **Spec Driven Development (SDD)** con **GitHub Spec Kit**: cada módulo o feature se especifica completamente en un Issue (criterios de aceptación, contratos de API, modelos de datos) antes de escribir código. Los PRs de implementación referencian siempre su spec para trazabilidad total.

Todos los artefactos de Spec Kit viven bajo `functional/` para mantener la organización del repo:

```
functional/
├── .specify/          # Configuración, memoria, plantillas y scripts de Spec Kit
│   ├── memory/        # constitution.md y documentos persistentes
│   ├── scripts/bash/  # Scripts de automatización (ejecutar desde la raíz del repo)
│   └── templates/     # Plantillas para specs, plans, tasks, etc.
└── specs/             # Especificaciones de features (una carpeta por rama)
```

Los **prompts de Copilot** están en `.github/prompts/speckit.*.prompt.md` y los **agentes** en `.github/agents/speckit.*.agent.md` (ubicaciones estándar de VS Code).

> Flujo SDD, template de spec y beneficios del enfoque:
> **[docs/sdd-methodology.md](docs/sdd-methodology.md)**

---

## Gestión del proyecto — GitHub Projects

Este repositorio está conectado al proyecto **[freepik-project-1](https://github.com/users/e-burgos/projects/8)** en GitHub Projects, que centraliza backlog, sprints, roadmap y estado de Issues/PRs. Cada tarea está etiquetada con labels por tipo, módulo y prioridad para identificación rápida.

> Vistas del proyecto, tabla de labels y conexión con el flujo SDD:
> **[docs/github-projects.md](docs/github-projects.md)**

---

## Stack tecnológico

| Capa                 | Tecnología                          |
| -------------------- | ----------------------------------- |
| Monorepo             | Nx (latest)                         |
| Package manager      | pnpm                                |
| Frontend             | Next.js + TypeScript + Tailwind CSS |
| Backend              | Node.js + NestJS                    |
| Base de datos        | PostgreSQL + Prisma ORM             |
| Almacenamiento       | AWS S3 / Cloudflare R2              |
| Autenticación        | NextAuth.js / Auth.js               |
| Pagos                | Mercado Pago                        |
| IA — imágenes (dev)  | Hugging Face Inference API          |
| IA — imágenes (prod) | Cloudflare Workers AI               |
| IA — LLMs            | Groq                                |
| IA — escala          | Replicate / Fal.ai                  |
| Cache                | Redis                               |
| Contenedores         | Docker + Docker Compose             |
| Despliegue frontend  | GitHub Pages                        |
| Despliegue backend   | Railway / Render                    |

---

### Docker

Docker se utiliza para gestionar los servicios de infraestructura del entorno de desarrollo local (**PostgreSQL** y **Redis**) con un solo comando. El backend y el frontend se ejecutan directamente con Nx, sin contenedores, para preservar el hot reload y la caché de tareas.

En CI/CD, Docker también se usa como servicio en los pipelines de GitHub Actions para ejecutar los tests de integración.

> Guía completa con `docker-compose.yml`, comandos y flujo de desarrollo:
> **[docs/docker.md](docs/docker.md)**

---

### Variables de entorno

Cada app tiene su propio archivo `.env`. Los archivos `.env.example` están commiteados en el repo como referencia. **Nunca commitear los `.env` reales.**

Los secrets de producción se configuran como **GitHub Actions Secrets** en el repositorio. Las variables con prefijo `NEXT_PUBLIC_*` son las únicas expuestas al navegador.

> Referencia completa de variables y guía paso a paso para obtener cada credencial:
> **[docs/setup-env.md](docs/setup-env.md)**

---

## Skills de Copilot

Este proyecto incorpora **skills externas** siguiendo el estándar [Agent Skills](https://agentskills.io/), compatibles con GitHub Copilot, Claude Code, Cursor, Cline y otros agentes. Las skills se instalan con `npx skills add` y quedan registradas en `.github/skills/`, donde el agente las detecta automáticamente.

Las skills cubren: calidad web, React/Next.js, Tailwind CSS v4, diseño UI, accesibilidad, Core Web Vitals y patrones de composición.

> Lista completa, comandos de instalación y sub-skills disponibles:
> **[docs/skills.md](docs/skills.md)**

---

## Contribuir

Este proyecto está en sus etapas iniciales. Las contribuciones, sugerencias y mejoras son bienvenidas. Por favor, abre un issue antes de enviar un pull request.

---

## Licencia

MIT
