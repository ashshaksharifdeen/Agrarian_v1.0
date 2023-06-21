import os
import csv

# Function to scan a folder for images
def scan_folder(folder_path):
    image_files = []
    for file in os.listdir(folder_path):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            image_path = os.path.join(folder_path, file)
            image_files.append((file, image_path))
    return image_files

# Path to the folder containing images
folder_path = 'D:/IMAGES'  # Update with your folder path

# Scan the folder for images
image_files = scan_folder(folder_path)

# Path to the CSV file to save the results
csv_file = 'D:/IMAGES/images.csv'  # Update with your desired CSV file path

# Write image file names and links to the CSV file
with open(csv_file, 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['File Name', 'Image Link'])
    for file_name, image_path in image_files:
        writer.writerow([file_name, image_path])

print("CSV file created successfully!")
