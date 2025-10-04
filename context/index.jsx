"use client";
import { wagmiAdapter, projectId } from "@/config";
import { createAppKit } from "@reown/appkit";
import { mainnet, base, ancient8 } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { adapter } from "next/dist/server/web/adapter";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, typeConfig } from "wagmi";

const queryClient = new QueryClient();
if(!projectId){
  throw new Error("Project ID is not defined");
}

const metadata = {
    name: "Laker Eco",
    description: "An ecosytem for Lakers",
    url: "https://laker-eco.vercel.app",
    icons: ["https://laker-eco.vercel.app/favicon.ico"]
};
const modal: createAppKit({
    adapter: [wagmiAdapter], projectId, networks: [mainnet, base], defaultNetwork: mainnet, features: {
        analytics: true,
        email: true,
        socials: ["google", "github", "discord"],
        emailShowWallet: true,
    },
    themeMode: "light",
})

