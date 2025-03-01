create table students (
	student_id int not null,
	first_name varchar(255),
	last_name varchar(255),
	primary key (student_id)
);

create table professors (
	professor_id int not null,
	first_name varchar(255),
	last_name varchar(255),
	department varchar(255),
	primary key (professor_id)
);

create table courses (
	course_id int not null,
	course_name varchar(255),
	course_code varchar(255),
	professor_id int not null,
	primary key (course_id),
	foreign key (professor_id) references professors(professor_id)
);

create table enrollments (
	enrollment_id int not null,
	student_id int not null,
	course_id int not null,
	primary key (enrollment_id),
	foreign key (student_id) references students(student_id),
	foreign key (course_id) references courses(course_id)
);