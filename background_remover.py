"""
High-Quality Background Remover
Uses AI models to remove background while preserving image quality
Supports multiple input formats and batch processing
"""

import os
import sys
import io
from PIL import Image
import numpy as np
from rembg import remove, new_session
import cv2
from pathlib import Path
import argparse

class BackgroundRemover:
    def __init__(self, model='u2net'):
        """
        Initialize the background remover with specified model
        
        Available models:
        - u2net: General purpose (default)
        - u2net_human_seg: Better for humans
        - isnet-general-use: High quality general use
        - silueta: Good for objects
        """
        self.session = new_session(model)
        self.supported_formats = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp'}
    
    def remove_background(self, input_path, output_path=None, enhance_quality=True):
        """
        Remove background from a single image
        
        Args:
            input_path (str): Path to input image
            output_path (str): Path for output image (optional)
            enhance_quality (bool): Apply quality enhancement techniques
        
        Returns:
            str: Path to the output image
        """
        try:
            # Validate input
            if not os.path.exists(input_path):
                raise FileNotFoundError(f"Input file not found: {input_path}")
            
            # Check file format
            file_ext = Path(input_path).suffix.lower()
            if file_ext not in self.supported_formats:
                raise ValueError(f"Unsupported format: {file_ext}")
            
            # Generate output path if not provided
            if output_path is None:
                input_stem = Path(input_path).stem
                output_path = f"{input_stem}_no_bg.png"
            
            # Read and preprocess image
            with open(input_path, 'rb') as input_file:
                input_data = input_file.read()
            
            # Apply quality enhancement if requested
            if enhance_quality:
                input_data = self._enhance_input_quality(input_data)
            
            # Remove background using AI model
            output_data = remove(input_data, session=self.session)
            
            # Post-process for quality improvement
            if enhance_quality:
                output_data = self._enhance_output_quality(output_data)
            
            # Save the result
            with open(output_path, 'wb') as output_file:
                output_file.write(output_data)
            
            print(f"✅ Background removed successfully!")
            print(f"📁 Input: {input_path}")
            print(f"💾 Output: {output_path}")
            
            return output_path
            
        except Exception as e:
            print(f"❌ Error processing {input_path}: {str(e)}")
            return None
    
    def _enhance_input_quality(self, image_data):
        """Apply input enhancement techniques"""
        try:
            # Convert to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Apply sharpening filter for better edge detection
            from PIL import ImageFilter, ImageEnhance
            
            # Enhance contrast slightly
            enhancer = ImageEnhance.Contrast(image)
            image = enhancer.enhance(1.1)
            
            # Apply subtle sharpening
            image = image.filter(ImageFilter.UnsharpMask(radius=1, percent=150, threshold=3))
            
            # Convert back to bytes
            import io
            output_buffer = io.BytesIO()
            image.save(output_buffer, format='PNG', quality=95)
            return output_buffer.getvalue()
            
        except Exception:
            # Return original if enhancement fails
            return image_data
    
    def _enhance_output_quality(self, image_data):
        """Apply output enhancement techniques"""
        try:
            import io
            
            # Convert to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Apply anti-aliasing to smooth edges
            if image.mode == 'RGBA':
                # Smooth alpha channel edges
                alpha = np.array(image.split()[-1])
                
                # Apply Gaussian blur to alpha channel for smoother edges
                alpha_smooth = cv2.GaussianBlur(alpha, (3, 3), 0.5)
                
                # Reconstruct image with smoothed alpha
                rgb = image.convert('RGB')
                image = Image.merge('RGBA', (*rgb.split(), Image.fromarray(alpha_smooth)))
            
            # Convert back to bytes with high quality
            output_buffer = io.BytesIO()
            image.save(output_buffer, format='PNG', optimize=True, quality=95)
            return output_buffer.getvalue()
            
        except Exception:
            # Return original if enhancement fails
            return image_data
    
    def batch_remove(self, input_folder, output_folder=None, enhance_quality=True):
        """
        Remove background from all images in a folder
        
        Args:
            input_folder (str): Path to folder containing images
            output_folder (str): Path to output folder (optional)
            enhance_quality (bool): Apply quality enhancement
        
        Returns:
            list: List of successfully processed files
        """
        if not os.path.exists(input_folder):
            raise FileNotFoundError(f"Input folder not found: {input_folder}")
        
        # Create output folder if not specified
        if output_folder is None:
            output_folder = os.path.join(input_folder, "no_background")
        
        os.makedirs(output_folder, exist_ok=True)
        
        # Find all image files
        image_files = []
        for file_path in Path(input_folder).iterdir():
            if file_path.suffix.lower() in self.supported_formats:
                image_files.append(file_path)
        
        if not image_files:
            print("❌ No supported image files found!")
            return []
        
        print(f"🔍 Found {len(image_files)} image(s) to process...")
        
        # Process each image
        processed_files = []
        for i, input_file in enumerate(image_files, 1):
            print(f"\n📸 Processing {i}/{len(image_files)}: {input_file.name}")
            
            output_file = os.path.join(output_folder, f"{input_file.stem}_no_bg.png")
            result = self.remove_background(str(input_file), output_file, enhance_quality)
            
            if result:
                processed_files.append(result)
        
        print(f"\n✅ Batch processing complete! {len(processed_files)}/{len(image_files)} files processed successfully.")
        return processed_files

def main():
    parser = argparse.ArgumentParser(description="High-Quality Background Remover")
    parser.add_argument("input", help="Input image file or folder path")
    parser.add_argument("-o", "--output", help="Output file or folder path")
    parser.add_argument("-m", "--model", default="u2net", 
                       choices=["u2net", "u2net_human_seg", "isnet-general-use", "silueta"],
                       help="AI model to use for background removal")
    parser.add_argument("--no-enhance", action="store_true", help="Disable quality enhancement")
    parser.add_argument("--batch", action="store_true", help="Process all images in folder")
    
    args = parser.parse_args()
    
    # Initialize background remover
    print(f"🚀 Initializing Background Remover with {args.model} model...")
    remover = BackgroundRemover(model=args.model)
    
    enhance_quality = not args.no_enhance
    
    try:
        if args.batch or os.path.isdir(args.input):
            # Batch processing
            remover.batch_remove(args.input, args.output, enhance_quality)
        else:
            # Single file processing
            remover.remove_background(args.input, args.output, enhance_quality)
    
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    # Example usage when run directly
    if len(sys.argv) == 1:
        print("🎯 High-Quality Background Remover")
        print("=" * 40)
        print("\nUsage examples:")
        print("python background_remover.py image.jpg")
        print("python background_remover.py image.jpg -o output.png")
        print("python background_remover.py folder/ --batch")
        print("python background_remover.py image.jpg -m u2net_human_seg")
        print("\nInstall dependencies: pip install rembg pillow opencv-python")
    else:
        main()