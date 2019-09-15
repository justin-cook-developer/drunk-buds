## Drunk Buds

Drunk Buds is a realtime, fullstack CRUD application for creating drinking groups with friends.
This project was assigned assigned for Stackathon, a one week solo project at Fullstack Academy.

## Major Technologies/Frameworks

<b>Back End</b>

- [Node]
- [Express]
- [PostgreSQL]
- [Sequelize]
- [Socket.io]

<b>Front End</b>

- [HTML5 Geolocation]
- [Bulma]
- [React]
- [React Router]
- [Redux]
- [React Redux]
- [Redux Reselect]
- [Socket.io]
- [Google Maps React]

<b>Testing and Development</b>

- [Webpack]
- [Babel]

## Features

<b>Users can:</b>

- Log in / Sign up
- Edit their profile and password
- Create Groups
- Delete Groups they created
- Add friends to groups by username
- Remove friends from groups
- See the groups they belong to
- See the members in a group and each members location (if they are online)


## Usage

See the deployed version here: (https://drunk-buds.herokuapp.com/#/).

Sign up and create a group! Then add users to the group. A test user with username: 'testt' and password: 'testt' exists. 
If you have your created user logged in on one tab, and 'testt' logged in on another tab, you should be able to see the 
position data on that group's map. Positioning data is only available while users are logged in and the browser is open.

The currently deployed branch is 'master'.

## Installation

If you do not have Node (https://nodejs.org/en/download/) and PostgreSQL (https://postgresapp.com/downloads.html) installed, you will need to install both.

<b>Then:</b>

- Clone this directory && cd into 'acme-schools'
- Create the database 'drunkBuds' by executing `createdb drunkBuds` in the terminal or using a GUI
- execute `npm install` to install the packages
- execute `npm run start:dev` to start the application server
- navigate to (http://localhost:3000/#/) in the browser
