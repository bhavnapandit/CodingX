from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

load_dotenv()

import os

MONGO_URI = os.getenv("MONGO_URI")
print("MONGO_URI:", MONGO_URI)


# Create a new client and connect to the server
client = MongoClient(MONGO_URI, server_api=ServerApi("1"))

db = client.languages
collection = db["lang_ques"]
user_collection = db["users"]
# collection.insert_one({"hello": "world"})
# user_collection.insert_one({"name":"bhavna"})
