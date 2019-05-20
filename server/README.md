## Quip Thinking Server-side Configuration

### Getting started
To contribute or use the code in `server/` you need will to do a few things.  

Run `npm install`  

Create a .env file in the root of `server/` with the following information:  
``` 
DB_URL_DEV=your-dev-db 
PORT_DEV=your-dev-port

DB_URL_TEST=your-test-db
PORT_TEST=your-test-port

```

To get the [prompts](https://github.com/nyu-software-engineering/quip-thinking/blob/master/prompts/prompts.csv) on your local machine, `cd server/` and run the command `npm run updateDB`.

After the prompts are added to the databse, the following will be printed on the terminal `Added 432 questions to the database`. If the program lags, press `Ctrl+c`

### Real-Time App
The server is implemented using [socket-io](https://npmjs.com/package/socket.io). There are a number of event listeners which can be found in the [socket-config.js](https://github.com/nyu-software-engineering/quip-thinking/blob/master/server/socket/socket-config.js).  

To **start** : `npm run sock`.  
To **test**: `npm run sockTest`.  
The test cases are also a good reference for how to use the socket.io events on the client side.  

 
