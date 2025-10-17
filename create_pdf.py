#!/usr/bin/env python3
"""
Script to combine all PNG screenshots into a single PDF
Order: Q1 to Q8 (main images first, then numbered variations), then last_1 to last_4
"""

import os
from PIL import Image, ImageDraw, ImageFont

def create_cover_page(width=1920, height=1080):
    """Create a cover page with assignment information"""
    # Create a white background
    cover = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(cover)
    
    # Try to use a nice font, fall back to default if not available
    try:
        title_font = ImageFont.truetype("arial.ttf", 80)
        info_font = ImageFont.truetype("arial.ttf", 60)
    except:
        try:
            title_font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 80)
            info_font = ImageFont.truetype("C:\\Windows\\Fonts\\arial.ttf", 60)
        except:
            # Use default font
            title_font = ImageFont.load_default()
            info_font = ImageFont.load_default()
    
    # Define the information
    info_lines = [
        "",
        "Name : Pansuriya Jay L.",
        "Roll : 70",
        "Div : A",
        "Subject : Full Stack",
        "Assignment : 3",
        "M.Sc-IT : 7th Sem"
    ]
    
    # Draw a colored header rectangle
    header_color = (102, 126, 234)  # Purple blue color matching the project theme
    draw.rectangle([(0, 0), (width, 200)], fill=header_color)
    
    # Draw title in header
    title = "Assignment 3 - Screenshots"
    # Get text size for centering
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    draw.text((title_x, 60), title, fill='white', font=title_font)
    
    # Draw information in the center
    y_start = 300
    line_height = 70
    
    for i, line in enumerate(info_lines):
        # Get text size for centering
        text_bbox = draw.textbbox((0, 0), line, font=info_font)
        text_width = text_bbox[2] - text_bbox[0]
        text_x = (width - text_width) // 2
        
        # Draw the text
        draw.text((text_x, y_start + i * line_height), line, fill='black', font=info_font)
    
    # Draw a footer
    footer_y = height - 100
    footer_text = "Full Stack Development - Assignment 3"
    footer_bbox = draw.textbbox((0, 0), footer_text, font=info_font)
    footer_width = footer_bbox[2] - footer_bbox[0]
    footer_x = (width - footer_width) // 2
    draw.text((footer_x, footer_y), footer_text, fill=(100, 100, 100), font=info_font)
    
    return cover

def create_pdf_from_images():
    # Define the base directory
    base_dir = r"j:\B.SC-IT SEM-7\701 FS\pre\Assignment_3"
    
    # Define the order of images
    image_files = [
        "Q1_image.png",
        "Q2_image.png",
        "Q2_1_image.png",
        "Q2_2_image.png",
        "Q2_2.1_image.png",
        "Q3_image.png",
        "Q3_1_image.png",
        "Q4_image.png",
        "Q4_1_image.png",
        "Q5_image.png",
        "Q6_image.png",
        "Q6_1_image.png",
        "Q7_image.png",
        "Q7_1_image.png",
        "Q8_image.png",
        "Q8_1_image.png",
        "last_1.png",
        "last_2.png",
        "last_3.png",
        "last_4.png",
    ]
    
    # Create full paths
    image_paths = [os.path.join(base_dir, img) for img in image_files]
    
    # Filter out any missing files
    existing_images = []
    missing_images = []
    
    for img_path in image_paths:
        if os.path.exists(img_path):
            existing_images.append(img_path)
        else:
            missing_images.append(os.path.basename(img_path))
    
    if missing_images:
        print(f"Warning: The following images were not found:")
        for img in missing_images:
            print(f"  - {img}")
        print()
    
    if not existing_images:
        print("Error: No images found!")
        return
    
    print(f"Found {len(existing_images)} images")
    print("Creating cover page...")
    print("Converting images to PDF format...")
    
    # Create cover page as the first page
    cover_page = create_cover_page()
    print("  [OK] Created: Cover Page")
    
    # Open all images and convert to RGB (required for PDF)
    images = [cover_page]  # Start with cover page
    for img_path in existing_images:
        try:
            img = Image.open(img_path)
            # Convert to RGB if necessary (PNG might have alpha channel)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            images.append(img)
            print(f"  [OK] Loaded: {os.path.basename(img_path)}")
        except Exception as e:
            print(f"  [ERROR] Error loading {os.path.basename(img_path)}: {e}")
    
    if not images:
        print("Error: No images could be loaded!")
        return
    
    # Save as PDF
    output_path = os.path.join(base_dir, "Assignment_3_Screenshots.pdf")
    
    try:
        # Save the first image and append the rest
        images[0].save(
            output_path,
            save_all=True,
            append_images=images[1:],
            resolution=100.0,
            quality=95,
            optimize=False
        )
        
        print(f"\n[SUCCESS] PDF created: {output_path}")
        print(f"  Total pages: {len(images)} (1 cover page + {len(images) - 1} screenshots)")
        
        # Get file size
        file_size = os.path.getsize(output_path)
        file_size_mb = file_size / (1024 * 1024)
        print(f"  File size: {file_size_mb:.2f} MB")
        
    except Exception as e:
        print(f"\n[ERROR] Error creating PDF: {e}")
        return

if __name__ == "__main__":
    print("=" * 60)
    print("Creating PDF from PNG screenshots")
    print("=" * 60)
    print()
    
    create_pdf_from_images()
    
    print()
    print("=" * 60)
    print("Done!")
    print("=" * 60)
