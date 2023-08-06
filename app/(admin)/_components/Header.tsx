import AvatarDropdown from "./ui/AvatarDropdown";

import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lang: string;
};

const Header = ({ id, name, email, avatar, lang }: Props) => {
  return (
    <>
      <div className="flex h-20 w-full justify-between items-center p-5 space-x-5">
        <Link href={"/dashboard"}>logo</Link>

        <div className="flex items-center gap-5">
          <ModeToggle />
          <div className="hidden lg:flex flex-col text-xs text-gray-500">
            <div>{name}</div>
            <div>{email}</div>
            <div>Language: {lang}</div>
          </div>
          <AvatarDropdown avatar={avatar} />
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Header;
