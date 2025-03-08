/**
 * File: /components/ErrorMessage.tsx
 *
 * Description:
 * - Displays an error message in a prominent, user-friendly format.
 * - Styled as a centered card with red text for visibility.
 */

import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="chat-card text-center py-6">
      <p className="text-red-600 text-base font-medium">
        Error: {message}
      </p>
    </div>
  );
};

export default ErrorMessage;