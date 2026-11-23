import React from 'react';
import AssignedCleaningTasks from './AssignedCleaningTask.jsx';

function StaffDashboard({ staff }) {

    return (
        <div>
            <h1>Staff Dashboard</h1>
            <AssignedCleaningTasks staff={staff} />
        </div>
    );
}

export default StaffDashboard;