"use client";

import { useState } from "react";
import useGetServices from "@/hooks/useGetServices";
import useGetCategories from "@/hooks/useGetCategories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Container from "@/components/Container";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { Service } from "@/types/api/Service";
import { Category } from "@/types/api/Category";
import { Input } from "@/components/ui/input";
import LocationModal from "../Location/LocationModal";

type Upazila = { id: string; name: string };

const Services = () => {
  // Fetch categories
  const {
    data: categories = [],
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategories();

  // Fetch services
  const { data: services = [], error, isLoading, mutate } = useGetServices();

  const [open, setOpen] = useState(false);
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ------------------ Combined Filter Logic ------------------
  const filteredServices = services.filter((service: Service) => {
    // Search filter
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Location filter
    const matchesLocation = selectedUpazila
      ? service.upazila_id === selectedUpazila.id 
      : true;

    return matchesSearch && matchesLocation;
  });
  // ----------------------------------------------------------

  if (isLoading || categoriesLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  // Error 
  if (error || categoriesError) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className="text-lg">
            Error loading services or categories. Please try again.
          </p>
          <Button
            onClick={() => mutate()}
            className="mt-4 bg-primary text-white hover:bg-secondary transition-colors rounded-md"
          >
            Retry
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-12">
        <div className="mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Our Services
            </h1>
            <p className="text-lg">
              Discover a wide range of home services provided by trusted
              professionals near you.
            </p>
          </div>

          {/* ---------------- Location + Search Bar ---------------- */}
          <div className="flex gap-6 mb-10">
            {/* Location Button */}
            <div>
              <Button onClick={() => setOpen(true)}>
                {selectedUpazila ? selectedUpazila.name : "Location"}
              </Button>

              <LocationModal
                open={open}
                onClose={() => setOpen(false)}
                onSelectUpazila={(u) => setSelectedUpazila(u)}
              />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-primary pointer-events-none" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-4 py-4 text-lg border border-primary rounded-xl focus:ring-4 focus:ring-primary/30 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* ---------------- Services Tabs ---------------- */}
          <Tabs defaultValue="all" className="w-full">
            {/* Tabs List */}
            <TabsList className="flex justify-center mb-8 bg-transparent border border-primary gap-1">
              <TabsTrigger
                value="all"
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white hover:border-primary hover:text-primary hover:border"
              >
                All Services
              </TabsTrigger>

              {categories.map((category: Category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white hover:border-primary hover:text-primary hover:border"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* ---------------- All Services Tab ---------------- */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.length === 0 && (
                  <p className="col-span-full text-center text-xl">
                    No services found
                  </p>
                )}

                {filteredServices.map((service: Service) => (
                  <Card
                    key={service.id}
                    className="border-primary shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-sm)] transition-shadow"
                  >
                    <CardHeader>
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={service.image || "/placeholder-service.jpg"}
                          alt={service.title}
                          fill
                          className="object-cover rounded-t-md"
                          sizes="100vw"
                          priority
                        />
                      </div>
                      <CardTitle className="text-xl font-exo text-primary">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{service.description}</p>
                      <p className="text-lg font-bold text-secondary mb-4">
                        ${service.price}
                      </p>
                      <Button className="w-full bg-primary text-white hover:bg-secondary transition-colors rounded-md">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ---------------- Category Tabs ---------------- */}
            {categories.map((category: Category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter(
                      (service: Service) =>
                        service.category_id === category.id &&
                        service.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) &&
                        (selectedUpazila
                          ? service.upazila?.id === selectedUpazila.id
                          : true)
                    )
                    .map((service: Service) => (
                      <Card
                        key={service.id}
                        className="border-primary shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-sm)] transition-shadow"
                      >
                        <CardHeader>
                          <div className="relative w-full h-48 mb-4">
                            <Image
                              src={service.image || "/placeholder-service.jpg"}
                              alt={service.title}
                              fill
                              className="object-cover rounded-t-md"
                            />
                          </div>
                          <CardTitle className="text-xl font-exo text-primary">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{service.description}</p>
                          <p className="text-lg font-bold text-secondary mb-4">
                            ${service.price}
                          </p>
                          <Button className="w-full bg-primary text-white hover:bg-secondary transition-colors rounded-md">
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Container>
  );
};

export default Services;
