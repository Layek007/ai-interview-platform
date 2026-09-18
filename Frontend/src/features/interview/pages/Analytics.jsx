import React, { useEffect, useState } from "react";
import { getAllInterviewReports } from "../services/interview.api";

const Analytics = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await getAllInterviewReports();

               const data = Array.isArray(response)
              ? response
              : response?.data ||
               response?.interviews || response?.interviewReports || [];
         
               console.log("ANALYTICS REPORT DATA:", data);
                setReports(data);
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) {
        return <h2>Loading analytics...</h2>;
    }

    if (reports.length === 0) {
        return (
            <div>
                <h1>AI Performance Analytics</h1>
                <p>Complete an interview to see your analytics.</p>
            </div>
        );
    }

    const totalInterviews = reports.length;

    const scores = reports
        .map((report) => report.matchScore)
        .filter((score) => typeof score === "number");

    const averageScore =
        scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

    const highestScore =
        scores.length > 0 ? Math.max(...scores) : 0;

    const totalTechnicalQuestions = reports.reduce(
        (total, report) =>
            total + (report.technicalQuestions?.length || 0),
        0
    );

    const totalBehavioralQuestions = reports.reduce(
        (total, report) =>
            total + (report.behavioralQuestions?.length || 0),
        0
    );

    const skillGaps = reports.reduce(
        (total, report) =>
            total + (report.skillGaps?.length || 0),
        0
    );

    return (
        <div style={{ padding: "30px" }}>
            <h1>AI Performance Analytics</h1>
            <p>Track your interview performance and improvement.</p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                    marginTop: "30px",
                }}
            >
                <div style={cardStyle}>
                    <h3>Total Interviews</h3>
                    <h2>{totalInterviews}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Average Match Score</h3>
                    <h2>{averageScore}%</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Best Score</h3>
                    <h2>{highestScore}%</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Technical Questions</h3>
                    <h2>{totalTechnicalQuestions}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Behavioral Questions</h3>
                    <h2>{totalBehavioralQuestions}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Skill Gaps Found</h3>
                    <h2>{skillGaps}</h2>
                </div>
            </div>

            <div style={{ marginTop: "40px" }}>
                <h2>Interview Performance</h2>

                {reports.map((report, index) => (
                    <div
                        key={report._id || index}
                        style={{
                            marginTop: "20px",
                            padding: "20px",
                            borderRadius: "12px",
                            background: "#202833",
                        }}
                    >
                        <h3>
                            {report.title || `Interview ${index + 1}`}
                        </h3>

                        <p>
                            Match Score:{" "}
                            <strong>
                                {report.matchScore ?? "N/A"}%
                            </strong>
                        </p>

                        <div
                            style={{
                                height: "10px",
                                background: "#444",
                                borderRadius: "10px",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                style={{
                                    width: `${report.matchScore || 0}%`,
                                    height: "100%",
                                    background: "#ff5c75",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const cardStyle = {
    padding: "25px",
    borderRadius: "15px",
    background: "#202833",
    border: "1px solid #3b4654",
};

export default Analytics;