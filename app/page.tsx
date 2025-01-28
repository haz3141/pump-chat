"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { collection, getDocs } from "firebase/firestore";

import { useUserTokens } from "@/hooks/useUserTokens";
import { db } from "@/lib/firebaseConfig";

export default function Home() {
  const { tokens, loading, error, isConnected } = useUserTokens();

  // Function to test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      const collectionRef = collection(db, "testCollection"); // Replace "testCollection" with an actual collection name
      const snapshot = await getDocs(collectionRef);
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
      alert("Firestore connection successful. Check the console for data.");
    } catch (error) {
      console.error("Error connecting to Firestore:", error);
      alert("Failed to connect to Firestore. Check console for errors.");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}
    >
      <h1>Solana Pump Chat</h1>

      <WalletMultiButton />

      {/* Show message when wallet is not connected */}
      {!isConnected && <p>Please connect your wallet to view your tokens.</p>}

      {/* Loading state */}
      {loading && <p>Loading tokens...</p>}

      {/* Error state */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display tokens if wallet is connected and tokens are found */}
      {isConnected && !loading && !error && tokens.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tokens.map((token) => (
            <li key={token.id} style={{ marginBottom: "1rem" }}>
              <strong>
                {token.content.metadata.name} ({token.content.metadata.symbol})
              </strong>
              <br />
              Balance:{" "}
              {token.token_info.balance / 10 ** token.token_info.decimals}
            </li>
          ))}
        </ul>
      )}

      {/* If wallet is connected but no tokens found */}
      {isConnected && !loading && !error && tokens.length === 0 && (
        <p>No tokens found in your wallet.</p>
      )}

      {/* Button to test Firebase connection */}
      <button onClick={testFirebaseConnection} style={{ marginTop: "2rem" }}>
        Test Firebase Connection
      </button>
    </main>
  );
}
