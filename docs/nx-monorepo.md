# Gestión del monorepo — Nx + pnpm

Este repositorio está gestionado como un **monorepo con [Nx](https://nx.dev)** (última versión disponible), usando **[pnpm](https://pnpm.io)** como manejador de paquetes.

Nx permite organizar todas las aplicaciones y librerías bajo un mismo repositorio con:

- **Caché de tareas inteligente** (local y remota vía Nx Cloud)
- **Ejecución paralela y distribuida** de builds, tests y lints
- **Grafo de dependencias** entre proyectos para detectar impactos de cambios
- **Generadores de código** para scaffolding consistente
- **CI optimizado**: solo se ejecutan las tareas afectadas por los cambios (`nx affected`)

---

## Estructura del workspace

```
freepik/
├── .github/                                  # Configuración agentica y CI/CD de GitHub
│   ├── agents/                               # Definición de agentes de Copilot
│   │   ├── spec-agent.yml                    # Agente para generación y revisión de specs
│   │   └── review-agent.yml                  # Agente para revisión de PRs
│   ├── skills/                               # Skills personalizadas para los agentes
│   │   ├── generate-spec.md                  # Skill: generar spec desde requerimiento
│   │   ├── validate-spec.md                  # Skill: validar criterios de aceptación
│   │   └── scaffold-module.md                # Skill: crear estructura de módulo desde spec
│   ├── workflows/                            # GitHub Actions
│   │   ├── ci.yml                            # Pipeline CI (lint, test, build afectados)
│   │   ├── cd.yml                            # Pipeline CD (deploy backend por entorno)
│   │   ├── deploy-pages.yml                  # Deploy automático del frontend a GitHub Pages
│   │   └── spec-check.yml                    # Valida que cada PR tenga spec asociada
│   ├── ISSUE_TEMPLATE/                       # Templates de Issues
│   │   ├── spec-module.md                    # Template spec de módulo completo
│   │   ├── spec-feature.md                   # Template spec de feature individual
│   │   └── bug-report.md                     # Template de reporte de bug
│   ├── PULL_REQUEST_TEMPLATE.md              # Template de PR (referencia spec obligatoria)
│   └── copilot-instructions.md               # Instrucciones globales de Copilot para el repo
│
├── functional/                               # Toda la capa funcional — GitHub Spec Kit
│   ├── specs/                                # Especificaciones por módulo
│   │   ├── auth/
│   │   │   └── spec.md                       # Spec del módulo de autenticación
│   │   ├── resources/
│   │   │   └── spec.md                       # Spec del catálogo de recursos
│   │   ├── search/
│   │   │   └── spec.md                       # Spec del buscador
│   │   ├── upload/
│   │   │   └── spec.md                       # Spec de carga de contenido
│   │   ├── download/
│   │   │   └── spec.md                       # Spec de descarga de recursos
│   │   ├── subscription/
│   │   │   └── spec.md                       # Spec de planes y pagos
│   │   ├── ai/
│   │   │   └── spec.md                       # Spec de herramientas IA
│   │   ├── collections/
│   │   │   └── spec.md                       # Spec de colecciones y favoritos
│   │   └── admin/
│   │       └── spec.md                       # Spec del panel de administración
│   ├── contracts/                            # Contratos de API (OpenAPI / JSON Schema)
│   │   ├── auth.openapi.yml
│   │   ├── resources.openapi.yml
│   │   └── ...
│   ├── models/                               # Modelos de datos y entidades
│   │   ├── user.model.md
│   │   ├── resource.model.md
│   │   └── ...
│   └── decisions/                            # Architecture Decision Records (ADRs)
│       ├── 001-monorepo-nx.md
│       ├── 002-sdd-spec-kit.md
│       └── ...
│
├── apps/
│   ├── web/                                  # Frontend — Next.js (app principal)
│   ├── web-e2e/                              # E2E tests del frontend (Playwright)
│   ├── api/                                  # Backend — NestJS (API REST)
│   └── api-e2e/                              # E2E tests del backend
│
├── libs/
│   ├── shared/
│   │   ├── ui/                               # Componentes UI reutilizables
│   │   ├── types/                            # Tipos e interfaces compartidas (TypeScript)
│   │   ├── utils/                            # Funciones utilitarias comunes
│   │   └── constants/                        # Constantes globales
│   ├── frontend/
│   │   ├── auth/                             # Lógica de autenticación (cliente)
│   │   ├── resources/                        # Módulo de catálogo de recursos
│   │   ├── search/                           # Módulo de búsqueda
│   │   └── ai/                               # Herramientas IA (cliente)
│   └── backend/
│       ├── auth/                             # Módulo de autenticación (servidor)
│       ├── resources/                        # Módulo de gestión de recursos
│       ├── storage/                          # Integración con S3/R2
│       ├── payments/                         # Integración con Mercado Pago
│       └── ai/                               # Integración con APIs de IA
│
├── nx.json                                   # Configuración principal de Nx
├── pnpm-workspace.yaml                       # Configuración del workspace pnpm
└── package.json
```

---

## Comandos principales

```bash
# Instalar dependencias
pnpm install

# Levantar el frontend en desarrollo
pnpm nx serve web

# Levantar el backend en desarrollo
pnpm nx serve api

# Ejecutar todos los tests
pnpm nx run-many -t test

# Build de todos los proyectos
pnpm nx run-many -t build

# Solo lo afectado por cambios (ideal para CI)
pnpm nx affected -t build,test,lint

# Ver el grafo de dependencias
pnpm nx graph
```
