# ReactJS Goal Management Application

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation and Setup Instructions](#installation-and-setup-instructions)
4. [Debugging](#debugging)
5. [Deployment](#deployment)
6. [Key Components](#key-components)
7. [Configuration](#configuration)

## Introduction
This project is a simple and interactive Goal Management application built with ReactJS and TypeScript. The app allows users to manage their goals and associated activities. Goals can be added, edited and managed effectively with a smooth user interface. This project is an excellent example of a modern ReactJS application using hooks, custom hooks, and functional components.

## Features
- Authentication system: Users must log in to use the app.
- CRUD operations: Users can create, read, update, and delete goals.
- Goal management: Each goal can have a title, description, status, and a list of activities.
- Activity management: Each activity has a title, full date, status, format, notes, and references.

## Installation and Setup Instructions
1. Clone this repository to your local machine. `git clone https://github.com/YourUsername/YourRepo.git`
2. Navigate to the project directory. `cd your-repo-name`
3. Install the dependencies. Run `npm install`
4. Run the application in the development mode. `npm start`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Debugging
- Install React Developer Tools extension in your browser for better debugging and inspecting of React elements.
- Console logging: You can use `console.log()` statements to output the value of variables or results of function calls.
- Network debugging: Use the network tab in your browser's Developer Tools to inspect the network requests and responses.

## Deployment
This application can be deployed to any static site hosting platforms such as Vercel or Netlify.

1. Build the app for production by running `npm run build`. This creates a `build` directory with a production build of your app.
2. Follow the deployment instructions specific to your chosen platform.

## Key Components
- `Login`: This component handles user authentication. It includes form fields for username and password and communicates with the server to authenticate the user.
- `Goals`: This component displays a list of all the user's goals. Each goal can be clicked to view its details.
- `EditGoal`: This component displays a form that allows the user to edit a selected goal.
- `AddGoal`: This component presents a form that allows the user to create a new goal.
- `ActivityForm`: This component is part of the EditGoal and AddGoal components. It lets the user manage the activities associated with a goal.

## Configuration

The application configuration is done via a `.env` file. This file is not included in the repository for security reasons, but a `.env.example` file is provided as a template. Simply copy `.env.example` to `.env` and fill in your desired values.

Here is a list of configuration options with a brief description:

| Property                    | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| `REACT_APP_NAME`            | The name of your application.                                  |
| `REACT_APP_AJAX_HOST`       | The URL of your backend server (e.g., http://localhost:3001).  |
| `REACT_APP_FOOTER_TEXT`     | The text to be displayed in the footer of the application.    |
| `REACT_APP_FOOTER_LINKEDIN` | The URL of your LinkedIn profile.                              |
| `REACT_APP_FOOTER_GITHUB`   | The URL of your GitHub profile.                                |
| `REACT_APP_BANNER1_IMAGE`   | The URL of the first banner image.                             |
| `REACT_APP_BANNER1_URL`     | The URL to be opened when the first banner is clicked.         |
| `REACT_APP_BANNER1_ALT`     | The alt text of the first banner image.                        |
| `REACT_APP_BANNER2_IMAGE`   | The URL of the second banner image.                            |
| `REACT_APP_BANNER2_URL`     | The URL to be opened when the second banner is clicked.        |
| `REACT_APP_BANNER2_ALT`     | The alt text of the second banner image.                       |
| `REACT_APP_BANNER3_IMAGE`   | The URL of the third banner image.                             |
| `REACT_APP_BANNER3_URL`     | The URL to be opened when the third banner is clicked.         |
| `REACT_APP_BANNER3_ALT`     | The alt text of the third banner image.                        |

The banner properties allow you to specify up to three banners with their respective images, URLs and alternative texts. If you do not want to use a banner, just leave the respective property value empty.

The LinkedIn and GitHub URLs will be used to create links in the footer of the application. The AJAX_HOST value is the URL of your backend server, where the application will make AJAX requests. Make sure to set this value according to your server setup.
