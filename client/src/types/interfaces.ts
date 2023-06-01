// models.ts

// Import React ChangeEvent type for event handlers
import { ChangeEvent } from "react";

// Define the structure of an Activity
export interface IActivity {
    FullDate: Date;
    Status: string;
    Format: string;
    Title: string;
    Notes: string;
    References: string;
}

// Define the structure of a Goal Summary
export interface IGoalSummary {
    id: string;
    name: string;
    description: string;
    status: string;
    firstDate: string;
    lastDate: string;
    upcomingCount: number;
    inProgressCount: number;
    completedCount: number;
}

// Define the structure of a Goal
export interface IGoal {
    id: string;
    Title: string;
    Description: string;
    Status: string;
    Activities: IActivity[];
}

// Define the structure of the props for the ActivityForm component
export interface ActivityFormProps {
    activity: IActivity;
    index: number;
    handleInputChange: (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleDateChange: (index: number, date: Date | null) => void;
    removeActivity: (index: number) => void;
}
