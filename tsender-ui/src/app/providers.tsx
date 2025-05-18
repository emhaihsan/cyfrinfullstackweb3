"use client"; // Mengaktifkan mode client untuk penggunaan React Query dan Wagmi

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClient dan QueryClientProvider untuk penggunaan React Query
import { type ReactNode } from "react"; // Import tipe ReactNode untuk definisi tipe children
import config from "@/rainbowKitConfig"; // Import konfigurasi RainbowKit
import { WagmiProvider } from "wagmi"; // Import WagmiProvider untuk penggunaan Wagmi
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"; // Import RainbowKitProvider untuk penggunaan RainbowKit
import { useState } from "react"; // Import useState untuk penggunaan state lokal
import "@rainbow-me/rainbowkit/styles.css"; // Import CSS untuk RainbowKit

export function Providers(props: { children: ReactNode }) {
  // Menggunakan useState untuk membuat instance QueryClient yang baru
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
