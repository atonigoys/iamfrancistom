import { motion } from "framer-motion";
import Certificates from "./Certificates";
import ProfileCard from "./ProfileCard";

const About = () => (
  <section id="about" className="section-padding relative">
    <div className="section-shell">
      <div className="grid items-start gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            I build automations that outlive the engagement
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
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

          <div className="mt-8">
            <Certificates />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;
