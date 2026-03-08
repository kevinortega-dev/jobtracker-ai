from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database import get_db
from app.models import Application, User
from app.routers import get_current_user
from app.services.ai_service import analyze_cv_match
import traceback

router = APIRouter(prefix="/ai", tags=["AI Analysis"])

class AnalyzeRequest(BaseModel):
    cv_text: str
    application_id: int

class AnalyzeResponse(BaseModel):
    score: int
    summary: str
    strengths: list[str]
    improvements: list[str]
    keywords_found: list[str]
    keywords_missing: list[str]

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_application(
    request: AnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    application = db.query(Application).filter(
        Application.id == request.application_id,
        Application.user_id == current_user.id
    ).first()

    if not application:
        raise HTTPException(status_code=404, detail="Postulación no encontrada")

    if not application.job_description:
        raise HTTPException(
            status_code=400,
            detail="La postulación no tiene descripción del trabajo. Agrégala primero."
        )

    try:
        result = analyze_cv_match(request.cv_text, application.job_description)
        return result
    except Exception as e:
        error_detail = traceback.format_exc()
        print(f"ERROR EN AI: {error_detail}")
        raise HTTPException(status_code=500, detail=f"Error al analizar: {str(e)}")