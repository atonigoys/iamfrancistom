import type { Role } from "@/data/experience";

const STAGGER = 120; // ms between items

interface Props {
  role: Role;
  index: number;
  inView: boolean;
}

const ExperienceCard = ({ role, index, inView }: Props) => {
  const current = index === 0;

  return (
    <li
      className={`xp-item relative pb-8 pl-8 last:pb-0 sm:pl-10 ${inView ? "is-in" : ""}`}
      style={{ "--d": `${index * STAGGER}ms` } as React.CSSProperties}
    >
      <span className="xp-node" data-active={current} aria-hidden />

      <article className="card-surface p-6 sm:p-8">
        {/* The current role gets the inverted pill; earlier ones are outlined. */}
        <p
          className={`metric inline-flex rounded-full border px-3 py-1.5 text-[10.5px] font-medium uppercase leading-none tracking-[0.14em] ${
            current
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-surface-1 text-muted-foreground"
          }`}
        >
          {role.period}
        </p>

        <h3 className="mt-5 text-xl font-semibold leading-snug text-foreground sm:text-2xl sm:tracking-[-0.025em]">
          {role.title}
        </h3>

        {role.company && (
          <p className="mt-1.5 text-[15px] font-medium text-muted-foreground">{role.company}</p>
        )}

        {role.desc && (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            {role.desc}
          </p>
        )}

        {role.bullets && (
          <ul className="mt-6 space-y-3">
            {role.bullets.map((b) => (
              <li
                key={b}
                className="relative pl-5 text-[15px] leading-relaxed text-muted-foreground"
              >
                <span className="xp-bullet-dot" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap gap-1.5 border-t border-border pt-6">
          {role.focus.map((f) => (
            <span key={f} className="chip">
              {f}
            </span>
          ))}
        </div>
      </article>
    </li>
  );
};

export default ExperienceCard;
