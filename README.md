# Colorization Transformer - Colorize Greyscale Images

This project implements a hybrid CNN-Transformer model for the task of colorizing greyscale images. The goal is to take a black and white image and predict suitable visually attractive colors, bringing it to life. **Due to existing resource constraints, a less computationally intensive version of the model was implemented, offering a large scope for future improvements, including more advanced preprocessing techniques and further enhancements to the model's architecture and capabilities.**

## Live Demo (Frontend)

Experience the Colorization Transformer in action! You can access the frontend application here:

**[Frontend Live Demo Link Here](https://colorizegreyscaleimages.netlify.app/)**

## Backend Status & Important Disclaimer

While the backend for this project has been deployed, you might encounter issues with its functionality, specifically related to the image colorization process.

**Disclaimer:** The current backend deployment faces **out-of-memory (OOM) issues** when attempting to run the trained Colorization Transformer model, hence suspended the backend. This model, being a hybrid CNN-Transformer architecture, is computationally intensive and requires significant memory resources, especially during inference with larger images. The current hosting environment's memory allocation is insufficient to handle the model's demands, leading to crashes.

We are actively exploring solutions for more robust deployment environments or optimizations to the model for reduced memory footprint to ensure stable backend operation in the future.

## RESULTS
<img width="1263" height="899" alt="Screenshot 2025-06-05 113926" src="https://github.com/user-attachments/assets/38d5dd8f-52cf-4c04-90b9-4a3c9bad6386" />
<img width="1266" height="911" alt="Screenshot 2025-06-05 114849" src="https://github.com/user-attachments/assets/ea4a16f8-87d1-4143-8cfd-c008aacb52d7" />
<img width="1282" height="913" alt="Screenshot 2025-06-05 114915" src="https://github.com/user-attachments/assets/f3fc8b4f-b519-461c-8fb7-b7289578b607" />
<img width="1300" height="909" alt="Screenshot 2025-06-05 114946" src="https://github.com/user-attachments/assets/51ee3da0-6afe-40b2-97a7-ae2c21dad0f1" />


## Model & Training Details

The core of this project is a sophisticated **hybrid CNN-Transformer model** designed for high-quality image colorization.

* **Architecture:** The model combines the strengths of Convolutional Neural Networks (CNNs) for feature extraction and Transformers for capturing long-range dependencies and global context within images.

* **Training Data:** The model was extensively trained on a dataset of **7000 landscape images**. This dataset specifically consists of:

    * Original color landscape images, located in a dedicated folder (e.g., `images/color/`).

    * Their corresponding greyscale versions, located in a separate dedicated folder (e.g., `images/greyscale/`).
        This organization allowed the model to learn the intricate mapping from luminance (greyscale) to chrominance (color) information by processing these separately loaded inputs.

## Repository Contents

This repository contains the essential components of the Colorization Transformer project:

* **`backend/` folder:** Contains the server-side code for the colorization API, built with **Flask** (Python).

* **`frontend/` folder:** Contains the client-side application code, built with ReactJS and Tailwind CSS, providing the user interface for image upload and display.

* **`images/` folder:** This directory contains the dataset of 7000 landscape images used for training the model. It is structured with separate subfolders for color and greyscale images (e.g., `images/color/` and `images/greyscale/`).

* **Trained Model:** The trained model file (`best_colorization_model.pth`) is included in the repository, allowing for direct use or further experimentation.

* **`Colorization.ipynb`:** This Jupyter notebook contains the full model definition and the training code used to train the `best_colorization_model.pth`.

## Configuration

Before running the training code or using the model, please note the following configuration requirements:

* **Environment Variable (`IMAGE_SIZE_ENV`):** The `IMAGE_SIZE_ENV` environment variable is required, particularly for the `app.py` file in the backend, to specify the expected image size for the model. Ensure this is set in your environment before running the backend or inference scripts.

* **Jupyter Notebook Paths:** In the `Colorization.ipynb` file, you will need to **replace the placeholder paths** with the correct folder paths for your greyscale and color image datasets. Look for sections related to data loading and adjust the paths to point to your `images/greyscale/` and `images/color/` directories respectively.
