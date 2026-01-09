from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from .routers import apps, general

app = FastAPI(title="Application Management API")
# execute the following command to run
# uvicorn backend.main:app --reload
app.include_router(general.router)
app.include_router(apps.router)

_BACKEND_DIR = Path(__file__).resolve().parent
_FRONTEND_DIR = _BACKEND_DIR.parent / "frontend"

app.mount("/static", StaticFiles(directory=str(_FRONTEND_DIR)), name="static")


@app.get("/")
def serve_ui():
    return FileResponse(str(_FRONTEND_DIR / "index.html"))
