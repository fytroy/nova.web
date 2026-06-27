export interface Project {
  slug: string;
  title: string;
  tagline: string;
  tags: string;
  category: string;
  summary: string;
  variant: 1 | 2 | 3 | 4;
  screenshot?: string;
  status: string;
  role: string;
  githubUrl: string;
  liveUrl?: string;
  highlights: { value: string; label: string }[];
  challenge: string;
  solution: string;
  techStack: string[];
  impact: string;
}

export const projects: Project[] = [
  {
    slug: "karibustays",
    title: "KaribuStays",
    tagline: "A Kenyan stays marketplace, paid for with M-Pesa",
    tags: "Next.js 14 | TypeScript | PostgreSQL + Prisma | M-Pesa Daraja",
    category: "TRAVEL & HOSPITALITY | MARKETPLACE",
    summary:
      "A booking marketplace for independent cottages, villas and apartments across Kenya, built around a real M-Pesa STK Push payment flow instead of a Stripe placeholder.",
    variant: 1,
    screenshot: "/images/karibustays.jpg",
    status: "Live in Production",
    role: "Full-Stack Engineering & Payments Integration",
    githubUrl: "https://github.com/fytroy/KaribuStays",
    liveUrl: "https://karibustays.vercel.app",
    highlights: [
      { value: "M-Pesa", label: "Native Mobile Money Checkout" },
      { value: "Next.js 14", label: "App Router Architecture" },
      { value: "100%", label: "Public, Auditable Source Code" },
    ],
    challenge:
      "Most marketplace starter kits ship with Stripe and call it done. That's not how most Kenyan travelers pay. A real stays platform for this market needed mobile money baked into the core booking flow, not bolted on as an afterthought.",
    solution:
      "Built on Next.js 14's App Router with a PostgreSQL + Prisma data layer and NextAuth v5 for auth, with M-Pesa's Daraja API wired directly into the booking flow via STK Push — a guest can search, book, and pay without leaving the page. The visual identity (warm cream backgrounds, Fraunces serif display, forest-and-terracotta accents) was deliberately built to feel locally rooted rather than borrowing generic SaaS styling.",
    techStack: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "NextAuth v5", "M-Pesa Daraja API", "Tailwind CSS"],
    impact:
      "The result is a working marketplace, not a mockup — live at karibustays.vercel.app, with a payment flow that processes genuine STK Push requests end-to-end.",
  },
  {
    slug: "shopnasi",
    title: "Shopnasi",
    tagline: "A custom storefront for premium consumer electronics",
    tags: "Next.js | React | CSS Modules | SQLite",
    category: "E-COMMERCE | RETAIL TECH",
    summary:
      "A modern storefront for consumer electronics with real-time search, faceted filtering, and a full cart-to-order flow — owned end-to-end instead of rented from a SaaS platform.",
    variant: 2,
    status: "In Development",
    role: "Full-Stack Engineering & Product Design",
    githubUrl: "https://github.com/fytroy/Shopnasi",
    highlights: [
      { value: "Real-Time", label: "Search by Name, SKU & Description" },
      { value: "3-Facet", label: "Filtering: Category, Brand, Price" },
      { value: "Zero", label: "Platform Lock-In or SaaS Fees" },
    ],
    challenge:
      "Off-the-shelf e-commerce templates either lock a store into a SaaS platform's pricing or ship slow, bloated storefronts. The brief was a fast, fully custom storefront with real search and filtering, owned outright.",
    solution:
      "Built on Next.js with API routes acting as a lightweight backend, real-time search across name, SKU and description, faceted filtering by category, brand and price, and a glassmorphism-influenced visual language suited to consumer electronics.",
    techStack: ["Next.js", "React", "CSS Modules", "SQLite", "API Routes", "Context API"],
    impact:
      "Ships as a fully custom storefront with no platform lock-in and no monthly SaaS fee — a codebase the client can keep extending indefinitely.",
  },
  {
    slug: "banking-reconciliation-engine",
    title: "Banking Reconciliation Engine",
    tagline: "The unglamorous backend work that keeps a bank's books honest",
    tags: "Python | SQL | pytest",
    category: "FINTECH | BANKING OPERATIONS",
    summary:
      "An automated reconciliation engine that matches transactions between a core banking ledger and payment-gateway settlement reports.",
    variant: 3,
    status: "Open Source",
    role: "Data Engineering",
    githubUrl: "https://github.com/fytroy/BankingReconciliationEngine",
    highlights: [
      { value: "Automated", label: "Ledger-to-Settlement Matching" },
      { value: "pytest", label: "Verified Matching Logic" },
      { value: "CSV → SQL", label: "Repeatable ETL Pipeline" },
    ],
    challenge:
      "Manual reconciliation between a ledger system and a separate settlement report is slow and error-prone at real transaction volume — and discrepancies are exactly what auditors expect a bank to catch fast, not discover late.",
    solution:
      "A matching engine that ingests CSV exports from both systems, loads them into a queryable database, and reconciles transactions automatically, with SQL views for reporting and a pytest suite — including a synthetic data generator — so the matching logic is verifiable at scale, not just on a handful of sample rows.",
    techStack: ["Python", "SQL Views", "pytest", "CSV ETL", "Synthetic Data Generation"],
    impact:
      "Built with the rigor banking-grade reconciliation actually demands — tested against generated datasets large enough to surface edge cases manual spot-checks would miss.",
  },
  {
    slug: "globalfinancehub",
    title: "GlobalFinanceHub",
    tagline: "An OLAP warehouse for FX rates and macroeconomic data",
    tags: "Python | Streamlit | DuckDB",
    category: "DATA ENGINEERING | BUSINESS INTELLIGENCE",
    summary:
      "An OLAP data warehouse and analytical reporting portal tracking FX rates and macroeconomic indicators across four countries, built on a real dimensional model.",
    variant: 4,
    status: "Open Source",
    role: "Data Engineering & BI",
    githubUrl: "https://github.com/fytroy/GlobalFinanceHub",
    highlights: [
      { value: "4 Countries", label: "DE · KE · UK · US Tracked" },
      { value: "DuckDB", label: "Columnar OLAP Engine" },
      { value: "Star Schema", label: "Dimensional Data Model" },
    ],
    challenge:
      "Cross-country financial analysis usually means juggling exports from different APIs in spreadsheets — workable for a one-off report, unsustainable for ongoing tracking.",
    solution:
      "A Python ETL pipeline pulls FX rates from the Frankfurter API and macroeconomic indicators from the World Bank API, transforms them into a star-schema dimensional model, and materializes them into DuckDB — an embedded columnar OLAP engine — surfaced through an interactive Streamlit portal with year-over-year variance analysis via SQL window functions.",
    techStack: ["Python", "Streamlit", "DuckDB", "Pandas", "Star Schema Modeling", "Frankfurter API", "World Bank API"],
    impact:
      "Turns two disconnected public APIs into a queryable, auditable warehouse — the kind of foundation real financial reporting needs instead of one-off spreadsheet pulls.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
