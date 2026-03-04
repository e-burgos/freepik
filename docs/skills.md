# Skills de Copilot — Guía de uso

Este proyecto incorpora **skills externas** para potenciar las capacidades de GitHub Copilot y otros agentes de IA dentro del repositorio. Las skills son conjuntos de instrucciones y scripts que extienden las capacidades del agente, aplicando buenas prácticas especializadas de forma automática al generar o revisar código.

Las skills siguen el estándar [Agent Skills](https://agentskills.io/) y son compatibles con GitHub Copilot, Claude Code, Cursor, Cline, Codex y otros agentes.

> **Nota:** `npx add-skill` está deprecado. El comando actualizado es `npx skills add`.

---

## Skills instaladas

```bash
# 1. Calidad web — rendimiento, accesibilidad, Core Web Vitals, SEO (Addy Osmani)
npx skills add addyosmani/web-quality-skills

# 2. React y Next.js — optimización de rendimiento (Vercel Engineering, 40+ reglas)
npx skills add vercel-labs/agent-skills

# 3. Diseño UI — accesibilidad, UX, formularios, animaciones, i18n (100+ reglas)
npx skills add vercel-labs/agent-skills

# 4. Patrones de composición — React composition patterns escalables
npx skills add vercel-labs/agent-skills

# 5. Frontend design — guías de diseño de interfaces (Anthropic)
npx skills add anthropics/skills

# 6. Tailwind CSS v4 — documentación oficial con snapshot local e indexado (Lombiq)
npx skills add Lombiq/Tailwind-Agent-Skills

# 7. Tailwind CSS v4 — patrones v4, migración desde v3 y validación CLI (tlq5l)
#    Instalación manual: copiar AGENTS.md al root del proyecto o a .github/skills/
#    https://github.com/tlq5l/tailwindcss-v4-skill
```

---

## Tabla de skills

| Skill                   | Paquete                         | Cuándo actúa                        | Descripción                                                                                       |
| ----------------------- | ------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `web-quality-skills`    | `addyosmani/web-quality-skills` | Auditorías, performance, a11y, SEO  | 150+ reglas: Core Web Vitals (LCP, INP, CLS), Lighthouse, WCAG 2.1, optimización de imágenes      |
| `react-best-practices`  | `vercel-labs/agent-skills`      | Componentes React y páginas Next.js | 40+ reglas: eliminación de waterfalls, bundle size, SSR/RSC, re-renders, data fetching            |
| `web-design-guidelines` | `vercel-labs/agent-skills`      | Revisiones de UI/UX                 | 100+ reglas: aria, focus states, formularios, animaciones, dark mode, touch, i18n                 |
| `composition-patterns`  | `vercel-labs/agent-skills`      | Refactors y diseño de componentes   | Compound components, state lifting, props drilling, APIs flexibles                                |
| `frontend-design`       | `anthropics/skills`             | Diseño general de UI                | Guías de diseño de interfaces modernas para frontend                                              |
| `tailwind-4-docs`       | `Lombiq/Tailwind-Agent-Skills`  | Uso, config y migración de Tailwind | Docs oficiales de Tailwind v4 con snapshot local indexado, lista de gotchas y script de sync      |
| `tailwindcss-v4-skill`  | `tlq5l/tailwindcss-v4-skill`    | Patrones y migración v3 → v4        | Reglas modulares: `@theme`, `@utility`, `@variant`, `@source`, migración desde v3, validación CLI |

---

## Sub-skills activas de `web-quality-skills`

| Sub-skill           | Trigger phrase                                 |
| ------------------- | ---------------------------------------------- |
| `web-quality-audit` | `"Audit my site"`, `"review quality"`          |
| `performance`       | `"optimize performance"`, `"fix slow loading"` |
| `core-web-vitals`   | `"improve Core Web Vitals"`, `"fix LCP"`       |
| `accessibility`     | `"improve accessibility"`, `"WCAG audit"`      |
| `seo`               | `"optimize SEO"`, `"fix meta tags"`            |
| `best-practices`    | `"apply best practices"`, `"security audit"`   |

---

## Agregar nuevas skills

```bash
# Buscar skills disponibles
npx skills find

# Instalar una skill
npx skills add <usuario>/<repo>

# Verificar skills instaladas
npx skills check

# Actualizar skills
npx skills update
```

Las skills quedan registradas en `.github/skills/` y son reconocidas automáticamente por el agente configurado en el repositorio. Más skills disponibles en [skills.sh](https://skills.sh).
