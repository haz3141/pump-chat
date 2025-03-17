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
    const privateKey = process.env.STACKS_TREASURY_PRIVATE_KEY;
    if (!privateKey) {
      return NextResponse.json({ error: "Server misconfiguration: Missing STACKS_TREASURY_PRIVATE_KEY" }, { status: 500 });
    }

    // ✅ Contract Deployment Details
    const contractAddress = process.env.NEXT_PUBLIC_STACKS_CONTRACT_ADDRESS || "";
    const contractName = "kult-token";

    // ✅ Transaction Options
    const txOptions = {
      contractAddress,
      contractName,
      functionName: "reward-user",
      functionArgs: [uintCV(rewardAmount), standardPrincipalCV(stacksAddress)],
      network: STACKS_TESTNET,
      senderKey: privateKey, // 🔥 The treasury wallet signs the transaction
    };

    // ✅ Create and Sign the Transaction
    const transaction = await makeContractCall(txOptions);

    // ✅ Broadcast the Transaction (FIXED)
    const broadcastResult = await broadcastTransaction({ transaction }); // ✅ Wrapped inside an object

    // ✅ Handle Response - Prepend "0x" for Hiro Explorer compatibility
    if ((broadcastResult as TxBroadcastResultOk).txid) {
      return NextResponse.json({ txid: `0x${(broadcastResult as TxBroadcastResultOk).txid}` }, { status: 200 });
    } else {
      return NextResponse.json({ error: (broadcastResult as TxBroadcastResultRejected).reason || "Broadcast failed" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 });
  }
}
