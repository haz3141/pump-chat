import { NextRequest, NextResponse } from "next/server";
import { makeContractCall, broadcastTransaction, uintCV, standardPrincipalCV, TxBroadcastResultOk, TxBroadcastResultRejected } from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";

export async function POST(req: NextRequest) {
  try {
    const { stacksAddress, rewardAmount } = await req.json();

    // ✅ Validate Inputs
    if (!stacksAddress || !rewardAmount) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    // ✅ Secure Private Key Access (Server-side only)
    const privateKey = process.env.STACKS_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json({ error: "Server misconfiguration: Missing STACKS_PRIVATE_KEY" }, { status: 500 });
    }

    // ✅ Contract Deployment Details
    const contractAddress = "ST2PQ57VQVWPS69J5W91EM6BXE75QD2Q701ANXXKZ"; // 🔹 Correct contract address
    const contractName = "kult-token";

    // ✅ Transaction Options
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "reward-user",
      functionArgs: [uintCV(rewardAmount), standardPrincipalCV(stacksAddress)],
      network: STACKS_TESTNET,
      senderKey: privateKey,
    };

    // ✅ Create and Sign the Transaction (TypeScript will infer the type)
    const transaction = await makeContractCall(txOptions);

    // ✅ Broadcast the Transaction
    const broadcastResult = await broadcastTransaction({ transaction, network: STACKS_TESTNET });

    // ✅ Handle Response
    if ((broadcastResult as TxBroadcastResultOk).txid) {
      return NextResponse.json({ txid: (broadcastResult as TxBroadcastResultOk).txid }, { status: 200 });
    } else {
      return NextResponse.json({ error: (broadcastResult as TxBroadcastResultRejected).reason || "Broadcast failed" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
