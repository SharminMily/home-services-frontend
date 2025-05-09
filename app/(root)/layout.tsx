import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {

  return <div className="min-h-screen font-lora debug-theme">
    <Navbar />
    {children}
  </div>;
};

export default layout;
