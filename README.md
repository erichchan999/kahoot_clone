# Kahoot Clone
A kahoot clone. Users can login and create quizzes, and also start sessions where other users can join. Scores are released at the end of a quiz session.

Backend code was provided elsewhere. My work only involves the frontend component.

## Backend

Run `npm install` once.

Run `npm start` to start the backend server.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. http://localhost:5005). This will list all of the HTTP routes that you can interact with.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run npm run reset in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy database.json. If you want to start with an empty database, you can run npm run clear in the backend directory.

Once the backend has started, you can view the API documentation by navigating to http://localhost:[port] in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in frontend/src/config.js. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.


## Frontend

Run `npm install` once.

Run `npm start` to start the frontend. The frontend will be served over port 3000 on localhost (http://localhost:3000).
