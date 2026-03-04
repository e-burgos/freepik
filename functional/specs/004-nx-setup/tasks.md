---
description: 'Tareas de setup del monorepo Nx para Freepik Clone MVP'
---

# Tasks: 004 — Nx Monorepo Setup

**Rama**: `004-nx-setup`  
**Tipo**: `chore` (infraestructura técnica — sin spec de usuario)  
**Prerequisito de**: todas las specs de features (`005-spec-auth` en adelante)

---

## Fase 1: Configuración del workspace raíz ✅

- [x] T001 Crear `package.json` raíz con scripts Nx (`dev`, `build`, `test`, `lint`, `type-check`, `affected:*`)
- [x] T002 Crear `pnpm-workspace.yaml` con `apps/*` y `packages/*`
- [x] T003 Crear `nx.json` con plugins `@nx/next` y `@nx/nest`, `namedInputs`, `targetDefaults` y `generators`
- [x] T004 Crear `tsconfig.base.json` con `strict: true`, `noUncheckedIndexedAccess`, paths para packages compartidos
- [x] T005 Crear `.eslintrc.json` raíz con regla `@nx/enforce-module-boundaries` y constraints por `scope` y `type`
  > ⚠️ Reemplazado por `eslint.config.cjs` (flat config v9) al generar las apps con Nx — `.eslintrc.json` eliminado
- [x] T006 Crear `.prettierrc` y `.prettierignore`
- [x] T007 Crear `jest.preset.js` con threshold de cobertura ≥ 70 % (Constitución — Principio III)
- [x] T008 Crear/actualizar `.gitignore` con `node_modules`, `.nx/cache`, `.env`, `dist`, `coverage`

---

## Fase 2: Estructura de directorios ✅

- [x] T009 Crear `apps/README.md` con descripción de `web` (Next.js) y `api` (NestJS) y comandos de generación
- [x] T010 Crear `packages/README.md` con librerías planificadas (`shared-types`, `shared-utils`, `shared-ui`, `config-env`) y sus tags Nx

---

## Fase 3: Instalación de dependencias ✅

- [x] T011 Ejecutar `pnpm install` para instalar devDependencies del workspace raíz (Nx v21.6.10 local)
- [x] T012 Aprobar build scripts necesarios con `pnpm approve-builds`
- [x] T013 Verificar que `pnpm nx --version` resuelve correctamente la versión local (v21.6.10)

---

## Fase 4: Validación del workspace ✅

- [x] T014 Ejecutar `pnpm nx graph` para confirmar workspace inicializado sin errores
- [x] T015 Ajustar `nx.json`: remover plugin `@nx/nest/plugin` hasta que exista la app (se añade en `007-app-api`)

---

## Fase 5: Generación de apps y libs + verificación ✅

- [x] T016 Generar `apps/web` con `@nx/next:application` (Next.js 15, TypeScript, Tailwind, App Router)
- [x] T017 Generar `apps/api` con `@nx/nest:application` (NestJS 11) + `apps/api-e2e`
- [x] T018 Generar `packages/shared-types` con `@nx/js:library --bundler=none` (tags: `scope:shared,type:util`)
- [x] T019 Generar `packages/shared-utils` con `@nx/js:library --bundler=none` (tags: `scope:shared,type:util`)
- [x] T020 Generar `packages/shared-ui` con `@nx/react:library --bundler=none` (tags: `scope:shared,type:ui`)
- [x] T021 Generar `packages/config-env` con `@nx/js:library --bundler=none` (tags: `scope:shared,type:util`)
- [x] T022 Migrar ESLint a flat config v9: eliminar `.eslintrc.json`, crear `eslint.config.cjs` raíz y por proyecto
- [x] T023 Corregir `jest.preset.js`: eliminar transform `@swc-node/jest` (no instalado), usar transform por proyecto
- [x] T024 Corregir `tsconfig.base.json`: `moduleResolution: node` (compatible NestJS `module: commonjs`)
- [x] T025 Override `moduleResolution: bundler` solo en `apps/web/tsconfig.json` (requerido por Next.js)
- [x] T026 Agregar `testEnvironment: jsdom` en `packages/shared-ui/jest.config.ts`
- [x] T027 Corregir `apps/web/jest.config.ts`: `dir: path.resolve(__dirname)` para `next/jest`

### Resultados de verificación

| Comando                              | Proyectos | Estado |
| ------------------------------------ | --------- | ------ |
| `pnpm nx run-many --target=lint`     | 7/7       | ✅     |
| `pnpm nx run-many --target=test`     | 6/6       | ✅     |
| `pnpm nx build web`                  | web       | ✅     |
| `pnpm nx build api`                  | api       | ✅     |
| `pnpm nx serve api` (`:3000`)        | api       | ✅     |
| `pnpm nx serve web` (`200 :3000`)    | web       | ✅     |

---

## Próximos pasos (fuera de esta rama)

Las siguientes tareas corresponden a ramas de feature separadas:

| Rama               | Tarea                                                                      |
| ------------------ | -------------------------------------------------------------------------- |
| `005-spec-auth`    | Primera spec completa — módulo `auth` (registro, login, OAuth, roles)      |
| `006-docker-infra` | `docker-compose.yml` para PostgreSQL + Redis (dev/CI)                      |
