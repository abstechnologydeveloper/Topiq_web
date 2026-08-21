import type { Metadata } from "next";
import "./styles/dashboard.css";
import DashboardShell from "./components/DashboardShell";
import OnboardingFlow from "./components/screens/onboarding/OnboardingFlow";
import { DashboardProvider } from "./components/DashboardContext";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your personalised AbSTopiq dashboard — learn, practice and Sabi AI with grounded sources.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="[line-height:normal]">
        <DashboardShell>{children}</DashboardShell>
        <OnboardingFlow />
      </div>
    </DashboardProvider>
  );
}