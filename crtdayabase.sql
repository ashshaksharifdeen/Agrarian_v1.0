-- Creaate agrarian Database
CREATE DATABASE agrarian CHARACTER SET utf8 COLLATE utf8_unicode_ci;
Use agrarian;

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_type VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(15)
);

-- Create the Messages table
CREATE TABLE Messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id_sender INT NOT NULL,
    user_id_receiver INT NOT NULL,
    parent_message_id INT,
    message_body BLOB,
    date_time DATETIME,
    FOREIGN KEY (user_id_sender) REFERENCES Users(user_id),
    FOREIGN KEY (user_id_receiver) REFERENCES Users(user_id)
);

-- Create the Dataset table
CREATE TABLE Dataset (
    dataset_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT,
    created_date DATE,
    gcp_file VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create the Images table
CREATE TABLE Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    dataset_id INT NOT NULL,
    longitude DECIMAL(10, 6),
    latitude DECIMAL(10, 6),
    altitude DECIMAL(10, 2),
    Image BLOB,
    FOREIGN KEY (dataset_id) REFERENCES Dataset(dataset_id)
);

-- Create the Map table
CREATE TABLE Map (
    map_id INT AUTO_INCREMENT PRIMARY KEY,
    dataset_id INT NOT NULL,
    map_type VARCHAR(255),
    map BLOB,
    created_date DATE,
    solution_english TEXT,
    solution_sinhala TEXT,
    solution_tamil TEXT,
    FOREIGN KEY (dataset_id) REFERENCES Dataset(dataset_id)
);

-- Create the Parameters table
CREATE TABLE Parameters (
    para_id INT AUTO_INCREMENT PRIMARY KEY,
    map_id INT NOT NULL,
    para_type VARCHAR(255),
    value FLOAT,
    analyzed_date DATE,
    FOREIGN KEY (map_id) REFERENCES Map(map_id)
);
