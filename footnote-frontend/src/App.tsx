import { Routes, Route } from "react-router-dom";
import CreateNewProject from "./components/CreateNewProject/CreateNewProject";
import Homepage from "./components/Projects/Homepage";
import Project from "./components/Project/Project";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/projects/new" element={<CreateNewProject />} />
      <Route path="/projects/:pid" element={<Project />} />
    </Routes>
  );
};

export default App;
