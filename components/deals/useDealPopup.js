"use client";

import { useDealsBanner } from "@/components/deals/useDealsBanner";
import { DEALS_POPUP_STORAGE_KEY } from "@/lib/active-deals";

export function useDealPopup(activeDeals = []) {
  return useDealsBanner({
    activeDeals,
    storageKey: DEALS_POPUP_STORAGE_KEY,
    imageKey: "popup",
  });
}
