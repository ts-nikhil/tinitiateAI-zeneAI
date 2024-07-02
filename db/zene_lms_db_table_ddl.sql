-- Zene LMS DDL
--
-- (c) TINITIATE TECHNOLOGIES PVT LTD
-- Notes
-- Date     Author     Notes
-- -----------------------------------------------------
-- Jul 02   Rohit K    Initial Version
-- 
-- 
-- -----------------------------------------------------

-- Use the database zenedev
USE zenedev;


-- Table: status
-- Notes:
-- 1. This table stores different types of statuses.
-- 2. Each status type has primary key
-- 3. The contact information of the school is also stored.
create table status_codes (
    status_id int,
    status_value varchar(225) not null,
    status_table varchar(225) not null
);

alter table status_codes add constraint status_pk primary key (status_id);


-- Table: schools
-- Notes:
-- 1. This table stores information about different schools.
-- 2. Each school has a unique ID.
-- 3. The contact information of the school is also stored.
create table schools (
    school_id       int,
    school_name     varchar(1000) not null,
    address         varchar(2000),
    phone1          varchar(100),
    phone2          varchar(100),
    contact_person  varchar(500),
    email           varchar(500),
    status          int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table schools add constraint schools_pk primary key (school_id);
alter table schools add constraint schools_status_fk foreign key (status) references status_codes(status_id);


-- Table: user_types
-- Notes:
-- 1. This table defines the types of users (e.g., student, teacher, admin).
-- 2. Each user type has a unique ID.
-- 3. User type name must be unique and not null.
create table user_types (
    user_types_id int,
    user_type_name varchar(100) not null,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table user_types add constraint user_types_id_pk primary key (user_types_id);
alter table user_types add constraint user_type_name_uk unique (user_type_name);


-- Table: users
-- Notes:
-- 1. This table stores information about users.
-- 2. Each user has a unique username and email.
-- 3. The user_type_id references the user_types table.
-- 4. The school_id references the schools table.
create table users (
    user_id int,
    user_name varchar(100) not null,
    user_password varchar(255) not null,
    email varchar(100) not null,
    first_name varchar(255),
    last_name varchar(255),
    full_name varchar(255),
    user_type_id int,
    school_id int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table users add constraint user_id_pk primary key (user_id);
alter table users add constraint user_name_uk unique (user_name);
alter table users add constraint user_email_uk unique (email);
alter table users add constraint user_type_id_fk foreign key (user_type_id) references user_types(user_types_id);
alter table users add constraint school_id_fk foreign key (school_id) references schools(school_id);


-- Table: grade
-- Notes:
-- 1. This table stores information about grades.
-- 2. Each grade has a unique ID.
-- 3. The grade name must be unique and not null.
create table grade (
    grade_id int,
    grade_name varchar(50) not null,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table grade add constraint grade_id_pk primary key (grade_id);
alter table grade add constraint grade_name_uk unique (grade_name);


-- Table: course
-- Notes:
-- 1. This table stores information about courses.
-- 2. Each course has a unique ID.
-- 3. The course name must be unique and not null.
create table course (
    course_id int,
    course_name varchar(255) not null,
    description text,
    status int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table course add constraint course_id_pk primary key (course_id);
alter table course add constraint course_name_uk unique (course_name);
alter table course add constraint course_status_fk foreign key (status) references status_codes(status_id);


-- Table: topics
-- Notes:
-- 1. This table stores information about topics within a course.
-- 2. Each topic has a unique ID.
-- 3. The topic name must be unique and not null.
-- 4. The course_id references the course table.
create table topics (
    topic_id int,
    topic_name varchar(255) not null,
    topic_order int,
    description text,
    course_id int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table topics add constraint topic_id_pk primary key (topic_id);
alter table topics add constraint topic_name_uk unique (topic_name);
alter table topics add constraint course_id_fk foreign key (course_id) references course(course_id);


-- Table: grade_course_topics
-- Notes:
-- 1. This table stores the association between grades, courses, and topics.
-- 2. Each association has a unique ID.
-- 3. The grade_id references the grade table.
-- 4. The course_id references the course table.
-- 5. The topic_id references the topics table.
create table grade_course_topics (
    grade_course_topics_id int,
    grade_id int,
    course_id int,
    topic_id int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table grade_course_topics add constraint grade_course_topics_id_pk primary key (grade_course_topics_id);
alter table grade_course_topics add constraint grade_id_fk foreign key (grade_id) references grade(grade_id);
alter table grade_course_topics add constraint grade_course_topics_course_id_fk foreign key (course_id) references course(course_id);
alter table grade_course_topics add constraint topic_id_fk foreign key (topic_id) references topics(topic_id);


-- Table: school_grade_course_topics
-- Notes:
-- 1. This table stores the association between schools and grade_course_topics.
-- 2. Each association has a unique ID.
-- 3. The school_id references the schools table.
-- 4. The grade_course_topic_id references the grade_course_topics table.
create table school_grade_course_topics (
    school_grade_course_topics_id int,
    school_id int,
    grade_course_topic_id int,
    --
    created_at timestamp default current_timestamp,
    created_by varchar(500),
    updated_at timestamp default current_timestamp,
    updated_by varchar(500)
);

alter table school_grade_course_topics add constraint school_grade_course_topics_id_pk primary key (school_grade_course_topics_id);
alter table school_grade_course_topics add constraint school_grade_course_topics_school_id_fk foreign key (school_id) references schools(school_id);
alter table school_grade_course_topics add constraint school_grade_course_topics_fk foreign key (grade_course_topic_id) references grade_course_topics(grade_course_topics_id);





-- Transacition Tables
-- -----------------------------------
-- user_school_grade_course_topics



