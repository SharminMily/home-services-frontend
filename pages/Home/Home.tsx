import Container from "@/components/Container";
import React from "react";
import Hero from "./Hero";

const Home = () => {
  return (
    <Container>
      <div className="text-foreground-light dark:text-foreground-dark">
        <Hero />
      </div>
    </Container>
  );
};

export default Home;
