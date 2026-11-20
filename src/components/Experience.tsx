import { useInView } from "@/hooks/use-motion";
import { roles } from "@/data/experience";
import ExperienceCard from "./ExperienceCard";

const Experience = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="experience" className="section-padding relative bg-surface-1">
      <div className="section-shell">
        {/* Heading column on the left, timeline on the right. On wide screens
            the heading stays pinned while the roles scroll past it. */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Experience</p>
            <h2 className="section-title lg:text-[2.5rem]">
              A track record of building automation
            </h2>
            <p className="section-lede mt-5">
              Turning repetitive business processes into systems that run on their own.
            </p>
          </div>

          <div ref={ref} className={`xp-timeline relative ${inView ? "is-in" : ""}`}>
            <span className="xp-rail" aria-hidden />

            <ol>
              {roles.map((role, i) => (
                <ExperienceCard
                  key={`${role.title}-${role.period}`}
                  role={role}
                  index={i}
                  inView={inView}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
