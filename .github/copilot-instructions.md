# Copilot Instructions

## Spec Kit Configuration

This project uses **GitHub Spec Kit** for Spec-Driven Development. All Spec Kit
artifacts live under the `functional/` directory to keep the repository organized.

### Canonical Paths

| Artifact                            | Path                                         |
| ----------------------------------- | -------------------------------------------- |
| Spec Kit config, memory & templates | `functional/.specify/`                       |
| Feature specifications              | `functional/specs/<branch>/`                 |
| Bash scripts                        | `functional/.specify/scripts/bash/`          |
| Project constitution                | `functional/.specify/memory/constitution.md` |
| Copilot prompt files                | `.github/prompts/speckit.*.prompt.md`        |
| Copilot agent files                 | `.github/agents/speckit.*.agent.md`          |

### Running Scripts

All Spec Kit scripts **must be executed from the repository root**, not from
inside `functional/`. The scripts resolve the repo root automatically and look
for `.specify/` and `specs/` under `functional/`.

```bash
# Create a new feature
./functional/.specify/scripts/bash/create-new-feature.sh --json --short-name "my-feature" "Feature description"

# Set up plan
./functional/.specify/scripts/bash/setup-plan.sh --json

# Check prerequisites
./functional/.specify/scripts/bash/check-prerequisites.sh --json
```

### Prompt Files

Copilot prompt files are at `.github/prompts/` (not inside `functional/`) so
VS Code detects them automatically. Reference them in Copilot Chat with `#`
or via the command palette (`Ctrl+Shift+P` → _Copilot: Use Prompt File_).
