import Link from "next/link";
import React from "react";

type Props = {
  link: string;
};

const Box = ({ link }: Props) => {
  return (
    <Link href={link}>
      <div className="w-56 h-56 shadow-md border rounded-md">
        <div>image</div>
        <div>title</div>
      </div>
    </Link>
  );
};

export default Box;
