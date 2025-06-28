from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes.route import router as main_router

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://coding-x.vercel.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Explicitly include OPTIONS
    allow_headers=["*"],
    expose_headers=["*"]
)


@app.get("/")
def root():
    return {"message": "API is working!"}

# ✅ Include router
app.include_router(main_router)

