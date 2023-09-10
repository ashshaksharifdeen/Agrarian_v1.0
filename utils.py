from ctypes import resize
from select import select
from turtle import width
import cv2
import numpy as np
from PIL import Image
from pathlib import Path
import itertools
import os
import time
import glob
import matplotlib.pyplot as plt
import skimage.io
import skimage.color
import skimage.filters
import imutils
from imutils import contours
from imutils import perspective
from scipy.spatial import distance as dist


def midpoint(pnta,pntb):
       return((pnta[0]+pntb[0])*0.5,(pnta[1]+pntb[1])*0.5)

def foreground(img_path):
    #read image
    img= cv2.imread(img_path)
    #convert image to gray
    gray_img = skimage.color.rgb2gray(img)
    #create gaussian blur to denois
    gaussian_img = skimage.filters.gaussian(gray_img,sigma=1.0)
    #thresh hold the image
    t = skimage.filters.threshold_otsu(gaussian_img)
      # create a binary mask with the threshold found by Otsu's method
    #here we choose the pixel values less than the thresh hold because most of our images backround with white colour the above the peak will 
    # turn on white background so we have to turn off that and turn on less value pixels.
    mask =gaussian_img<t #select region less than the thresh hold
    select = img.copy()
    #make other regions 0
    select[~mask] = 0
   
    return select

def overlay(back,fg):
    #set the region of where roi start in column
    x_offset = int((back.shape[1])/2)
    #set the region of where roi start in row
    y_offset = int((back.shape[0])/2)
    #resize the fg img  
    fg=cv2.resize(fg,(300,300))
    #set end point in column in the length of fg
    x_end = x_offset+fg.shape[1]
    #set end point in row in the length of fg
    y_end = y_offset+fg.shape[0]

    #get region of interest
    back[x_offset:x_end,y_offset:y_end]=[0,0,0]
    roi = back[x_offset:x_end,y_offset:y_end]
    #convert to gray scale image
    gray_img = cv2.cvtColor(fg,cv2.COLOR_RGB2GRAY)
    #threshholding the image
    t,thresh = cv2.threshold(gray_img,0,255,cv2.THRESH_BINARY_INV|cv2.THRESH_OTSU)
  
    
    #do bitwise or to get background as bg
    #bg = cv2.bitwise_or(roi,roi,mask=thresh)
    #cv2.imshow("image",bg)
    #cv2.waitKey(0)
    #now bg and fg
    over_img = cv2.add(fg,roi)
    back[x_offset:x_end,y_offset:y_end] = over_img          #over_img
    #back=cv2.resize(back,(720,720))
    #cv2.imshow("image",back)
    #cv2.waitKey(0)
    n_ov_img = back[x_offset:x_end,y_offset:y_end]
    #cv2.imshow("image",n_ov_img)  
    #cv2.waitKey(0)
    
    
    return n_ov_img


