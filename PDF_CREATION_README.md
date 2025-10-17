# 📄 PDF Creation Guide

## Overview
This script combines all PNG screenshot images into a single PDF file for easy submission.

## Files Created
- `create_pdf.py` - Python script to create the PDF
- `CREATE_PDF.bat` - Windows batch file to run the script
- `Assignment_3_Screenshots.pdf` - Output PDF file (created after running)

## Image Order in PDF
The images will be included in this order:

### Question-wise Screenshots (Q1 to Q8)
1. Q1_image.png
2. Q2_image.png
3. Q2_1_image.png
4. Q2_2_image.png
5. Q2_2.1_image.png
6. Q3_image.png
7. Q3_1_image.png
8. Q4_image.png
9. Q4_1_image.png
10. Q5_image.png
11. Q6_image.png
12. Q6_1_image.png
13. Q7_image.png
14. Q7_1_image.png
15. Q8_image.png
16. Q8_1_image.png

### Additional Screenshots
17. last_1.png
18. last_2.png
19. last_3.png
20. last_4.png

## How to Use

### Option 1: Using Batch File (Easiest)
1. Double-click `CREATE_PDF.bat`
2. The script will:
   - Check if Python is installed
   - Install Pillow library if needed
   - Create the PDF
3. Find the output file: `Assignment_3_Screenshots.pdf`

### Option 2: Using Python Directly
```bash
# Install Pillow if not already installed
pip install Pillow

# Run the script
python create_pdf.py
```

## Requirements
- **Python 3.6+** - [Download Python](https://www.python.org/downloads/)
- **Pillow library** - Automatically installed by batch file

## Output
- **Filename:** `Assignment_3_Screenshots.pdf`
- **Location:** Same directory as the script
- **Contents:** All PNG screenshots in specified order
- **Quality:** High quality (95% compression)

## Features
- ✅ Automatic PNG to RGB conversion
- ✅ Handles transparent backgrounds (converts to white)
- ✅ Maintains image quality
- ✅ Sequential page order
- ✅ Error handling for missing images
- ✅ File size optimization

## Troubleshooting

### Python Not Found
```
Error: Python is not installed or not in PATH
```
**Solution:** Install Python from https://www.python.org/downloads/
Make sure to check "Add Python to PATH" during installation.

### Pillow Installation Failed
```
Error: Failed to install Pillow
```
**Solution:** Run Command Prompt as Administrator and try:
```bash
pip install Pillow --user
```

### Images Not Found
```
Warning: The following images were not found
```
**Solution:** Make sure all PNG files are in the Assignment_3 directory.
The script will create a PDF with whatever images it can find.

### PDF Too Large
If the PDF file is too large (>10MB), you can reduce quality by editing `create_pdf.py`:
```python
# Change this line (around line 87)
quality=95,  # Reduce to 85 or 75
```

## Manual PDF Creation (Alternative)

If Python is not available, you can use online tools:

1. **Smallpdf**: https://smallpdf.com/jpg-to-pdf
2. **ILovePDF**: https://www.ilovepdf.com/jpg_to_pdf
3. **PDF24**: https://tools.pdf24.org/en/images-to-pdf

Upload images in the order specified above.

## Output Example
```
Creating PDF from PNG screenshots
========================================

Found 20 images
Converting images to PDF format...
  ✓ Loaded: Q1_image.png
  ✓ Loaded: Q2_image.png
  ...
  ✓ Loaded: last_4.png

✓ Success! PDF created: Assignment_3_Screenshots.pdf
  Total pages: 20
  File size: 8.45 MB

Done!
```

## Notes
- The script skips any missing images and continues with available ones
- All images are converted to RGB format for PDF compatibility
- Transparent backgrounds are converted to white
- Original PNG files are not modified
- The PDF is created with high quality settings

## Support
If you encounter any issues:
1. Make sure Python is installed and in PATH
2. Try running Command Prompt as Administrator
3. Check that all PNG files are in the correct location
4. Verify file names match exactly (case-sensitive)

---

**Ready to create your PDF!** Just run `CREATE_PDF.bat` 🚀
