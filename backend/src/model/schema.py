from pydantic import BaseModel
from typing import (
    List,
    Dict,
    Optional,
)  # importing List for list type , Dict for dictionary type and Optional for optional value


class Question(BaseModel):
    id: int
    question: str
    option: List
    correctAnswer: int
    explanation: str
    difficulty: str
    topic: str


class Language(BaseModel):
    """
    Language model
    The root of the model is a dictionary with languages as keys and a list of questions as values
    """
    questions: Dict[str, List[Question]]
