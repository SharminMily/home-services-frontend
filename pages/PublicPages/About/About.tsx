import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const About = () => {
  return (
    <Container>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              About GhorerFix
            </h1>
            <p className="text-lg ">
              Connecting you with trusted service providers for all your home needs.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <Image
                src="/logo.png"
                alt="GhorerFix Logo"
                width={300}
                height={300}
                className="rounded-[var(--radius-md)] mx-auto"
              />
            </div>
            <div className="md:w-1/2">
              <Card className="border-primary shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-exo text-primary">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=" mb-4">
                    GhorerFix is a service-based platform designed to make your life easier by connecting you with skilled professionals in your area. From plumbers and electricians to painters and delivery agents, we bring reliable services right to your doorstep.
                  </p>
                  <p className="">
                    Our goal is to create a seamless, user-friendly experience where you can browse, search, and book trusted service providers based on proximity and category, ensuring your home needs are met with efficiency and quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              className="bg-primary hover:bg-secondary duration-300 transition-colors text-white px-6 py-3"
            >
              Join GhorerFix Today
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default About;