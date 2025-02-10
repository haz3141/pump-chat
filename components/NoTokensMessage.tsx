/**
 * File: /components/NoTokensMessage.tsx
 * Description:
 * - Displays a message when no tokens are found.
 */

import React from "react";

const NoTokensMessage: React.FC = () => {
  return (
    <p className="text-gray-600">No tokens found in your wallet.</p>
  );
};

export default NoTokensMessage;
