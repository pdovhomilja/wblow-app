import Footer from "@/components/Footer";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Wblow app - Admin",
  description: "",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return redirect("/sign-in");
  }

  //console.log(session, "session");
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header
        id={session.user.id as string}
        name={session.user.name as string}
        email={session.user.email as string}
        avatar={session.user.image as string}
        lang={session.user.userLanguage as string}
      />
      <div className="flex h-full">
        <div className="w-56 h-full px-5 pt-5">sidebar</div>
        <div className="flex grow overflow-auto pt-5">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
