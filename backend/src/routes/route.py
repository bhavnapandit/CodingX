from fastapi import APIRouter, HTTPException
from src.database.mongoDB import collection
from src.model.model import Language
from src.model.schema import all_individual_data
from bson import ObjectId
import logging

logging.basicConfig(level=logging.INFO, force=True)
router = APIRouter()


@router.post("/")
async def add_lang(new_lang: Language):
    try:
        lang_dict = new_lang.dict()
        language_name = lang_dict["language"].lower()
        print(language_name)
        questions = lang_dict["questions"]

        # Check if language already exists
        existing = collection.find_one({"language": language_name})
        
        if existing:
            # Add each question to the existing language document
            collection.update_one(
                {"language": language_name},
                {"$push": {"questions": {"$each": questions}}}
            )
            return {"message": f"Added {len(questions)} question(s) to existing language '{language_name}'"}
        else:
            # Insert a new language document
            res = collection.insert_one(lang_dict)
            return {"message": "New language created and question(s) added", "id": str(res.inserted_id)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.get("/")
async def get_all_lang():
    try:
        # PyMongo's `find()` returns a cursor, so you need to iterate
        data_cursor = collection.find()
        data = []
        for doc in data_cursor:
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            data.append(doc)
        return {"languages": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {type(e).__name__} - {e}")


@router.get("/{language}")
async def get_questions_by_lang(language):
    try:
        data = collection.find({"language": language})
        print(f"Found {data.count()} documents for language '{language}'")
        questions = []
        for question in data:
            question["_id"] = str(question["_id"])
            questions.append(question)
        return {"questions": questions}
    except Exception as e:
        print(f"Exception: {e}")
        raise HTTPException(status_code=500, message=f"Error: {e}" )
