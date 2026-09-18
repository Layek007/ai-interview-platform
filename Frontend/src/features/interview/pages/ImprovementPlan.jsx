import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getInterviewReportById } from "../services/interview.api";

const ImprovementPlan = () => {
    const { interviewId } = useParams();

    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await getInterviewReportById(interviewId);

                const report = response?.interviewReport;

                setPlan(report?.preparationPlan || []);
            } catch (error) {
                console.error("IMPROVEMENT PLAN ERROR:", error);
                setError("Unable to load improvement plan.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [interviewId]);

    if (loading) {
        return <div>Loading improvement plan...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Personalized Improvement Plan</h1>

            {plan.length === 0 ? (
                <p>No improvement plan available for this interview.</p>
            ) : (
                plan.map((dayPlan, index) => (
                    <div key={index}>
                        <h2>Day {dayPlan.day}</h2>

                        <h3>Focus</h3>
                        <p>{dayPlan.focus}</p>

                        <h3>Tasks</h3>
                        <ul>
                            {dayPlan.tasks?.map((task, taskIndex) => (
                                <li key={taskIndex}>{task}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default ImprovementPlan;

