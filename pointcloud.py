import glob
import time
import open3d as o3d
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import colors as plt_colors
import cv2 as cv
import os
import sys
import random
from typing import List
from scipy.spatial.distance import cdist
import mysql.connector

class PointCloud():
    def __init__(self):
        self.cloud =o3d.geometry.PointCloud()
        self.clusters= None
        self.plants =None
        self.ground=None
        self.exportPath=None
        self.colours =None

    def loadfile(self,file_path):
        #read the point cloud from path
        self.cloud = o3d.io.read_point_cloud(file_path)
    def savefile(self,file_path):
        #save the point cloud in a file
        o3d.io.write_point_cloud(file_path,self.points)

    #conditioning the point cloud
    def conditionPointcloud(self):
        """
        self.cloud.get_max_bound(): This method returns the maximum coordinates (x, y, z) of the bounding box that encloses the point cloud.
        self.cloud.get_min_bound(): This method returns the minimum coordinates (x, y, z) of the bounding box that encloses the point cloud

        np.max(self.cloud.get_max_bound() - self.cloud.get_min_bound()): This expression calculates the maximum extent among the x, y, and z dimensions of the bounding box by subtracting the minimum coordinates from the maximum coordinates and taking the maximum value.

        1 / np.max(self.cloud.get_max_bound() - self.cloud.get_min_bound()): This expression computes the scaling factor by taking the reciprocal of the maximum extent. This scaling factor is used to normalize the point cloud.

        self.cloud.get_center(): This method returns the center coordinates (x, y, z) of the bounding box that encloses the point cloud.

        self.cloud.scale(...): This method scales the point cloud by the specified scaling factor. The center parameter is set to the center coordinates of the point cloud bounding box, which ensures that the scaling is performed relative to the center.

        By applying this scaling operation, the point cloud is normalized to a consistent scale, making it easier to work with and visualize. The scaling factor is determined based on the maximum extent of the point cloud, ensuring that the entire point cloud fits within a specific range.
        
        Parameters
        scale (float) – The scale parameter that is multiplied to the points/vertices of the geometry.

        center (numpy.ndarray[numpy.float64[3, 1]]) – Scale center used for transformation.


        """
        self.cloud.scale(1/np.max(self.cloud.get_max_bound()-self.cloud.get_min_bound()),center=self.cloud.get_center())
    def observeCloud(self):
        o3d.visualization.draw_geometries([self.cloud])
    
    def makeVoxel(self):
        """
        A voxel grid is a 3D grid of voxels, or "volumetric pixels." Each voxel represents a small volume of space, and can store data such as color, opacity, or material properties.
        Creates a VoxelGrid from a given PointCloud. The color value of a given voxel is the average color value of the points that fall into it (if the PointCloud has colors). The bounds of the created VoxelGrid are computed from the PointCloud
        
        """
        self.voxels =  o3d.geometry.VoxelGrid.create_from_point_cloud(self.cloud, voxel_size=0.005)     
    def downsample(self):
        """
        Function to downsample input pointcloud into output pointcloud uniformly. The sample is performed in the order of the points with the 0-th point always chosen, not at random.
        """
        self.cloud = self.cloud.uniform_down_sample(every_k_points=K_POINTS)

class PointcloudSet():
    def __init__(self):
        
        
        self.map = None
        self.crops = []
        self.ground = []


    def addPointclouds(self,pcd):
        
            self.map = pcd

    def observeCrops(self):
        o3d.visualization.draw_geometries(self.crops)

    def findCropsDBSCAN(self):
        with o3d.utility.VerbosityContextManager(
            o3d.utility.VerbosityLevel.Debug) as cm:
            """
            #The DBSCAN algorithm is applied to the self.map point cloud using the cluster_dbscan method. The algorithm takes two parameters: eps (epsilon) and min_points. These parameters define the neighborhood size and the minimum number of points required to form a dense region, respectively. The resulting cluster labels are stored in the labels array.
            """            
        labels = np.array(
                self.map.cluster_dbscan(eps=0.02, min_points=10, print_progress=True))
       # Create a list of segmented point clouds
        # A list called pcd_list is created to store segmented point clouds representing different clusters.
        pcd_list = []
        densities =[]
        for i in np.unique(labels):
            """
            #The code iterates over the unique labels in the labels array using the np.unique function. This loop allows us to process each cluster separately.
            """
            """
            #For each unique label, the code retrieves the corresponding points from the original point cloud (self.map) using boolean indexing. The condition labels == i selects the points belonging to the current cluster label.
            """
            points = np.asarray(self.map.points)[labels == i]
            density = len(points) / np.max(points)
            densities.append(density)
            pcd_cluster = o3d.geometry.PointCloud()
            pcd_cluster.points = o3d.utility.Vector3dVector(points)
            pcd_list.append(pcd_cluster)
        """
        #Finally, the ground variable is assigned the first element of pcd_list, which represents the ground point cloud, and the crops variable is assigned the remaining elements of pcd_list, which represent the individual crop point clouds.
        #visualize each point cloud
        #find the density and volume,height of the each segmented  point cloud
        #visualize with like heat map
        """
        # Visualize point clouds with density labels
        """for i, pcd_cluster in enumerate(pcd_list):
        # Add density label to each point
    density_label = np.full(len(pcd_cluster.points), densities[i])
    
    colors = density_label_to_color(density_label)
pcd_colors = np.zeros((len(pcd_cluster.points), 3))
for i in range(len(colors)):
    pcd_colors[i] = colors[i]
pcd_cluster.colors = o3d.utility.Vector3dVector(pcd_colors)"""  # Example coloring function, adjust as per your requirements
    
        # Visualize the point cloud with density labels
        #o3d.visualization.draw_geometries([pcd_cluster])        
        self.ground = pcd_list[0]
        #print("number of colors:",ground.colors)

        #crops = pcd_list[1:]
        #print(labels[56])
        #print(len(np.unique(labels)))
        #95

        #print(len(pcd_list))
        #95

        #print(crops)
                             
        #o3d.visualization.draw_geometries([ground])    

