// useActivities.ts

// This module provides a custom hook "useActivities" which provides
// state and functions for managing activities data.

import { useState, ChangeEvent } from 'react';
import { IActivity } from '../types/interfaces';

// This is a custom hook that takes an array of initial activities
// and provides functionalities for managing the activities state.
export const useActivities = (initialActivities: IActivity[]) => {

    // "activities" state is initialized with the provided "initialActivities".
    // "setActivities" is the function to update this state.
    const [activities, setActivities] = useState<IActivity[]>(initialActivities);

    // "addActivity" function adds a new activity to the state.
    // This is done by creating a new array that consists of
    // all previous activities plus a new default activity, and
    // then setting the "activities" state to this new array.
    const addActivity = () => {
        setActivities(prevActivities => [
            ...prevActivities,
            { FullDate: new Date(), Status: 'Completed', Format: 'Online Resource', Title: '', Notes: '', References: '' }
        ]);
    };

    // "removeActivity" function removes an activity at a given index.
    // This is done by filtering out the activity at the given index.
    // It only removes an activity if there are more than one activities.
    const removeActivity = (index: number) => {
        if (activities.length > 1) {
            setActivities(prevActivities => prevActivities.filter((activity, i) => i !== index));
        }
    };

    // "handleInputChange" function updates an activity's field at a given index.
    // It updates the field based on the name and value of the event's target.
    // It only updates if the field is not 'FullDate'.
    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name !== 'FullDate') {
            setActivities(prevActivities =>
                prevActivities.map((activity, i) =>
                    i !== index ? activity : { ...activity, [name]: value },
                ),
            );
        }
    };

    // "handleDateChange" function updates an activity's FullDate at a given index.
    // It updates the date if a valid date is provided.
    const handleDateChange = (index: number, date: Date | null) => {
        if (date) {
            setActivities(prevActivities =>
                prevActivities.map((activity, i) =>
                    i !== index ? activity : { ...activity, FullDate: date },
                ),
            );
        }
    };

    // The hook returns the activities state and the functions for managing this state.
    return { activities, addActivity, removeActivity, handleInputChange, handleDateChange, setActivities };
};
