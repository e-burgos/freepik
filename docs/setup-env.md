# Guía de configuración de variables de entorno

Esta guía explica paso a paso cómo obtener y configurar cada variable de entorno requerida para ejecutar el proyecto en local.

---

## Índice

1. [Preparación inicial](#1-preparación-inicial)
2. [Base de datos — PostgreSQL](#2-base-de-datos--postgresql)
3. [Autenticación — JWT](#3-autenticación--jwt)
4. [OAuth — Google](#4-oauth--google)
5. [OAuth — GitHub](#5-oauth--github)
6. [NextAuth.js](#6-nextauthjs)
7. [Almacenamiento — Cloudflare R2](#7-almacenamiento--cloudflare-r2)
8. [Pagos — Mercado Pago](#8-pagos--mercado-pago)
9. [IA — Hugging Face](#9-ia--hugging-face)
10. [IA — Cloudflare Workers AI](#10-ia--cloudflare-workers-ai)
11. [IA — Replicate](#11-ia--replicate)
12. [IA — Groq](#12-ia--groq)
13. [Cache — Redis](#13-cache--redis)
14. [Archivos .env finales](#14-archivos-env-finales)

---

## 1. Preparación inicial

Crear los archivos de entorno en cada app a partir de los ejemplos incluidos en el repo:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Completar cada valor siguiendo los pasos de las secciones siguientes.

---

## 2. Base de datos — PostgreSQL

### Opción A: Local con Docker

```bash
docker run --name freepik-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=freepik_db \
  -p 5432:5432 \
  -d postgres:16
```

Variable resultante:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/freepik_db
```

### Opción B: Railway (remoto gratuito)

1. Ir a [railway.app](https://railway.app) → **New Project** → **Provision PostgreSQL**
2. En la pestaña **Connect**, copiar la **Connection URL**
3. Pegar en `DATABASE_URL`

---

## 3. Autenticación — JWT

Generar un secret seguro desde la terminal:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copiar el resultado:

```env
JWT_SECRET=<resultado_del_comando>
JWT_EXPIRES_IN=7d
```

---

## 4. OAuth — Google

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear un proyecto nuevo o seleccionar uno existente
3. Ir a **APIs & Services** → **Credentials**
4. Clic en **Create Credentials** → **OAuth client ID**
5. Seleccionar tipo: **Web application**
6. En **Authorized redirect URIs** agregar:
   - `http://localhost:3001/auth/google/callback` (API)
   - `http://localhost:3000/api/auth/callback/google` (Frontend NextAuth)
7. Clic en **Create** → copiar **Client ID** y **Client Secret**

```env
# apps/api/.env y apps/web/.env.local
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
```

---

## 5. OAuth — GitHub

1. Ir a [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Clic en **OAuth Apps** → **New OAuth App**
3. Completar:
   - **Application name**: `Freepik Local`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3001/auth/github/callback`
4. Clic en **Register application**
5. Copiar **Client ID**
6. Clic en **Generate a new client secret** → copiar el valor

```env
# apps/api/.env y apps/web/.env.local
GITHUB_CLIENT_ID=Ov23liXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Nota:** Para NextAuth en el frontend, crear una segunda OAuth App apuntando a
> `http://localhost:3000/api/auth/callback/github`

---

## 6. NextAuth.js

Generar un secret seguro:

```bash
openssl rand -base64 32
```

Copiar el resultado:

```env
# apps/web/.env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<resultado_del_comando>
```

---

## 7. Almacenamiento — Cloudflare R2

1. Ir a [Cloudflare Dashboard](https://dash.cloudflare.com) → **R2 Object Storage**
2. Clic en **Create bucket** → nombre: `freepik-resources` → **Create**
3. Ir a **Manage R2 API Tokens** → **Create API Token**
4. Seleccionar permisos: **Object Read & Write**
5. Copiar:
   - **Access Key ID**
   - **Secret Access Key**
   - **Endpoint**: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
6. Para la URL pública: en el bucket ir a **Settings** → **Public access** → habilitar y copiar el dominio

```env
# apps/api/.env
STORAGE_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
STORAGE_REGION=auto
STORAGE_ACCESS_KEY_ID=<access_key_id>
STORAGE_SECRET_ACCESS_KEY=<secret_access_key>
STORAGE_BUCKET_NAME=freepik-resources
STORAGE_PUBLIC_URL=https://pub-xxxx.r2.dev

# apps/web/.env.local
NEXT_PUBLIC_STORAGE_URL=https://pub-xxxx.r2.dev
```

---

## 8. Pagos — Mercado Pago

1. Ir a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
2. Crear una cuenta o iniciar sesión
3. Ir a **Mis aplicaciones** → **Crear aplicación**
   - Nombre: `Freepik`
   - Modelo de integración: **Pagos online**
4. En **Credenciales de prueba**:
   - Copiar **Public Key** y **Access Token**
5. Para Webhook:
   - Ir a **Webhooks** → **Configurar**
   - URL: `http://localhost:3001/payments/webhook` (usar [ngrok](https://ngrok.com) en dev)
   - Copiar la **firma secreta**

```env
# apps/api/.env
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxx
MERCADOPAGO_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx
MERCADOPAGO_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx

# apps/web/.env.local
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx
```

> **Producción:** Usar las credenciales de **Producción** en lugar de las de prueba.

---

## 9. IA — Hugging Face

> Recomendado para **desarrollo local** por ser gratuito.

1. Crear cuenta en [huggingface.co](https://huggingface.co)
2. Ir a **Settings** → **Access Tokens** → **New token**
3. Tipo: **Read** → Copiar el token

```env
# apps/api/.env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxx
```

---

## 10. IA — Cloudflare Workers AI

> Usar en **MVP de producción**. Free tier: 10,000 neuronas/día.

1. Ir al [Cloudflare Dashboard](https://dash.cloudflare.com)
2. En la barra lateral: **AI** → **Workers AI**
3. Copiar el **Account ID** (visible en el sidebar derecho del dashboard)
4. Ir a **My Profile** → **API Tokens** → **Create Token**
5. Usar template **Workers AI** o crear uno con permiso `Workers AI:Read`
6. Copiar el token generado

```env
# apps/api/.env
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_AI_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# apps/web/.env.local
NEXT_PUBLIC_CF_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 11. IA — Replicate

> Usar en **escala/producción**. Pay-per-use.

1. Crear cuenta en [replicate.com](https://replicate.com)
2. Ir a **Account Settings** → **API Tokens**
3. Clic en **Create API Token** → copiar el resultado

```env
# apps/api/.env
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 12. IA — Groq

> Para LLMs (tags, descripciones, prompts). **Free tier muy generoso.**

1. Crear cuenta en [console.groq.com](https://console.groq.com)
2. Ir a **API Keys** → **Create API Key**
3. Copiar la clave generada

```env
# apps/api/.env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 13. Cache — Redis

### Opción A: Local con Docker

```bash
docker run --name freepik-redis \
  -p 6379:6379 \
  -d redis:7-alpine
```

```env
# apps/api/.env
REDIS_URL=redis://localhost:6379
```

### Opción B: Upstash (remoto gratuito)

1. Ir a [upstash.com](https://upstash.com) → **Create Database**
2. Nombre: `freepik-cache` → Región: más cercana
3. En **REST API** → copiar la **Redis URL**

```env
# apps/api/.env
REDIS_URL=rediss://default:xxxx@xxxx.upstash.io:6379
```

---

## 14. Archivos .env finales

Una vez obtenidos todos los valores, los archivos completos deben quedar así:

### `apps/api/.env`

```env
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001

DATABASE_URL=postgresql://user:password@localhost:5432/freepik_db

JWT_SECRET=<generado_en_paso_3>
JWT_EXPIRES_IN=7d

GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

GITHUB_CLIENT_ID=Ov23liXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_CALLBACK_URL=http://localhost:3001/auth/github/callback

STORAGE_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
STORAGE_REGION=auto
STORAGE_ACCESS_KEY_ID=<access_key_id>
STORAGE_SECRET_ACCESS_KEY=<secret_access_key>
STORAGE_BUCKET_NAME=freepik-resources
STORAGE_PUBLIC_URL=https://pub-xxxx.r2.dev

MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxx
MERCADOPAGO_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx
MERCADOPAGO_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx

HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_AI_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

REDIS_URL=redis://localhost:6379

CORS_ORIGINS=http://localhost:3000
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generado_en_paso_6>

GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx

GITHUB_CLIENT_ID=Ov23liXXXXXXXXXXXXXX
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx

NEXT_PUBLIC_STORAGE_URL=https://pub-xxxx.r2.dev

NEXT_PUBLIC_CF_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

NEXT_PUBLIC_ANALYTICS_ID=
```

---

## Consejos de seguridad

- Nunca subas archivos `.env` o `.env.local` al repositorio
- Verifica que `.env*` esté en el `.gitignore` del root
- En producción, configura todas las variables como **GitHub Actions Secrets** o en el panel de Railway/Render
- Rota los tokens periódicamente, especialmente los de producción
- Usa credenciales de **prueba** de Mercado Pago en desarrollo y **producción** al hacer deploy real