#finding area
def find_area(bg,fg):

    #image = cv2.imread(bg)
    #get forground image image
    fg= foreground(fg)

    #take a copy of the image
    background_pass = bg.copy()
    ov_img = overlay(background_pass,fg)
    # load the image, convert it to grayscale, and blur it slightly
    #getting the center of the image of
    """ov_img=cv2.resize(ov_img,(750,750)) 
    cv2.imshow("image",ov_img)
    cv2.waitKey(0)"""
    """x_start = int((ov_img.shape[1])/2)
    y_start = int((ov_img.shape[0])/2)

    x_end = x_start+fg.shape[1]
    y_end = y_start+fg.shape[0]

    ov_img_center = ov_img[x_start:x_end,y_start:y_end]"""
    #cv2.imshow("image",ov_img_center)
    #cv2.waitKey(0)
    gray = cv2.cvtColor(ov_img,cv2.COLOR_RGB2GRAY)
    gray = cv2.GaussianBlur(gray,(7,7),0)
    #thresh hold the image
    """t,thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV |cv2.THRESH_OTSU)
    #count number of black pixel
    black_pxl = np.sum(thresh==255)
    #find pixel per metric
    diameter of coin = 2.3cm
        area of coin = pi*(2.3/2)^2= 4.156 cm^2
        pixel per metric= balcpxl/area
        find total area=(image.width x image.height)/pixelper metric"""
    """pixelsPerMetric = black_pxl/4.156
    print("pixel permtric:",pixelsPerMetric)
    width_len = int(image.shape[1])/pixelsPerMetric
    height_len = int(image.shape[0])/pixelsPerMetric
    print("width_len:",width_len)
    print("height lemn:",height_len)
    #total area
    t_area = image.shape[1]*image.shape[0]
    o_area = t_area/pixelsPerMetric"""
    #print("original area:",o_area)
    #cv2.imshow("image",thresh)
    #cv2.waitKey(0)

    # perform edge detection, then perform a dilation + erosion to
    # close gaps in between object edges
    edged = cv2.Canny(gray,50,100)
    edged = cv2.dilate(edged,None,iterations=1)
    edged = cv2.erode(edged,None,iterations=1)
    
    #cv2.imshow("image",edged)
    #cv2.waitKey(0)

    

    #find counters in the edge map
    """The function retrieves contours from the binary image using the algorithm [238] . The contours are a useful tool for shape analysis and object detection and recognition. See squares.cpp in the OpenCV sample directory."""
    cnts = cv2.findContours(edged.copy(),cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    
    
    # sort the contours from left-to-right and initialize the
    # 'pixels per metric' calibration variable
    (cnts,_) = contours.sort_contours(cnts)
    pixelsPerMetric =None
    #loop over the contours individually 
    for c in cnts:
        # if the countour is not sufficiently large, ignore it.
        if cv2.contourArea(c)<100:
            continue
        #compute the rotated bounding box of tyhe image
        org = bg.copy()
        #for finding the minimum area rotated rectangle
        box = cv2.minAreaRect(c) 
        #box returns >> (center(x,y),(width,height),angle of rotation)
        #find the each point on the corner of the height and width
        box = cv2.boxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
        #it returns corner points>> top-right, bottom-right, and bottom-left order
        box = np.array(box,dtype="int")
        # order the points in the contour such that they appear
	    # in top-left, top-right, bottom-right, and bottom-left
	    # order, then draw the outline of the rotated bounding
	    # box
        box = perspective.order_points(box) 
        cv2.drawContours(org,[box.astype("int")],-1,(0,255,0),2)
        
        #loop over the original points and draw them
        for (x,y) in box:
            #draw circle on the each corner
            cv2.circle(org,(int(x),int(y)),5,(0,0,255),-1)

        # unpack the ordered bounding box, then compute the midpoint
	    # between the top-left and top-right coordinates, followed by
	    # the midpoint between bottom-left and bottom-right coordinates    

        (tl,tr,br,bl) = box
        (tltrx,tltry) =midpoint(tl,tr)
        (blbrx,blbry) = midpoint(br,bl)
        # compute the midpoint between the top-left and top-right points,
	    # followed by the midpoint between the top-righ and bottom-right
        (tlblx,tlbly) = midpoint(tl,bl)
        (trbrx,trbry) = midpoint(tr,br)
        # draw the midpoints on the image
        cv2.circle(org, (int(tltrx), int(tltry)), 5, (255, 0, 0), -1)
        cv2.circle(org, (int(blbrx), int(blbry)), 5, (255, 0, 0), -1)
        cv2.circle(org, (int(tlblx), int(tlbly)), 5, (255, 0, 0), -1)
        cv2.circle(org, (int(trbry), int(trbry)), 5, (255, 0, 0), -1)

        #draw line between mid points
        cv2.line(org,(int(tltrx),int(tltry)),(int(blbrx),int(blbry)),(255,0,255),2)
        cv2.line(org,(int(tlblx),int(tlbly)),(int(trbrx),int(trbry)),(255,0,255),2)
        
        #compute the euclidean distance between the midpoints
        da = dist.euclidean((tltrx,tltry),(blbrx,blbry))
        db = dist.euclidean((tlblx,tlbly),(trbrx,trbry))

        #find pixel per metric
        if pixelsPerMetric is None:
            #2.3 cm diameter coin is used
            pixelsPerMetric = db/2.3

        #now we can check how much acurracy it is 
        # pixel_width/pixelpermetric
        re_db= db/pixelsPerMetric
        re_da =da/pixelsPerMetric
   
        
	# draw the object sizes on the image
        cv2.putText(org, "{:.1f}in".format(re_da),
		  (int(tltrx - 15), int(tltry - 10)), cv2.FONT_HERSHEY_SIMPLEX,
		   0.65, (255, 255, 255), 2)
        cv2.putText(org, "{:.1f}in".format(re_db),
		(int(trbrx + 10), int(trbry)), cv2.FONT_HERSHEY_SIMPLEX,
		0.65, (255, 255, 255), 2)
       

        
       
    #calculate original area of an image
    #width/pixelper metric(or count pixel in width)
    width_img = bg.shape[1]/pixelsPerMetric
    height_img = bg.shape[0]/pixelsPerMetric
    t_area = width_img*height_img
    #print("width:",width_img)
    #print("height:",height_img)
    print("area:",width_img*height_img)

    #to find lai 
    #to thresh hold the image convert it to gray image
    gray_img=cv2.cvtColor(bg,cv2.COLOR_RGB2GRAY)
    #apply gaussianblur
    blurred = cv2.GaussianBlur(gray_img,(7,7),0)
    t,thresh=cv2.threshold(blurred,0,255,cv2.THRESH_BINARY|cv2.THRESH_OTSU)          
    #number of pixels
    number_of_blpixel = np.sum(thresh==0)
    #number of black pixel
    number_of_whtpixel = np.sum(thresh==255)
    #print("number of black pixel:",number_of_blpixel)

    #print number of white pixels
    #print("number of white pixel:",number_of_whtpixel)
    total_pixels = number_of_blpixel+number_of_whtpixel
    #lai
    """
    Total area we covered 2ft x 2.5ft>> area we covered for one single shot of image>>0.464m^2
    """
    canopy_leaf =(number_of_whtpixel/total_pixels)*4646.676
    #print("canopy leaf:",canopy_leaf)
    """finding lai in pixel per metric method
    leaf_area= number_of_whtpixel/pixelsPerMetric
    lai_pxl =leaf_area/(width_img*height_img)
    print("lai in pixel per metric",lai_pxl)
    return lai_pxl"""
    lai = canopy_leaf/t_area
    print("lai of plant",lai)
    return lai


#find nitrogen
def find_nitrogen(img):
     """
    L*a*b* system of the International Commission on Illumination. 
    Among these color indices, the index b*, 
    which represents the visual perception of yellow-blue chroma, 
    has the closest linear relationship with SPAD reading and LNC"""
    
     #img = cv2.imread(bg_paths)
     #convert to gray image
     gray = cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
     gray = cv2.GaussianBlur(gray,(7,7),0)
     t,thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV|cv2.THRESH_OTSU)
    #we select below the thresh hold values are mask.
     mask =gray<t #select region less than the thresh hold
     select = img.copy()
    
    #make other regions 0
     select[mask] = 0
    #print("hello world")
    #select= cv2.resize(select,(700,700))
    #cv2.imshow("image",select)
    #cv2.waitKey(0)
    #learn about L*, a*, b*
    #return select
    #extracting RED channel
     """
    # represents images as NumPy arrays with channels in Blue, Green,
    # Red ordering rather than Red, Green, Blue
    """
    #normalizing the value by dividing 255.0
     red_c = (np.mean(select[:,:,2]))/255.0
    #extracting Green channel
     green_c = (np.mean(select[:,:,1]))/255.0
    #extracting Blue channel
     blue_c = (np.mean(select[:,:,0]))/255.0
    #X, Y, Z are the CIE tristimulus values
     X = 0.412453*red_c + 0.357580*green_c + 0.180423*blue_c
     #print("X:",X)
    
     Y = 0.212671*red_c + 0.715160*green_c + 0.072169*blue_c
     #print("Y:",Y)
     Z = 0.019334*red_c + 0.119193*green_c + 0.950227*blue_c
     #print("Z:",Z)

    #check what it is possible .any() or all() 
     if Y > 0.008856:
         fY = Y ** 1/3
         L_ = (116.0*fY - 16.0)
     else:
         fY = 7.787*Y +(16.0/116.0)
         L_ = 903.3*Y

     if X > 0.008856:
        fX = X ** 1/3
     else:
        fX =  7.787*X +(16.0/116.0) 

     if Z > 0.008856:
        fZ = Z ** 1/3
     else:
        fZ = 7.787*Y +(16.0/116.0)

     a_ = 500.0*(fX - fY)
    #we want this indices for calculate b* 
     b_ = 200.0*(fY -fZ)
    #getting (-) metrics values.....deal with that solve that
     #print("b:",b_)
     """
     DAT= days after transplanting (DAT)
    
     LNC = αb* + βDAT + γ
     α=-0.67 ± 0.06
     β=-0.29 ± 0.01
     γ=69.27 ± 2.10  
    """
     LNC= -0.67* b_-0.29*120 + 69.27

     print("LNC(gkg^-1):",LNC)
     return LNC
