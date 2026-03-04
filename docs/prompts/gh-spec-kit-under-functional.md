# Prompt: Implementación de GitHub Spec Kit bajo functional/

Este archivo documenta el prompt para instalar [GitHub Spec Kit](https://github.com/github/spec-kit) con **toda la estructura y scripts bajo la carpeta `functional/`** (`.specify/`, `specs/`, plantillas y prompts de GitHub Copilot). Sirve para reproducir la misma configuración en otro repo o recordar los pasos tras un `specify init` estándar.

> **Entorno**: VS Code + GitHub Copilot. Los prompts generados por Spec Kit se ubican en `.github/prompts/` y son invocables desde Copilot Chat. Las instrucciones globales del agente viven en `.github/copilot-instructions.md`, consistente con la estructura definida en [docs/nx-monorepo.md](../nx-monorepo.md).

---

## Prompt

```
Implementa GitHub Spec Kit en este repositorio con la siguiente condición obligatoria: **todo lo que genera Spec Kit (carpetas y documentos) debe quedar dentro de la carpeta `functional/`** para mantener la organización del proyecto.

El entorno de trabajo es VS Code con GitHub Copilot. Los archivos de prompt generados deben ubicarse en `.github/prompts/` y seguir el estándar de prompt files de Copilot (extensión `.prompt.md`).

Pasos a seguir:

1. **Prerrequisitos**
   - Tener **uv** instalado a nivel global (o en el entorno que uses).
   - Si `uvx` falla al crear `~/.local/share/uv/tools`, arreglar permisos:
     - `mkdir -p ~/.local/share/uv/tools`
     - `chmod -R u+rwX ~/.local/share/uv`
     - Si hace falta: `sudo chown -R $(whoami) ~/.local` y luego `chmod -R u+rwX ~/.local`

2. **Inicializar Spec Kit desde la raíz del repo**
   - Ejecutar desde la raíz del repositorio:
     `uvx --from git+https://github.com/github/spec-kit.git specify init . --ai copilot --force`
   - Esto crea: `.specify/`, `.github/prompts/speckit.*.prompt.md`, `.github/agents/speckit.*.agent.md`, `.vscode/settings.json` y, al usarlo, `specs/`.
   - Los **prompt files** (`.github/prompts/`) solo contienen frontmatter que referencia agentes (ej. `agent: speckit.specify`). Las **rutas a scripts, plantillas y memoria** están en los **agent files** (`.github/agents/`).
   - No mover `.github/prompts/` ni `.github/agents/` de ubicación: Copilot espera estos archivos ahí para detectarlos automáticamente en VS Code.

3. **Mover Spec Kit bajo `functional/`**
   - Mover `.specify` a `functional/.specify`.
   - Crear `functional/specs` (vacía; se llenará al crear features).

4. **Ajustar scripts en `functional/.specify/scripts/bash/`**
   - **common.sh**
     - En `get_repo_root` (fallback sin git): cambiar la navegación relativa de `../../..` a `../../../..` (4 niveles arriba), porque el script ahora vive en `functional/.specify/scripts/bash/` en lugar de `.specify/scripts/bash/`.
     - En `get_current_branch`: usar `specs_dir="$repo_root/functional/specs"` en lugar de `"$repo_root/specs"`.
     - En `find_feature_dir_by_prefix`: renombrar el primer argumento de `repo_root` a `specify_base`; usar `specs_dir="$specify_base/specs"` y que quien llame pase `repo_root/functional`.
     - En `get_feature_paths`: definir `specify_base="$repo_root/functional"` y llamar a `find_feature_dir_by_prefix "$specify_base" "$current_branch"` en lugar de pasar `repo_root`.
   - **create-new-feature.sh**
     - `SPECS_DIR="$REPO_ROOT/functional/specs"` y `TEMPLATE="$REPO_ROOT/functional/.specify/templates/spec-template.md"`.
     - En `find_repo_root`: cuando se encuentre `dir/.specify` y `basename "$dir"` sea `functional`, devolver el padre de `dir` (raíz del repo) en lugar de `dir`, para que REPO_ROOT siga siendo la raíz del repo.
   - **setup-plan.sh**: `TEMPLATE="$REPO_ROOT/functional/.specify/templates/plan-template.md"`.
   - **update-agent-context.sh**: `TEMPLATE_FILE="$REPO_ROOT/functional/.specify/templates/agent-file-template.md"`.
   - **check-prerequisites.sh**: no requiere cambios directos; hereda las rutas correctas de `common.sh` vía `get_feature_paths`.

5. **Actualizar agent files en `.github/agents/`**
   - En todos los archivos `speckit.*.agent.md`, reemplazar:
     - `.specify/scripts/bash/` → `functional/.specify/scripts/bash/`
     - `.specify/memory/` → `functional/.specify/memory/`
     - `.specify/templates/` → `functional/.specify/templates/`
     - `specs/[0-9]+-` → `functional/specs/[0-9]+-` (en `speckit.specify.agent.md`)
   - Los **prompt files** (`speckit.*.prompt.md`) NO necesitan cambios: solo contienen frontmatter que referencia al agente correspondiente.
   - Los prompts se invocan desde Copilot Chat con `#` (referenciar archivo) o mediante el picker de prompts en VS Code (`Ctrl+Shift+P` → `Copilot: Use Prompt File`).

6. **Actualizar `.vscode/settings.json`**
   - En `chat.tools.terminal.autoApprove`, cambiar las rutas de auto-aprobación de scripts:
     - `.specify/scripts/bash/` → `functional/.specify/scripts/bash/`
     - `.specify/scripts/powershell/` → `functional/.specify/scripts/powershell/`
   - Sin este cambio, Copilot no auto-aprobará la ejecución de los scripts reubicados.

7. **Integrar con `.github/copilot-instructions.md`**
   - Añadir al archivo `.github/copilot-instructions.md` (instrucciones globales del agente) una sección que indique:
     - Que Spec Kit vive bajo `functional/` (`.specify/`, `specs/`).
     - Que los scripts se ejecutan desde la raíz del repo.
     - Las rutas canónicas: `functional/.specify/`, `functional/specs/`, `.github/prompts/speckit.*.prompt.md`, `.github/agents/speckit.*.agent.md`.

8. **Documentación**
   - En el README raíz: en la sección de estructura, confirmar que `functional/` contiene `.specify/` y `specs/`, consistente con [docs/nx-monorepo.md](../nx-monorepo.md).
   - Crear o actualizar `functional/README.md` explicando que Spec Kit está bajo `functional/` (`.specify/`, `specs/`) y que los prompts de Copilot están en `.github/prompts/`; los scripts deben ejecutarse desde la raíz del repo.

9. **Comprobación**
   - Desde la raíz: ejecutar `./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "test-setup" "Test Spec Kit under functional"` y verificar que se crea la rama y `functional/specs/<rama>/spec.md`.
   - Ejecutar `./functional/.specify/scripts/bash/setup-plan.sh --json` y verificar que se crea `functional/specs/<rama>/plan.md`.
   - Verificar que no queda `.specify/` en la raíz del repo.
   - Abrir Copilot Chat en VS Code y referenciar un prompt con `#speckit` para confirmar que Copilot lo detecta correctamente.
   - Limpiar la rama y carpeta de test: `git checkout main && git branch -D 001-test-setup && rm -rf functional/specs/001-test-setup`.
```

## Resultado esperado

- **`functional/.specify/`** con `scripts/bash/`, `templates/` y `memory/constitution.md`.
- **`functional/specs/`** donde se crean las carpetas por feature (ej. `001-feature-name/` con `spec.md`, `plan.md`, `tasks.md`, etc.).
- **`.github/agents/speckit.*.agent.md`** con todas las referencias apuntando a `functional/.specify/scripts/`, `functional/.specify/memory/` y `functional/.specify/templates/`.
- **`.github/prompts/speckit.*.prompt.md`** en la raíz, con frontmatter que referencia a los agent files. Invocables desde Copilot Chat en VS Code.
- **`.github/copilot-instructions.md`** actualizado con las rutas canónicas de Spec Kit bajo `functional/`.
- **`.vscode/settings.json`** con `chat.tools.terminal.autoApprove` apuntando a `functional/.specify/scripts/`.
- Scripts que usan `REPO_ROOT/functional/specs` y `REPO_ROOT/functional/.specify/...`; ejecutados desde la raíz del repo, crean y leen todo bajo `functional/`.
- README raíz y `functional/README.md` actualizados describiendo que Spec Kit vive bajo `functional/`.

## Variantes del prompt

- **Sin uv**: Si no se usa uv, se puede clonar el repo de [spec-kit](https://github.com/github/spec-kit), copiar manualmente `scripts/`, `templates/` y la estructura de prompts/agents bajo `functional/.specify/`, `.github/prompts/` y `.github/agents/`, y luego aplicar los mismos cambios de rutas (pasos 4, 5 y 6).
- **Solo documentar**: Si Spec Kit ya está instalado en la raíz y solo se quiere documentar cómo sería la migración a `functional/`, usar únicamente los pasos 3–8 como guía de refactor.
- **Otro agente**: Cambiar `--ai copilot` por el agente que use el proyecto (ver documentación de Spec Kit). Para VS Code sin Copilot, verificar si Spec Kit soporta el agente en uso.
