from fastapi import FastAPI
from src.routes.route import router as main_router  # ✅ Import router

app = FastAPI()

app.include_router(main_router)

