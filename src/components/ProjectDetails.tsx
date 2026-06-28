"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  email?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
  span?: number; // grid col span: 1 or 2
}

export interface ProjectDetailsProps {
  title: string;
  status:
    | "Planning"
    | "In Progress"
    | "In Review"
    | "Completed"
    | "On Hold"
    | "Blocked";
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  currencyCode?: string;
  image?: string;
  alt?: string;
  tech?: string[];
  achievements?: Achievement[];
  projectLead: {
    name: string;
    role: string;
    avatarUrl?: string;
    email?: string;
  };
  description: string;
  progress: number; // Percentage 0 - 100
  milestones?: Milestone[];
  team: TeamMember[];
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onBack?: () => void;
}

// Utility to get initials from a name
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Deterministic gradient picker for initials avatar based on character sum
const getAvatarGradient = (name: string): string => {
  const gradients = [
    "from-primary-fixed-dim to-secondary-container text-white", // Cyan/Blue gradient (app theme matching)
    "from-[#8B5CF6] to-[#EC4899] text-white", // Purple/Pink gradient
    "from-[#10B981] to-[#3B82F6] text-white", // Emerald/Blue gradient
    "from-[#F59E0B] to-[#EF4444] text-white", // Amber/Red gradient
    "from-[#6366F1] to-[#a855f7] text-white", // Indigo/Purple gradient
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

// Returns semantic styles for statuses
const getStatusStyles = (status: ProjectDetailsProps["status"]) => {
  switch (status) {
    case "In Progress":
      return {
        bg: "bg-primary-fixed/10 dark:bg-primary-fixed/5",
        text: "text-primary-fixed dark:text-primary-fixed",
        border: "border-primary-fixed/20",
        dot: "bg-primary-fixed-dim",
      };
    case "Completed":
      return {
        bg: "bg-emerald-500/10 dark:bg-emerald-500/5",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-500/20",
        dot: "bg-emerald-500",
      };
    case "Planning":
      return {
        bg: "bg-surface-container-high/60 dark:bg-surface-container-high/30",
        text: "text-on-surface-variant",
        border: "border-outline-variant",
        dot: "bg-outline",
      };
    case "In Review":
      return {
        bg: "bg-indigo-500/10 dark:bg-indigo-500/5",
        text: "text-indigo-600 dark:text-indigo-400",
        border: "border-indigo-500/20",
        dot: "bg-indigo-500",
      };
    case "On Hold":
      return {
        bg: "bg-amber-500/10 dark:bg-amber-500/5",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-500/20",
        dot: "bg-amber-500",
      };
    case "Blocked":
      return {
        bg: "bg-rose-500/10 dark:bg-rose-500/5",
        text: "text-rose-600 dark:text-rose-400",
        border: "border-rose-500/20",
        dot: "bg-rose-500",
      };
    default:
      return {
        bg: "bg-surface-container-high",
        text: "text-foreground",
        border: "border-outline",
        dot: "bg-foreground",
      };
  }
};

export default function ProjectDetails({
  title,
  status,
  clientName,
  startDate,
  endDate,
  tech = [],
  achievements = [],
  projectLead,
  description,
  progress,
  image,
  alt = "Project Visualization",
  milestones = [],
  team = [],
  onPrimaryAction,
  onSecondaryAction,
  primaryActionLabel = "Edit Project",
  secondaryActionLabel = "Share",
  onBack,
}: ProjectDetailsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Breadcrumb animation
      gsap.fromTo(
        breadcrumbRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      );

      // Hero image zoom reveal
      gsap.fromTo(
        heroRef.current,
        { scale: 0.98, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 },
      );

      // Header title reveal
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.2 },
      );

      // Metadata cards stagger fade-in and slide-up
      if (metadataRef.current) {
        gsap.fromTo(
          metadataRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metadataRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Achievements grid entry
      if (achievementsRef.current) {
        gsap.fromTo(
          achievementsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Content columns stagger slide-up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Team cards stagger reveal
      if (teamRef.current) {
        const teamGrid = teamRef.current.querySelector(".grid");
        if (teamGrid) {
          gsap.fromTo(
            teamGrid.children,
            { scale: 0.95, opacity: 0, y: 20 },
            {
              scale: 1,
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: teamGrid,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      }
    },
    { scope: containerRef },
  );

  const statusStyle = getStatusStyles(status);

  return (
    <div ref={containerRef} className="space-y-12 max-w-7xl mx-auto py-6">
      {/* Breadcrumb Navigation */}
      <div
        ref={breadcrumbRef}
        className="flex items-center gap-3 text-on-surface-variant font-code text-xs tracking-widest uppercase mb-4"
      >
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="hover:text-primary-fixed transition-colors duration-200 cursor-pointer"
          >
            Work
          </button>
        ) : (
          <span className="text-on-surface-variant">Work</span>
        )}
        <span className="material-symbols-outlined text-sm select-none text-outline-variant">
          chevron_right
        </span>
        <span className="text-foreground font-semibold">{title}</span>
      </div>

      {/* Hero Header Section with zoom-in card */}
      {image && (
        <div
          ref={heroRef}
          className="w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden glass-card relative group shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10" />
          {/* biome-ignore lint/performance/noImgElement: Project hero image */}
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
          />
        </div>
      )}

      {/* Title & Overview with buttons */}
      <div
        ref={headerRef}
        className="flex flex-col lg:flex-row lg:items-start justify-between gap-6"
      >
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-body text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-fixed tracking-tight uppercase select-none">
              {title}
            </h1>
            <div
              className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} uppercase tracking-wider select-none`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`}
              />
              {status}
            </div>
          </div>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start lg:self-center">
          {onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="glass-card flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-foreground hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-base select-none">
                share
              </span>
              {secondaryActionLabel}
            </button>
          )}

          {onPrimaryAction && (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="bg-primary-fixed text-on-primary-container hover:bg-primary-fixed-dim hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_15px_rgba(0,219,233,0.15)] flex items-center gap-2 px-6 py-2.5 rounded-xl font-body text-sm font-bold transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base select-none">
                edit
              </span>
              {primaryActionLabel}
            </button>
          )}
        </div>
      </div>

      {/* Metadata Banner Box */}
      <section
        ref={metadataRef}
        className="glass-card rounded-xl p-6 md:p-8 flex flex-wrap gap-8 md:gap-12 justify-between"
      >
        <div className="flex flex-col gap-2">
          <span className="font-code text-[11px] tracking-widest text-primary-fixed opacity-80 uppercase font-semibold">
            Client
          </span>
          <span className="font-body text-base font-semibold text-foreground">
            {clientName}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-code text-[11px] tracking-widest text-primary-fixed opacity-80 uppercase font-semibold">
            Role
          </span>
          <span className="font-body text-base font-semibold text-foreground">
            {projectLead.role}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-code text-[11px] tracking-widest text-primary-fixed opacity-80 uppercase font-semibold">
            Timeline
          </span>
          <span className="font-body text-base font-semibold text-foreground">
            {startDate} - {endDate}
          </span>
        </div>
        {tech.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-code text-[11px] tracking-widest text-primary-fixed opacity-80 uppercase font-semibold">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-primary-fixed/10 text-primary-fixed rounded-full font-code text-xs border border-primary-fixed/20 select-none"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Technical Achievements Redesign Section */}
      {achievements.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-body text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider border-b border-foreground/5 dark:border-white/5 pb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed select-none">
              emoji_events
            </span>
            Technical Achievements
          </h2>
          <div
            ref={achievementsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-bento-gap"
          >
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className={`glass-card rounded-xl p-8 flex flex-col gap-4 items-start group hover:bg-surface-container/20 transition-all duration-300 ${
                  ach.span === 2 ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center border border-primary-fixed/20 mb-2">
                  <span className="material-symbols-outlined text-primary-fixed text-xl select-none">
                    {ach.icon}
                  </span>
                </div>
                <h3 className="font-body text-lg md:text-xl font-bold text-foreground group-hover:text-primary-fixed transition-colors duration-200">
                  {ach.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-grow">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Secondary Details: Milestones & Progress Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-bento-gap">
        {/* Left Column: Milestones Checklist */}
        {milestones.length > 0 && (
          <div ref={contentRef} className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 md:p-8 rounded-xl space-y-6">
              <div className="flex items-center justify-between border-b border-foreground/5 dark:border-white/5 pb-3">
                <h2 className="font-body text-lg font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined select-none">
                    checklist
                  </span>
                  Milestones & Deliverables
                </h2>
                <span className="font-code text-xs text-on-surface-variant font-semibold">
                  {milestones.filter((m) => m.status === "completed").length} /{" "}
                  {milestones.length} DONE
                </span>
              </div>

              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-surface-container/30 border border-foreground/5 dark:border-white/5 hover:border-primary-fixed/20 transition-all duration-300"
                  >
                    <div className="mt-0.5">
                      {milestone.status === "completed" && (
                        <span className="material-symbols-outlined text-emerald-500 dark:text-emerald-400 select-none">
                          check_circle
                        </span>
                      )}
                      {milestone.status === "in-progress" && (
                        <span className="material-symbols-outlined text-primary-fixed select-none animate-spin">
                          progress_activity
                        </span>
                      )}
                      {milestone.status === "pending" && (
                        <span className="material-symbols-outlined text-on-surface-variant/40 select-none">
                          radio_button_unchecked
                        </span>
                      )}
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3
                          className={`font-body text-sm font-bold transition-colors ${
                            milestone.status === "completed"
                              ? "text-on-surface-variant line-through"
                              : "text-foreground"
                          }`}
                        >
                          {milestone.name}
                        </h3>
                        {milestone.dueDate && (
                          <span className="font-code text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30">
                            Due {milestone.dueDate}
                          </span>
                        )}
                      </div>
                      {milestone.description && (
                        <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                          {milestone.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right Column: Health / Progress Circular Tracker */}
        <div className="space-y-bento-gap">
          <div className="glass-card p-6 md:p-8 rounded-xl flex flex-col items-center justify-between text-center min-h-[350px] relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary-fixed/10 blur-2xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-secondary-container/10 blur-2xl rounded-full pointer-events-none" />

            <h2 className="font-body text-lg font-bold text-primary-fixed uppercase tracking-wider self-start flex items-center gap-2 w-full border-b border-foreground/5 dark:border-white/5 pb-3">
              <span className="material-symbols-outlined select-none">
                analytics
              </span>
              Project Progress
            </h2>

            {/* Circular Progress Gauge */}
            <div className="relative flex items-center justify-center my-6 select-none">
              <svg
                className="w-36 h-36 transform -rotate-90"
                role="img"
                aria-label="Project completion progress gauge"
              >
                <title>Project Completion Gauge</title>
                {/* Background Ring */}
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-surface-container-high fill-transparent"
                  strokeWidth="10"
                />
                {/* Foreground Progress Ring with theme color */}
                <circle
                  cx="72"
                  cy="72"
                  r="62"
                  className="stroke-primary-fixed fill-transparent transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 62}
                  strokeDashoffset={2 * Math.PI * 62 * (1 - progress / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="font-body text-3xl font-extrabold text-foreground">
                  {progress}%
                </span>
                <span className="font-code text-[9px] text-on-surface-variant tracking-wider uppercase font-semibold">
                  Completed
                </span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between font-code text-xs text-on-surface-variant font-semibold">
                  <span>OVERALL HEALTH</span>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    STABLE
                  </span>
                </div>
                <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden border border-outline-variant/30">
                  <div
                    className="h-full bg-gradient-to-r from-primary-fixed-dim to-primary-fixed rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Lead Card */}
              <div className="p-3.5 rounded-xl bg-surface-container-low/40 border border-foreground/5 dark:border-white/5 flex items-center gap-3 text-left w-full">
                {projectLead.avatarUrl ? (
                  // biome-ignore lint/performance/noImgElement: Lead avatar
                  <img
                    src={projectLead.avatarUrl}
                    alt={projectLead.name}
                    className="w-10 h-10 rounded-full object-cover border border-outline-variant"
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-extrabold bg-gradient-to-tr ${getAvatarGradient(
                      projectLead.name,
                    )} shadow-md`}
                  >
                    {getInitials(projectLead.name)}
                  </div>
                )}
                <div className="flex-grow min-w-0">
                  <h4 className="font-body text-xs font-bold text-foreground truncate">
                    {projectLead.name}
                  </h4>
                  <p className="font-body text-[10px] text-on-surface-variant truncate">
                    {projectLead.role} (Lead)
                  </p>
                </div>
                {projectLead.email && (
                  <a
                    href={`mailto:${projectLead.email}`}
                    className="text-on-surface-variant hover:text-primary-fixed transition-colors duration-200"
                    title={`Contact ${projectLead.name}`}
                  >
                    <span className="material-symbols-outlined text-lg select-none">
                      mail
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roster section */}
      {team.length > 0 && (
        <div
          ref={teamRef}
          className="glass-card p-6 md:p-8 rounded-xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-foreground/5 dark:border-white/5 pb-3">
            <h2 className="font-body text-lg font-bold text-primary-fixed uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined select-none">
                groups
              </span>
              Team & Contributors
            </h2>
            <span className="font-code text-xs text-on-surface-variant font-semibold">
              {team.length} {team.length === 1 ? "Member" : "Members"} Assigned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-bento-gap">
            {team.map((member) => (
              <div
                key={member.id}
                className="group/member p-4 rounded-xl bg-surface-container/30 border border-foreground/5 dark:border-white/5 hover:border-primary-fixed/20 hover:bg-surface-container-high/30 transition-all duration-300 flex items-center gap-4.5"
              >
                <div className="relative">
                  {member.avatarUrl ? (
                    // biome-ignore lint/performance/noImgElement: Member avatar
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-outline-variant/60 group-hover/member:border-primary-fixed-dim/40 transition-colors duration-300"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm bg-gradient-to-tr ${getAvatarGradient(
                        member.name,
                      )} shadow-md`}
                    >
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full border border-primary-fixed/0 group-hover/member:border-primary-fixed/20 scale-105 transition-all duration-300" />
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className="font-body text-sm font-bold text-foreground group-hover/member:text-primary-fixed transition-colors duration-200 truncate">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant truncate">
                    {member.role}
                  </p>
                </div>

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="opacity-0 group-hover/member:opacity-100 transition-opacity duration-300 p-1.5 rounded-full hover:bg-primary-fixed/10 text-on-surface-variant hover:text-primary-fixed flex items-center justify-center"
                    title={`Email ${member.name}`}
                  >
                    <span className="material-symbols-outlined text-lg select-none">
                      mail
                    </span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
