// EditGoal.tsx

// Libraries and Dependencies
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import _ from 'lodash';

// Custom Hooks
import { useActivities } from "../hooks/useActivities";

// Components
import ActivityForm from "./ActivityForm";

// Constants
import { statusOptions } from '../constants/constants';

// Helpers
import { validateGoal } from "../helpers/validation";

// Styles
import "react-datepicker/dist/react-datepicker.css";
import './GoalForm.css';
import {IGoal} from "../types/interfaces";

/**
 * EditGoal Component
 *
 * This component is responsible for allowing the user to edit a specific goal.
 * It fetches the goal's data from a server, displays it in a form, and sends the updated data back to the server.
 */
const EditGoal: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('Open');
    const initialActivities = [{ FullDate: new Date(), Status: 'Completed', Format: 'BCS Webinar', Title: '', Notes: '', References: '' }];
    const { activities, addActivity, removeActivity, handleInputChange, handleDateChange, setActivities } = useActivities(initialActivities);

    /**
     * Fetches goal data when the component mounts using the id from the url parameters.
     * It sets the form fields to match the fetched data.
     */
    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const token = sessionStorage.getItem('token') || '';
                const res: AxiosResponse<IGoal> = await axios.get(`${process.env.REACT_APP_AJAX_HOST}/goals/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const goal: IGoal = {
                    ...res.data,
                    Activities: res.data.Activities.map(activity => ({ ...activity, FullDate: new Date(activity.FullDate) }))
                };

                setTitle(goal.Title);
                setDescription(goal.Description);
                setStatus(goal.Status);
                setActivities(goal.Activities);
            } catch (err) {
                console.error('Error fetching goal: ', err);
            }
        }

        fetchGoal().catch(e => console.error(e));
    }, [id, setActivities]);

    /**
     * Handles form submission.
     * It validates the form, sends a request to update the goal and navigates to the homepage.
     */
    const handleSubmit = async () => {
        // Validate form
        if (!validateGoal(title, description, activities)) return;

        try {
            const token = sessionStorage.getItem('token') || '';

            await axios.put(`${process.env.REACT_APP_AJAX_HOST}/goals/${id}`, {
                Title: title,
                Description: description,
                Status: status,
                Activities: _.sortBy(activities, 'FullDate').reverse()
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/');
        } catch (err) {
            console.error('Error updating goal: ', err);
        }
    };

    return (
        <div className="goal-form">
            <h1>Edit Goal Form</h1>
            <div className="main-form">
                <label className="title">
                    <span>Title:</span>
                    <input type="text" name="Title" value={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <label className="status">
                    <span>Status:</span>
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        {statusOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label className="description">
                    <span>Description:</span>
                    <textarea name="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </label>
            </div>
            <div className="activity-form">
                <h2>Activities</h2>
                {activities.map((activity, index) => (
                    <ActivityForm
                        key={index}
                        activity={activity}
                        index={index}
                        handleInputChange={handleInputChange}
                        handleDateChange={handleDateChange}
                        removeActivity={removeActivity}
                    />
                ))}
                <button className="add-new-activity-row" onClick={addActivity}>+</button>
            </div>
            <div className="submit-row">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default EditGoal;
