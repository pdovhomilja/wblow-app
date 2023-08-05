import React from "react";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";

type Props = {};

const TopMenu = (props: Props) => {
  return (
    <div className="flex justify-between p-5">
      <Link href="/">Wblow logo</Link>
      <ModeToggle />
    </div>
  );
};

export default TopMenu;
