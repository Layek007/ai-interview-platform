import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import History from "./features/interview/pages/History";
import Analytics from "./features/interview/pages/Analytics.jsx";
import ImprovementPlan from "./features/interview/pages/ImprovementPlan";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        
    path: "/history",
    element: <Protected><History /></Protected>
},
{
  path: "/analytics",
  element: <Protected><Analytics /></Protected>
},
{
    path: "/improvement-plan/:interviewId",
    element: <Protected><ImprovementPlan /></Protected>
},

    
])