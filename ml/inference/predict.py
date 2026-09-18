"""
KISANIQ ML Subsystem — Standalone Inference Helper
"""
import sys
import os

def run_standalone_inference(image_path: str):
    print(f"Running standalone inference on {image_path}...")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        run_standalone_inference(sys.argv[1])
    else:
        print("Usage: python predict.py <path_to_leaf_image>")
