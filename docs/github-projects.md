# Gestión del proyecto — GitHub Projects

Este repositorio está directamente conectado al proyecto **[freepik-project-1](https://github.com/users/e-burgos/projects/8)** en GitHub Projects, que centraliza toda la planificación y seguimiento del desarrollo.

---

## ¿Qué se gestiona en `freepik-project-1`?

- **Backlog**: todas las tareas, specs y mejoras pendientes
- **Sprints**: iteraciones cortas organizadas por milestone
- **Roadmap**: vista de línea de tiempo con las fases del MVP
- **Estado de Issues y PRs**: trazabilidad en tiempo real del avance

---

## Vistas del proyecto

| Vista           | Descripción                                                                             |
| --------------- | --------------------------------------------------------------------------------------- |
| `Board`         | Kanban con columnas: Backlog → Spec Draft → Spec Ready → In Progress → In Review → Done |
| `Roadmap`       | Timeline con milestones y fechas estimadas por módulo                                   |
| `Backlog`       | Lista completa de ítems ordenados por prioridad                                         |
| `Sprint Actual` | Filtro del sprint en curso                                                              |

---

## Labels del repositorio

Los labels permiten identificar rápidamente el tipo y contexto de cada Issue o PR:

| Label              | Color          | Descripción                              |
| ------------------ | -------------- | ---------------------------------------- |
| `spec`             | 🔵 Azul        | Especificación de módulo o feature       |
| `feature`          | 🟢 Verde       | Nueva funcionalidad                      |
| `bug`              | 🔴 Rojo        | Error o comportamiento incorrecto        |
| `chore`            | ⚪ Gris        | Tareas técnicas, configuración, refactor |
| `infra`            | 🟠 Naranja     | Infraestructura, CI/CD, monorepo         |
| `ai`               | 🟣 Morado      | Relacionado con herramientas de IA       |
| `auth`             | 🟡 Amarillo    | Módulo de autenticación                  |
| `backend`          | 🟤 Marrón      | Capa de API / NestJS                     |
| `frontend`         | 🔷 Azul claro  | Capa de UI / Next.js                     |
| `docs`             | ⬜ Blanco      | Documentación y specs                    |
| `priority: high`   | 🔴 Rojo oscuro | Alta prioridad                           |
| `priority: medium` | 🟡 Amarillo    | Prioridad media                          |
| `priority: low`    | 🟢 Verde claro | Baja prioridad                           |
| `blocked`          | ⛔ Rojo        | Tarea bloqueada por dependencia          |

---

## Conexión con el flujo SDD

Cada Issue generado en el flujo Spec Driven Development se agrega automáticamente al proyecto `freepik-project-1`, con su label correspondiente y asignado al sprint o milestone pertinente, garantizando que **todo el trabajo visible en el código tiene una tarea rastreable en el proyecto**.
