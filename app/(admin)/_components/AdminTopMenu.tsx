import React from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {};

const AdminTopMenu = (props: Props) => {
  return (
    <div className="flex justify-between p-5">
      <Link href="/">Wblow logo</Link>
      <div className="flex items-center justify-center space-x-5">
        <Button asChild>
          <Link href="/sign-out">Odhlásit</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default AdminTopMenu;
