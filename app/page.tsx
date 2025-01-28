"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router

import { useUserTokens } from "@/hooks/useUserTokens";
import { db } from "@/lib/firebaseConfig";

export default function Home() {
  const { tokens, loading, error, isConnected } = useUserTokens();
  const [fetchedData, setFetchedData] = useState([]); // Store fetched Firestore data
  const router = useRouter();

  // Fetch Firestore data
  const fetchFirestoreData = async () => {
    try {
      const collectionRef = collection(db, "testCollection");
      const snapshot = await getDocs(collectionRef);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched Firestore Data:", data);
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
      alert("Failed to fetch Firestore data.");
    }
  };

  useEffect(() => {
    fetchFirestoreData(); // Auto-fetch on component load
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">Solana Pump Chat</h1>

      <WalletMultiButton />

      {!isConnected && (
        <p className="text-gray-600">Please connect your wallet to view your tokens.</p>
      )}

      {loading && <p className="text-gray-500">Loading tokens...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display tokens if wallet is connected */}
      {isConnected && !loading && !error && tokens.length > 0 && (
        <ul className="w-full max-w-lg space-y-4">
          {tokens.map((token) => (
            <li
              key={token.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white flex items-center justify-between"
            >
              <div>
                <strong className="block text-gray-800">
                  {token.content.metadata.name} ({token.content.metadata.symbol})
                </strong>
                <span className="text-gray-600">
                  Balance: {token.token_info.balance / 10 ** token.token_info.decimals}
                </span>
              </div>
              {/* Chat button */}
              <button
                onClick={() => router.push(`/chat/${token.id}`)}
                className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                Join Chat
              </button>
            </li>
          ))}
        </ul>
      )}

      {isConnected && !loading && !error && tokens.length === 0 && (
        <p className="text-gray-600">No tokens found in your wallet.</p>
      )}

      {/* Button to test Firebase connection */}
      <button
        onClick={fetchFirestoreData}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Fetch Firestore Data
      </button>

      {fetchedData.length > 0 && (
        <section className="w-full max-w-lg mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Fetched Data:</h2>
          <ul className="space-y-4">
            {fetchedData.map((item) => (
              <li
                key={item.id}
                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
              >
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Message:</strong> {item.message}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
