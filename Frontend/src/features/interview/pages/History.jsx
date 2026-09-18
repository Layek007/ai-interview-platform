import { useEffect, useState } from "react";
import { getAllInterviewReports } from "../services/interview.api";
import { useNavigate } from "react-router";

const History = () => {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await getAllInterviewReports();
                console.log("HISTORY API RESPONSE:",response);

                // Handle different possible API response formats
               const reports =
                             Array.isArray(response)
                                   ? response
                                   : response?.data ||
                                    response?.interviews ||
                                     response?.interviewReports ||
                                     [];

                setInterviews(reports);
            } catch (error) {
                console.error("Failed to fetch interview history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) {
        return <div>Loading interview history...</div>;
    }

    return (
        <div>
            <h1>Interview History</h1>

            {interviews.length === 0 ? (
                <p>No previous interviews found.</p>
            ) : (
                <div>
                    {interviews.map((interview) => (
                        <div
                            key={interview._id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "20px",
                                margin: "15px 0",
                                borderRadius: "10px"
                            }}
                        >
                            <h2>{interview.title}</h2>

                            <p>
                                <strong>Match Score:</strong>{" "}
                                {interview.matchScore ?? "N/A"}%
                            </p>

                            <p>
                                <strong>Date:</strong>{" "}
                                {interview.createdAt
                                    ? new Date(
                                          interview.createdAt
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                            <p>
                                <strong>Technical Questions:</strong>{" "}
                                {interview.technicalQuestions?.length || 0}
                            </p>

                            <p>
                                <strong>Behavioral Questions:</strong>{" "}
                                {interview.behavioralQuestions?.length || 0}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(`/interview/${interview._id}`)
                                }
                            >
                                View Report
                            </button>
                            <button
                                 onClick={() =>
                                 navigate(`/improvement-plan/${interview._id}`)
                             }
                        >
  Improvement Plan
</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;