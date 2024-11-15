/**
 * AnnotationBaseItem.tsx
 *
 * This file defines the `AnnotationBaseItem` React component, a reusable building block
 * for rendering a styled list item with a timestamp and additional annotation-related content.
 *
 * The component uses Bootstrap for styling and provides the following features:
 * - A timestamp displayed as a clickable button.
 * - Optional functionality to handle clicks on the timestamp via a callback function.
 * - Flexible layout to include additional elements (e.g., annotation text, action buttons).
 */

import React, { ReactNode } from "react";
import { ListGroup, Button } from "react-bootstrap";

/**
 * Props for the AnnotationBaseItem component.
 *
 * @property {string} timestamp - The timestamp to be displayed (e.g., "01:23").
 * @property {ReactNode} children - Additional content or elements to display alongside the timestamp.
 * @property {() => void} [onTimestampClick] - Optional callback function to handle the timestamp button click.
 */
interface AnnotationBaseItemProps {
  timestamp: string;
  children: ReactNode;
  onTimestampClick?: () => void;
}

/**
 * AnnotationBaseItem is a reusable component for displaying a timestamp
 * and additional annotation-related content in a styled list item.
 *
 * @param {AnnotationBaseItemProps} props - Props passed to the component.
 * @returns {JSX.Element} - A styled list item containing a timestamp button and additional content.
 */
const AnnotationBaseItem: React.FC<AnnotationBaseItemProps> = ({
  timestamp,
  children,
  onTimestampClick,
}) => {
  return (
    <ListGroup.Item
      as="li" // Rendered as an HTML <li> element
      className="d-flex justify-content-between align-items-center" // Flexbox layout for spacing and alignment
    >
      {/* Timestamp button which is now a placeholder for later customized button */}
      <Button
        variant="link" // Styled as a hyperlink
        onClick={onTimestampClick} // Attach the click handler
        className="p-0" // Remove padding for a compact button
      >
        <strong>{timestamp}</strong> {/* Display the timestamp in bold */}
      </Button>

      {/* Render any additional children passed to the component */}
      {children}
    </ListGroup.Item>
  );
};

export default AnnotationBaseItem; // Export the component for use in other parts of the application
