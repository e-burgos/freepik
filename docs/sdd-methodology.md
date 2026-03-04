# Metodología — Spec Driven Development con GitHub Spec Kit

Este proyecto adopta la metodología **Spec Driven Development (SDD)** apoyándose en **[GitHub Spec Kit](https://github.com/features/copilot)**, lo que permite que cada funcionalidad esté completamente especificada antes de comenzar su implementación.

---

## ¿Qué es GitHub Spec Kit?

GitHub Spec Kit es un conjunto de herramientas integradas en GitHub que facilita la creación, gestión y seguimiento de especificaciones técnicas directamente en el repositorio, combinando:

- **GitHub Issues** como unidades de especificación por módulo o feature
- **GitHub Projects** para gestionar el estado del spec (Draft → Review → Ready → In Progress → Done)
- **GitHub Copilot** para asistir en la generación y refinamiento de specs a partir de requerimientos en lenguaje natural
- **Pull Requests vinculados** a cada spec para trazabilidad completa entre diseño e implementación

---

## Flujo de trabajo SDD

```
1. Spec Draft
   └── Se redacta la especificación del módulo/feature en un Issue
       (contexto, criterios de aceptación, contratos de API, modelos de datos)

2. Spec Review
   └── El equipo revisa y valida la spec antes de escribir código
       (se detectan ambigüedades, dependencias y riesgos)

3. Spec Ready
   └── La spec está aprobada y lista para implementar

4. Implementation
   └── El PR de implementación referencia el Issue de spec
       (Closes #<issue-id>)

5. Spec Done
   └── La feature cumple todos los criterios de aceptación definidos en la spec
```

---

## Estructura de una spec (template de Issue)

Cada módulo del MVP tendrá su propio Issue de spec con la siguiente estructura:

```markdown
## Descripción

Qué resuelve este módulo y por qué es necesario.

## Criterios de aceptación

- [ ] Criterio 1
- [ ] Criterio 2

## Contrato de API

Endpoints, request/response shapes, códigos de error.

## Modelo de datos

Entidades, campos, relaciones.

## Dependencias

Otros módulos o librerías requeridos.

## Notas técnicas

Decisiones de arquitectura, limitaciones conocidas.
```

---

## Beneficios para este proyecto

- **Sin código huérfano**: toda implementación tiene una spec que la justifica
- **Onboarding rápido**: cualquier colaborador entiende el contexto leyendo el Issue
- **Trazabilidad total**: de requerimiento → spec → PR → merge
- **Iteración controlada**: los cambios de scope se gestionan editando la spec, no el código directamente
