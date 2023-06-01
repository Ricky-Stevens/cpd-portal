/*
 * This file defines the data models used in the application.
 * These models represent the structure of the objects that are stored in the database and used in the application.
 * They help to enforce type safety, ensuring that the data being used matches the expected structure.
 */

// Import ObjectId from MongoDB to use it in our interfaces.
import { ObjectId } from "mongodb";

/**
 * ActivityDto interface represents an activity related to a goal.
 *
 * @property FullDate - Date of the activity
 * @property Status - Status of the activity such as 'Upcoming', 'In Progress', or 'Completed'
 * @property Format - Format of the activity
 * @property Title - Title of the activity
 * @property Notes - Additional notes for the activity
 * @property References - References related to the activity
 */
export interface ActivityDto {
    FullDate: Date;
    Status: string;
    Format: string;
    Title: string;
    Notes: string;
    References: string;
}

/**
 * GoalDto interface represents a goal.
 *
 * @property _id - Unique identifier for the goal
 * @property Title - Title of the goal
 * @property Description - Description of the goal
 * @property Status - Status of the goal
 * @property Activities - Array of activities related to the goal
 */
export interface GoalDto {
    _id: ObjectId;
    Title: string;
    Description: string;
    Status: string;
    Activities: ActivityDto[];
}

/**
 * GoalModel interface represents a goal model used in responses.
 *
 * @property id - Unique identifier for the goal
 * @property name - Name of the goal
 * @property description - Description of the goal
 * @property firstDate - Date of the first activity
 * @property lastDate - Date of the last activity
 * @property status - Status of the goal
 * @property upcomingCount - Count of upcoming activities
 * @property inProgressCount - Count of activities in progress
 * @property completedCount - Count of completed activities
 */
export interface GoalModel {
    id: ObjectId;
    name: string;
    description: string;
    firstDate: Date;
    lastDate: Date;
    status: string;
    upcomingCount: number;
    inProgressCount: number;
    completedCount: number;
}