def ExG(img):
     """
    L*a*b* system of the International Commission on Illumination. 
    Among these color indices, the index b*, 
    which represents the visual perception of yellow-blue chroma, 
    has the closest linear relationship with SPAD reading and LNC"""
    
     #img = cv2.imread(bg_paths)
     #convert to gray image
     gray = cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
     gray = cv2.GaussianBlur(gray,(7,7),0)
     t,thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV|cv2.THRESH_OTSU)
    #we select below the thresh hold values are mask.
     mask =gray<t #select region less than the thresh hold
     select = img.copy()
    
    #make other regions 0
     select[mask] = 0
    #print("hello world")
    #select= cv2.resize(select,(700,700))
    #cv2.imshow("image",select)
    #cv2.waitKey(0)
    #learn about L*, a*, b*
    #return select
    #extracting RED channel
     """
    # represents images as NumPy arrays with channels in Blue, Green,
    # Red ordering rather than Red, Green, Blue
    """
    #normalizing the value by dividing 255.0
     red_c = (np.mean(select[:,:,2]))/255.0
    #extracting Green channel
     green_c = (np.mean(select[:,:,1]))/255.0
    #extracting Blue channel
     blue_c = (np.mean(select[:,:,0]))/255.0
     exg = 2* green_c - red_c- blue_c 
     print("excess og green:",exg)
     return exg    

