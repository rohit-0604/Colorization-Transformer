# Colorization Transformer - Colorize Greyscale Images

This project implements a hybrid CNN-Transformer model for the task of colorizing greyscale images. The goal is to take a black and white image and predict its original colors, bringing it to life.

## Live Demo (Frontend)

Experience the Colorization Transformer in action! You can access the frontend application here:

**[Frontend Live Demo Link Here](https://colorizegreyscaleimages.netlify.app/)**


## Backend Status & Important Disclaimer

While the backend for this project has been deployed, you might encounter issues with its functionality, specifically related to the image colorization process.

**Disclaimer:** The current backend deployment faces **out-of-memory (OOM) issues** when attempting to run the trained Colorization Transformer model. This model, being a hybrid CNN-Transformer architecture, is computationally intensive and requires significant memory resources, especially during inference with larger images. The current hosting environment's memory allocation is insufficient to handle the model's demands, leading to crashes.

We are actively exploring solutions for more robust deployment environments or optimizations to the model for reduced memory footprint to ensure stable backend operation in the future.

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
