from openai import OpenAI
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=False,
  allow_methods=["*"],
  allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
  message: str

@app.post("/api/chat")
async def chat(req: ChatRequest):
  response = client.responses.create(
<<<<<<< HEAD
    model="gpt-5.5",
=======
    model="gpt-4o-mini",
>>>>>>> 38df43abd3030a483738ef32c075cedb6d5bac34
    input=req.message,
    store=True,
  )
  return { "response": response.output_text }