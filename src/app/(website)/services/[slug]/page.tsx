import ServiceDetailContent from "@/Components/ServicesComponent/ServiceDetailContent";
import { getServiceBySlug, serviceDetails } from "@/lib/serviceDetails";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service not found | Snappy Tales",
    };
  }

  return {
    title: `${service.title} | Snappy Tales`,
    description: service.seo?.description ?? service.hero.description,
  };
}

const ServicePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailContent service={service} />;
};

export default ServicePage;
