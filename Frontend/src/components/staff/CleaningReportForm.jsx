import React, { useState } from 'react';
import './CleaningReportForm.css';

function CleaningReportForm({ task, staffId }) {

    const [completedAt, setCompletedAt] = useState('');
    const [roomCondition, setRoomCondition] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3000/api/staff/cleaning-tasks/${task.cleaning_id}/report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staffId: staffId,
                completedAt: completedAt,
                roomCondition: roomCondition
            })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Cleaning report submitted successfully!');

                setCompletedAt('');
                setRoomCondition('');
            } else {
                alert(result.message);
            }
        })
        .catch(error => {
            console.log(error);
            alert('Failed to submit cleaning report.');
        });
    };

    return (
        <form className="cleaning-report-form" onSubmit={handleSubmit}>
            <h3>Cleaning Report</h3>

            <label>Completion Date:</label>
            <input
                type="date"
                value={completedAt}
                onChange={(e) => setCompletedAt(e.target.value)}
                required
            />

            <label>Room Condition:</label>
            <textarea
                value={roomCondition}
                onChange={(e) => setRoomCondition(e.target.value)}
                placeholder="Enter the room condition after cleaning"
                required
            />

            <button type="submit">Submit Report</button>
        </form>
    );
}

export default CleaningReportForm;
