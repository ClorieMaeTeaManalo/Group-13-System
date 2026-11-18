
import React, { useEffect, useState } from 'react';

function AssignedCleaningTasks() {

    const [tasks, setTasks] = useState([]);

    // Example staff ID
    const staffId = 3;

    useEffect(() => {
        fetch(`http://localhost:3000/api/staff/cleaning-tasks/${staffId}`)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setTasks(result.data);
                }
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h2>Assigned Cleaning Tasks</h2>
            <p>View your assigned cleaning tasks below.</p>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Customer</th>
                        <th>Reservation ID</th>
                        <th>Request Date</th>
                        <th>Task Details</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <tr key={task.cleaning_id}>
                                <td>{task.cleaning_id}</td>
                                <td>{task.customer_name}</td>
                                <td>{task.reservation_id}</td>
                                <td>{task.request_date}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">
                                No assigned cleaning tasks.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AssignedCleaningTasks;
