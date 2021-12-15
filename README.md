# WhatNext

1. [Context](#context)
2. [Get started](#setup)
    - [Dependencies](#dependencies)
    - [Database prep](#database-prep)
    - [Development](#development)
3. [Architecture](#architecture)
    - [Database schema](#database-schema)
    - [API routes plan](#API-routes-plan)
    - [Components](#components)
4. [Support](#support)

## Context

WhatNext, a project developed by @YakimchukAnna, @emepox, @carolkds and @switcherette to create and play 'choose your own adventure' stories.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- Navigate into the app folder `cd client` and run `npm install`. This will install client dependencies (React).

This project uses several additional libraries, which should also get installed when you run `npm install`. Here you can find more information about them:

- Sequelize <https://sequelize.org/master/>
- bcrypt <https://github.com/kelektiv/node.bcrypt.js>
- jwt / JSONwebtoken <https://github.com/auth0/node-jsonwebtoken>

- React router <https://reactrouter.com/>
- Axios <https://axios-http.com/>
- Noty <https://ned.im/noty/#/>
- Tailwind <https://tailwindcss.com/docs>
- React Spring <https://react-spring.io>


### Database Prep

- Access the MySQL interface in a terminal by running `mysql -u root -p`
- Create a new database called whatnext: `create database whatnext`
- Add a `.env` file to the project folder of the repository containing the MySQL authentication information for MySQL user. For example:

```text

DB_HOST=localhost
DB_USER=root
DB_NAME=whatnext
DB_PASS=YOUR_PASSWORD

```

(replace `YOUR_PASSWORD` with your actual password)

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create 4 tables called `users`, `stories`, `nodes`, and `edges` in your database.Check all them in the database to see the structure.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

Happy coding!

## Architecture

### Database schema

![Database schema](https://github.com/CodeOp-tech/ModularStory/blob/staging/client/src/img/db-schema.png) 

### API routes plan

#### /users

| URl             | HTTP METHOD | DESCRIPTION                   | REQUEST OBJECT         | RESPONSE OBJECT                                                                                                                                     |
|-----------------|-------------|-------------------------------|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| /users/login    | POST        | Provides authentication token | { username, password } | token                                                                                                                                               |
| /users/register | POST        | Adds new user to database     | { username, password } |                                                                                                                                                     |
| /users/profile  | GET         | Gets all stories from a user  | { id }                 | [{ id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, username: string }] |

#### /nodes

| URl              | HTTP METHOD | DESCRIPTION                       | REQUEST OBJECT                                     | RESPONSE OBJECT                                    |
|------------------|-------------|-----------------------------------|----------------------------------------------------|----------------------------------------------------|
| /nodes/:id       | GET         | Gets node with a given id         | { id: integer }                                    | { id: integer, situation: text, StoryID: integer } |
| /nodes/          | POST        | Adds new node to database         | { situation: text, StoryID: integer }              | { id: integer, situation: text }                   |
| /nodes/:id/edges | PUT         | Adds edge between two given nodes | { id: integer }, { nextId: integer, option: text } |                                                    |
| /nodes/edit/:id  | PUT         | Updates node with given id        | { situation: text }                                |                                                    |
| /nodes/:id       | DELETE      | Deletes node with given id        | { id: integer }                                    |                                                    |

#### /stories

| URl                | HTTP METHOD | DESCRIPTION                         | REQUEST OBJECT                                                                              | RESPONSE OBJECT                                                                                                                              |
|--------------------|-------------|-------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| /stories           | GET         | Gets all stories info               |                                                                                             | [{ id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string }...]              |
| /stories/:id       | GET         | Gets story with a given id          | { id: integer }                                                                             | { id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, username: string } |
| /stories/          | POST        | Adds new story to database          | { name: string, description: text, category: string, media: string, isPrivate, isFinished } | { id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string}                    |
| /stories/:id/first | PUT         | Adds first node id to a given story | { id: integer }, { firstId: integer }                                                       |                                                                                                                                              |
| /stories/:id       | DELETE      | Deletes story with given id         | { id: integer }                                                                             |                                                                                                                                              |






## Components

- Home.js
  - HomeTitle.js
  - About.js
  - Videodisplay.js
- GridStories.js
  - AllStories.js
  - Searchbar.js
  - Profile.js
  - Card.js
- StoryDetails.js
  - CreateStory.js
  - Flowchart.js
  - CreateNode.js
  - NodeCard.js
  - EditNode.js
  - AddEdge.js
- Story.js
  - StoryEnd.js
- AuthProvider.js
  - Register.js
  - Login.js
- NavBar.js
  - PrivateRoute.js

## Support

Feel free to ask me any doubt :)
