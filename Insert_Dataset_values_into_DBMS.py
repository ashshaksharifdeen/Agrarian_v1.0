import os
import csv
import pymysql

# Function to scan a folder for images
def scan_folder(folder_path):
    image_files = []
    for file in os.listdir(folder_path):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            image_path = os.path.join(folder_path, file)
            image_files.append((file, image_path))
    return image_files

# Path to the folder containing images
folder_path = '/path/to/your/folder'  # Update with your folder path

# Scan the folder for images
image_files = scan_folder(folder_path)

# MySQL Connection details
host = 'your_host'
user = 'your_user'
password = 'your_password'
database = 'your_database'

# Establish a connection to MySQL
cnx = pymysql.connect(host="localhost", port=3306, user="root", password="Ars321.mla", database="Agrarian")
cursor = cnx.cursor()

# Write image file names and paths to the "Dataset" table in the MySQL database
for file_name, image_path in image_files:
    insert_query = "INSERT INTO Dataset (file_name, file_path) VALUES (%s, %s)"
    values = (file_name, image_path)
    cursor.execute(insert_query, values)

# Commit the changes and close the MySQL connection
cnx.commit()
cnx.close()

print("Data inserted into the MySQL database successfully!")
