# functional/ — Spec Kit Artifacts

Este directorio contiene todos los artefactos generados y gestionados por
**GitHub Spec Kit** (Spec-Driven Development).

## Estructura

```
functional/
├── .specify/                  # Configuración y herramientas de Spec Kit
│   ├── memory/                # Documentos persistentes del proyecto
│   │   └── constitution.md    # Principios y reglas del proyecto
│   ├── scripts/bash/          # Scripts de automatización
│   │   ├── common.sh
│   │   ├── check-prerequisites.sh
│   │   ├── create-new-feature.sh
│   │   ├── setup-plan.sh
│   │   └── update-agent-context.sh
│   └── templates/             # Plantillas para specs, plans, tasks, etc.
└── specs/                     # Especificaciones de features
    └── <branch-name>/         # Una carpeta por feature/rama
        ├── spec.md
        ├── plan.md
        └── tasks.md
```

## Ubicación de prompts de Copilot

Los archivos de prompt para GitHub Copilot **no** están dentro de `functional/`.
Residen en `.github/prompts/speckit.*.prompt.md` (raíz del repo) para que VS Code
los detecte automáticamente. Los agentes asociados están en
`.github/agents/speckit.*.agent.md`.

## Cómo ejecutar los scripts

**Todos los scripts deben ejecutarse desde la raíz del repositorio**, no desde
dentro de `functional/`:

```bash
# Crear una nueva feature
./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "my-feature" "Descripción"

# Configurar plan
./functional/.specify/scripts/bash/setup-plan.sh --json

# Verificar prerrequisitos
./functional/.specify/scripts/bash/check-prerequisites.sh --json
```

## Cómo usar los prompts en VS Code

1. Abrir Copilot Chat
2. Referenciar un prompt con `#` (ej. `#speckit.specify`)
3. O usar el picker: `Ctrl+Shift+P` → _Copilot: Use Prompt File_
