"use client";

import { loginUser } from "@/apis/auth";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await loginUser({ email, password });

    if (res?.success) {
      alert(" Login successful!");
      window.location.href = "/"; 
    } else {
      alert(res?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <Container>
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">GhorerFix</h1>
            <p className="text-lg ">Get in touch with us for any inquiries or support.</p>
          </div>

          <Card className="border-primary shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-exo text-primary">
                Login your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="border-primary rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  type="password"
                  placeholder="Your Password"
                  className="border-primary rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-between text-sm">
                  <div className="text-gray-600">Forget password?</div>
                  <div>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-primary font-bold">
                      Sign up
                    </Link>
                  </div>
                </div>

                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="bg-primary text-white hover:bg-secondary transition-colors duration-300 rounded-md w-full"
                >
                  {loading ? "Logging in..." : "Submit"}
                </Button>
              </div>
            </CardContent>
            <p className="text-center text-sm py-4">
              Copyright © GhorerFix 2026.
            </p>
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default Login;
