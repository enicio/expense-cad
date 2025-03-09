-- Database: expenses-db

-- DROP DATABASE IF EXISTS "expenses-db";

CREATE DATABASE "expenses-db"
    WITH
    OWNER = squall
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE "expenses-db" TO PUBLIC;

GRANT ALL ON DATABASE "expenses-db" TO squall;

SELECT * FROM users;

UPDATE users
SET id = gen_random_uuid();

CREATE TABLE users_2 (
  id UUID DEFAULT gen_random_uuid() NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

SELECT * FROM users_3;

SELECT * FROM expenses;


ALTER TABLE expenses
DROP COLUMN user_id;

ALTER TABLE expenses
ADD user_id UUID REFERENCES users_3(id)

CREATE TABLE users_3 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  user_id UUID NOT NULL REFERENCES users_3(id)
);


INSERT INTO expenses (description, date, amount, user_id) VALUES ('Compra de supermercado', '2024-04-28', 100.50, '6c217692-e390-4db3-aa49-90315b6f2720' );

SELECT * FROM expenses WHERE user_id='47d3d9c0-7628-4ef5-99cc-fb09a81bd364'

