import Footer from "@/components/Footer";
import "@/app/globals.css";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";

export const metadata = {
  title: "NextCRM - Sign in",
  description: "",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex justify-between items-center w-full p-5">
        <Link href={"/"}>logo</Link>
        <ModeToggle />
      </div>
      <div className="flex items-center h-full overflow-hidden">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
