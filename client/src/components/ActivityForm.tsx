// ActivityForm.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ActivityForm.css'
import { activityStatusOptions, activityFormatOptions } from '../constants/constants';
import {ActivityFormProps} from "../types/interfaces";

const ActivityForm: React.FC<ActivityFormProps> = ({ activity, index, handleInputChange, handleDateChange, removeActivity }) => {

    return (
        <div className="activity-row">
            <button className="remove-activity" onClick={() => removeActivity(index)}>X</button>
            <label className="title">
                <span>Title:</span>
                <input type="text" name="Title" value={activity.Title} onChange={e => handleInputChange(index, e)} />
            </label>
            <label className="date">
                <span>Full Date:</span>
                <DatePicker selected={activity.FullDate} onChange={date => handleDateChange(index, date as Date)} />
            </label>
            <label className="status">
                <span>Status:</span>
                <select name="Status" value={activity.Status} onChange={e => handleInputChange(index, e)}>
                    {activityStatusOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <label className="format">
                <span>Format:</span>
                <select name="Format" value={activity.Format} onChange={e => handleInputChange(index, e)}>
                    {activityFormatOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </label>
            <label className="notes">
                <span>Notes:</span>
                <textarea name="Notes" value={activity.Notes} onChange={e => handleInputChange(index, e)} />
            </label>
            <label className="references">
                <span>References:</span>
                <textarea name="References" value={activity.References} onChange={e => handleInputChange(index, e)} />
            </label>
        </div>
    );
};

export default ActivityForm;
