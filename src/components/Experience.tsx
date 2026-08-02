import { useInView } from "@/hooks/use-motion";
import { roles } from "@/data/experience";
import ExperienceCard from "./ExperienceCard";

/** Fixed values rather than Math.random() so the field is stable across
 *  renders and identical between server and client. */
const particles = [
  { left: "8%", top: "72%", dx: "26px", dy: "-190px", dur: "22s", delay: "0s", size: 3 },
  { left: "18%", top: "88%", dx: "-18px", dy: "-240px", dur: "28s", delay: "3s", size: 2 },
  { left: "31%", top: "64%", dx: "34px", dy: "-160px", dur: "19s", delay: "6s", size: 3 },
  { left: "44%", top: "92%", dx: "-24px", dy: "-280px", dur: "31s", delay: "1s", size: 2 },
  { left: "57%", top: "70%", dx: "20px", dy: "-210px", dur: "25s", delay: "8s", size: 3 },
  { left: "69%", top: "85%", dx: "-30px", dy: "-175px", dur: "23s", delay: "4s", size: 2 },
  { left: "81%", top: "60%", dx: "16px", dy: "-250px", dur: "29s", delay: "11s", size: 3 },
  { left: "92%", top: "78%", dx: "-22px", dy: "-200px", dur: "26s", delay: "7s", size: 2 },
  { left: "25%", top: "40%", dx: "28px", dy: "-150px", dur: "24s", delay: "13s", size: 2 },
  { left: "63%", top: "35%", dx: "-26px", dy: "-190px", dur: "30s", delay: "9s", size: 2 },
];

const Experience = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-surface-1/40">
      {/* Ambient field — kept under 10% opacity so it never competes. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="xp-aura" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="xp-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
              "--dx": p.dx,
              "--dy": p.dy,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="section-shell relative">
        <div className="mb-14 text-center">
          <p className="eyebrow">Experience</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            A track record of building automation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            Turning repetitive business processes into systems that run on their own.
          </p>
        </div>

        <div ref={ref} className={`xp-timeline relative mx-auto max-w-3xl ${inView ? "is-in" : ""}`}>
          <span className="xp-rail" aria-hidden>
            <span className="xp-rail-line" />
            <span className="xp-rail-travel" />
          </span>

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
    </section>
  );
};

export default Experience;
