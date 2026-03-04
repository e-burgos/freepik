---
description: "Tareas de setup del monorepo Nx para Freepik Clone MVP"
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

## Próximos pasos (fuera de esta rama)

Las siguientes tareas corresponden a ramas de feature separadas:

| Rama | Tarea |
|------|-------|
| `005-spec-auth` | Primera spec completa — módulo `auth` (registro, login, OAuth, roles) |
| `006-app-web` | Generar app Next.js con `@nx/next`, configurar Tailwind CSS v4, App Router |
| `007-app-api` | Generar app NestJS con `@nx/nest`, configurar Prisma, módulo `auth` |
| `008-docker-infra` | `docker-compose.yml` para PostgreSQL + Redis (dev/CI) |
