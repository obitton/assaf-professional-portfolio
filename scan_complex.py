
import os
import zipfile
import re

files = [
    "Chap05(1) (3).pptx", # Networks
    "Chap06(1) (2).pptx", # ILP
    "Chap08 (3).pptx",    # NLP
    "Chap12(1) (2).pptx", # Simulation
    "Chap13(1) (1).pptx", # Queuing
    "Chap14(1) (1).pptx"  # Decision
]

base_path = r"c:\Dev\assaf-professional-portfolio"

def extract_text_from_xml(xml_content):
    return re.findall(r'<a:t>(.*?)</a:t>', xml_content)

print("Deep scanning PPTX files for complex cases...\n")

for filename in files:
    path = os.path.join(base_path, filename)
    if not os.path.exists(path):
        continue

    try:
        with zipfile.ZipFile(path, 'r') as z:
            slides = [s for s in z.namelist() if s.startswith('ppt/slides/slide')]
            slides.sort()
            
            # Simple numeric sort fix: slide1, slide10, slide2 -> slide1, slide2, slide10
            slides.sort(key=lambda x: int(re.search(r'slide(\d+)', x).group(1)))

            print(f"--- FILE: {filename} ---")
            
            # Check slides 4 to 8 for specific problem names
            for i, slide_path in enumerate(slides):
                if 3 <= i <= 8: 
                    with z.open(slide_path) as f:
                        content = f.read().decode('utf-8')
                        text = extract_text_from_xml(content)
                        if text:
                            joined = ' '.join(text)
                            # Heuristic: print if it contains "Problem", "Case", "Example", or "Model"
                            if any(k in joined for k in ["Problem", "Case", "Example", "Model", "Minimize", "Maximize"]):
                                print(f"SLIDE {i+1}: {joined[:200]}...")
            print("\n")

    except Exception as e:
        print(f"Error parsing {filename}: {e}\n")
