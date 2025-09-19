import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <Container>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Contact GhorerFix
            </h1>
            <p className="text-lg ">
              Get in touch with us for any inquiries or support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-primary shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-exo text-primary">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="border-primary rounded-md"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="border-primary rounded-md"
                  />
                  <Textarea
                    placeholder="Your Message"
                    className="border-primary rounded-md"
                  />
                  <Button
                    className="bg-primary text-white hover:bg-secondary transition-colors duration-300 rounded-md w-full"
                  >
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-exo text-primary">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 ">
                  <p>
                    <strong>Email:</strong> support@ghorerfix.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +880 123 456 7890
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Service Lane, Dhaka, Bangladesh
                  </p>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:text-white hover:bg-primary duration-300 transition-colors rounded-md"
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:text-white hover:bg-primary duration-300 transition-colors rounded-md"
                    >
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:text-white hover:bg-primary duration-300 transition-colors rounded-md"
                    >
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Contact;