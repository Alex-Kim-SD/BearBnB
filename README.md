# AirBnB CRUD Application

## Introduction

This project is a full-stack application that demonstrates CRUD (Create, Read, Update, Destroy) functionality for two features Spots and Reviews, similar to that of AirBnB. Users can manage (create, read, update, and delete) their listings (referred to as "spots"), and reviews for those spots. The purpose of this project is to provide a simplified version of AirBnB's main features while showcasing the use of various technologies and techniques in a modern web application development context.

## Technologies

This project was built using the following technologies:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/) - A Predictable State Container for JS Apps.
- [VSCode](https://code.visualstudio.com/) - A source code editor developed by Microsoft.
- [Postman](https://www.postman.com/) - An API testing tool that makes it easy to set up automated tests.
- Additional technologies: Node.js, Express.js, PostGres, Render.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:
    git clone https://github.com/Alex-Kim-SD/BearBnB
2. Navigate into the cloned repository:
    cd BearBnB
3. Install the required dependencies in both BearBnB/frontend and BearBnB/backend:
    npm install
4. Run the initialization commands to migrate and seed the database:
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
5. Start the application:
    npm start

Now, you should be able to access the application at `localhost:3000` in your web browser.

Enjoy exploring the application!
