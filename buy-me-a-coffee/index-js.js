import {
  createWalletClient,
  custom,
  createPublicClient,
} from "https://esm.sh/viem";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");

let walletClient;
let publicClient;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();
  } else {
    connectButton.innerHTML = "Please Install Metamask";
  }
}

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount}...`);

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    await publicClient.simulateContract({});
  } else {
    connectButton.innerHTML = "Please Install Metamask";
  }
}

connectButton.onclick = connect;
fundButton.onclick = fund;
