import { useState } from "react";
import { MapPin, Clock3 } from "lucide-react";

/** Save the headshot to public/images/francis.jpg. If it's missing, onError
 *  swaps in the initials block so the card never shows a broken image. */
const PHOTO = "/images/francis.jpg";

const facts = [
  { icon: MapPin, label: "Philippines · works with clients worldwide" },
  { icon: Clock3, label: "Available across US, EU and APAC hours" },
];

/** Portrait card. The photo is rendered in black and white to sit inside the
 *  monochrome system; hover is a slow zoom and a soft lift, nothing more. See
 *  index.css `.pc-*`. */
const ProfileCard = () => {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <div className="pc mx-auto w-full max-w-[340px]">
      <div className="pc-photo">
        {photoOk ? (
          <img
            src={PHOTO}
            alt="Francis Tom Say"
            width={340}
            height={425}
            loading="lazy"
            decoding="async"
            onError={() => setPhotoOk(false)}
          />
        ) : (
          <div className="grid-field flex h-full w-full items-center justify-center">
            <span
              aria-hidden
              className="text-6xl font-semibold tracking-tight text-foreground/20"
            >
              FT
            </span>
            <span className="sr-only">Photo coming soon</span>
          </div>
        )}
      </div>

      <div className="pc-meta">
        <p className="text-base font-semibold leading-tight text-foreground">
          Francis Tom Say
        </p>
        <p className="mt-1.5 font-mono text-[11px] uppercase leading-none tracking-[0.14em] text-muted-foreground">
          AI Automation Specialist
        </p>

        <ul className="mt-4 space-y-2 border-t border-border pt-4">
          {facts.map((f) => (
            <li
              key={f.label}
              className="flex items-start gap-2.5 text-[13px] leading-snug text-muted-foreground"
            >
              <f.icon size={14} className="mt-[2px] shrink-0 text-foreground" aria-hidden />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
