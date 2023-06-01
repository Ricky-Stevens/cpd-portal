// validation.ts

// This module provides a "validateGoal" function for validating goal data.

import { IActivity } from '../types/interfaces';

/**
 * Validates goal data.
 *
 * @param title - The title of the goal.
 * @param description - The description of the goal.
 * @param activities - The activities of the goal.
 *
 * @returns true if the data is valid; otherwise, false.
 *
 * This function checks that the title and description are not empty,
 * and that each activity has a title and a date. If a validation
 * check fails, it alerts the user with the appropriate message and
 * returns false. If all checks pass, it returns true.
 */
export const validateGoal = (title: string, description: string, activities: IActivity[]): boolean => {

    // Check if the title is empty.
    if (!title.trim()) {
        alert('Title is required');
        return false;
    }

    // Check if the description is empty.
    if (!description.trim()) {
        alert('Description is required');
        return false;
    }

    // Check if each activity has a title and a date.
    for (let activity of activities) {
        if (!activity.Title.trim()) {
            alert('Activity Title is required');
            return false;
        }

        if (!activity.FullDate) {
            alert('Activity Date is required');
            return false;
        }
    }

    // If all checks pass, return true.
    return true;
}
