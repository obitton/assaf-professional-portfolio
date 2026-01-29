
import os

pdf_path = "public/Assaf_Bitton_Resume.pdf"
target_string = b"RESUME - KKR Risk Analyst.docx"
replacement_string = "Assaf Bitton Resume".encode('ascii')

# Calculate padding to match length
padding = b" " * (len(target_string) - len(replacement_string))
final_replacement = replacement_string + padding

if len(final_replacement) != len(target_string):
    print("Error: Length mismatch")
    exit(1)

try:
    with open(pdf_path, 'rb') as f:
        content = f.read()

    if target_string in content:
        new_content = content.replace(target_string, final_replacement)
        with open(pdf_path, 'wb') as f:
            f.write(new_content)
        print(f"Successfully replaced metadata in {pdf_path}")
    else:
        print(f"String '{target_string.decode()}' not found in PDF. It might be encoded differently.")

except Exception as e:
    print(f"Error: {e}")
