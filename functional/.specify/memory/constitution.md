# Freepik Clone MVP — Constitución

## Principios Fundamentales

### I. Spec-First — La Especificación es Primero (INNEGOCIABLE)

Toda funcionalidad, módulo o cambio disruptivo DEBE contar con una especificación
aprobada (GitHub Issue) antes de escribir cualquier línea de código de implementación.
La especificación DEBE incluir:

- Criterios de aceptación (verificables y sin ambigüedades)
- Contratos de API (forma de request/response y códigos de error)
- Definición del modelo de datos (entidades, campos y relaciones)
- Dependencias con otros módulos

Los Pull Requests DEBEN referenciar el Issue de la spec (`Closes #<issue-id>`).
Los PRs sin spec vinculada DEBEN ser rechazados en la revisión. Los cambios de
alcance se gestionan editando la spec, nunca directamente el código. Este principio
garantiza trazabilidad total desde el requerimiento hasta el despliegue.

### II. Monorepo y Aislamiento de Módulos

Todas las aplicaciones y librerías compartidas DEBEN vivir en el monorepo Nx
gestionado con pnpm. Se aplican las siguientes reglas:

- Cada uno de los 9 módulos principales (`auth`, `resources`, `search`, `upload`,
  `download`, `subscription`, `ai`, `collections`, `admin`) DEBE implementarse
  como una unidad aislada con una superficie de API pública claramente definida.
- Las dependencias circulares entre módulos están PROHIBIDAS. El flujo de
  dependencias es descendente: `admin` y `ai` pueden depender de `auth`;
  `download` depende de `subscription`; no se permiten flechas inversas.
- El código compartido (DTOs, constantes, utilidades) DEBE extraerse en librerías
  Nx dentro del directorio `packages/`. Las apps NO DEBEN importar directamente
  desde otras apps.
- `nx affected` DEBE ser la forma canónica de ejecutar tareas de CI. Ejecutar
  builds completos sin una justificación válida de alcance está PROHIBIDO en CI.

### III. Calidad Basada en Tests (INNEGOCIABLE)

Los tests no son opcionales:

- Los **tests unitarios** son OBLIGATORIOS para todos los servicios de lógica de
  negocio y funciones utilitarias.
- Los **tests de integración** son OBLIGATORIOS para cada contrato de API
  (endpoint × método). DEBEN ejecutarse contra una instancia real de PostgreSQL
  y Redis mediante Docker Compose en CI.
- Los **tests E2E** son OBLIGATORIOS para los tres flujos críticos de usuario:
  autenticación, descarga de recurso y checkout de suscripción (happy path de
  Mercado Pago).
- El ciclo Red-Green-Refactor es OBLIGATORIO para nueva lógica de negocio. Los
  tests DEBEN fallar antes de escribir la implementación y pasar después.
- La cobertura de código NO DEBE bajar del 70 % en los paquetes de lógica de
  negocio. Los reportes de cobertura son un gate en CI.

### IV. Rendimiento y Mejora Progresiva

La plataforma DEBE permanecer funcional sin las características de IA. La IA es
una mejora, no un prerequisito:

- **Gates de rendimiento frontend**: LCP ≤ 2 s (p75), CLS ≤ 0,1, INP ≤ 200 ms
  en un dispositivo móvil de gama media con conexión 4G.
- **Gates de rendimiento API**: tiempo de respuesta p95 ≤ 200 ms para endpoints
  de solo lectura (listado de recursos, búsqueda). Endpoints de escritura ≤ 500 ms p95.
- Todas las funcionalidades impulsadas por IA (generación de imágenes, eliminación
  de fondo, upscaler) DEBEN degradarse con elegancia: si el servicio de IA no
  está disponible, la UI DEBE mostrar un fallback significativo, nunca un error
  no manejado.
- El infinite scroll y la paginación DEBEN implementarse en el servidor con
  paginación basada en cursor. La paginación por offset está PROHIBIDA para
  colecciones grandes.

### V. Observabilidad y Trazabilidad de Auditoría

El sistema DEBE ser observable y auditable en todo momento:

- El logging estructurado en JSON es OBLIGATORIO para todos los servicios backend.
  Las líneas de log DEBEN incluir: `timestamp`, `level`, `module`, `userId`
  (cuando esté autenticado), `requestId` y `message`.
