from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: int
    question: str
    option: List[str]
    correctAnswer: int
    explanation: str
    difficulty: str
    topic: str

class Language(BaseModel):
    language: str
    questions: List[Question]

    
class User(BaseModel):
    name:str
    role:str
    email:str
    password:str
    score:int

