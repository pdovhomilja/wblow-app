import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface AccounttDetailPageProps {
  params: {
    publicKey: string;
  };
}

const AccountPage = async ({ params }: AccounttDetailPageProps) => {
  const { publicKey } = params;

  const verifyKey = await axios.get(
    `http://localhost:3000/api/verifyKey/${publicKey}`
  );

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
  return (
    <div className="max-w-7xl mx-auto h-full">
      <Container
        title="Ohlásit nové pozorování"
        description={
          "Vítejte na stránce, kde můžete zcela anonymně ohlásit nové pozorování. Vyberte prosím vhodný formulář z dostupných možností"
        }
      >
        content
      </Container>
    </div>
  );
};

export default AccountPage;
