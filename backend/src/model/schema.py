from src.model.model import Question

def individual_question(question: Question):
    return {
        "question": question.question,
        "option": question.option,
        "correctAnswer": question.correctAnswer,
        "explanation": question.explanation,
        "difficulty": question.difficulty,
        "topic": question.topic,
    }

def all_individual_data(language_doc):
    return {
        "language": language_doc["language"],
        "questions": [individual_question(Question(**q)) for q in language_doc["questions"]]
    }
    
def all_users(user):
    return{
        "user": {
            "name": user["name"],
            "role": user["role"],
            "email": user["email"],
            "password": user["password"],
            "score": user["score"],
            "question_solved": user["question_solved"],
            "streak": user["streak"],
        }
    }

