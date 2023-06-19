Drop database Agrarian;
Create Database Agrarian;
Use Agrarian;
Create Table User_data(User_ID int auto_increment, Username varchar(30), User_Type ENUM("Farmer","Mentor","Administaror") NOT NULL default "Farmer", Email varchar(30), Password varchar(300), Phone_Number int,User_Photo varchar(200) default "https://drive.google.com/file/d/1cA9iGU7avgquduBqeiHi78k_WRcMMR17/view?usp=sharing",primary key(User_ID));
Create Table Dataset(Dataset_ID int auto_increment, Dataset_Description varchar(100), GCP_File varchar(150), User_ID int, Created_Date datetime, primary key(Dataset_ID), foreign key(User_ID) references User_data(User_ID)); 
Create Table Image(Image_ID int auto_increment, Image_link varchar(200), latitude_m decimal(20,15), longitude_m decimal(20,15), altitude_m decimal(20,15), omega_degree decimal(20,15), phi_degree decimal(20,15), kappa_degree decimal(20,15), Dataset_ID int, primary key(Image_ID), foreign key(Dataset_ID) references Dataset(Dataset_ID));
Create Table Map(Map_ID int auto_increment, Map_Type ENUM("Orthomosaic", "3D-Map", "Point-Cloud", "DSM") NOT NULL default "Point-cloud",Map varchar(100),Created_Date datetime,Dataset_ID int, primary key(Map_ID),foreign key(Dataset_ID) references Dataset(Dataset_ID));
Create Table Parameter(Para_ID int auto_increment, Para_type ENUM("LAI","NDVI", "NDI", "Volume", "Density", "Height"), Value decimal(21,20), Map_ID int,primary key(Para_ID), foreign key(Map_ID) references Map(Map_ID));

