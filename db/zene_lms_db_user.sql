-- TILMS DDL
--
-- (c) TINITIATE TECH
-- Notes
-- 1.


-- Create DB
--
-- Create the database for core 
CREATE DATABASE zenelms;
-- Create the database for development
CREATE DATABASE zenedev;
-- Create the database for production
CREATE DATABASE zeneprod;

-- DB User
-- Create a new user
CREATE USER 'tinitiate_user'@'localhost' IDENTIFIED BY 'ti@zene';

-- Grant all privileges on the new database to the new user
GRANT ALL PRIVILEGES ON zenedev.* TO 'tinitiate_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;


-- Tables
-- Master Tables
-- -------------------------
-- schools
-- user_types
-- users
-- grade 
-- course
-- topics
-- grade_course_topics
-- school_grade_course_topics

-- Transacition Tables
-- -----------------------------------
-- user_school_grade_course_topics



