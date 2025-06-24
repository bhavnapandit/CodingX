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

