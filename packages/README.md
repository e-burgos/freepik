# packages/

Este directorio contiene todas las librerías compartidas del monorepo.

Las apps **NO** deben importar directamente entre sí. Todo código compartido
vive aquí como una librería Nx con `scope:shared`. (Constitución — Principio II)

## Librerías planificadas

| Package | Tag Nx | Descripción |
|---------|--------|-------------|
| `shared-types` | `scope:shared`, `type:util` | DTOs, interfaces y tipos TypeScript compartidos |
| `shared-utils` | `scope:shared`, `type:util` | Utilidades puras (helpers, validators, formatters) |
| `shared-ui` | `scope:shared`, `type:ui` | Componentes UI reutilizables (React) |
| `config-env` | `scope:shared`, `type:util` | Validación y tipado de variables de entorno |

## Paths en `tsconfig.base.json`

```json
{
  "@freepik/shared-types": ["packages/shared-types/src/index.ts"],
  "@freepik/shared-utils": ["packages/shared-utils/src/index.ts"],
  "@freepik/shared-ui":    ["packages/shared-ui/src/index.ts"],
  "@freepik/config-env":   ["packages/config-env/src/index.ts"]
}
```

## Generar una nueva librería

```bash
pnpm nx g @nx/js:library <nombre> --directory=packages/<nombre> --tags="scope:shared,type:util"
```
