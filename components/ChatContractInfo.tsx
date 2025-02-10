/**
 * File: /components/ChatContractInfo.tsx
 *
 * Description:
 * - Renders the current contract address.
 */

import React from "react";

interface ChatContractInfoProps {
  contractAddress: string | undefined;
}

const ChatContractInfo: React.FC<ChatContractInfoProps> = ({ contractAddress }) => {
  return (
    <p className="text-gray-600 mb-6">
      Contract: {contractAddress}
    </p>
  );
};

export default ChatContractInfo;
