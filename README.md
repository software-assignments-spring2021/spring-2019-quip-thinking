# Quip Thinking
[![Build Status](https://travis-ci.com/nyu-software-engineering/quip-thinking.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/quip-thinking)

**Quip Thinking** is a game based off of the popular game called Quiplash, originally made by the developers at Jackbox Games.

The original game involves two people answering witty prompts and their friends voting on which answer they liked the most. Quip Thinking puts a new spin on the game to give users a fresh take.

We give users the ability to play with anyone, from their friends to strangers, from the comfort of their computers or phones. They can join a public room, or make their own private room with a room code to play with friends. Users can also add their own prompt (first vetted by our software, of course!) to our database of prompts.

## Project Requirements

You can read our project requirements <a href="REQUIREMENTS.md">here</a>.

## Contributing Info

Do you want to contribute to this project? Please read <a href="CONTRIBUTING.md">these</a> guidelines first.

## Installation
1. Clone our project: `git clone https://github.com/nyu-software-engineering/quip-thinking.git`!
2. Client instructions
    - Go into the client folder (`cd client`)
    - Install dependencies (`npm install`)
3. Server instructions
    - Go into the server folder (`cd server`)
    - Install dependencies (`npm install`)
    - Set up your MongoDB database
        - Install MongoDB
        - Open a new terminal instance and type `mongod`
        - Create the quip database by opening up a new terminal instance and typing `mongo` then `use quip`
    - Create a .env file in the root of `server/` with the following information:  
    ``` 
    DB_URL_DEV=mongodb://localhost:27017/quip 
    PORT_DEV=1337
    NODE_ENV=DEV

    DB_URL_TEST=mongodb://localhost:27017/quiptest
    PORT_TEST=8889
    ```
    - Get the [prompts](https://github.com/nyu-software-engineering/quip-thinking/blob/master/prompts/prompts.csv) into your database by running the command `npm run updateDB`.

## Running & Testing
### Running
Start the server in `server` directory with `npm run sock`.

Start the client in `client` directory with `npm start` in a different terminal or command-line instance.

### Testing
Run tests for server with `npm run sockTest` in the `server` directory.

Run tests for client with `npm test` in the `client` directory.

## Authors

**Disha Gupta** - (NYU '19) [dishagupta15](https://github.com/dishagupta15)

Disha is currently a senior in CAS majoring in Computer Science. After graduation this May, she is heading to Bank of America to begin her role as a Technology Analyst. She is currently passionate about data science.

**Richard Jin** - (NYU '19) [richardjin10](https://github.com/richardjin10)

Richard is currently a senior in CAS majoring in Computer Science. He is currently passionate about front-end development.

**Larry Liu** - (NYU '20) [lawrencelarryliu](https://github.com/lawrencelarryliu)

Larry is currently a junior in CAS majoring in Computer Science. After this semester, he is heading to Lyft and then Facebook to begin his role as a Software Engineering Intern.  He is currently passionate about full stack development.

**Rebecca Shi** - (NYU '19) [rebecca112233](https://github.com/rebecca112233)

Rebecca is currently a senior in CAS majoring in Computer Science. After graduation this May, she is heading to JP Morgan and Chase to begin her role as a Software Engineer. She is currently passionate about UI/UX.

**Jody Simpson** - (NYU '19) [jodz959](https://github.com/jodz959)

Jody is currently a senior in CAS majoring in Computer Science. After graduation this May, she will be working as a software engineer.
