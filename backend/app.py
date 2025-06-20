# Import necessary libraries
import os
import io
import base64
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image, ImageEnhance
import numpy as np

# Flask for web server
from flask import Flask, request, jsonify
from flask_cors import CORS


class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(channels, channels, 3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(channels, channels, 3, padding=1)
        )
    def forward(self, x):
        return x + self.block(x)

class CNNEncoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 128, 3, stride=2, padding=1),
            nn.ReLU(),
            ResidualBlock(128),
            ResidualBlock(128)
        )
    def forward(self, x):
        return self.encoder(x)

class TransformerBlock(nn.Module):
    def __init__(self, channels, heads=4, layers=2):
        super().__init__()
        self.transformer = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model=channels, nhead=heads, dim_feedforward=channels*4, batch_first=True),
            num_layers=layers
        )
    def forward(self, x):
        b, c, h, w = x.shape
        x = x.view(b, c, -1).permute(0, 2, 1) 
        x = self.transformer(x) 
        x = x.permute(0, 2, 1).view(b, c, h, w)
        return x

class CNNDecoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 4, stride=2, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 32, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 3, 3, padding=1),
            nn.Tanh()
        )
    def forward(self, x):
        return self.decoder(x)

class ColorizationModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = CNNEncoder()
        self.downsample = nn.Sequential(
            nn.Conv2d(128, 128, 3, stride=2, padding=1),
            nn.ReLU()
        )
        self.transformer = TransformerBlock(128, heads=4, layers=2)
        self.upsample = nn.Sequential(
            nn.ConvTranspose2d(128, 128, 4, stride=2, padding=1),
            nn.ReLU()
        )
        self.decoder = CNNDecoder()

    def forward(self, x):
        x = self.encoder(x)
        x = self.downsample(x)
        x = self.transformer(x)
        x = self.upsample(x)
        return self.decoder(x)


app = Flask(__name__)
CORS(app)

IMAGE_SIZE = 128 
APPLY_SHARPNESS_ENHANCEMENT = True 
SHARPNESS_FACTOR = 1.5 
MODEL_PATH = 'best_colorization_model.pth' 

model = ColorizationModel()
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print(f"Attempting to load model from: {MODEL_PATH}")

try:
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
    model.to(device)
    model.eval()
    print(f"Model loaded successfully from {MODEL_PATH} on {device}!")
except FileNotFoundError:
    print(f"Error: Model file not found at {MODEL_PATH}. Please ensure the model is in the same directory as this script.")
    exit()
except Exception as e:
    print(f"Error loading model: {e}")
    exit()


preprocess = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

@app.route('/colorize', methods=['POST'])
def colorize_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            img_bytes = file.read()
            img = Image.open(io.BytesIO(img_bytes)).convert('RGB')


            original_width, original_height = img.size
            print(f"Original image dimensions: {original_width}x{original_height}")

            gray_img = img.convert('L')
            gray_img_rgb = gray_img.convert('RGB') # This repeats the L channel 3 times

            # Preprocess the image
            input_tensor = preprocess(gray_img_rgb).unsqueeze(0).to(device) # Add batch dimension and move to device

            # Perform inference
            with torch.no_grad(): # Disable gradient calculation for inference
                output_tensor = model(input_tensor)

            output_tensor = (output_tensor * 0.5) + 0.5
            output_tensor = output_tensor.squeeze(0).cpu()
            output_image = transforms.ToPILImage()(output_tensor)


            output_image = output_image.resize((original_width, original_height), Image.LANCZOS)
            print(f"Resized output to original dimensions: {output_image.size[0]}x{output_image.size[1]}")

            if APPLY_SHARPNESS_ENHANCEMENT:
                enhancer = ImageEnhance.Sharpness(output_image)
                output_image = enhancer.enhance(SHARPNESS_FACTOR)
                print(f"Applied sharpness enhancement with factor: {SHARPNESS_FACTOR}")

            buffered = io.BytesIO()
            output_image.save(buffered, format="PNG")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

            return jsonify({'colorized_image': img_str})

        except Exception as e:
            print(f"Error during colorization: {e}")
            return jsonify({'error': f'An error occurred during processing: {str(e)}'}), 500

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)
# backend trigger
