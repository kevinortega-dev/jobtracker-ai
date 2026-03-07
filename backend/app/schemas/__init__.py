from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# --- Schemas de Usuario ---

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# --- Schema de Token ---

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# --- Schemas de Postulación ---

class ApplicationCreate(BaseModel):
    company: str
    position: str
    status: Optional[str] = "applied"
    job_description: Optional[str] = None
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    company: Optional[str] = None
    position: Optional[str] = None
    status: Optional[str] = None
    job_description: Optional[str] = None
    notes: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: int
    company: str
    position: str
    status: str
    job_description: Optional[str] = None
    notes: Optional[str] = None
    applied_date: datetime
    updated_at: Optional[datetime] = None
    user_id: int

    class Config:
        from_attributes = True