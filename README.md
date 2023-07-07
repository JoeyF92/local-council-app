# local-council-app - YourVote

Created by Windows-Wallies: @JoeyF92, @salim1704 and @hasancan99, for 2nd Project in the LaFosse Academy programe.


## Description

The app we created was for a local council, as a form of community engagement and hosting a platform for residents to be able to vote on issues that they submit.  The website has an admin page for uploaded submissions to be reviewed, edited and the status changed. 

The status change is what shows a user which proposals they can vote on, which proposals are currently in progress and what has been completed in the past.


## Installation and Usage
After cloning the repo, run `npm install` to get all required node modules as well as initialising node.

Additionally an [elephantSQL](https://www.elephantsql.com/) instance should be setup and connected as this page is not currently live with a remote database and so you will need to set one up.
This can be done by creating a `.env` file locally in your repo. Inside you should paste your instance URL to a variable `DB_URL= `
In this file you should also set your `PORT=` to a local port you can access (e.g. `PORT=3000`)

Finally run:
`npm run setup-db`  to connect the database
&
`npm run server` to get the server running

You can now access the liveserver locally!

## Technologies
We used:
- Javascript
- Node.js packages included:
  +bcrypt
  +jest
  +express
  +cors
  +pg
  +fs
  +coverage
  +uuid
  +path
- CSS
- HTML

## Process
The backend functionality was completed and tested to a high degree, with versatility in function creation allowing for future front end features to be written without additions to the backend.
Testing for the front is lacking however if we had more time this is something we would have focused on more. 

## Key Features
- Login/Logout/Register
- Upload proposal with form
- View proposals to be voted on
- Vote for a proposal
- View how many votes you have left
- View in-progress proposals
- View completed-proposals
- Admin page for editing proposals and changing the status

## Bugs
-No apparent bugs however assigning admin user is not completed and so any user can manually go on to the admin page to change the back end proposals database. In the future if the page was hosted remotely then we would have to have a fuction to make an authenticated admin user. 
