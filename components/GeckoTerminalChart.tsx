/**
 * File: /components/GeckoTerminalChart.tsx
 * Description:
 * - Component to display GeckoTerminal chart using an iframe.
 */

import React from "react";

interface GeckoTerminalChartProps {
  contractAddress: string;
}

const GeckoTerminalChart: React.FC<GeckoTerminalChartProps> = ({ contractAddress }) => {
  const iframeSrc = `https://www.geckoterminal.com/solana/pools/${contractAddress}?embed=1&info=0&swaps=1&grayscale=0&light_chart=0`;

  return (
    <div className="w-full h-96">
      <iframe
        height="100%"
        width="100%"
        id="geckoterminal-embed"
        title="GeckoTerminal Embed"
        src={iframeSrc}
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GeckoTerminalChart;
