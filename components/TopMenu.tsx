import React from "react";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {};

const TopMenu = (props: Props) => {
  return (
    <div className="flex justify-between p-5">
      <Link href="/">Wblow logo</Link>
      <div className="flex items-center justify-center space-x-5">
        <Button asChild>
          <Link href="/sign-in">Přihlásit</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopMenu;
