# 🚀 JobTracker AI

> Plataforma full stack con IA para gestionar y analizar postulaciones laborales

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://docker.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)

## 🌐 Demo en vivo
👉 **[https://produccion-positiva-de-corazones.up.railway.app](https://produccion-positiva-de-corazones.up.railway.app)**

## 📋 Descripción

JobTracker AI es una aplicación web full stack que permite a los usuarios gestionar sus postulaciones laborales y analizarlas con Inteligencia Artificial. La IA compara el CV del usuario contra la descripción del trabajo y genera un score de compatibilidad con sugerencias de mejora.

## ✨ Funcionalidades

- 🔐 **Autenticación** — Registro e inicio de sesión con JWT
- 📋 **CRUD de postulaciones** — Crear, editar, eliminar y filtrar postulaciones
- 📊 **Dashboard con métricas** — Stats de entrevistas, ofertas y rechazos
- 🤖 **Análisis con IA** — Score de compatibilidad CV vs oferta laboral con Gemini AI
- 🔍 **Búsqueda y filtros** — Por empresa, cargo y estado
- 📱 **Diseño responsive** — Funciona en móvil y escritorio

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy |
| Base de datos | PostgreSQL 15 |
| IA | Google Gemini AI API |
| Auth | JWT (JSON Web Tokens) |
| DevOps | Docker, Docker Compose |
| Deploy | Railway |

## 🏗️ Arquitectura
```
jobtracker-ai/
├── frontend/          # Next.js + React + TypeScript
│   ├── app/           # Páginas (App Router)
│   ├── components/    # Componentes reutilizables
│   └── lib/           # Servicios y utilidades
├── backend/           # FastAPI + Python
│   └── app/
│       ├── models/    # Modelos SQLAlchemy
│       ├── routers/   # Endpoints de la API
│       ├── schemas/   # Schemas Pydantic
│       └── services/  # Lógica de negocio e IA
└── docker-compose.yml # Configuración Docker
```

## 🚀 Instalación local

### Prerrequisitos
- Docker Desktop
- Node.js 18+
- Git

### Pasos

1. Clona el repositorio:
```bash
git clone https://github.com/DataKev-Code/jobtracker-ai.git
cd jobtracker-ai
```

2. Crea el archivo `.env` en `backend/`:
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/jobtracker
SECRET_KEY=tu_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=tu_gemini_api_key
```

3. Levanta el backend con Docker:
```bash
docker-compose up -d
```

4. Levanta el frontend:
```bash
cd frontend
npm install
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000)

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión |
| GET | `/applications/` | Listar postulaciones |
| POST | `/applications/` | Crear postulación |
| PUT | `/applications/{id}` | Actualizar postulación |
| DELETE | `/applications/{id}` | Eliminar postulación |
| POST | `/ai/analyze` | Analizar CV con IA |

## 👨‍💻 Autor

**Kevin Ortega** — Ingeniero en Informática  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kevin_Ortega-0077B5?logo=linkedin)](https://linkedin.com/in/kevin-ortega-355379225)
[![GitHub](https://img.shields.io/badge/GitHub-DataKev--Code-181717?logo=github)](https://github.com/DataKev-Code)