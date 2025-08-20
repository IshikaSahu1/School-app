# School-app

This is a Node.js backend project for managing school data. It provides APIs to handle various school operations like students, teachers, classes, and more.

---

To get started, first clone the repository using:

```bash
git clone <repository-url>
cd <repository-folder>

Then, copy the .env.example file to a new .env file:

cp .env.example .env

After setting up the environment variables, install all project dependencies:

npm install

CREATE DATABASE school;
Then import the provided school.sql file into your database:

bash
Copy
Edit
mysql -u <username> -p school < school.sql

Once the database is set up, start the server:

npm start

Project Structure

src/ - Source code of the project

routes/ - All API routes

.env - Environment variables

package.json - Project dependencies and scripts

school.sql - SQL file to create database tables and seed data
