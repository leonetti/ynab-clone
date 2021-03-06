CREATE DATABASE ynab-db;

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
  user_id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name     VARCHAR(255) NOT NULL,
  user_email    VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- INSERT FAKE USER
INSERT INTO users (user_name, user_email, user_password) values ('Alex Leonetti', 'alexleonetti.dev@gmail.com', 'test123');
