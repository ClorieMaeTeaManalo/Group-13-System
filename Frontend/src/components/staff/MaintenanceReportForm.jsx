
import React, { useEffect, useState } from 'react';
import './MaintenanceReportForm.css';

function MaintenanceReportForm({ staffId }) {

    const [issueTitle, setIssueTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reports, setReports] = useState([]);

    // Get maintenance report history
    const getMaintenanceReports = () => {
        fetch(`http://localhost:3000/api/staff/maintenance-reports/${staffId}`)
        .then(response => response.json())
        .then(result => {
            console.log("Staff ID:", staffId);
            console.log("Maintenance Reports:", result);

            if (result.success) {
                setReports(result.data);
            }
        })
        .catch(error => console.log(error));
};

    useEffect(() => {
        getMaintenanceReports();
    }, [staffId]);

    // Submit maintenance report
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:3000/api/staff/maintenance-reports',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        staffId,
                        issueTitle,
                        description
                    })
                }
            );

            const result = await response.json();

            alert(result.message);

            if (result.success) {
                setIssueTitle('');
                setDescription('');

                // Refresh report history
                getMaintenanceReports();
            }

        } catch (error) {
            console.log(error);
            alert('Failed to submit maintenance report.');
        }
    };

    return (
        <div className="maintenance-report-container">

            {/* Maintenance Report Form */}
            <div className="maintenance-form-section">

                <h3>Submit Maintenance Report</h3>

                <form
                    className="maintenance-report-form"
                    onSubmit={handleSubmit}
                >

                    <label>Issue Title</label>

                    <input
                        type="text"
                        value={issueTitle}
                        onChange={(e) => setIssueTitle(e.target.value)}
                        placeholder="Enter issue title"
                        required
                    />

                    <label>Problem Description</label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the problem"
                        required
                    />

                    <button type="submit">
                        Submit Maintenance Report
                    </button>

                </form>
            </div>

            {/* Maintenance Report History */}
            <div className="maintenance-history-section">

                <h3>Maintenance Report History</h3>

                {reports.length > 0 ? (
                    <div className="maintenance-history-list">

                        {reports.map(report => (
                            <div
                                className="maintenance-history-card"
                                key={report.maintenance_id}
                            >

                                <h4>{report.issue_title}</h4>

                                <p>
                                    <strong>Report Date:</strong>{' '}
                                    {new Date(report.created_at).toLocaleDateString('en-GB', {
                                        timeZone: 'Asia/Manila'
                                    })}
                                </p>

                                <p>
                                    <strong>Description:</strong>{' '}
                                    {report.description}
                                </p>

                                <p>
                                    <strong>Priority:</strong>{' '}
                                    {report.priority}
                                </p>

                                <p>
                                    <strong>Status:</strong>{' '}
                                    {report.status}
                                </p>

                            </div>
                        ))}

                    </div>
                ) : (
                    <p>No maintenance reports submitted yet.</p>
                )}

            </div>

        </div>
    );
}

export default MaintenanceReportForm;