- Los siguientes eventos DEBEN producir una entrada de auditoría inmutable:
  registro de usuario, login/logout, descarga de recurso, cambio de suscripción
  (upgrade/downgrade/cancelación), evento de pago (éxito/fallo/reembolso) y
  solicitud de generación con IA.
- El rastreo de errores (p. ej., Sentry o equivalente) DEBE configurarse en
  producción tanto para el frontend (Next.js) como para el backend (NestJS)
  antes de cualquier release v0.1.
- Los endpoints de health-check (`/health`) DEBEN estar presentes en cada servicio
  NestJS y DEBEN retornar el estado del servicio más el estado de sus dependencias
  (DB, Redis, S3).

### VI. IA Responsable y Control de Costos

Las capacidades de IA son una funcionalidad de primer nivel pero DEBEN estar
controladas en costos:

- Los entornos de desarrollo DEBEN usar únicamente proveedores de IA de free tier
  (Hugging Face Inference API, Groq).
- Los entornos de producción DEBEN usar Cloudflare Workers AI para generación de
  imágenes y Groq para tareas LLM, salvo que un análisis de costos escrito
  justifique una alternativa.
- Cada endpoint de generación con IA DEBE aplicar límites de velocidad por usuario
  según el plan. Los usuarios gratuitos tienen un tope de 3 generaciones/día;
  los premium, 50/día.
- El contenido generado por IA DEBE pasar por un paso de moderación antes de ser
  almacenado o servido. Cualquier fallo de moderación DEBE loguearse y la
  solicitud DEBE rechazarse con HTTP 422.
- Migrar a Replicate o Fal.ai a escala requiere una enmienda a la constitución con
  proyecciones de costos aprobadas antes del despliegue.

### VII. Seguridad y Privacidad de Datos

La seguridad es innegociable en cada capa:

- Las contraseñas DEBEN ser hasheadas con bcrypt (mínimo 12 rounds). Las
  contraseñas en texto plano están PROHIBIDAS en cualquier parte del sistema,
  incluyendo los logs.
- Los JWTs DEBEN tener una vigencia máxima de 15 minutos para access tokens y
  7 días para refresh tokens. La rotación de refresh tokens DEBE implementarse.
- Todos los endpoints de API DEBEN validar y sanear inputs usando class-validator
  (NestJS) y Zod (frontend). Los inputs no validados que lleguen a la base de
  datos están PROHIBIDOS.
- Las variables de entorno que contengan secretos (API keys, credenciales de DB)
  NO DEBEN ser commiteadas al control de versiones. Los archivos `.env.example`
  con valores de placeholder son la única referencia commiteada.
- Los buckets de S3/R2 para uploads de usuarios DEBEN ser privados. Las presigned
  URLs con TTL máximo de 1 hora DEBEN usarse para todos los enlaces de descarga.

## Restricciones de Stack y Arquitectura

Las siguientes elecciones tecnológicas están bloqueadas para el MVP. Los cambios
requieren una enmienda a la constitución:

| Capa                 | Tecnología                          | Restricción                                             |
| -------------------- | ----------------------------------- | ------------------------------------------------------- |
| Monorepo             | Nx (latest) + pnpm                  | DEBE usar `nx affected` en CI                           |
| Frontend             | Next.js + TypeScript + Tailwind CSS | DEBE usarse App Router                                  |
| Backend              | NestJS + Node.js                    | Arquitectura módulo-por-dominio                         |
| ORM de base de datos | Prisma                              | DEBE usar migraciones (`prisma migrate deploy`)         |
| Base de datos        | PostgreSQL                          | Docker Compose en dev/CI; gestionado en prod            |
| Caché                | Redis                               | Almacenamiento de sesiones y rate limiting              |
| Autenticación        | NextAuth.js (Auth.js)               | OAuth + email/password soportados                       |
| Almacenamiento       | AWS S3 / Cloudflare R2              | Buckets privados; solo presigned URLs                   |
| Pagos                | Mercado Pago                        | Verificación de webhooks OBLIGATORIA                    |
| IA (dev)             | Hugging Face Inference API + Groq   | Solo free tier                                          |
| IA (prod)            | Cloudflare Workers AI + Groq        | Presupuesto de costos DEBE estar definido               |
| Contenedores         | Docker + Docker Compose             | Solo infra de dev (DB, Redis)                           |
| Despliegue frontend  | GitHub Pages                        | Export estático para marketing; app en Vercel o similar |
| Despliegue backend   | Railway / Render                    | Paridad de entorno con el esquema de Docker Compose     |

