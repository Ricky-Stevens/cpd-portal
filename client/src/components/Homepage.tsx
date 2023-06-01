// Homepage.tsx

// Importing libraries from React, react-router-dom, and date-fns for functional component building, routing, and date formatting
import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { format } from 'date-fns';

// Axios library is used for making HTTP requests from the browser
import axios from 'axios';

// Using a third-party component for the sliding pane functionality
import SlidingPane from 'react-sliding-pane';
import "react-sliding-pane/dist/react-sliding-pane.css";

// Importing our own stylesheets and types/interfaces
import './Homepage.css';
import {IGoal, IGoalSummary} from '../types/interfaces';

/**
 * Homepage is a functional component that displays a summary of all CPD Goals,
 * and allows the user to click on a goal to view more detail. It also provides
 * an "Add Goal" link for logged in users.
 */
const Homepage: React.FC = () => {

    // data stores the fetched goals summary
    const [data, setData] = useState<IGoalSummary[]>([]);

    // detailData stores the specific details of a selected goal
    const [detailData, setDetailData] = useState<IGoal>();

    // isPaneOpen and selectedGoalId manage the opening of the sliding pane and the goal id to be displayed in the pane
    const [isPaneOpen, setIsPaneOpen] = useState(false);
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

    // isLoggedIn checks if a user is logged in by checking if a token exists in session storage
    const isLoggedIn = !!sessionStorage.getItem('token');

    // useEffect hook to fetch the data when the component mounts
    useEffect(() => {
        // Fetch data function
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_AJAX_HOST +'/goals');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        // Execute fetch data function
        fetchData().catch(x => console.error(x));
    }, []);

    // Function to handle opening of the pane, which includes fetching the details of a goal
    const openPane = async (id: string) => {
        try {
            const response = await axios.get(process.env.REACT_APP_AJAX_HOST + `/goals/${id}`);
            setDetailData(response.data);
            setIsPaneOpen(true);
            setSelectedGoalId(id);
            console.log(isPaneOpen)
        } catch (error) {
            console.error("Error fetching detail: ", error);
        }
    };

    // Function to handle closing of the pane
    const closePane = () => {
        setIsPaneOpen(false);
        setSelectedGoalId(null);
    };

    // Render the component
    return (
      <div className="homepage">
        <div className="table-container">
          {isLoggedIn && <Link className="add-link" to="/admin/add">Add Goal</Link>} {/* Add link to add goal page */}
          <table>
            <thead>
            <tr>
              <th className="header1" colSpan={3}>CPD Goals</th>
              <th className="header2" colSpan={7}>Activity Log</th>
            </tr>
            <tr>
              <th className="col1" colSpan={2}>Goal Summary</th>
              <th className="col2">Desired Outcomes</th>
              <th className="col3">First</th>
              <th className="col3-4"></th>
              <th className="col4">Last</th>
              <th className="col6">Upcoming</th>
              <th className="col7">Open</th>
              <th className="col8">Done</th>
              <th className="col9">Total</th>
            </tr>
            </thead>
            <tbody>
            {data.map((goal) => (
                <tr key={goal.id} onClick={() => openPane(goal.id)} className={`status-${goal.status.toLowerCase()}`}>
                  <td className="col5"><span className={"tab-colour"}>{goal.status ==='Upcoming' ? '?' : goal.status ==='Open' ? '➤' : '✔'}</span></td>
                  <td className="col1">{goal.name}</td>
                  <td className="col2">{goal.description}</td>
                  <td className="col3"><span className={"date-wrapper"}><span className={"top-date"}>{format(new Date(goal.firstDate), 'dd/MM')}</span><span className={"bottom-date"}>{format(new Date(goal.firstDate), 'yyyy')}</span></span></td>
                  <td className="col3-4">
                    <span className={"top-date"}>← {goal.status !== 'Upcoming' ? Math.floor((Date.parse(goal.lastDate) - Date.parse(goal.firstDate)) / 86400000) : '-'} →</span>
                    <span className={"bottom-date"}>Days</span>
                  </td>
                  <td className="col4"><span className={"date-wrapper"}>
                    <span className={"top-date"}>{goal.status !== 'Upcoming' ? format(new Date(goal.lastDate), 'dd/MM') : '-'}</span>
                    <span className={"bottom-date"}>{goal.status !== 'Upcoming' ? format(new Date(goal.lastDate), 'yyyy') : ''}</span>
                  </span></td>
                  <td className="col6">{goal.status ==='Open' || goal.status === 'Upcoming' ? goal.upcomingCount : '-'}</td>
                  <td className="col7">{goal.status ==='Open' ? goal.inProgressCount : '-'}</td>
                  <td className="col8">{goal.status ==='Open' || goal.status === 'Completed' ? goal.completedCount : '-'}</td>
                  <td className="col9">{goal.upcomingCount + goal.inProgressCount + goal.completedCount}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        <SlidingPane
            className='slide-pane'
            overlayClassName='slide-overlay'
            isOpen={isPaneOpen}
            title={detailData?.Title}
            onRequestClose={closePane}
            from='left'
            width='75%'
        >
          <div className={"slider-header"}>
            {isLoggedIn && selectedGoalId && <Link className={"edit-button"} to={`/admin/edit/${selectedGoalId}`}>Edit Goal</Link>}
            <p>{detailData?.Description}</p>
          </div>

          <table className={"activity-table"}>
            <thead>
            <tr>
              <th colSpan={3}>Title</th>
              <th>Format</th>
              <th>Notes</th>
              <th>References</th>
            </tr>
            </thead>
            <tbody>
            {detailData?.Activities.map((detail, index) => (
                <tr key={index}>
                  <td className="col-1"><span className={`tab-colour status-${detail.Status.toLowerCase().replaceAll(' ', '-')}`}>{detail.Status ==='Upcoming' ? '?' : detail.Status ==='In Progress' ? '➤' : '✔'}</span></td>
                  <td className="col-2"><span className={"top-date"}>{format(new Date(detail.FullDate), 'dd/MM')}</span><span className={"bottom-date"}>{format(new Date(detail.FullDate), 'yyyy')}</span></td>
                  <td className="col-3">{detail.Title}</td>
                  <td className="col-4"><span className={`format-colour status-${detail.Format.toLowerCase().replaceAll(' ', '-')}`}>{detail.Format}</span></td>
                  <td className="col-5">{detail.Notes}</td>
                  <td className="col-6">{detail.References}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </SlidingPane>
      </div>
  );
};

export default Homepage;
