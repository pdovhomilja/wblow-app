import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

interface AccountDetailPageProps {
  params: {
    publicKey: string;
  };
}

const AccountPage = async ({ params }: AccountDetailPageProps) => {
  const { publicKey } = params;

  const verifyKey = await axios.get(
    `${process.env.WBLOW_ADMIN_URL}/api/verifyKey/${publicKey}`
  );

  const { data } = verifyKey.data;

  const { name, email, status } = data;

  if (verifyKey.data.message === "Invalid") {
    return (
      <div className="flex flex-col space-y-5 justify-center items-center max-w-7xl h-full mx-auto ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Bohužel jste zadali neplatný veřejný kód.
        </h1>
        <Button asChild>
          <a href="/">Zkusit znovu</a>
        </Button>
      </div>
    );
  }

  if (status === "deleted") {
    return (
      <div className="flex flex-col space-y-5 justify-center items-center max-w-7xl h-full mx-auto ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Prostor společnosti {name} byl smazán.
        </h1>
        <Button asChild>
          <a href="/">Zpět</a>
        </Button>
      </div>
    );
  }

  if (status === "suspended") {
    return (
      <div className="flex flex-col space-y-5 justify-center items-center max-w-7xl h-full mx-auto ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Prostor společnosti {name} byl pozastavený.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Pro znovu aktivaci kontaktujte správce společnosti {name} na emailové
          adrese - {email}
        </p>
        <Button asChild>
          <a href="/">Zpět</a>
        </Button>
      </div>
    );
  }

  if (status === "inactive") {
    return (
      <div className="flex flex-col space-y-5 justify-center items-center max-w-7xl h-full mx-auto ">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Prostor společnosti {name} byl deaktivován.
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Pro znovu aktivaci kontaktujte správce společnosti {name} na emailové
          adrese - {email}
        </p>
        <Button asChild>
          <a href="/">Zpět</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-full">
      <Container
        title={"Ohlásit nové pozorování pro společnost" + " - " + name}
        description={
          "Vítejte na stránce, kde můžete zcela anonymně ohlásit nové pozorování. Vyberte prosím z následujících možností."
        }
      >
        E-mailový kontat na správces společnosti {name} je:{" "}
        <Link href="">{email}</Link>. Status společnosti je{" "}
        <pre>
          <code>{JSON.stringify(verifyKey.data, null, 2)}</code>
        </pre>
      </Container>
    </div>
  );
};

export default AccountPage;
