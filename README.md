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
- Bootstrap <https://getbootstrap.com/>

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

![Database schema](https://github.com/) TO BE ADDED

### API routes plan



## Components

- ParallaxComponent.js
- GridStories.js
  - AllStories.js
  - Profile.js
- StoryDetails.js
  - CreateStory.js
    - CreateNode.js
    - EditNode.js
    - AddEdge.js
- Story.js
- AuthProvider.js
  - Register.js
  - Login.js
- NavBar.js
  - PrivateRoute.js

## Support

Feel free to ask me any doubt :)
