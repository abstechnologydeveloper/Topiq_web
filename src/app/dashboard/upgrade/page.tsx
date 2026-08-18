"use client";

import { useDashboard } from "../components/DashboardContext";
import SubscriptionScreen from "../components/screens/SubscriptionScreen";

export default function UpgradePage() {
  const { goTab, isPlusUser, freeAiUsesLeft, activatePlus } = useDashboard();
  return (
    <SubscriptionScreen
      goTab={goTab}
      plan={{ isPlusUser, freeAiUsesLeft, freeAiDaily: 3 }}
      activatePlus={activatePlus}
    />
  );
}
