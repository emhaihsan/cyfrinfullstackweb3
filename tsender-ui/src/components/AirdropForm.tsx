"use client ";

import { useState } from "react";
import InputField from "./ui/InputField";
import { chainsToTSender, tsenderAbi, erc20Abi } from "@/constants";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { useMemo } from "react";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const total = useMemo(() => calculateTotal(amounts), [amounts]);
  const { data: hash, isPending, writeContractAsync } = useWriteContract({});

  async function getTokenDecimals(tokenAddress: string): Promise<number> {
    const decimals = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "decimals",
    });
    return decimals as number;
  }

  function convertToSmallestUnit(amount: string, decimals: number): bigint {
    const [whole, fraction = ""] = amount.split(".");
    const paddedFraction = fraction.padEnd(decimals, "0");
    return BigInt(whole + paddedFraction);
  }

  async function getApprovedAmount(
    tSenderAddress: string | null
  ): Promise<number> {
    if (!tSenderAddress) {
      alert("No address found, please use a supported chain");
      return 0;
    }
    // read from the chain to see ig we have pproved enough token
    // allowance
    const response = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });

    return response as number;
  }

  async function handleSubmit() {
    // 1. Approve our tsender contract to send out tokens
    // 1a. If already approved, moved to step 2
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined

    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    const approvedAmount = await getApprovedAmount(tSenderAddress);
    const decimals = await getTokenDecimals(tokenAddress);

    const amountsInSmallestUnit = amounts
      .split(/[,\n]+/)
      .map((amt) => amt.trim())
      .filter((amt) => amt !== "")
      .map((amt) => convertToSmallestUnit(amt, decimals));

    const totalInSmallestUnit = amountsInSmallestUnit.reduce(
      (acc, curr) => acc + curr,
      BigInt(0)
    );

    if (approvedAmount < totalInSmallestUnit) {
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "approve",
        args: [tSenderAddress as `0x${string}`, totalInSmallestUnit],
      });
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash,
      });
      console.log("Approval confirmed", approvalReceipt);
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amountsInSmallestUnit,
          totalInSmallestUnit,
        ],
      });
    } else {
      await writeContractAsync({
        abi: tsenderAbi,
        address: tSenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [
          tokenAddress,
          recipients
            .split(/[,\n]+/)
            .map((addr) => addr.trim())
            .filter((addr) => addr !== ""),
          amountsInSmallestUnit,
          totalInSmallestUnit,
        ],
      });
    }
    //if (result < totalAmountNeeded) {}
  }

  return (
    <div>
      <div>
        <InputField
          label="Token Address"
          placeholder="0x..."
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <InputField
          label="Recipients"
          placeholder="0x..."
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
        />
        <InputField
          label="Amounts"
          placeholder="100"
          value={amounts}
          onChange={(e) => setAmounts(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
        >
          Send Token
        </button>
      </div>
    </div>
  );
}
// 10:39
