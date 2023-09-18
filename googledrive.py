import requests
import numpy as np
import cv2

# Google Drive image URL
image_url = 'https://drive.google.com/file/d/1izzU_ckfEPvXniY22SVNcbBoHeEvJAyr/view?usp=sharing'

# Download the image from the Google Drive link
response = requests.get(image_url)
image_data = response.content

# Convert the image data to a numpy array
image_array = np.frombuffer(image_data, np.uint8)

# Read the image using OpenCV
image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

# Display the image
cv2.imshow('Image', image)
cv2.waitKey(0)
cv2.destroyAllWindows()







