import projectsData from "../../../data/projects.json";
import { notFound } from "next/navigation";

// Import all your components
import LatestHero from "@/genarateComponents/LatestHero";
import Proof from "@/genarateComponents/Proof";
import Problem from "@/genarateComponents/Problem";
import Amplify from "@/genarateComponents/Amplify";
import Solution from "@/genarateComponents/Solution";
import Services from "@/genarateComponents/Services";
import Testimonials from "@/genarateComponents/Testimonials";
import Offer from "@/genarateComponents/Offer";
import Guarantee from "@/genarateComponents/Guarantee";
import HVCO from "@/genarateComponents/HVCO";
import FAQ from "@/genarateComponents/FAQ";
import Urgency from "@/genarateComponents/Urgency";
import Close from "@/genarateComponents/Close";
import GoogleReview from "@/genarateComponents/GoogleReview";

type PageProps = {
  params: { slug: string }; // ← Not a Promise
};

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.slug === slug);

  if (!project) {
    return notFound();
  }

  const hvcoDataWithCorrectTypes = {
    ...project.hvcoData,
    hvcoFormInput:
      project.hvcoData?.hvcoFormInput?.map((input) => ({
        ...input,
        name: input.name as "name" | "email",
      })) || [],
  };

  return (
    <main>
      <LatestHero {...project.heroData} />
      <GoogleReview {...project.googleReviewData} />
      <Urgency {...project.urgencyData} />
      <Proof {...project.proofData} />
      <Problem {...project.problemData} />
      <Amplify {...project.amplifyData} />
      <Solution {...project.solutionData} />
      <Services {...project.servicesData} />
      <Testimonials {...project.testimonialsData} />
      <Offer {...project.offerData} />
      <Guarantee {...project.guaranteeData} />
      <HVCO {...hvcoDataWithCorrectTypes} />
      <FAQ {...project.faqData} />
      {/* <BookingForm {...project.bookingData} /> */}
      <Close {...project.closeData} />
    </main>
  );
}
