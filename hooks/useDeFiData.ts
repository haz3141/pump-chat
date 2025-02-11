/**
 * File: /hooks/useDeFiData.ts
 * Description:
 * - Custom hook to fetch DeFi data from Gecko Terminal API.
 */

import { useEffect, useState } from "react";
import axios from "axios";

interface DeFiData {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      address: string;
      symbol: string;
      decimals: number;
      total_supply: string;
      price_usd: string;
      fdv_usd: string;
      total_reserve_in_usd: string;
      volume_usd: {
        h24: string;
      };
      market_cap_usd: string | null;
    };
    relationships: {
      top_pools: {
        data: {
          id: string;
          type: string;
        }[];
      };
    };
  };
}

const useDeFiData = (network: string, contractAddress: string) => {
  const [data, setData] = useState<DeFiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://api.geckoterminal.com/api/v2/networks/${network}/tokens/${contractAddress}`
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch DeFi data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [network, contractAddress]);

  return { data, loading, error };
};

export default useDeFiData;
