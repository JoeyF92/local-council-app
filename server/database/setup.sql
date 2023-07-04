DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS token CASCADE;
DROP TABLE IF EXISTS voting_submissions CASCADE;

CREATE TABLE users(
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    pass_word VARCHAR(100) NOT NULL,
    user_address VARCHAR(200),
    isAdmin BOOLEAN DEFAULT false
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    FOREIGN KEY ("user_id") REFERENCES users("user_id")
);

CREATE TABLE voting_submissions (
    submission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    category VARCHAR (30) NOT NULL,
    proposal VARCHAR(1000) NOT NULL,
    photo VARCHAR(200),
    date_time_entry TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    votes INT DEFAULT 0,
    submission_status VARCHAR(50) DEFAULT 'pending'
);

    INSERT INTO voting_submissions(title, category, proposal, photo) 
    VALUES(
        'Park', 'Maintenance', 'Fix the swings', 'https://media.istockphoto.com/id/513138217/photo/job-interview.jpg?s=612x612&w=0&k=20&c=CwDG8FhQBorpFCp_jUyv33lTf1n3SEVNBMXPUGCDHyI='
        );


