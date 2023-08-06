import { Icons } from "@/components/ui/icons";
import { SearchXIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  link: string;
  title: string;
};

const Box = ({ link, title }: Props) => {
  return (
    <Link href={link}>
      <div className="flex flex-col justify-center items-center w-56 h-56 shadow-md border rounded-md">
        <div>
          <SearchXIcon className="w-12 h-12" />
        </div>
        <div className="py-5">{title}</div>
      </div>
    </Link>
  );
};

export default Box;
