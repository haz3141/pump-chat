/**
 * File: /components/NoTokensMessage.tsx
 *
 * Description:
 * - Displays a message when no tokens are found in the user’s wallet.
 * - Styled as a centered card with a neutral tone.
 */

import React from "react";

const NoTokensMessage: React.FC = () => {
  return (
    <div className="chat-card text-center py-6">
      <p className="text-gray-600 text-base">
        No tokens found in your wallet.
      </p>
    </div>
  );
};

export default NoTokensMessage;