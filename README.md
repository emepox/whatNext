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
- React Flow <https://reactflow.dev>
- React Select <https://react-select.com/home>

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

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create 4 tables called `users`, `stories`, `nodes`, and `edges` in your database. Check all them in the database to see the structure.
- Run `npx sequelize-cli db:seed:all` in the project folder of this repository. This will run the seeders from Sequelize so that the database starts with some data.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

Happy coding!

## Architecture

### Database schema

![Database schema](https://github.com/CodeOp-tech/ModularStory/blob/main/client/public/DbSchema.png?raw=true)

### API routes plan

#### /users

| URl                            | HTTP METHOD | DESCRIPTION                            | REQUEST OBJECT                         | RESPONSE OBJECT                                                                                                                                                   |
| ------------------------------ | ----------- | -------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/users/login               | POST        | Provides authentication token          | { username: string, password: string } | token                                                                                                                                                             |
| /api/users/register            | POST        | Adds new user to database              | { username: string, password: string } |                                                                                                                                                                   |
| /api/users/profile             | GET         | Gets all stories from a user           | { id: integer, }                       | [{ id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, username: string, Favouritee: object}] |
| /api/users/dashboard           | GET         | Gets info from a logged in user        | { id: integer, }                       | { id: integer, username: string, password: string, email: string}                                                                                                 |
| /api/users/favourites          | GET         | Gets all favourite stories from a user | { id: integer, }                       | [{ id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, username: string, Favourites: object}] |
| /api/users/favourites          | POST        | Adds story to favourites               | { storyId: integer, id: integer, }     | -                                                                                                                                                                 |
| /api/users/favourites/:storyId | DELETE      | Removes story from favourites          | { id: integer , storyId: integer }     | -                                                                                                                                                                 |

#### /nodes

| URl                   | HTTP METHOD | DESCRIPTION                       | REQUEST OBJECT                                     | RESPONSE OBJECT                                    |
| --------------------- | ----------- | --------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| /api/nodes/:id        | GET         | Gets node with a given id         | { id: integer }                                    | { id: integer, situation: text, StoryID: integer } |
| /api/nodes/           | POST        | Adds new node to database         | { situation: text, StoryID: integer }              | { id: integer, situation: text }                   |
| /api/nodes/:id/edges  | PUT         | Adds edge between two given nodes | { id: integer }, { nextId: integer, option: text } |                                                    |
| /api/nodes/edit/:id   | PUT         | Updates node with given id        | { situation: text }                                |                                                    |
| /api/nodes/:id        | DELETE      | Deletes node with given id        | { id: integer }                                    |                                                    |
| /api/nodes/edit/:id   | PUT         | Edits node                        | { id: integer }, { situation: text }               | -                                                  |
| /api/nodes/:id/edges  | DELETE      | Deletes edges                     | { id: integer }, { nextId: integer}                | -                                                  |
| /api/nodes/:id/coords | PUT         | Adds coordenates on the nodes     | { id: integer }, { x: integer, y: integer }        |                                                    |

#### /stories

| URl                          | HTTP METHOD | DESCRIPTION                         | REQUEST OBJECT                                                                                                                                      | RESPONSE OBJECT                                                                                                                                                  |
| ---------------------------- | ----------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /api/stories                 | GET         | Gets all stories info               | [{ id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, Favouritee: object }...] |
| /api/stories/:id             | GET         | Gets story with a given id          | { id: integer }                                                                                                                                     | { id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string, username: string, Favouritee: object } |
| /api/stories/                | POST        | Adds new story to database          | { name: string, description: text, category: string, media: string, isPrivate, isFinished }                                                         | { id: integer, name: string, description: text, category: string, reproductions: integer, rating: integer, media: string }                                        |
| /api/stories/:id/first       | PUT         | Adds first node id to a given story | { id: integer }, { firstId: integer }                                                                                                               |                                                                                                                                                                  |
| /api/stories/:id             | DELETE      | Deletes story with given id         | { id: integer }                                                                                                                                     |                                                                                                                                                                  |
| /api/stories/:id/nodes       | GET         | Gets all nodes from a story         | { id: integer }                                                                                                                                     | [{id: integer, situation: text, storyId: integer, x: integer, y: integer, Start: object}...]                                                                     |
| /api/stories/:StoryId/rating | PUT         | Upserts reviews                     | { id: integer }, {score: integer, storyId: integer }                                                                                                 | -                                                                                                                                                                |
| /api/stories/:id/finish      | PUT         | Switches isFinished to true         | { id: integer }                                                                                                                                     | -                                                                                                                                                                |
| /api/stories/:id/rating      | GET         | Gets global rating of a story       | { id: integer }                                                                                                                                      | {average: integer, amount: integer }                                                                                                                              |

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

Feel free to ask us any doubt :)
