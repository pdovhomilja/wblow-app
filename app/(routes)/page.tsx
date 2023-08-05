import Image from "next/image";
import AccessKeyForm from "./_components/access-key-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col space-y-10 max-w-7xl  mx-auto h-full justify-center items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Díky a Vážíme si vaší odvahy
      </h1>
      <div className="border rounded-md p-20 space-y-10">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Aby bylo možné ohlásit nové pozorování, je potřeba zadat přístupový
          kód.
        </h4>
        <AccessKeyForm />
      </div>
      <Dialog>
        <DialogTrigger>Neznáte přístupový kód Vaší organizace?</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="py-5">Co je přístupový kód?</DialogTitle>
            <DialogDescription>
              Přístupový kód je unikátní pro každou organizaci. Bude vypadat
              například takto: <b>173bcc78-761b-41f9-a7e0-1ae6d4efeb96</b>.
              Pokud nevíte jak se k němu dostat, kontaktujte svého nadřízeného.
              Pokud Vaše organizace ještě svůj přístupový kód nemá, můžete ho
              získat -{" "}
              <Link className="text-blue-500" href="https://www.wblow.online">
                zde
              </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
