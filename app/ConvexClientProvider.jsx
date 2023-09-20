"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { SessionProvider } from "./hooks/useServerSession";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>
    <SessionProvider storageLocation={"sessionStorage"}>
    {children}
    </SessionProvider>
    
    </ConvexProvider>;
}



