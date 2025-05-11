from http.server import BaseHTTPRequestHandler, HTTPServer

import http.server
import socketserver
import json
import face_recognition
import cv2
import numpy as np
from io import BytesIO
from PIL import Image
from urllib.parse import parse_qs
import base64           # Should succeed if dlib is installed
# import face_recognition   # Should succeed after dlib is fixed
# import cv2               # Should already work
import os

# Directory to store registered users' data (file-based)
USER_DATA_DIR = "user_data"
if not os.path.exists(USER_DATA_DIR):
    os.makedirs(USER_DATA_DIR)

# Function to save face encoding to a file
def save_user_data(name, age, encoding):
    encoding_file = os.path.join(USER_DATA_DIR, f"{name}.txt")
    with open(encoding_file, 'w') as file:
        file.write(f"Name: {name}\nAge: {age}\nEncoding: {encoding.tolist()}")

# Function to load face encoding from a file
def load_user_data(name):
    encoding_file = os.path.join(USER_DATA_DIR, f"{name}.txt")
    if os.path.exists(encoding_file):
        with open(encoding_file, 'r') as file:
            data = file.read().splitlines()
            name = data[0].split(":")[1].strip()
            age = data[1].split(":")[1].strip()
            encoding = np.array(eval(data[2].split(":")[1].strip()))  # Converting string representation of list to a numpy array
            return {'name': name, 'age': age, 'encoding': encoding}
    return None

# Request Handler
class MyHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/register':
            content_type = self.headers.get('Content-Type')
            if content_type.startswith('multipart/form-data'):
                form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={'REQUEST_METHOD': 'POST',
                             'CONTENT_TYPE': content_type}
                )
                name = form.getvalue('name')
                age = form.getvalue('age')
                description = form.getvalue('description')
                image_field = form['image']

                # Save uploaded image (optional)
                if image_field.filename:
                    with open(f"uploads/{image_field.filename}", "wb") as f:
                        f.write(image_field.file.read())

                print("Received:", name, age, description)
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Person registered successfully")
            else:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b"Unsupported content type")
            # Extract image data and user info from the request
            fields = parse_qs(body.decode('utf-8'))
            image_data = fields.get('image')[0]
            name = fields.get('name')[0]
            age = fields.get('age')[0]

# Debug prints
            print("\n--- REGISTER ENDPOINT ---")
            print(f"Name: {name}")
            print(f"Age: {age}")
            print(f"Image Data (first 100 chars): {image_data[:100]}...")


        elif self.path == '/recognize':
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)

            # Extract image data from the request
            fields = parse_qs(body.decode('utf-8'))
            image_data = fields.get('image')[0]

            # Decode the base64 image
            img_data = base64.b64decode(image_data.split(',')[1])
            img = Image.open(BytesIO(img_data))
            img = np.array(img)
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img_encoding = face_recognition.face_encodings(img_rgb)

            # If face encoding is found
            if img_encoding:
                matches = []

                # Compare with each registered user
                for user_file in os.listdir(USER_DATA_DIR):
                    if user_file.endswith(".txt"):
                        name = user_file.split(".txt")[0]
                        user_data = load_user_data(name)
                        if user_data:
                            # Compare faces
                            match = face_recognition.compare_faces([user_data['encoding']], img_encoding[0])
                            if match[0]:
                                matches.append(user_data)

                # If a match is found, return the user details
                if matches:
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    recognized_info = [{"name": user['name'], "age": user['age']} for user in matches]
                    self.wfile.write(json.dumps(recognized_info).encode())
                else:
                    # No match found
                    self.send_response(404)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(json.dumps({"message": "No match found"}).encode())
            else:
                # No face detected
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"message": "No face detected"}).encode())
            # Extract image data from the request
        fields = parse_qs(body.decode('utf-8'))
        image_data = fields.get('image')[0]

# Debug prints
        print("\n--- RECOGNIZE ENDPOINT ---")
        print(f"Image Data (first 100 chars): {image_data[:100]}...")

                

# Start server
PORT = 8000
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
