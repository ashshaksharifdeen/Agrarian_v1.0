import cv2
from src.utils import find_area,find_nitrogen,ExG,NDI
import requests
from PIL import Image
import io
import mysql.connector
import numpy as np

def index_cal():
       frame =cv2.imread("E:/Agri/Agrarian_v1.0/images/orthomosaic2.jpg")
       #read the first frame
       #success, frame = video.read()

       #while success:
       #display the frame

       frame = cv2.resize(frame,(2448,3264))
       lai_ = find_area(frame,'E:/Agri/Agrarian_v1.0/images/20221016_085739.jpg')

       leaf_nitrogen_con = find_nitrogen(frame)

       exg_green = ExG(frame)

       ndi = NDI(frame)


       #cv2.imshow("frame",frame)
       #cv2.waitKey(0)
       return lai_,leaf_nitrogen_con,exg_green,ndi
 

    
