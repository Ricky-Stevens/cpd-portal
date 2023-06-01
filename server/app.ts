// Import required libraries
import express, { Request, Response } from 'express';  // Express for building the API
import dotenv from 'dotenv';  // Dotenv to handle environment variables
import cors from 'cors';  // CORS to handle cross-origin requests
import {maxBy, minBy, sumBy} from 'lodash';  // Lodash for utility functions
import {MongoClient, ObjectId} from 'mongodb';  // MongoDB to interact with the database
import {GoalDto, GoalModel} from "./models";  // Importing models
import bodyParser from "body-parser";  // Body-parser to parse the request body
import bcrypt from "bcrypt";  // Bcrypt for password hashing
import jwt from "jsonwebtoken";  // JWT for token generation
import { expressjwt } from "express-jwt";  // Express-jwt for JWT validation

// Load environment variables from .env file
dotenv.config();

// IIFE to enable async/await at the top level
(async () => {

    const cfg = process.env; // Load config from environment variables
    const app = express(); // Initialize the Express application

    // Connect to MongoDB and get the collection
    const collection = (await MongoClient.connect(cfg.MONGODB_URL)).db(cfg.MONGODB_DB).collection(cfg.MONGODB_COLLECTION);

    // Initialize JWT authentication middleware
    const auth = expressjwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256']});

    // Apply middleware to handle CORS, parse JSON and URL encoded bodies, and log requests
    app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true }), (req, res, next) => {
        // Log the request method, URL, and originating IP
        console.log(`${req.ip} - ${req.method} ${req.originalUrl}`);
        // Pass control to the next middleware
        next();
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        // Check if password was sent and if it matches the hashed password
        return req.body.password && bcrypt.compareSync(req.body.password, cfg.HASHED_PASSWORD)
            // If it matches, send a token
            ? res.json({ token: jwt.sign({ admin: true }, cfg.SECRET_KEY) })
            // If it doesn't, send an error
            : res.status(401).json({ error: 'Invalid password' });
    });

    // Endpoint to get all goals
    app.get('/goals', async (req, res) => {
        // Fetch goals from the database, sort them, and convert them to an array
        const rows = await collection.find().sort({ 'Status': -1, 'Activities.0.FullDate': -1 }).toArray() as GoalDto[];
        // Transform the data and send it
        res.json(rows.map(row => ({
            id: row._id, name: row.Title, description: row.Description, status: row.Status,
            firstDate: minBy(row.Activities, 'FullDate')?.FullDate,
            lastDate: maxBy(row.Activities, 'FullDate')?.FullDate,
            upcomingCount: sumBy(row.Activities, x => x.Status === 'Upcoming' ? 1 : 0),
            inProgressCount: sumBy(row.Activities, x => x.Status === 'In Progress' ? 1 : 0),
            completedCount: sumBy(row.Activities, x => x.Status === 'Completed' ? 1 : 0),
        })) as GoalModel[]);
    });

    // Endpoints to get, update a specific goal
    app.route('/goals/:goalid')
        // The GET endpoint is protected, it requires a valid JWT
        .get(async (req, res) => res.json(
            // Fetch the specific goal from the database using the goalid parameter and send it
            await collection.findOne(new ObjectId(req.params.goalid)) as GoalDto
        ))
        // The PUT endpoint is protected, it requires a valid JWT
        .put(auth, async (req, res) => res.json(
            // Update the specific goal in the database using the goalid parameter and the data in the request body
            (await collection.findOneAndUpdate({ _id: new ObjectId(req.params.goalid) }, { $set: req.body })).value ? true : { error: 'Item not found' }
        ));

    // Endpoint to create a new goal
    app.post('/goals', auth, async (req, res) => {
        // Create a new goal in the database with the data in the request body and send the new id
        res.json((await collection.insertOne(req.body)).insertedId);
    });

    // Middleware to handle errors
    app.use((err: any, req: Request, res: Response) => {
        // Log the error stack trace to the console
        console.error(err.stack);
        // Send a generic error message to the client
        res.status(500).send('Error!');
    });

    // Start the server
    app.listen(cfg.PORT, () => console.log(`Server is running on :${cfg.PORT}`));
})();
