import PortalLayout from "@/layout";
import Dashboard from "@/pages/Dashboard";
import IdeaSubmission from "@/pages/IdeaSubmission";
import PrioritiseIdeas from "@/pages/PrioritiseIdeas/PrioritiseIdeas";
import ReviewAndScore from "@/pages/ReviewAndScore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //   Navigate,
} from "react-router-dom";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Main portal layout */}
        <Route path="/" element={<PortalLayout />}>
          {/* Dashboard */}
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route index path="/submit-idea" element={<IdeaSubmission />} />
          <Route index path="/review-and-score" element={<ReviewAndScore />} />
          <Route index path="/prioritise-ideas" element={<PrioritiseIdeas />} />
          {/* Other routes can be added here */}
        </Route>

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<>Page Not Found</>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
