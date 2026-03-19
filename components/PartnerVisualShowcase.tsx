import Image from "next/image";

type PartnerVisualShowcaseProps = {
  compact?: boolean;
};

type ShowcaseItem = {
  id: string;
  title: string;
  detail: string;
  src: string;
  slot: "primary" | "secondary" | "v1" | "v2" | "v3";
};

const showcaseItems: ShowcaseItem[] = [
  {
    id: "field-safety-briefing-03",
    title: "Execution Command Overview",
    detail: "Live coordination view of active fire, electrical, and MEP works.",
    src: "/images/field-safety-briefing-03.jpeg",
    slot: "primary",
  },
  {
    id: "site-activity-05",
    title: "Live Site Execution",
    detail: "On-ground deployment with monitored safety and quality checkpoints.",
    src: "/images/site-activity-05.jpeg",
    slot: "secondary",
  },
  {
    id: "site-activity-06",
    title: "MEP Integration in Progress",
    detail: "Routing and installation progress captured during active execution windows.",
    src: "/images/site-activity-06.jpeg",
    slot: "v1",
  },
  {
    id: "site-activity-07",
    title: "Crew Alignment & Safety Control",
    detail: "Workfront planning, safety protocol checks, and role assignment on site.",
    src: "/images/site-activity-07.jpeg",
    slot: "v2",
  },
  {
    id: "site-activity-12",
    title: "Milestone Delivery Snapshot",
    detail: "Latest progress visuals from ongoing commercial and infrastructure jobs.",
    src: "/images/site-activity-12.jpeg",
    slot: "v3",
  },
];

const detailItems = [
  {
    id: "activity-01",
    title: "Site Activity 01",
    src: "/images/site-activity-01.jpeg",
  },
  {
    id: "activity-02",
    title: "Site Activity 02",
    src: "/images/site-activity-02.jpeg",
  },
  {
    id: "activity-04",
    title: "Site Activity 04",
    src: "/images/site-activity-04.jpeg",
  },
  {
    id: "activity-08",
    title: "Site Activity 08",
    src: "/images/site-activity-08.jpeg",
  },
  {
    id: "activity-09",
    title: "Site Activity 09",
    src: "/images/site-activity-09.jpeg",
  },
  {
    id: "activity-10",
    title: "Site Activity 10",
    src: "/images/site-activity-10.jpeg",
  },
  {
    id: "activity-11",
    title: "Site Activity 11",
    src: "/images/site-activity-11.jpeg",
  },
  {
    id: "activity-03",
    title: "Site Activity 03",
    src: "/images/site-activity-03.jpeg",
  },
  {
    id: "field-briefing-01",
    title: "Safety Briefing 01",
    src: "/images/field-safety-briefing-01.jpeg",
  },
  {
    id: "field-briefing-02",
    title: "Safety Briefing 02",
    src: "/images/field-safety-briefing-02.jpeg",
  },
  {
    id: "toolbox-talk",
    title: "Toolbox Talk",
    src: "/images/field-toolbox-talk-01.jpeg",
  },
  {
    id: "lift-01",
    title: "Lift Installation 01",
    src: "/images/mep-installation-lift-01.jpeg",
  },
  {
    id: "lift-02",
    title: "Lift Installation 02",
    src: "/images/mep-installation-lift-02.jpeg",
  },
  {
    id: "lift-03",
    title: "Lift Installation 03",
    src: "/images/mep-installation-lift-03.jpeg",
  },
  {
    id: "progress-collage",
    title: "Progress Snapshot",
    src: "/images/site-progress-collage-01.jpeg",
  },
  {
    id: "supervisor",
    title: "Site Supervision",
    src: "/images/site-supervisor-portrait-01.jpeg",
  },
  {
    id: "slab-prep",
    title: "Slab Preparation",
    src: "/images/slab-prep-lift-01.jpeg",
  },
];

export default function PartnerVisualShowcase({
  compact = false,
}: PartnerVisualShowcaseProps) {
  const items = compact
    ? showcaseItems.filter((item) => ["primary", "v1", "v2"].includes(item.slot))
    : showcaseItems;

  return (
    <section className={`partner-showcase ${compact ? "compact" : ""}`}>
      <div className="partner-showcase-head">
        <p className="partner-showcase-label">Execution Visuals</p>
        <p className="partner-showcase-copy">
          Real-world delivery context across fire protection, electrical, and
          MEP deployment workflows.
        </p>
      </div>

      <div className={`partner-showcase-grid ${compact ? "compact" : "full"}`}>
        {items.map((item, index) => (
          <article
            key={item.id}
            className={`partner-showcase-card slot-${item.slot}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes={
                compact
                  ? "(max-width: 600px) 100vw, (max-width: 1024px) 45vw, 30vw"
                  : "(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              priority={compact && index === 0}
            />
            <div className="partner-showcase-overlay">
              <p>{item.title}</p>
              <span>{item.detail}</span>
            </div>
          </article>
        ))}
      </div>

      {!compact ? (
        <>
          <div className="partner-showcase-metrics">
            <span>
              <strong>25+ Years</strong> execution experience
            </span>
            <span>
              <strong>100+ Sites</strong> delivered and supported
            </span>
            <span>
              <strong>Fire + MEP</strong> integrated service model
            </span>
          </div>

          <div className="partner-showcase-rail">
            {detailItems.map((item) => (
              <article key={item.id} className="partner-showcase-rail-card">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 48vw, 24vw"
                />
                <span>{item.title}</span>
              </article>
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
