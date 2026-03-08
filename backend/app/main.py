from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import router as auth_router
from app.routers.applications import router as applications_router
from app.routers.ai import router as ai_router
import time
import sqlalchemy

def wait_for_db():
    max_retries = 10
    retry_interval = 3
    for attempt in range(max_retries):
        try:
            with engine.connect() as conn:
                print("✅ Conexión a base de datos exitosa!")
                return
        except sqlalchemy.exc.OperationalError:
            print(f"⏳ Esperando base de datos... intento {attempt + 1}/{max_retries}")
            time.sleep(retry_interval)
    raise Exception("❌ No se pudo conectar a la base de datos")

wait_for_db()

# Crear tablas automáticamente
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="JobTracker AI",
    description="API para seguimiento de postulaciones laborales con IA",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(auth_router)
app.include_router(applications_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {"message": "JobTracker AI API funcionando! 🚀"}

@app.get("/health")
def health_check():
    return {"status": "ok"}