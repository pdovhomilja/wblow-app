import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-screen">
      <TopMenu />
      <div className="h-full">{children}</div>
      <Footer />
    </div>
  );
}
