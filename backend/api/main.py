from mangum import Mangum
import sys
import os

# Add 'server' to path so we can import server/main.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../server")))

from main import app  # server/main.py

handler = Mangum(app)
