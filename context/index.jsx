"use client";
import { wagmiAdapter, projectId } from "@/config";
import { createAppKit } from "@reown/appkit";
import { mainnet, base } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, typeConfig } from "wagmi";

const queryClient = new QueryClient();
if(!projectId){
  throw new Error("Project ID is not defined");
}

cons