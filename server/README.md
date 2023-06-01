# CPD Goal Tracker API

This is a Node.js API for a CPD Goal Tracker application. It provides endpoints for managing goals and their associated activities. This API uses MongoDB for data storage, and it includes authentication and logging features.

## Application Flow

The application starts by loading the environment variables from the `.env` file with the help of the `dotenv` package. After establishing a connection to the MongoDB database, an Express application is created.

The application is configured to use CORS and to parse JSON and URL-encoded bodies. It also includes a simple logging middleware that logs each incoming request.

The `/login` endpoint allows an admin user to authenticate by sending a password in the request body. If the password matches the hashed password in the environment variables, a JSON Web Token (JWT) is returned.

The application provides several endpoints for managing goals:

- `GET /goals`: Returns a list of all goals in the database.
- `GET /goals/:goalid`: Returns a specific goal.
- `POST /goals`: Creates a new goal.
- `PUT /goals/:goalid`: Updates a specific goal.

These endpoints, except `GET /goals` and `GET /goals/:goalid`, require authentication. The application uses JWTs for authentication, and it expects a valid token to be included in the `Authorization` header of the request.

The application also includes an error-handling middleware that logs the error stack trace and sends a `500` response.

Finally, the application starts listening for connections on the port specified in the environment variables.

## Environment Variables

This application uses the following environment variables, which should be specified in a `.env` file in the project's root directory. A `.env.example` file is provided as a template.

- `MONGODB_URL`: The connection string for the MongoDB database.
- `MONGODB_DB`: The name of the MongoDB database to use.
- `MONGODB_COLLECTION`: The name of the MongoDB collection to use.
- `SECRET_KEY`: The secret key used to sign JSON Web Tokens.
- `HASHED_PASSWORD`: The bcrypt-hashed password for the admin user.
- `PORT`: The port on which the application should listen for connections.

## Running the Application

After cloning the repository and navigating to the project's directory, run `npm install` to install the application's dependencies. Then, create a `.env` file in the project's root directory and specify the environment variables as described in the previous section.

Once the environment variables have been set, start the application by running `npm start`.

## Docker

A Dockerfile is also provided. To build a Docker image for the application, navigate to the project's directory and run `docker build -t goal-tracker-api .`. Then, start a container from the image by running `docker run -p 8080:8080 goal-tracker-api`.

Remember to replace `8080` with the port specified in the `PORT` environment variable.
