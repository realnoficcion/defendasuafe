"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProStatus } from "@/types";
import { listExistingPurchases } from "@/lib/digital-goods";
import { readCachedStatus, verifyPurchase, writeCachedStatus } from "@/lib/pro-status";

interface UseProStatusResult {
  status: ProStatus;
  loading: boolean;
  refresh: () => Promise<void>;
}

const FREE_STATUS: ProStatus = { tier: "free", verifiedAt: 0 };

export function useProStatus(): UseProStatusResult {
  const [status, setStatus] = useState<ProStatus>(FREE_STATUS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const cached = readCachedStatus();
      if (cached?.tier === "pro") {
        setStatus(cached);
      }

      const purchases = await listExistingPurchases();
      if (purchases.length === 0) {
        const free: ProStatus = { tier: "free", verifiedAt: Date.now() };
        writeCachedStatus(free);
        setStatus(free);
        return;
      }

      const latest = purchases[0];
      const verified = await verifyPurchase(latest);
      setStatus(verified);
    } catch {
      const cached = readCachedStatus();
      setStatus(cached ?? FREE_STATUS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { status, loading, refresh };
}
