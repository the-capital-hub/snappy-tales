import { Metadata } from "next";
import { BOOKING_URL } from "./constants";

export interface ServiceOverview {
  description: string;
  bullets: string[];
}

export interface ServiceHero {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  overview: ServiceOverview;
  hero: ServiceHero;
  stats: { value: string; label: string }[];
  marquee: string[];
  features: { title: string; description: string }[];
  process: { title: string; description: string; result: string }[];
  outcomes: { title: string; description: string }[];
  testimonial?: { quote: string; author: string; role: string };
  seo?: Partial<Metadata>;
}

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "website-app-development",
    title: "Website & App Development",
    overview: {
      description:
        "We create fast, scalable, and stunning digital products that deliver real impact.",
      bullets: [
        "Custom Websites & Landing Pages",
        "E-commerce Stores",
        "Mobile Apps (iOS & Android)",
        "Product MVPs & Prototypes",
      ],
    },
    hero: {
      eyebrow: "Product Engineering",
      heading: "Websites & apps engineered for the next growth sprint.",
      description:
        "From vision to version-one and beyond, we design, build, and scale digital products with the craft of a studio and the velocity of an in-house squad.",
      ctaLabel: "Book a product sprint",
      ctaHref: BOOKING_URL,
      secondaryLabel: "Explore all services",
      secondaryHref: "/services",
    },
    stats: [
      { value: "120+", label: "digital products launched" },
      { value: "2.4x", label: "average release speed" },
      { value: "94%", label: "feature adoption after launch" },
    ],
    marquee: [
      "Next.js engineering",
      "Cloud-native architecture",
      "API integrations",
      "App store launch support",
      "Maintenance & optimisation",
    ],
    features: [
      {
        title: "Full-stack product engineering",
        description:
          "Battle-tested stacks across Next.js, Node, and serverless let us craft lightning-fast experiences users love.",
      },
      {
        title: "Mobile journeys that convert",
        description:
          "Native-quality React Native and Expo builds with platform-specific polish and analytics baked in.",
      },
      {
        title: "Composable commerce & platforms",
        description:
          "Headless storefronts, subscription flows, and complex integrations tailored to your growth roadmap.",
      },
      {
        title: "Rapid prototyping & MVPs",
        description:
          "Investor-ready prototypes in weeks with experiment-driven sprints and obsessive QA.",
      },
    ],
    process: [
      {
        title: "Discover & architect",
        description:
          "Align on goals, success metrics, and the technical blueprint in collaborative workshops.",
        result: "Crystal-clear product direction and prioritized roadmap.",
      },
      {
        title: "Design & prototype",
        description:
          "Clickable flows and design systems validated with key stakeholders and early adopters.",
        result: "Validated experience ready for engineering handoff.",
      },
      {
        title: "Build & integrate",
        description:
          "Agile development across frontend, backend, and automations with transparent sprint rituals.",
        result: "Production-ready release with QA baked into every sprint.",
      },
      {
        title: "Launch & optimise",
        description:
          "Deployment automation, analytics wiring, and iteration loops to scale confidently.",
        result: "Live product supported with performance and growth insights.",
      },
    ],
    outcomes: [
      {
        title: "Frictionless user journeys",
        description:
          "Delight users with fast load times, intuitive flows, and purposeful micro-interactions.",
      },
      {
        title: "Future-ready architecture",
        description:
          "Composable foundations that keep scaling simple as your roadmap evolves.",
      },
      {
        title: "Continuous delivery muscle",
        description:
          "A shipping cadence that keeps features flowing without burning your team out.",
      },
    ],
    testimonial: {
      quote:
        "Snappy Tales launched our marketplace MVP in record time and kept iterating with data-led releases. They're true technical partners.",
      author: "Anika Rao",
      role: "Founder, LoopCart",
    },
    seo: {
      description:
        "Custom software, websites, and mobile apps crafted end-to-end by Snappy Tales. We ship investor-ready MVPs and scalable platforms fast.",
    },
  },
  {
    slug: "branding-ui-ux-design",
    title: "Branding & UI/UX Design",
    overview: {
      description: "Your brand is your story — we make it unforgettable.",
      bullets: [
        "Logo & Brand Identity Design",
        "UI/UX for Web & Mobile",
        "Pitch Decks & Creative Collateral",
        "Social Media Graphics & Campaign Assets",
      ],
    },
    hero: {
      eyebrow: "Design Language",
      heading: "Brands and product interfaces that people feel before they read.",
      description:
        "We translate your ambition into visual systems, interactions, and stories that move audiences across every touchpoint.",
      ctaLabel: "Schedule a design review",
      ctaHref: BOOKING_URL,
      secondaryLabel: "Download credentials",
      secondaryHref: "/our-story",
    },
    stats: [
      { value: "40+", label: "brand systems launched" },
      { value: "3x", label: "increase in conversion post redesign" },
      { value: "95%", label: "deck approval on first pass" },
    ],
    marquee: [
      "Identity systems",
      "Design audits",
      "Component libraries",
      "Narrative storytelling",
      "Design ops support",
    ],
    features: [
      {
        title: "Strategic identity creation",
        description:
          "Archetypes, messaging, and visual worlds that mirror your mission and market edge.",
      },
      {
        title: "UX research & mapping",
        description:
          "User interviews, journey maps, and heuristic audits that inform every pixel we place.",
      },
      {
        title: "Design systems & libraries",
        description:
          "Production-ready component systems for Figma and code that empower teams to ship faster.",
      },
      {
        title: "Story-first collateral",
        description:
          "Pitch decks, social kits, and launch campaigns that keep your narrative consistent everywhere.",
      },
    ],
    process: [
      {
        title: "Insight & positioning",
        description:
          "Deep-dive workshops, competitor sweeps, and tone-of-voice explorations to define the arena.",
        result: "A sharp positioning statement and north-star moodboards.",
      },
      {
        title: "Concept & co-creation",
        description:
          "We explore divergent directions, gather real-time feedback, and iterate collaboratively.",
        result: "Signed-off creative direction with clear guardrails.",
      },
      {
        title: "Systems & interface design",
        description:
          "Detailed UI flows, interaction states, and documentation your teams can run with.",
        result: "Tokenised design systems ready for development.",
      },
      {
        title: "Launch kits & roll-out",
        description:
          "Brand playbooks, asset repositories, and training to empower your next big reveal.",
        result: "Confident teams activating a coherent brand story.",
      },
    ],
    outcomes: [
      {
        title: "Ownable visual language",
        description:
          "Stand out with a design language that can't be mistaken for anyone else in your category.",
      },
      {
        title: "Design-driven growth",
        description:
          "UX improvements that translate directly into higher conversion and retention.",
      },
      {
        title: "Empowered teams",
        description:
          "Clear guidelines and reusable assets that keep marketing and product in sync.",
      },
    ],
    testimonial: {
      quote:
        "The rebrand gave our SaaS product a soul. Investors, customers, even new hires felt the shift immediately.",
      author: "Nikhil Bhatia",
      role: "CEO, Relayly",
    },
    seo: {
      description:
        "Brand identity, UI/UX, and product design services by Snappy Tales. We craft strategic design systems that drive measurable growth.",
    },
  },
  {
    slug: "marketing-growth",
    title: "Marketing & Growth",
    overview: {
      description:
        "More visibility, more engagement, more customers — powered by data-driven marketing.",
      bullets: [
        "SEO, SEM, SMM",
        "Content & Inbound Marketing",
        "Performance Marketing (Meta, Google, LinkedIn Ads)",
        "Growth Campaigns that Convert",
      ],
    },
    hero: {
      eyebrow: "Demand Engines",
      heading: "Growth programs engineered for compounding traction.",
      description:
        "We blend performance, product marketing, and storytelling into revenue-focused experiments that keep compounding.",
      ctaLabel: "Launch a growth sprint",
      ctaHref: BOOKING_URL,
      secondaryLabel: "See our approach",
      secondaryHref: "/our-story",
    },
    stats: [
      { value: "18x", label: "ROAS achieved on peak campaigns" },
      { value: "250%", label: "avg. pipeline lift in 90 days" },
      { value: "60+", label: "go-to-market experiments shipped" },
    ],
    marquee: [
      "Acquisition funnels",
      "Lifecycle automation",
      "Content engines",
      "Paid media ops",
      "Revenue analytics",
    ],
    features: [
      {
        title: "Full-funnel performance",
        description:
          "Always-on campaigns across search, social, and partnerships optimised for CAC and payback.",
      },
      {
        title: "Content & storytelling",
        description:
          "Editorial narratives, SEO pillars, and enablement assets that earn trust at every touchpoint.",
      },
      {
        title: "Lifecycle journeys",
        description:
          "Email, in-product nudges, and CRM workflows that nurture leads into power users.",
      },
      {
        title: "Revenue intelligence",
        description:
          "Experiment dashboards, attribution modelling, and insight loops for faster decisions.",
      },
    ],
    process: [
      {
        title: "Audit & align",
        description:
          "We benchmark growth foundations, audiences, and offer positioning across your funnel.",
        result: "Prioritised opportunities with clear KPIs and channel focus.",
      },
      {
        title: "Experiment design",
        description:
          "Hypothesis-led campaign playbooks with creative hooks, targeting, and measurement plans.",
        result: "Experiment backlog tied to north-star metrics.",
      },
      {
        title: "Launch & optimise",
        description:
          "Rapid creative testing, bid optimisation, and narrative refreshes across every live channel.",
        result: "Performance lift backed by real-time insights dashboards.",
      },
      {
        title: "Scale & systemise",
        description:
          "We embed playbooks, automations, and training so the wins keep compounding.",
        result: "In-house teams empowered with repeatable growth engines.",
      },
    ],
    outcomes: [
      {
        title: "Predictable acquisition",
        description:
          "Dialled-in channels delivering a steady drumbeat of qualified demand.",
      },
      {
        title: "Story-led differentiation",
        description:
          "Consistent narratives that move your audience from curious to committed.",
      },
      {
        title: "Revenue clarity",
        description:
          "Dashboards and learnings that show exactly what to scale next.",
      },
    ],
    testimonial: {
      quote:
        "Pipeline tripled in a quarter. Snappy Tales made every growth experiment measurable and repeatable.",
      author: "Devika Menon",
      role: "VP Growth, StellarHR",
    },
    seo: {
      description:
        "Performance marketing, content, and lifecycle growth programs by Snappy Tales. We design demand engines that keep compounding.",
    },
  },
  {
    slug: "gtm-scaling-strategy",
    title: "Go-To-Market (GTM) & Scaling Strategy",
    overview: {
      description: "From launch to traction, we help you scale smarter.",
      bullets: [
        "GTM Strategy & Execution",
        "Growth Funnels & Experimentation",
        "Community & Audience Building",
        "Conversion Rate Optimization",
      ],
    },
    hero: {
      eyebrow: "Strategic Sprints",
      heading: "Your roadmap from zero to breakout traction.",
      description:
        "We map, test, and refine go-to-market motions that align product, marketing, and revenue teams around the same scoreboard.",
      ctaLabel: "Co-create the roadmap",
      ctaHref: BOOKING_URL,
      secondaryLabel: "Meet the strategists",
      secondaryHref: "/our-story",
    },
    stats: [
      { value: "6", label: "average weeks to market launch" },
      { value: "4x", label: "increase in qualified pipeline" },
      { value: "70%", label: "faster feedback loops" },
    ],
    marquee: [
      "Segment intelligence",
      "Value prop design",
      "Pricing validation",
      "Sales enablement",
      "Community playbooks",
    ],
    features: [
      {
        title: "Strategic segmentation",
        description:
          "Define beachheads, ICPs, and messaging architecture grounded in market truth.",
      },
      {
        title: "Offer & pricing experiments",
        description:
          "Validate packages and pricing through rapid experiments before scaling spend.",
      },
      {
        title: "Enablement ecosystems",
        description:
          "Playbooks, scripts, and assets that align marketing and sales on the same story.",
      },
      {
        title: "Feedback loops & ops",
        description:
          "Instrumentation, rituals, and governance that keep your GTM machine adapting fast.",
      },
    ],
    process: [
      {
        title: "Alignment sprint",
        description:
          "Cross-functional workshops to align on vision, ICPs, and growth hypotheses.",
        result: "Documented GTM thesis with shared success metrics.",
      },
      {
        title: "Experiment design",
        description:
          "Stack-ranked launch plays across channels, messaging, and offers.",
        result: "Prioritised roadmap with owners and timelines.",
      },
      {
        title: "Launch orchestration",
        description:
          "We embed with your teams to execute plays, monitor signals, and adjust in real-time.",
        result: "Coordinated launches with rapid learnings.",
      },
      {
        title: "Scale rituals",
        description:
          "Retros, dashboards, and enablement to lock in the momentum and scale sustainably.",
        result: "Operational cadence that keeps teams rowing in sync.",
      },
    ],
    outcomes: [
      {
        title: "Aligned revenue teams",
        description:
          "Product, marketing, and sales working from the same narrative and data.",
      },
      {
        title: "Faster market feedback",
        description:
          "Shorter loops between experiments, insights, and roadmap decisions.",
      },
      {
        title: "Momentum that compounds",
        description:
          "A GTM engine that scales with clarity, pace, and focus.",
      },
    ],
    testimonial: {
      quote:
        "They brought structure to our GTM chaos. In six weeks we had a revenue engine and a team confident in running it.",
      author: "Shaan Pereira",
      role: "Chief Revenue Officer, NovaIQ",
    },
    seo: {
      description:
        "Strategic go-to-market programs from Snappy Tales. Align product, marketing, and revenue teams with experimentation-driven GTM sprints.",
    },
  },
  {
    slug: "accelerator-investor-connect",
    title: "Accelerator Support & Investor Connect",
    overview: {
      description: "We help you get investor-ready and open the right doors.",
      bullets: [
        "Fundraising Strategy & Pitch Deck Creation",
        "Investor Intros & Warm Connects",
        "Pitch Practice & Advisory",
      ],
    },
    hero: {
      eyebrow: "Capital Readiness",
      heading: "Fundraising stories and investor rooms that convert belief into backing.",
      description:
        "From narrative crafting to warm introductions, we coach founders through every investor touchpoint with confidence.",
      ctaLabel: "Plan your raise",
      ctaHref: BOOKING_URL,
      secondaryLabel: "Get founder resources",
      secondaryHref: "/our-story",
    },
    stats: [
      { value: "$65M", label: "capital unlocked for founders" },
      { value: "30+", label: "accelerators & funds in our circle" },
      { value: "2x", label: "faster deck-to-meeting ratio" },
    ],
    marquee: [
      "Narrative coaching",
      "Pitch simulations",
      "Warm investor connects",
      "Data room prep",
      "Founder storytelling",
    ],
    features: [
      {
        title: "Fundraising strategy",
        description:
          "Target lists, raise structures, and timelines tailored to your stage and story.",
      },
      {
        title: "Investor-ready storytelling",
        description:
          "Pitch decks, one-pagers, and financial narratives that make conviction easy.",
      },
      {
        title: "Warm introductions",
        description:
          "Access to aligned accelerators, micro VCs, and operator-angels within our trusted network.",
      },
      {
        title: "Coaching & simulations",
        description:
          "Mock pitches, objection handling, and narrative refinement led by seasoned operators.",
      },
    ],
    process: [
      {
        title: "Story discovery",
        description:
          "We unpack your vision, traction, and ambition to identify the investor hooks.",
        result: "Compelling investment narrative anchored in truth.",
      },
      {
        title: "Asset production",
        description:
          "Design-led decks, financial models, and data rooms that answer questions before they're asked.",
        result: "Polished collateral that travels fast across inboxes.",
      },
      {
        title: "Warm outreach",
        description:
          "Strategic sequencing of intros, follow-ups, and exclusive previews to drive momentum.",
        result: "Active pipeline of qualified investor conversations.",
      },
      {
        title: "Pitch mastery",
        description:
          "Coaching, rehearsals, and feedback loops until every response feels effortless.",
        result: "Founders walking into rooms prepared and confident.",
      },
    ],
    outcomes: [
      {
        title: "Investor-ready narrative",
        description:
          "Clear, compelling stories that cut through crowded inboxes.",
      },
      {
        title: "Trusted introductions",
        description:
          "Warm pathways into the right rooms instead of cold outreach marathons.",
      },
      {
        title: "Founder confidence",
        description:
          "Rehearsed answers, sharp storytelling, and a support squad in your corner.",
      },
    ],
    testimonial: {
      quote:
        "Their coaching and network turned our seed round from slow conversations to an oversubscribed close in six weeks.",
      author: "Tanvi Patel",
      role: "Co-founder, FluxPay",
    },
    seo: {
      description:
        "Accelerator and fundraising support by Snappy Tales. Craft investor-ready narratives, decks, and warm introductions that unlock capital.",
    },
  },
];

export const getServiceBySlug = (slug: string) =>
  serviceDetails.find((service) => service.slug === slug);
