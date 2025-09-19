'use client';
import useGetServices from '@/hooks/useGetServices';
import useGetCategories from '@/hooks/useGetCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Container from '@/components/Container';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Service } from '@/types/api/Service';
import { Category } from '@/types/api/Category';

const Services = () => {
  const { data: categories = [], error: categoriesError, isLoading: categoriesLoading } = useGetCategories();
  const { data: services = [], error, isLoading, mutate } = useGetServices();

  if (isLoading || categoriesLoading) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  if (error || categoriesError) {
    return (
      <Container>
        <div className="text-center py-12">
          <p className=" text-lg">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Our Services
            </h1>
            <p className="text-lg ">
              Discover a wide range of home services provided by trusted professionals near you.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-center mb-8 bg-transparent border border-primary gap-1">
              <TabsTrigger
                value="all"
                className="px-4 py-2  data-[state=active]:bg-primary data-[state=active]:text-white hover:border-primary hover:text-primary hover:border"
              >
                All Services
              </TabsTrigger>
              {categories.map((category: Category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-4 py-2  data-[state=active]:bg-primary data-[state=active]:text-white hover:border-primary hover:text-primary hover:border"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service: Service) => (
                  <Card
                    key={service.id}
                    className="border-primary shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-sm)] transition-shadow"
                  >
                    <CardHeader>
                      <div className="relative w-full h-48 mb-4">
                        {/* <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover rounded-t-md"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-service.jpg';
                          }}
                        /> */}
                        <Image
                          src={'https://i.ibb.co/HCM6Skh/professional-worker-fixing-bathroom-23-2148656904.jpg'}
                          alt={service.title}
                          fill
                          className="object-cover rounded-t-md"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-service.jpg';
                          }}
                        />
                      </div>
                      <CardTitle className="text-xl font-exo text-primary">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className=" mb-4">
                        {service.description}
                      </p>
                      <p className="text-lg font-bold text-secondary mb-4">
                        ${service.price}
                      </p>
                      <Button
                        className="w-full bg-primary text-white hover:bg-secondary transition-colors rounded-md"
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {categories.map((category: Category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service: Service) => service.category_id === category.id)
                    .map((service: Service) => (
                      <Card
                        key={service.id}
                        className="border-primary shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-sm)] transition-shadow"
                      >
                        <CardHeader>
                          <div className="relative w-full h-48 mb-4">
                            {/* <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover rounded-t-md"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-service.jpg';
                          }}
                        /> */}
                            <Image
                              src={'https://i.ibb.co/HCM6Skh/professional-worker-fixing-bathroom-23-2148656904.jpg'}
                              alt={service.title}
                              fill
                              className="object-cover rounded-t-md"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-service.jpg';
                              }}
                            />
                          </div>
                          <CardTitle className="text-xl font-exo text-primary">
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className=" mb-4">
                            {service.description}
                          </p>
                          <p className="text-lg font-bold text-secondary mb-4">
                            ${service.price}
                          </p>
                          <Button
                            className="w-full bg-primary text-[var(--color-foreground-dark)] hover:bg-secondary transition-colors rounded-md"
                          >
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