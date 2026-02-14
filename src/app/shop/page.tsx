import type { Metadata } from "next";
import WorksPageContent from "@/features/shop/WorksPageContent";

export const metadata: Metadata = {
  title: "Works - Portfolio ogison",
  description: "ogisonの作品一覧",
};

export default function WorksPage() {
  return <WorksPageContent />;
}
