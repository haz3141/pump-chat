import { NextRequest, NextResponse } from "next/server";
import {
  makeContractCall,
  broadcastTransaction,
  uintCV,
  standardPrincipalCV,
  TxBroadcastResultRejected,
  StacksTransactionWire,
} from "@stacks/transactions";
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
      return NextResponse.json(
        { error: "Server misconfiguration: Missing STACKS_TREASURY_PRIVATE_KEY" },
        { status: 500 }
      );
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
    const transaction: StacksTransactionWire = await makeContractCall(txOptions);

    // ✅ Fix: Pass `{ transaction }` correctly
    const broadcastResult = await broadcastTransaction({ transaction });

    // ✅ Handle Response - Prepend "0x" for Hiro Explorer compatibility
    if ("txid" in broadcastResult) {
      return NextResponse.json({ txid: `0x${broadcastResult.txid}` }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: (broadcastResult as TxBroadcastResultRejected).reason || "Broadcast failed" },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    // ✅ Fix: Type-safe error handling
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
