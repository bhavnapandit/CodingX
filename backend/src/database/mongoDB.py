
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bhavnapandit2001:bhavna401234@questions.nixkkwe.mongodb.net/"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db=client.languages
collection=db["lang_ques"]
#collection.insert_one({"hello": "world"})