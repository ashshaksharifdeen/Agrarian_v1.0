import cv2
from utils import find_area,find_nitrogen,ExG,NDI
#https://console.firebase.google.com/project/agrarian-eb961/storage/agrarian-eb961.appspot.com/files
#https://console.firebase.google.com/u/0/project/agrarian-eb961/firestore/data/~2F
#gs://agrarian-eb961.appspot.com
#path
path='E:/drone/Computer vision/anotation/synthesized image/Test/video_pro'
fg = 'E:/point_finalize/20221016_085739.jpg'
#open the video file



def index_cal():
       frame =cv2.imread("land.png")
       #read the first frame
       #success, frame = video.read()

       #while success:
       #display the frame

       frame = cv2.resize(frame,(2448,3264))
       lai_ = find_area(frame,fg)

       leaf_nitrogen_con = find_nitrogen(frame)

       exg_green = ExG(frame)

       ndi = NDI(frame)


       cv2.imshow("frame",frame)
       cv2.waitKey(0)
       return lai_,leaf_nitrogen_con,exg_green,ndi
    #frm_img = cv2.imencode(".jpg",frame)[1].tobytes()
    #blob = bucket.blob("E:/drone/Computer vision/anotation/synthesized image/Test/video_pro" +"/"+str(f"{count}.jpg")) 


    #blob = bucket.blob(frame)
    #blob.upload_from_file(f"{frame}{count}.jpg")
    #blob.upload_from_file("E:/drone/Computer vision/anotation/synthesized image/Test/video_pro" +"/"+str(f"{count}.jpg").read(),
    #content_type="E:/drone/Computer vision/anotation/synthesized image/Test/video_pro" +"/"+str(f"{count}.jpg").content_type)
    #resize_frm = cv2.resize(frame, (640, 480))

    