def NDI(img):
    """
    L*a*b* system of the International Commission on Illumination. 
    Among these color indices, the index b*, 
    which represents the visual perception of yellow-blue chroma, 
    has the closest linear relationship with SPAD reading and LNC"""
    
    #img = cv2.imread(bg_paths)
     #convert to gray image
    gray = cv2.cvtColor(img,cv2.COLOR_RGB2GRAY)
    gray = cv2.GaussianBlur(gray,(7,7),0)
    t,thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV|cv2.THRESH_OTSU)
    #we select below the thresh hold values are mask.
    mask =gray<t #select region less than the thresh hold
    select = img.copy()
    
    #make other regions 0
    select[mask] = 0
    #print("hello world")
    #select= cv2.resize(select,(700,700))
    #cv2.imshow("image",select)
    #cv2.waitKey(0)
    #learn about L*, a*, b*
    #return select
    #extracting RED channel
    """
    # represents images as NumPy arrays with channels in Blue, Green,
    # Red ordering rather than Red, Green, Blue
    """
    #normalizing the value by dividing 255.0
    red_c = (np.mean(select[:,:,2]))/255.0
    #extracting Green channel
    green_c = (np.mean(select[:,:,1]))/255.0
    #extracting Blue channel
    blue_c = (np.mean(select[:,:,0]))/255.0
    ndi = (red_c - green_c)/(red_c+green_c+0.01)
    print("ndi:",ndi)
    return ndi 


  
if __name__ == '__main__':

    fg_path ='E:/drone/Computer vision/anotation/synthesized image/Test/20221016_085739.jpg'
    #bg_paths = 'E:/drone/Computer vision/anotation/synthesized image/Test/IMG_5116.JPG'

    """result = find_area(bg_paths,fg_path)
    nitrogen = find_nitrogen(bg_paths)
    exg = ExG(bg_paths)
    ndi= NDI(bg_paths)"""



