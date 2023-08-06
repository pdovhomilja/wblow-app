import Container from "@/components/Container";
import React from "react";
import { FraudForm } from "../_components/FraudForm";

type Props = {};

const FraundForm = (props: Props) => {
  return (
    <div className="max-w-7xl mx-auto h-full overflow-auto">
      <Container
        title={"Ohlásit nové pozorování"}
        description={"Ohlášení nového pozorování společnosti"}
      >
        <FraudForm />
      </Container>
    </div>
  );
};

export default FraundForm;
