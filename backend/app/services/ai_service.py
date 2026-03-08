import os
import json
import urllib.request
import urllib.error

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def analyze_cv_match(cv_text: str, job_description: str) -> dict:
    prompt = f"""
    Eres un experto en recursos humanos y reclutamiento tecnológico.
    
    Analiza la compatibilidad entre este CV y la descripción del trabajo.
    
    CV DEL CANDIDATO:
    {cv_text}
    
    DESCRIPCIÓN DEL TRABAJO:
    {job_description}
    
    Responde ÚNICAMENTE con un JSON válido con esta estructura exacta:
    {{
        "score": <número del 0 al 100>,
        "summary": "<resumen breve de 2 líneas sobre la compatibilidad>",
        "strengths": ["<fortaleza 1>", "<fortaleza 2>", "<fortaleza 3>"],
        "improvements": ["<mejora 1>", "<mejora 2>", "<mejora 3>"],
        "keywords_found": ["<keyword 1>", "<keyword 2>", "<keyword 3>"],
        "keywords_missing": ["<keyword 1>", "<keyword 2>", "<keyword 3>"]
    }}
    
    No incluyas texto adicional, solo el JSON.
    """

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key={GEMINI_API_KEY}"
    
    data = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}]
    }).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode("utf-8"))
    
    text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
    
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    
    return json.loads(text.strip())