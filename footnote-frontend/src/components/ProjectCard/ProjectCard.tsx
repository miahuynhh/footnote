/**
 * ProjectCard.tsx
 *
 * This file defines the `ProjectCard` React component, which renders a card
 * representation of a project. Each card displays:
 * - A project title
 * - A thumbnail image
 * - A button with customizable text and functionality
 *
 * Features:
 * - Placeholder image if no thumbnail URL is provided.
 * - Customizable button text and click functionality.
 * - Consistent Bootstrap styling using `react-bootstrap` components.
 */
import React from "react";
import { ProjectData } from "../../types/types"; // Type definition for project data
import Card from "react-bootstrap/Card"; // Bootstrap Card component for styling
import Button from "react-bootstrap/Button"; // Bootstrap Button component for styling

/**
 * Props for the ProjectCard component.
 *
 * @property {ProjectData} project - The project data to display.
 * @property {string} buttonText - Text to display on the button.
 * @property {() => void} onClick - Callback function triggered when the button is clicked.
 */
interface Props {
  project: ProjectData;
  buttonText: string;
  onClick: () => void;
}

/**
 * ProjectCard is a React functional component that renders a card
 * representing a project, including a thumbnail, title, and a button.
 *
 * @param {Props} props - Props for the component.
 * @returns {JSX.Element} - A styled card with project details and a button.
 */
const ProjectCard: React.FC<Props> = ({ project, buttonText, onClick }) => {
  // Destructure project properties
  const { title, thumbnailURL } = project;

  // Placeholder image to use if no thumbnail URL is provided
  const placeholderPic = "https://placehold.co/286x286";

  return (
    <div className="holder">
      {" "}
      {/* Wrapper div for potential custom styling */}
      <Card style={{ width: "18rem" }}>
        {" "}
        {/* Set the card width */}
        {/* Display project thumbnail or placeholder image */}
        <Card.Img variant="top" src={thumbnailURL || placeholderPic} />
        <Card.Body>
          {/* Display project title or "untitled" if no title is provided */}
          <Card.Title>{title || "untitled"}</Card.Title>

          {/* Button with customizable text and click functionality */}
          <Button variant="primary" onClick={onClick}>
            {buttonText}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectCard; // Export the component for use in other parts of the application
