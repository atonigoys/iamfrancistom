export interface Role {
  period: string;
  title: string;
  /** Optional — entries without a company don't render the line. */
  company?: string;
  /** Use `desc` for a summary paragraph, `bullets` for itemised duties, or both. */
  desc?: string;
  bullets?: string[];
  focus: string[];
}

export const roles: Role[] = [
  {
    period: "Present",
    title: "AI Automation Specialist",
    company: "Direct Client",
    bullets: [
      "Designed and developed AI-powered automation workflows for AWIN and Impact.com affiliate marketing platforms using n8n.",
      "Automated affiliate outreach processes by identifying, qualifying, and organizing potential affiliate partners.",
      "Built workflows to retrieve and process affiliate, publisher, and performance data from the AWIN and Impact APIs.",
      "Developed backend automation for collecting publisher information, affiliate applications, transactions, commissions, and campaign performance.",
      "Created automated analytics dashboards that provided real-time insights into affiliate performance, publisher activity, clicks, conversions, and revenue.",
      "Integrated multiple APIs to automate data collection, reporting, and dashboard updates, significantly reducing manual work.",
      "Implemented error handling, data validation, and workflow optimization to ensure reliable and scalable automation.",
      "Worked directly with the client to develop custom automation solutions that improved affiliate management and marketing operations.",
    ],
    focus: [
      "n8n",
      "AWIN API",
      "Impact.com API",
      "OpenAI API",
      "Google Sheets",
      "JavaScript",
      "REST APIs",
      "HTTP Requests",
      "Webhooks",
      "JSON",
      "API Integration",
      "Workflow Automation",
      "Analytics Dashboard",
      "Data Processing",
    ],
  },
  {
    period: "Previous Position",
    title: "SEO Automation Specialist",
    company: "Royal Bully Agency",
    bullets: [
      "Developed and maintained automated SEO workflows for clients in the HVAC, Construction, Roofing, and General Contracting industries.",
      "Built n8n automation workflows to streamline keyword research, local SEO data collection, competitor analysis, and reporting.",
      "Automated the collection and organization of SEO metrics, Google Business Profile data, and website performance into Google Sheets.",
      "Created workflows for lead generation, business directory scraping, and prospect database management.",
      "Integrated APIs and third-party SEO tools to automate repetitive marketing and SEO tasks.",
      "Reduced manual workload by implementing scalable automation solutions, improving reporting speed and data accuracy.",
      "Collaborated with the SEO team to optimize local search rankings and automate recurring SEO processes.",
      "Monitored, maintained, and optimized workflows to ensure reliable and efficient automation.",
    ],
    focus: [
      "n8n",
      "Google Sheets",
      "Google Workspace",
      "JavaScript",
      "REST APIs",
      "Web Scraping",
      "Local SEO",
      "Workflow Automation",
      "Google Business Profile (GBP)",
      "Data Processing",
    ],
  },
];
