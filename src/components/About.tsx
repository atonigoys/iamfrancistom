import { motion } from "framer-motion";
import Certificates from "./Certificates";
import ProfileCard from "./ProfileCard";

const About = () => (
  <section id="about" className="section-padding relative bg-background">
    <div className="section-shell">
      <div className="grid items-start gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-20">
        {/* The portrait holds its place while the longer text column scrolls
            past it on wide screens. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:sticky lg:top-28"
        >
          <ProfileCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Who you'd be working with</p>
          <h2 className="section-title max-w-2xl">
            I build automations that outlive the engagement
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-[1.7] text-muted-foreground md:text-[17px]">
            <p>
              I'm Francis — I design and build the systems that handle the repetitive parts
              of running a business. Lead qualification, client onboarding, support triage,
              reporting: the work that has to happen every day but doesn't need a person
              deciding it.
            </p>
            <p>
              Most of what I build runs in n8n, Make or Zapier, wired into whatever stack a
              client already has — HubSpot, Airtable, Google Workspace, Slack, a CRM held
              together with spreadsheets. I care more about a workflow that quietly runs for
              a year than one that demos well.
            </p>
            <p>
              Every build is handed over documented, with credentials in your accounts and a
              walkthrough of how it works. If you ever want to change it without me, you can.
            </p>
          </div>

          <div className="mt-12 border-t border-border pt-10">
            <Certificates />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
