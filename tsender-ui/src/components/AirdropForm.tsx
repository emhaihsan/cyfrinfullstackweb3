"use client ";

import { useState } from "react";
import InputField from "./ui/InputField";
export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");

  async function handleSubmit() {
    // 1. Approve our tsender contract to send out tokens
    // 1a. If already approved, moved to step 2
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined
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
        <button onClick={handleSubmit}> Send Token</button>
      </div>
    </div>
  );
}
