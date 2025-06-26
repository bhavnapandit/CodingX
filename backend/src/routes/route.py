import logging
from bson import ObjectId
from fastapi import APIRouter, HTTPException
from src.database.mongoDB import collection, user_collection
from src.model.model import Language, User
from src.model.schema import all_individual_data

logging.basicConfig(level=logging.INFO, force=True)
router = APIRouter()


@router.post("/user/signup", status_code=201)
async def signup(user: User):
    try:
        existing_user = user_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="User already exists!!")
        if "@" not in user.email:
            raise HTTPException(status_code=400, detail="Enter valid email id!!")
        new_user = user_collection.insert_one(user.model_dump())
        return {"message": f"Signup successful! {new_user}"}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.post("/user/login", status_code=200)
async def login(user: User):
    try:
        test_user = user_collection.find_one({"email": user.email})
        if test_user is None:
            raise HTTPException(
                status_code=404, detail="User not found! Signup first to login!"
            )
        if user.password == test_user["password"]:
            return {"message": f"Login successful! {user}"}
        else:
            raise HTTPException(status_code=400, detail="Enter correct password!!")
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.get("/users", status_code=200)
async def get_all_user():
    try:
        data = user_collection.find({})
        # logging.info(data)
        users = []
        for user in data:
            user["_id"] = str(user["_id"])
            users.append(user)
        if not users:
            raise HTTPException(status_code=404, detail="No users found!")
        return {"users": users}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")

@router.get("/user/score/{email}")
async def get_user_score(email:str):
    try:
        user=user_collection.find_one({"email":email})
        if not user:
            raise HTTPException(status_code=400, detail="User not found!")
        score=user["score"]
        if score is None or score < 0:
            raise HTTPException(status_code=400,detail=f"score is {score}")
        return {"score":score}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")

@router.get("/user/questions/{email}")
async def get_questions_attempted(email:str):
    try:
        user=user_collection.find_one({"email":email})
        if not user:
            raise HTTPException(status_code=400, detail="User not found!")
        questions=user["question_solved"]
        if questions is None or questions < 0:
            raise HTTPException(status_code=400,detail=f"score is {questions}")
        return {"questions_attempted":questions}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.post("/")
async def add_lang(new_lang: Language):
    try:
        lang_dict = new_lang.dict()
        language_name = lang_dict["language"].lower()
        questions = lang_dict["questions"]

        if language_name is None or questions is None:
            raise HTTPException(
                status_code=400, detail="Language name and questions are required"
            )

        # Check if language already exists
        existing = collection.find_one({"language": language_name})

        if existing:
            # Add each question to the existing language document
            collection.update_one(
                {"language": language_name},
                {"$push": {"questions": {"$each": questions}}},
            )
            return {
                "message": f"Added {len(questions)} question(s) to existing language '{language_name}'"
            }
        else:
            # Insert a new language document
            res = collection.insert_one(lang_dict)
            return {
                "message": "New language created and question(s) added",
                "id": str(res.inserted_id),
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.get("/")
async def get_all_lang():
    try:
        # PyMongo's `find()` returns a cursor, so you need to iterate
        languages = collection.find()
        data = []
        for doc in languages:
            doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
            data.append(doc)
        return {"languages": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {type(e).__name__} - {e}")


@router.get("/{language}")
async def get_questions_by_lang(language: str):
    try:
        data = collection.find({"language": language})
        # logging.info(
        #     f"Found {data.count_documents()} documents for language '{language}'"
        # )
        questions = []
        for question in data:
            question["_id"] = str(question["_id"])
            questions.append(question)
        return {"questions": questions}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.delete("/delete/{id}")
async def delete_lang(id: str):
    try:
        result = collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 1:
            return {"message": "Delete successful!"}
        else:
            raise HTTPException(status_code=404, detail="Item not found")
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


@router.delete("/delete/{language}/{id}")
async def delete_question(language: str, id: int):
    try:
        lang = collection.find_one({"language": language})
        if lang is None:
            raise HTTPException(status_code=404, detail="Language not found")

        questions = lang["questions"]
        questions = [q for q in questions if q["id"] != id]

        collection.update_one(
            {"language": language}, {"$set": {"questions": questions}}
        )

        return {"message": "Delete successful!"}
    except Exception as e:
        logging.info(f"Exception: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {e}")


# @router.update("/update//{language}/{id}")
# async def update_question():
#     pass
