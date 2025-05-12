import {
  // import createWalletClient, custom, createPublicClient, parseEther, defineChain, formatEther
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
} from "https://esm.sh/viem";

import {
  // import coffeeAbi, contractAddress from "./constant-js.js"
  coffeeAbi,
  contractAddress,
} from "./constant-js.js";

const connectButton = document.getElementById("connectButton");
// const connectButton = element HTML dengan id connectButton
const fundButton = document.getElementById("fundButton");
// const fundButton = element HTML dengan id fundButton
const ethAmountInput = document.getElementById("ethAmount");
// const ethAmountInput = element HTML dengan id ethAmount
const balanceButton = document.getElementById("balanceButton");
// const balanceButton = element HTML dengan id balanceButton
const withdrawButton = document.getElementById("withdrawButton");
// const withdrawButton = element HTML dengan id withdrawButton

let walletClient;
// let walletClient = variabel untuk menyimpan instance walletClient
let publicClient;
// let publicClient = variabel untuk menyimpan instance publicClient

async function connect() {
  // fungsi connect untuk menghubungkan ke metamask
  if (typeof window.ethereum !== "undefined") {
    // jika metamask terpasang
    walletClient = createWalletClient({
      // buat instance walletClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });
    connectButton.innerHTML = "Connected";
    // ubah teks tombol connect menjadi "Connected"
    await walletClient.requestAddresses();
    // minta alamat yang tersedia di metamask
  } else {
    // jika metamask tidak terpasang
    connectButton.innerHTML = "Please Install Metamask";
    // ubah teks tombol connect menjadi "Please Install Metamask"
  }
}

async function fund() {
  // fungsi fund untuk mengirimkan ether ke kontrak
  const ethAmount = ethAmountInput.value;
  // dapatkan nilai yang diinputkan di input ethAmount
  console.log(`Funding with ${ethAmount}...`);
  // log bahwa akan mengirimkan ether sejumlah ethAmount

  if (typeof window.ethereum !== "undefined") {
    // jika metamask terpasang
    walletClient = createWalletClient({
      // buat instance walletClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    // dapatkan alamat yang tersedia di metamask
    const currentChain = await getCurrentChain(walletClient);
    // dapatkan chain yang sedang digunakan

    publicClient = createPublicClient({
      // buat instance publicClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });

    const { request } = await publicClient.simulateContract({
      // buat request untuk mengirimkan ether ke kontrak
      address: contractAddress,
      // alamat kontrak yang akan dikirimkan ether
      abi: coffeeAbi,
      // ABI kontrak yang akan dikirimkan ether
      functionName: "fund",
      // nama fungsi yang akan dipanggil di kontrak
      account: connectedAccount,
      // alamat yang akan mengirimkan ether
      chain: currentChain,
      // chain yang sedang digunakan
      value: parseEther(ethAmount),
      // nilai ether yang akan dikirimkan
    });
    const hash = await walletClient.writeContract(request);
    // kirimkan request ke kontrak dan dapatkan hash transaksi
    console.log(hash);
    // log hash transaksi
  } else {
    // jika metamask tidak terpasang
    connectButton.innerHTML = "Please Install Metamask";
    // ubah teks tombol connect menjadi "Please Install Metamask"
  }
}

async function withdraw() {
  // fungsi withdraw untuk mengambil ether dari kontrak
  console.log(`Withdrawing...`);
  // log bahwa akan mengambil ether

  if (typeof window.ethereum !== "undefined") {
    // jika metamask terpasang
    walletClient = createWalletClient({
      // buat instance walletClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });

    const [connectedAccount] = await walletClient.requestAddresses();
    // dapatkan alamat yang tersedia di metamask
    const currentChain = await getCurrentChain(walletClient);
    // dapatkan chain yang sedang digunakan

    publicClient = createPublicClient({
      // buat instance publicClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });

    const { request } = await publicClient.simulateContract({
      // buat request untuk mengambil ether dari kontrak
      address: contractAddress,
      // alamat kontrak yang akan diambil ether
      abi: coffeeAbi,
      // ABI kontrak yang akan diambil ether
      functionName: "withdraw",
      // nama fungsi yang akan dipanggil di kontrak
      account: connectedAccount,
      // alamat yang akan mengambil ether
      chain: currentChain,
      // chain yang sedang digunakan
    });
    const hash = await walletClient.writeContract(request);
    // kirimkan request ke kontrak dan dapatkan hash transaksi
    console.log(hash);
    // log hash transaksi
  } else {
    // jika metamask tidak terpasang
    connectButton.innerHTML = "Please Install Metamask";
    // ubah teks tombol connect menjadi "Please Install Metamask"
  }
}

async function getCurrentChain(client) {
  // fungsi getCurrentChain untuk mendapatkan chain yang sedang digunakan
  const chainId = await client.getChainId();
  // dapatkan id chain yang sedang digunakan
  const currentChain = defineChain({
    // buat definisi chain yang sedang digunakan
    id: chainId,
    // id chain yang sedang digunakan
    name: "Custom Chain",
    // nama chain yang sedang digunakan
    nativeCurrency: {
      // definisi mata uang asli chain yang sedang digunakan
      name: "Ether",
      // nama mata uang asli
      symbol: "ETH",
      // simbol mata uang asli
      decimals: 18,
      // jumlah desimal mata uang asli
    },
    rpcUrls: {
      // definisi URL RPC chain yang sedang digunakan
      default: {
        http: ["http://localhost:8545"],
        // URL RPC menggunakan protokol HTTP
      },
    },
  });
  return currentChain;
  // kembalikan definisi chain yang sedang digunakan
}

async function getBalance() {
  // fungsi getBalance untuk mendapatkan saldo ether di kontrak
  if (typeof window.ethereum !== "undefined") {
    // jika metamask terpasang
    publicClient = createPublicClient({
      // buat instance publicClient dengan transport custom(window.ethereum)
      transport: custom(window.ethereum),
    });
    const balance = await publicClient.getBalance({
      // dapatkan saldo ether di kontrak
      address: contractAddress,
      // alamat kontrak yang akan diambil saldo ether
    });
    console.log(formatEther(balance)); // <- kebalikan dari parseEther
    // log saldo ether dalam format yang mudah dibaca
  }
}

connectButton.onclick = connect;
// pasang fungsi connect sebagai event listener untuk tombol connect
fundButton.onclick = fund;
// pasang fungsi fund sebagai event listener untuk tombol fund
balanceButton.onclick = getBalance;
// pasang fungsi getBalance sebagai event listener untuk tombol balance
withdrawButton.onclick = withdraw;
// pasang fungsi withdraw sebagai event listener untuk tombol withdraw
