
import os
import zipfile
import re

# List of files provided by user
files = [
    "Chap01(1) (3).pptx",
    "Chap02 (3).pptx",
    "Chap03 (3).pptx",
    "Chap04 (4).pptx",
    "Chap05(1) (3).pptx",
    "Chap06(1) (2).pptx",
    "Chap08 (3).pptx",
    "Chap12(1) (2).pptx",
    "Chap13(1) (1).pptx",
    "Chap14(1) (1).pptx"
]

base_path = r"c:\Dev\assaf-professional-portfolio"

def extract_text_from_xml(xml_content):
    # Simple regex to find text in <a:t> tags
    return re.findall(r'<a:t>(.*?)</a:t>', xml_content)

print("Parsing PPTX files as ZIP archives...\n")

for filename in files:
    path = os.path.join(base_path, filename)
    if not os.path.exists(path):
        print(f"Skipping {filename} (Not found)")
        continue

    try:
        with zipfile.ZipFile(path, 'r') as z:
            # Try to find slide 1 and 2
            slides = [s for s in z.namelist() if s.startswith('ppt/slides/slide')]
            slides.sort() # Ensure order
            
            print(f"--- FILE: {filename} ---")
            
            # Read first 3 slides
            for slide_path in slides[:3]:
                with z.open(slide_path) as f:
                    content = f.read().decode('utf-8')
                    text_fragments = extract_text_from_xml(content)
                    if text_fragments:
                        print(f"SLIDE {slide_path}: {' '.join(text_fragments)[:200]}")
            
            print("\n")

    except Exception as e:
        print(f"Error parsing {filename}: {e}\n")
