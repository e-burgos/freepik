# Módulos principales del MVP

El MVP está compuesto por 9 módulos funcionales que cubren las capacidades esenciales de la plataforma.

---

## 1. `auth` — Autenticación y usuarios

- Registro e inicio de sesión (email/password y OAuth)
- Gestión de perfil de usuario
- Roles: visitante, usuario free, usuario premium

---

## 2. `resources` — Catálogo de recursos

- Listado de recursos con paginación e infinite scroll
- Categorías: imágenes, vectores, iconos, plantillas, vídeos
- Vista de detalle de recurso
- Tags y metadatos asociados

---

## 3. `search` — Buscador

- Búsqueda por texto con filtros (tipo, licencia, color, orientación)
- Resultados con relevancia y ordenamiento
- Búsqueda por imagen (visual search)

---

## 4. `upload` — Gestión de contenido (panel de contribuidores)

- Subida de recursos por parte de creadores
- Validación de formatos y metadatos
- Estado de revisión/moderación

---

## 5. `download` — Descarga de recursos

- Control de descargas según plan del usuario
- Historial de descargas
- Formatos disponibles por recurso

---

## 6. `subscription` — Planes y pagos

- Plan gratuito con límite de descargas y atribución obligatoria
- Plan premium sin restricciones
- Integración con pasarela de pagos (Mercado Pago)

---

## 7. `ai` — Herramientas de Inteligencia Artificial

- Generador de imágenes por texto (text-to-image)
- Eliminación de fondo automática
- Mejora de resolución (upscaler)
- Generación de tags automáticos y descripciones con LLM
- Sugerencia de prompts al usuario

### Estrategia por fase

| Fase            | Herramienta                                                           | Uso                          | Por qué                                          |
| --------------- | --------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| Desarrollo      | [Hugging Face Inference API](https://huggingface.co/inference-api)    | Generación de imágenes       | Sin coste, fácil de usar                         |
| MVP producción  | [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai) | Generación de imágenes       | Free tier amplio (10k neuronas/día) + bajo coste |
| LLMs auxiliares | [Groq](https://groq.com)                                              | Tags, descripciones, prompts | Gratis y extremadamente rápido                   |
| Escala          | [Replicate](https://replicate.com) / [Fal.ai](https://fal.ai)         | Alta calidad y más modelos   | Mayor variedad y rendimiento                     |

---

## 8. `collections` — Colecciones y favoritos

- Crear y gestionar colecciones personales
- Guardar recursos favoritos
- Compartir colecciones

---

## 9. `admin` — Panel de administración

- Gestión de usuarios y permisos
- Moderación de recursos subidos
- Métricas básicas de uso
