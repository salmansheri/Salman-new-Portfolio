"use client";

import Footer from "@/components/Footer";
import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import ProjectDetails, {
  type Milestone,
  type TeamMember,
} from "@/components/ProjectDetails";

export default function ProjectDetailsDemoPage() {
  // Enterprise mock data for demonstration
  const mockTeam: TeamMember[] = [
    {
      id: "1",
      name: "Salman Sheriff",
      role: "Lead Systems Architect",
      email: "salman@example.com",
    },
    {
      id: "2",
      name: "Sarah Jenkins",
      role: "Senior UX Designer",
      email: "sarah.j@example.com",
    },
    {
      id: "3",
      name: "Kenji Tanaka",
      role: "Staff Frontend Engineer",
      email: "kenji.t@example.com",
    },
    {
      id: "4",
      name: "Amina Yusuf",
      role: "DevOps Engineer",
      email: "amina.y@example.com",
    },
  ];

  const mockMilestones: Milestone[] = [
    {
      id: "m1",
      name: "Requirements & High-Level Design",
      description:
        "Define system architecture, database schema, and interface contracts.",
      status: "completed",
      dueDate: "Jun 15, 2026",
    },
    {
      id: "m2",
      name: "Core Infrastructure & API Foundations",
      description:
        "Set up container orchestration, CI/CD pipelines, and seed databases.",
      status: "completed",
      dueDate: "Jul 20, 2026",
    },
    {
      id: "m3",
      name: "Frontend Integration & Dashboard",
      description:
        "Implement responsive component design system and wireframe flows.",
      status: "in-progress",
      dueDate: "Aug 30, 2026",
    },
    {
      id: "m4",
      name: "Comprehensive QA & Penetration Testing",
      description:
        "Automated test suites run, security scan audit, and bug fixing.",
      status: "pending",
      dueDate: "Sep 15, 2026",
    },
    {
      id: "m5",
      name: "Production Rollout & Documentation",
      description:
        "Perform canary release, document runs, and train client staff.",
      status: "pending",
      dueDate: "Oct 10, 2026",
    },
  ];

  const handleEdit = () => {
    alert("Primary Action Triggered: Edit Project dialog/navigation");
  };

  const handleShare = () => {
    alert("Secondary Action Triggered: Share link copied to clipboard");
  };

  const handleBack = () => {
    alert("Back Navigation Triggered: Redirecting to projects list");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed/30 relative">
      {/* Background radial atmosphere */}
      <GlowBackground />

      {/* Floating navigation header */}
      <Navbar />

      {/* Main Layout Container */}
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full">
        {/* Component Title & Showcase Wrapper */}
        <div className="mb-6 space-y-2">
          <span className="font-code text-xs text-primary-fixed font-semibold tracking-widest uppercase">
            Component Showcase
          </span>
          <h2 className="font-body text-xl font-bold text-on-surface-variant">
            Project Details View
          </h2>
        </div>

        {/* The ProjectDetails Component */}
        <ProjectDetails
          title="Nova Cloud Infrastructure Migration"
          status="In Progress"
          clientName="NovaCorp Technologies"
          startDate="Jun 2026"
          endDate="Oct 2026"
          budget={185000}
          currencyCode="USD"
          projectLead={{
            name: "Salman Sheriff",
            role: "Principal Architect",
            email: "salman.dev@example.com",
          }}
          description="A multi-phase infrastructure project focused on migrating legacy bare-metal systems to a hybrid Kubernetes-based cloud environment. This migration enhances container isolation, automates auto-scaling rules based on incoming network bottlenecks, and optimizes database clustering. The new system reduces cloud overhead cost by 35% while maintaining a target uptime SLA of 99.99% across global region nodes."
          progress={65}
          milestones={mockMilestones}
          team={mockTeam}
          onPrimaryAction={handleEdit}
          onSecondaryAction={handleShare}
          onBack={handleBack}
        />
      </main>

      {/* Branding Footer */}
      <Footer />
    </div>
  );
}
