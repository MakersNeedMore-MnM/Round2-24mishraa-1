# KIsanIQ Machine Learning Subsystem 🧠🌱

This directory contains the machine learning training pipelines, evaluation tools, and model definitions for **KIsanIQ**.

---

## 📁 Directory Structure

- **`models/`**: Stored model weights (`.pth` for PyTorch MobileNetV2, `.pkl` for Scikit-Learn Crop Recommender).
- **`training/`**: Training scripts for disease detection and crop recommendation.
- **`inference/`**: Standalone inference scripts and evaluation runners.
- **`preprocessing/`**: Dataset cleaning, image augmentation, and NPK feature engineering scripts.
- **`notebooks/`**: Exploratory data analysis (EDA) and model experimentation notebooks.

---

## 🔬 Models Overview

### 1. Plant Disease Classifier (`training/train_disease.py`)
- **Architecture**: PyTorch `MobileNetV2` fine-tuned on 25 PlantVillage classes (Tomato, Potato, Corn, Apple, Grape, etc.).
- **Input**: `224x224 RGB Image`
- **Output**: Top 3 class predictions with Softmax confidence scores.
- **Runtime Inference**: Integrated directly into `backend/app/ml/disease_model.py`.

### 2. Crop Recommender (`training/train_recommendation.py`)
- **Model**: `RandomForestClassifier` trained on Soil NPK (Nitrogen, Phosphorus, Potassium), pH, temperature, humidity, and rainfall features.
- **Output**: Ranked crop recommendations tailored for local soil and weather conditions.
