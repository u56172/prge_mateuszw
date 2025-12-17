from fastapi import FastAPI
from app.routers.fastapi import endpoint
app = FastAPI(title="Mapbook API")

app.include_router(endpoint.router, prefix="/app")