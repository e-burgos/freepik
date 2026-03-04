# apps/

Este directorio contiene todas las aplicaciones del monorepo.

## Aplicaciones planificadas

| App | Tecnología | Descripción |
|-----|-----------|-------------|
| `web` | Next.js 15 + TypeScript + Tailwind CSS | Frontend principal (App Router) |
| `api` | NestJS + Node.js | Backend REST API |

Cada app se genera con su plugin Nx correspondiente:

```bash
# Generar app Next.js
pnpm nx g @nx/next:application web --directory=apps/web

# Generar app NestJS
pnpm nx g @nx/nest:application api --directory=apps/api
```