Toda decisión arquitectónica que se desvíe de esta tabla DEBE documentarse como
un Architecture Decision Record (ADR) en `docs/adr/` antes de hacer el merge del PR.

## Flujo de Trabajo de Desarrollo

El siguiente flujo es OBLIGATORIO para todas las contribuciones:

1. **Spec**: Abrir (o referenciar) un GitHub Issue con una spec aprobada. La spec
   DEBE estar en estado `Spec Ready` antes de comenzar la implementación.
2. **Rama**: Crear una rama de funcionalidad con el nombre `###-descripcion-corta`
   desde `main`. Trabajar directamente en `main` está PROHIBIDO.
3. **Plan**: Ejecutar `/speckit.plan` (o equivalente) para generar `plan.md` y
   pasar el gate de Constitution Check antes de escribir código de implementación.
4. **Implementar**: Seguir la lista de tareas de `tasks.md`. Cada tarea apunta a
   un único incremento de historia de usuario independientemente verificable.
5. **Tests**: Todos los tests DEBEN pasar localmente (`nx affected --target=test`)
   antes de abrir un PR.
6. **PR**: Los Pull Requests DEBEN: referenciar el Issue de la spec, incluir un
   enlace a `plan.md`, pasar todos los checks de CI (lint, type-check, test,
   build) y recibir al menos una revisión aprobatoria.
7. **Merge**: La estrategia squash-merge es OBLIGATORIA. El mensaje del squash
   commit DEBE seguir Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
8. **Spec Done**: Cerrar el GitHub Issue y mover la tarjeta a `Done` en GitHub
   Projects solo después de que el PR esté mergeado Y el despliegue esté verificado.

Gates de calidad aplicados en CI para cada PR:

- `nx affected --target=lint` (ESLint + Prettier)
- `nx affected --target=type-check` (modo strict de TypeScript)
- `nx affected --target=test` (Jest, cobertura ≥ 70 % para paquetes de negocio)
- `nx affected --target=build` (el build de producción debe completarse)
- Tests de integración con Docker Compose para módulos backend modificados

## Gobernanza

Esta constitución prevalece sobre todas las demás prácticas y documentación del
proyecto. Ante cualquier conflicto entre este documento y cualquier otra guía,
este documento tiene prioridad.

**Procedimiento de enmienda**:

1. Abrir un GitHub Issue con el título `[Constitución] Enmienda vX.Y.Z — <resumen>`.
2. Describir el cambio propuesto, la motivación y el impacto en specs/código existente.
3. Obtener la aprobación del líder del proyecto antes de hacer el merge.
4. Actualizar este archivo siguiendo el versionado semántico (ver a continuación).
5. Ejecutar el checklist de propagación de consistencia (plantillas, README, docs)
   y documentar cualquier seguimiento requerido en el Informe de Impacto de
   Sincronización al inicio de este archivo.

**Política de versionado**:

- **MAJOR**: Eliminación o redefinición de gobernanza o principios incompatible
  con versiones anteriores.
- **MINOR**: Nuevo principio, sección añadida o guía materialmente ampliada.
- **PATCH**: Aclaraciones, redacción, corrección de errores tipográficos o
  refinamientos no semánticos.

**Revisión de cumplimiento**: La constitución DEBE revisarse al inicio de cada
nueva fase del roadmap (v0.1 → v0.2 → v0.3 → v1.0). Cualquier principio que no
haya sido validado en la práctica DEBE marcarse como `BAJO REVISIÓN` hasta que
sea confirmado.

Todos los PRs y revisiones de código DEBEN verificar el cumplimiento de los
Principios Fundamentales anteriores. La complejidad que viole cualquier principio
DEBE justificarse explícitamente en la descripción del PR. Las violaciones
injustificadas son motivo de rechazo.

**Versión**: 1.0.1 | **Ratificada**: 2026-03-04 | **Última modificación**: 2026-03-04
