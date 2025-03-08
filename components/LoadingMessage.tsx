/**
 * File: /components/LoadingMessage.tsx
 *
 * Description:
 * - Displays a loading message with a subtle animation.
 * - Styled as a centered card for consistency with the chat app design.
 */

import React from "react";

const LoadingMessage: React.FC = () => {
  return (
    <div className="chat-card text-center py-6">
      <p className="text-gray-500 text-base">
        Loading tokens... <span className="inline-block animate-pulse">⏳</span>
      </p>
    </div>
  );
};

export default LoadingMessage;