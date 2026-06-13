"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import Footer from "@/components/Footer";
import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import ProjectDetails, {
  type Milestone,
  type TeamMember,
} from "@/components/ProjectDetails";
import portfolioData from "@/data/portfolio.json";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const router = useRouter();

  // Look up project details in the expanded portfolio JSON
  const project = portfolioData.projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed/30 relative">
        <GlowBackground />
        <Navbar />
        <main className="flex-grow pt-40 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full flex flex-col items-center justify-center space-y-6 text-center">
          <span className="material-symbols-outlined text-rose-500 text-6xl animate-bounce select-none">
            error
          </span>
          <div className="space-y-2">
            <h1 className="font-body text-3xl font-extrabold text-foreground">
              Project Not Found
            </h1>
            <p className="font-body text-sm text-on-surface-variant max-w-md">
              The project you are looking for does not exist or has been
              archived. Check the URL and try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/#projects")}
            className="bg-primary-fixed text-on-primary-container hover:bg-primary-fixed-dim px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)] cursor-pointer"
          >
            Return to Projects
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  // Interactive callbacks
  const handleBack = () => {
    router.push("/#projects");
  };

  const handleEdit = () => {
    alert(`Editing project: ${project.title}`);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Project details link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed/30 relative">
      {/* Background atmosphere radial blobs */}
      <GlowBackground />

      {/* Floating navigation bar */}
      <Navbar />

      {/* Primary Details container */}
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        <ProjectDetails
          title={project.title}
          status={
            project.status as
              | "Planning"
              | "In Progress"
              | "In Review"
              | "Completed"
              | "On Hold"
              | "Blocked"
          }
          clientName={project.clientName}
          startDate={project.startDate}
          endDate={project.endDate}
          budget={project.budget}
          currencyCode="USD"
          projectLead={project.projectLead}
          description={project.description}
          progress={project.progress}
          milestones={project.milestones as Milestone[]}
          team={project.team as TeamMember[]}
          onPrimaryAction={handleEdit}
          onSecondaryAction={handleShare}
          onBack={handleBack}
        />
      </main>

      {/* Footer banner */}
      <Footer />
    </div>
  );
}