class Crop():
    def __init__(self):
        self.pointcloud = None
        self.bounds_vector = None
        self.bounds = None
        self.volume = None
        self.height = None
        self.position = None

    def setPointcloud(self,pcd):
        self.pointcloud = pcd
    
    def measureBounds(self):
       """
       Class that defines an axis_aligned box that can be computed from 3D geometries, The axis aligned bounding box uses the coordinate axes for bounding box generation.
       get_box_points(self)
       Returns the eight points that define the bounding box.
       
       """
       self.bounds_vector = self.pointcloud.get_axis_aligned_bounding_box().get_box_points()  # measures bounds from the ground up
       self.bounds =  np.asarray(self.pointcloud.get_axis_aligned_bounding_box().get_box_points()) 
        
    #try different aproach for measure volume
    def measureVolume(self):
        self.volume =  self.bounds.volume()
    
    def measureHeight(self):
        # Calculate the height along the z-axis
        min_z = np.min(self.bounds[:, 2])
        max_z = np.max(self.bounds[:, 2])
        self.height = max_z - min_z  
    
    def getPosition(self): 
        #The method get_center returns the mean of the TriangleMesh vertices. That means that for a coordinate frame created at the origin [0,0,0], get_center will return [0.05167549 0.05167549 0.05167549].
        #Returns the center of the geometry coordinates.
        self.position = self.pointcloud.get_center()

class PointcloudAnalysis():
    def __init__(self):
        #self.id = id
        #self.mission = mission
        self.pointcloud_set = None
        self.crops = [] # clusters
        self.density = None # how close together the clusters are
        self.average_height = None

    def addSet(self, set):
        self.pointcloud_set = PointcloudSet(self.id, self.mission)
        self.pointcloud_set.addPointclouds(set)
        self.pointcloud_set.findCropsDBSCAN()
    #appending the point clouds or cloud into point cloud list 
    def addCrop(self, crop):
        # example = Crop(self.id, self.mission)
        # self.crop = example
        self.crops.append(crop)
    #calualtig the heights based on the number of heights derived
    def calculateAverageHeight(self):
        avgs = []
        for crop in self.crops:
            avgs.append(crop.height)
        self.average_height = np.mean(avgs)
   
    def calculateDensity(self):
        # make list of center values for each crop point cloud
        center_values = []
        for crop in self.crops:
            center_values.append(crop.position)
            print(crop.position)
        """
        element wise density calculations
        #it comparing the  Euclidean distances between two different point cloud map center values but i have only one point cloud value    
        centers = np.array(center_values)
       
        # Calculate pairwise Euclidean distances between center points
        distances = cdist(centers, centers, 'euclidean')

        # Exclude self-distances (diagonal elements)
        distances = distances[np.nonzero(~np.eye(distances.shape[0], dtype=bool))]"""
        #method 2 of point cloud calculations
        target = o3d.geometry.PointCloud()
        target.points= o3d.utility.Vector3dVector([crop.position])
        distances= crop.pointcloud.compute_point_cloud_distance(target)
        #convert to numpy array
        distances = np.array(distances)
        # Calculate average gap
        average_gap = np.mean(distances)
        print("Average gap between center points:", average_gap)
        self.density = average_gap        


if __name__ == """__main__""":

    #pcd = PointCloud()
    #pcd.loadfile('Map05mil/mil05para.ply')
    #pcd.conditionPointcloud()
    #pcd.downsample
    #print(pcd)
    point_cloud= np.loadtxt("E:/point_finalize/Map1/"+"points.xyz",skiprows=1,delimiter=',')
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(point_cloud[:,:3])
    pcd.colors = o3d.utility.Vector3dVector(point_cloud[:,3:6]/255)
    crop = Crop()
    crop.setPointcloud(pcd)
    crop.measureBounds()
    print("bounds:",crop.bounds)
    #crop.measureVolume()
    #print("volume is:",crop.volume)
    #i need to make sure the unit measure ment for the point cloud 
    crop.measureHeight()
    print("Height is :",crop.height)
    #measure bounds
    crop.getPosition()
    print("position:",crop.position)
    analysis = PointcloudAnalysis()
    analysis.addCrop(crop)
    #analysis.addCrop(crop2)

    analysis.calculateDensity()
    analysis.calculateAverageHeight()
    print("density of point cloud:",analysis.density)
    print("average Height:",analysis.average_height)
    
    #pcd.observeCloud()
    o3d.visualization.draw_geometries([pcd])

    #clustering
    clus = PointcloudSet()
    clus.addPointclouds(pcd)
    clus.findCropsDBSCAN()
    #o3d.visualization.draw_geometries([clus.ground])
    mydb = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="admin123",
    database="agrarian")
    mycursor = mydb.cursor()

    sql1 = "INSERT INTO parameter (Para_type, Value) VALUES (%s,%s)"
    val = ("Density",round(analysis.density,3))
    mycursor.execute(sql1, val)
    print(mycursor.rowcount, "Density record inserted.")

    sql2 = "INSERT INTO parameter (Para_type, Value) VALUES (%s,%s)"
    height = ("Height",round(analysis.average_height,3))
    mycursor.execute(sql2, height)
    print(mycursor.rowcount, "Height record inserted.")
    mydb.commit()

    print(mycursor.rowcount, "record inserted.")



