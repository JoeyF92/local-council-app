DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS votingSubmissions;

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

CREATE TABLE votingSubmissions (
    submission_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR (50) NOT NULL,
    category VARCHAR (30) NOT NULL,
    submission VARCHAR NOT NULL,
    photo VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    date_time_entry TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    votes INT,
    submission_status VARCHAR(50),
    FOREIGN KEY ("user_id") REFERENCES users("user_id")
);


