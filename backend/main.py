from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.route import router as main_router  # ✅ Import router

app = FastAPI()

# ✅ Correct CORS middleware setup (before including routers)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://coding-x.vercel.app"],  # ✅ Frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include router
app.include_router(main_router)

