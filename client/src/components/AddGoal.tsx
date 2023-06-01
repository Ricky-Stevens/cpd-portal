// AddGoal.tsx

// Libraries and Dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from "lodash";

// Custom Hooks
import { useActivities } from '../hooks/useActivities';

// Components
import ActivityForm from './ActivityForm';

// Constants
import { statusOptions } from '../constants/constants';

// Helpers
import { validateGoal } from '../helpers/validation';

// Styles
import 'react-datepicker/dist/react-datepicker.css';
import './GoalForm.css';


/**
 * AddGoal Component
 *
 * This component is used to create new goals. It displays a form where the user can enter a title,
 * description, status, and activities for a new goal. Upon submission, it sends a POST request
 * to the server with the entered data.
 */
const AddGoal: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('Open');
    const initialActivities = [{ FullDate: new Date(), Status: 'Completed', Format: 'BCS Webinar', Title: '', Notes: '', References: '' }];
    const { activities, addActivity, removeActivity, handleInputChange, handleDateChange } = useActivities(initialActivities);

    /**
     * Handles form submission.
     * It validates the form, sends a POST request to create a new goal, and navigates to the homepage.
     */
    const handleSubmit = async () => {
        if (!validateGoal(title, description, activities)) return;

        try {
            const token = sessionStorage.getItem('token') || '';
            await axios.post(`${process.env.REACT_APP_AJAX_HOST}/goals`, {
                Title: title,
                Description: description,
                Status: status,
                Activities: _.sortBy(activities, 'FullDate').reverse()
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate('/');
        } catch (err) {
            console.error('Error creating goal: ', err);
        }
    };

    return (
        <div className="goal-form">
            <h1>Add Goal Form</h1>
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

export default AddGoal;
