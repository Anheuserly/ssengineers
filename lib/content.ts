import { availableBrandLogoSlugs } from "@/lib/brand-logo-manifest";
import { availableClientLogoSlugs } from "@/lib/client-logo-manifest";

export const company = {
  name: "S.S. Engineers & Consultants",
  tagline: "Fire Protection & MEP Specialists",
  heroHeadline: "Fire, Electrical, Plumbing & Security Execution",
  founded: "July 1997",
  iso: "ISO 9001:2008",
  overview:
    "S.S. Engineers & Consultants is a certified MEP services firm specializing in fire protection systems, electrical installations, plumbing infrastructure, and integrated safety solutions. We deliver design, supply, installation, testing, and long-term operational support with a focus on compliance, reliability, and performance.",
  address:
    "Plot No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi, New Delhi – 110074",
  phones: ["9871936847", "9310286848", "8171486963"],
  emails: [
    "anilkumarsaini0507@gmail.com",
    "anil@ssengineers.in",
    "poonam@ssengineers.in",
    "info@ssengineers.in",
    "shasank@ssengineers.in",
    "admin@ssengineers.in",
  ],
  footerEmails: ["anil@ssengineers.in", "anilkumarsaini0507@gmail.com"],
  contactEmails: [
    "poonam@ssengineers.in",
    "info@ssengineers.in",
    "shasank@ssengineers.in",
    "admin@ssengineers.in",
  ],
  website: "www.ssengineers.in",
  associated: "Associated with Shree Ganesh Enterprises",
  partnerSite: "sge.org.in",
  branchOffices: [
    "Plot No 16, Gali No 01, Opp Sheetla Mata Mandir, Gurgaon, Haryana, 122001",
  ],
  appName: "AMC MEP 24x7 One App",
  appTagline: "Service requests, updates, documents and business access in one place.",
  appLinks: {
    login: "https://amcmep.in/login",
    playStore:
      "https://play.google.com/store/apps/details?id=com.mepsge.amcsge&pcampaignid=web_share",
    appStore:
      "https://apps.apple.com/in/app/amc-mep-24x7-one-app/id6792257571",
  },
  appBadges: {
    playStore: "/badges/playstore-badge.png",
    appStore: "/badges/appstore-badge.png",
  },
};

export const gstRegistrations = [
  {
    state: "Delhi",
    gstin: "07BKMPS9694F1Z9",
  },
  {
    state: "Haryana",
    gstin: "06BKMPS9694F1ZB",
  },
];

export const workProcess = [
  {
    title: "Site Survey & Risk Assessment",
    detail:
      "On-site evaluation, code compliance review, and scope definition for each facility.",
  },
  {
    title: "Design & Engineering",
    detail:
      "System layout, hydraulic calculations, and approval-ready drawings.",
  },
  {
    title: "Supply & Installation",
    detail:
      "OEM sourcing, fabrication, installation, and quality assurance checks.",
  },
  {
    title: "Testing & Commissioning",
    detail:
      "Functional testing, integration, and documentation for compliance.",
  },
  {
    title: "AMC & Support",
    detail:
      "Preventive maintenance schedules, emergency response, and audit support.",
  },
];

export const highlights = [
  {
    label: "Years of Practice",
    value: "25+",
    detail: "Established 1997 with multi-sector delivery.",
  },
  {
    label: "Certified",
    value: "ISO 9001:2008",
    detail: "Quality systems and process control.",
  },
  {
    label: "Service Coverage",
    value: "MEP + Fire",
    detail: "Design, supply, install, and AMC.",
  },
  {
    label: "Trusted Clients",
    value: "100+",
    detail: "Infrastructure, hospitals, airports, and campuses.",
  },
];

export const fireSystems = [
  "Automatic sprinkler systems",
  "Fire hydrant systems (internal & external)",
  "Fire detection systems (automatic & manual)",
  "FK-5, CO2 flooding, emulsifier, foam, and clean-agent systems",
  "Fire extinguishers and fire-resistant materials",
];

export const electricalWorks = [
  "LT/HT electrical installations",
  "Internal & external electrification",
  "Panels, transformers, relays, DG sets, MCC, DC drives",
  "Power cables and distribution boards",
];

export const plumbingWorks = [
  "Residential and commercial plumbing",
  "Pump rooms and water systems",
  "Water supply and drainage systems",
];

export const securityNetworking = [
  "CCTV, access control, attendance systems",
  "Computer networking, fiber and riser cabling",
  "IBMS, e-security, public address systems",
];

export const maintenance = [
  "AMC for fire fighting systems",
  "AMC for fire detection and alarm systems",
  "AMC for FM-200 and CO2 systems",
  "AMC for electrical systems",
];

export const homeStrengths = [
  "Turnkey fire protection and MEP execution under one engineering team",
  "Code-compliant layouts, hydraulic calculations, and authority-ready documentation",
  "Multi-brand sourcing with site-specific engineering recommendations",
  "Quality-led installation, testing, and commissioning workflows",
  "Digital service tracking through AMC MEP 24x7 One App",
];

export const certifications = [
  "GSTIN registered",
  "ISO 9001:2008 certified",
  "NSIC certified",
  "Micro unit classification",
  "Member, Apparel Export Promotion Council (Ministry of Textile)",
  "Authorized vendor: National Institute of Health & Family Welfare",
  "Authorized vendor: National Science Center, Delhi",
  "CPWD registration (under process)",
];

export type PartnerLogo = {
  name: string;
  logo: string;
  category?: string;
  website?: string;
};

const toLogoSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const partnerLogo = (
  name: string,
  domain: string,
  category?: string,
  website?: string
): PartnerLogo => {
  const isBrandRow = !website;
  const slug = toLogoSlug(name);
  const localBrandLogo = availableBrandLogoSlugs.has(slug)
    ? `/logos/brands/${slug}.svg`
    : "";
  const localClientLogo = availableClientLogoSlugs.has(slug)
    ? `/logos/clients/${slug}.svg`
    : "";

  return {
    name,
    logo: isBrandRow ? localBrandLogo : localClientLogo,
    category,
    website: website || `https://${domain}`,
  };
};

export const brands: PartnerLogo[] = [
  partnerLogo("Minimax", "minimax.com", "Fire Systems"),
  partnerLogo("Safex", "safexfire.com", "Fire Systems"),
  partnerLogo("Jindal Hissar", "jindalhissar.com", "Fire Systems"),
  partnerLogo("Agni Sureksha", "agnisureksha.com", "Fire Systems"),
  partnerLogo("Agni Device", "agnidevices.com", "Fire Systems"),
  partnerLogo("Ceasefire", "ceasefire.in", "Fire Systems"),
  partnerLogo("Honeywell (ADI)", "honeywell.com", "Detection & Alarm"),
  partnerLogo("Bosch", "bosch.com", "Detection & Alarm"),
  partnerLogo("System Sensor", "systemsensor.com", "Detection & Alarm"),
  partnerLogo("Ravel", "ravelindia.com", "Detection & Alarm"),
  partnerLogo("Securico", "securicoelectronics.com", "Security"),
  partnerLogo("Nittan", "nittan.com", "Detection & Alarm"),
  partnerLogo("Vizit", "vizit.co.in", "Security"),
  partnerLogo("Fire Beam", "firebeam.co.uk", "Detection & Alarm"),
  partnerLogo("GE Security", "ge.com", "Security"),
  partnerLogo("Smart Guard", "smartguardsecurity.co.in", "Security"),
  partnerLogo("Cooper", "cooperfire.com", "Detection & Alarm"),
  partnerLogo("Neco Jayswal", "necojayaswal.com", "Fire Systems"),
  partnerLogo("Tyco", "tyco.com", "Fire Systems"),
  partnerLogo("Johnson Controls", "johnsoncontrols.com", "Fire Systems"),
  partnerLogo("Simplex", "simplexfire.com", "Fire Systems"),
  partnerLogo("Apollo Fire", "apollo-fire.co.uk", "Detection & Alarm"),
  partnerLogo("Hochiki", "hochiki.com", "Detection & Alarm"),
  partnerLogo("Edwards", "edwardsfiresafety.com", "Detection & Alarm"),
  partnerLogo("Siemens Fire Safety", "siemens.com", "Detection & Alarm"),
  partnerLogo("Kidde", "kidde.com", "Fire Systems"),
  partnerLogo("Viking", "vikinggroupinc.com", "Fire Systems"),
  partnerLogo("NAFFCO", "naffco.com", "Fire Systems"),
  partnerLogo("Fike", "fike.com", "Fire Systems"),
  partnerLogo("Firetrace", "firetrace.com", "Fire Systems"),
  partnerLogo("Ansul", "ansul.com", "Fire Systems"),
  partnerLogo("SB", "sbfiresafety.com", "Fire Systems"),
  partnerLogo(
    "NewAge Fire Protection",
    "newage-fire.com",
    "Fire Systems"
  ),
  partnerLogo("Kanex Fire", "kanexfire.com", "Fire Systems"),
  partnerLogo(
    "AAAG Fire Protection",
    "aaagindia.com",
    "Fire Systems"
  ),
  partnerLogo("Superex", "superexfire.com", "Fire Systems"),
  partnerLogo("Lifeguard", "lifeguardsystems.in", "Fire Systems"),
  partnerLogo("Firex", "firex.com", "Fire Systems"),
  partnerLogo("Detect Fire", "detectfire.in", "Fire Systems"),
  partnerLogo("A-Hunt", "ahuntfire.com", "Fire Systems"),
  partnerLogo(
    "Kartik Fire Protection",
    "kartikfireprotection.com",
    "Fire Systems"
  ),
  partnerLogo(
    "Schneider Electric",
    "schneider-electric.com",
    "Electrical"
  ),
  partnerLogo("ABB", "abb.com", "Electrical"),
  partnerLogo("Legrand", "legrand.com", "Electrical"),
  partnerLogo("Havells", "havells.com", "Electrical"),
  partnerLogo("Anchor Panasonic", "panasonic.com", "Electrical"),
  partnerLogo("L&T Electrical", "lntebg.com", "Electrical"),
  partnerLogo("Polycab", "polycab.com", "Electrical"),
  partnerLogo("KEI Cables", "keicables.com", "Electrical"),
  partnerLogo("Finolex", "finolex.com", "Electrical"),
  partnerLogo("RR Kabel", "rrkabel.com", "Electrical"),
  partnerLogo("Astral Pipes", "astralpipes.com", "Plumbing"),
  partnerLogo("Supreme Pipes", "supreme.co.in", "Plumbing"),
  partnerLogo("Prince Pipes", "princepipes.com", "Plumbing"),
  partnerLogo("Ashirvad Pipes", "ashirvad.com", "Plumbing"),
  partnerLogo("Aliaxis", "aliaxis.com", "Plumbing"),
  partnerLogo("CP Plus", "cpplusworld.com", "Security"),
  partnerLogo("Hikvision", "hikvision.com", "Security"),
  partnerLogo("Dahua", "dahuasecurity.com", "Security"),
  partnerLogo("Godrej Security", "godrej.com", "Security"),
  partnerLogo("ZKTeco", "zkteco.com", "Security"),
];

export const team = [
  // Top Leadership
  { role: "Managing Director", name: "Mrs. Poonam Saini" },
  { role: "Executive Director", name: "Mr. A.K. Saini" },

  // Architectural
  { role: "Architect", name: "Mr. Shashank Saini" },

  // Department Heads
  { role: "Project Head", name: "Mr. Vaseem Khan" },
  { role: "Operations Head", name: "Ms. Chetna J. Chawdhary" },
  { role: "MEP Head", name: "Mr. R. Tiwari" },
  { role: "Finance Head", name: "Mr. Mukesh Kumar" },

  // Senior Management
  { role: "Project Manager", name: "Mr. Amjad Hussain" },
  { role: "Project Manager", name: "Mr. Prem Sharma" },
  { role: "Admin Manager", name: "Mr. Himanshu" },

  // Technical 

  { role: "AutoCAD Designer", name: "Ms. Vinita Dangwal" },
  { role: "Safety Engineer", name: "Mr. Asgar Ansari" },

  // Site Execution Team
  { role: "Supervisor", name: "Mr. Viyaj" },
  { role: "Supervisor", name: "Mr. Eshwar" },
  { role: "Foreman", name: "Mr. Md. Farmaan" },
  { role: "Foreman", name: "Mr. Alok Saini" },

  // Finance & Legal Support
  { role: "Accountant", name: "Mr. Mahendru" },
  { role: "Finance Executive", name: "Mr. Rajeev Shukla" },
  { role: "Legal Advisor", name: "Mr. R.N. Yadav" }
];


export const machinery = [
  // Existing core machines
  "Welding machines",
  "Core cutting machines",
  "Threading machines",
  "Electrical drills",
  "Cutter machines",
  "Hammer machines",
  "Hydraulic machines (manual & electric)",
  "Grinders",
  "Lathe machines",
  "Gas cutting sets",
  "Pipe and chain tools",
  "Chisels, hammers, files, pliers",
  "Screwdriver sets",
  "Thimble punch machines",

  // Added from store inventory
  "AG9 grinding machine",
  "Compressor machine",
  "Digital earth resistance tester",
  "Electric drill machine (battery & electric)",
  "Core cutting 100mm machine",
  "Fogging machine",
  "Testing machine",
  "Hammer drill machine",
  "Welding machine single phase",
  "Welding machine three phase",

  // Electrical & measurement tools
  "Drill bits set",
  "Electrical panel board",
  "Emergency light system",
  "Flow switch",
  "Pressure gauge",
  "Pressure switch",

  // Plumbing & fire tools
  "Pipe wrench",
  "Fire hose nozzle",
  "Hose reel socket",
  "Plumbing elbows, reducers, and tees",
  "Rubber bellows",
  "Fitting cross",

  // Welding accessories
  "Welding cable",
  "Welding holder",
  "Welding lead",
  "Welding socket",
  "Welding helmet",

  // Safety & support tools
  "Safety belts",
  "Safety helmets",
  "Speed leveling tools",
  "Right angle tools",

  // Miscellaneous tools
  "Grinding wheels & cutter blades",
  "Cable thimble punch machine",
  "Paint brushes",
  "Nylon cable ties",
  "Wrapping & coating paper"
];


export const clients: PartnerLogo[] = [
  partnerLogo(
    "Larsen & Toubro",
    "larsentoubro.com",
    "Infrastructure",
    "https://www.larsentoubro.com"
  ),
  partnerLogo(
    "Delhi Metro Rail Corporation",
    "delhimetrorail.com",
    "Transport",
    "https://www.delhimetrorail.com"
  ),
  partnerLogo("Voltas (Tata)", "voltas.com", "Commercial", "https://www.voltas.com"),
  partnerLogo("DLF", "dlf.in", "Real Estate", "https://www.dlf.in"),
  partnerLogo(
    "Rockland Hospital",
    "rocklandhospital.com",
    "Healthcare",
    "https://www.rocklandhospital.com"
  ),
  partnerLogo("Mahagun", "mahagunindia.com", "Real Estate", "https://www.mahagunindia.com"),
  partnerLogo("Tata AIG", "tataaig.com", "Corporate", "https://www.tataaig.com"),
  partnerLogo(
    "Indian Express",
    "indianexpress.com",
    "Media",
    "https://www.indianexpress.com"
  ),
  partnerLogo("Adobe", "adobe.com", "Technology", "https://www.adobe.com"),
  partnerLogo("Daikin", "daikinindia.com", "Technology", "https://www.daikinindia.com"),
  partnerLogo(
    "Blue Bells School",
    "bluebells.org",
    "Education",
    "https://www.bluebells.org"
  ),
  partnerLogo(
    "Indian Air Force",
    "indianairforce.nic.in",
    "Defense",
    "https://indianairforce.nic.in"
  ),
  partnerLogo(
    "Gannon Dunkerley",
    "gannondunkerley.com",
    "Infrastructure",
    "https://www.gannondunkerley.com"
  ),
  partnerLogo("HSCC", "hsccltd.co.in", "Healthcare", "https://www.hsccltd.co.in"),
  partnerLogo(
    "Sir Ganga Ram Hospital",
    "sgrh.com",
    "Healthcare",
    "https://www.sgrh.com"
  ),
  partnerLogo(
    "Blue Bells Public School",
    "bluebells.org",
    "Education",
    "https://www.bluebells.org"
  ),
  partnerLogo("NDTV", "ndtv.com", "Media", "https://www.ndtv.com"),
  partnerLogo(
    "Adani Connex",
    "adaniconnex.com",
    "Data Center",
    "https://www.adaniconnex.com"
  ),
  partnerLogo(
    "Architron Group",
    "architrongroup.com",
    "Architecture & Interiors",
    "https://www.architrongroup.com"
  ),
];

export const projectTypes = [
  "Commercial & IT parks",
  "Hospitals & healthcare",
  "Metro, airport & transport",
  "Industrial & manufacturing",
  "Residential high-rise",
  "Institutional & education",
  "School",
];

export const complianceDocuments = [
  {
    title: "ISO Quality Certification",
    detail:
      "Certified quality management processes for design, execution, and maintenance workflows.",
    evidence: "ISO 9001:2008 certificate copy available on request.",
  },
  {
    title: "Government Registrations",
    detail:
      "GSTIN, NSIC, and micro-unit registration support institutional and public sector onboarding.",
    evidence: "Registration documents shared during technical/commercial qualification.",
  },
  {
    title: "Vendor & Authority Submissions",
    detail:
      "Experience preparing compliance-ready project documentation for client and authority reviews.",
    evidence:
      "Project references and authority-facing documentation format available for review.",
  },
];

export const complianceFileOptions = [
  {
    title: "ESI Registration",
    description: "Employees’ State Insurance registration certificate.",
    path: "/documents/esi-registration.pdf",
    fileName: "esi-registration.pdf",
  },
  {
    title: "PF Registration",
    description: "Provident Fund registration and establishment details.",
    path: "/documents/pf-registration.pdf",
    fileName: "pf-registration.pdf",
  },
  {
    title: "GST Certificate - Delhi",
    description: "GST registration certificate for Delhi entity.",
    path: "/documents/gst-delhi-certificate.pdf",
    fileName: "gst-delhi-certificate.pdf",
  },
  {
    title: "GST Certificate - Haryana",
    description: "GST registration certificate for Haryana entity.",
    path: "/documents/gst-haryana-certificate.pdf",
    fileName: "gst-haryana-certificate.pdf",
  },
  {
    title: "MSME / Udyam Certificate",
    description: "MSME/Udyam registration certificate copy.",
    path: "/documents/msme-udyam-certificate.pdf",
    fileName: "msme-udyam-certificate.pdf",
  },
  {
    title: "Company Profile",
    description: "Latest corporate profile, services, and capabilities.",
    path: "/documents/company-profile.pdf",
    fileName: "company-profile.pdf",
  },
];

export const workingActivities = [
  "Society for Development Alternatives, B-32 Qutab Institutional Area (about to start).",
  "DLF Downtown (about to start).",
  "India Business Centre (about to start).",
  "Saharanpur Hospital (about to start).",
  "The Woodpackers (about to start).",
  "UAE Embassy (about to start).",
  "Palwal project mobilization (about to start).",
];

export const workInProgress = [
  "Sector 37D, Gurgaon.",
  "IKEA Saket Avenue.",
];

export const workDone = [
  "SITC of fire-fighting system and pumps at ATDC, Plot No. 50P, Sector 44, Gurgaon (AEPC).",
  "SITC of fire-fighting system and pumps at ATDC, Plot No. A-15, Sector 24, Noida (AEPC).",
  "SITC of fire-fighting system and pumps at AEPC Institutional Building, Plot No. 21, Sector 20-B, Faridabad.",
  "Providing and fixing of fire-fighting system, fire alarm, electrical and PA at Blue Bell Model School, Sector 4, Gurgaon.",
  "Execution of fire-fighting system at Blue Bell Model School, Sector 4, Gurgaon.",
  "SITC of internal and external electrification and fire alarm system at Blue Bells Model School, Sector 4, Gurgaon.",
  "Execution of CCTV and earthing works at Blue Bell Model School / Blue Bell Preparatory School, Railway Road, Gurgaon.",
  "Execution of electrical, external electrical, and earthing works at Blue Bells Public School, Sector 10, Gurgaon.",
  "Adani Conex Sect-62 Noida",
  "DLF WeWork Forum Building No 1, Cyber City Gurgaon, Haryana",
  "DLF Mall of india Sector 18 Noida",
  "Dronacharya Engineering College, Khantawas Farrukh Nagar, Gurugram",
  "Home Construction, Gaziabad",
  "Coalseas Management Services Pvt. Ltd, 1st Floor, Plot No 6 Khasra No 858",
  "Architron, Plot No 32, Sector 32, Gurugram",
  
];

export const caseStudies = [
  {
    title: "Healthcare Campus Fire Safety Upgrade",
    sector: "Hospital & Healthcare",
    location: "Delhi NCR",
    timeline: "14 weeks",
    scope: [
      "Hydrant and sprinkler network retrofit in active hospital blocks",
      "Addressable fire alarm integration with zone-wise coverage",
      "Testing, commissioning, and compliance documentation handover",
    ],
    outcome:
      "Execution completed with phased shutdown planning and minimal disruption to hospital operations.",
  },
  {
    title: "Commercial Tower MEP + Fire Package",
    sector: "Commercial High-Rise",
    location: "Gurgaon",
    timeline: "22 weeks",
    scope: [
      "End-to-end fire hydrant, detection, and emergency system deployment",
      "LT panel, cable routing, and utility-floor coordination",
      "Plumbing utility lines, pump room tie-ins, and commissioning",
    ],
    outcome:
      "Integrated delivery reduced coordination delays across vendors and streamlined final handover.",
  },
  {
    title: "Industrial Facility Protection Modernization",
    sector: "Industrial",
    location: "NCR Region",
    timeline: "10 weeks",
    scope: [
      "Risk survey and coverage redesign for production zones",
      "CO2/clean-agent protection in critical electrical rooms",
      "AMC plan with preventive inspection checkpoints",
    ],
    outcome:
      "Improved readiness for audits with structured maintenance logs and rapid-response support model.",
  },
];

export const faqs = [
  {
    question: "Do you execute design, OEM supply, site installation, testing, and AMC under a single turnkey contract?",
    answer:
      "Yes. S.S. Engineers & Consultants provides single-point turnkey accountability across all phases: initial risk survey, CAD layout and hydraulic calculations, direct OEM equipment procurement, on-site fabrication, statutory testing, authority handover, and ongoing annual maintenance contracts (AMC). Clients work directly with our engineering heads without intermediary sub-contractor friction.",
  },
  {
    question: "How do you handle Fire Department NOC clearances (DFS, Haryana Fire Service, etc.)?",
    answer:
      "Our installations strictly comply with the National Building Code of India (NBC 2016 Part-IV), NFPA standards, and local municipal bylaws (including Delhi Fire Service, Haryana Fire and Emergency Services, and UP Fire Services). We prepare complete approval-ready hydraulic layouts and riser schematics, calculate water storage and pump head requirements, coordinate joint site inspections with fire department officials, and guide the facility through initial Fire Safety Recommendations (FSR), provisional NOC, final Fire Safety Certificate (FSC), and periodic annual renewals.",
  },
  {
    question: "What is your typical turnaround time for an initial technical site survey and proposal?",
    answer:
      "For facilities across Delhi NCR (including New Delhi, Gurugram, Noida, Greater Noida, Faridabad, and Ghaziabad), our senior MEP engineers mobilize for an on-site technical survey within 24 to 48 hours of logging your work request. Following on-site inspection and review of your facility drawings, we deliver a detailed Bill of Quantities (BOQ), OEM technical data sheets, and transparent commercial estimates within 3 to 5 business days.",
  },
  {
    question: "Can you upgrade or execute MEP installations in active, operational facilities without business interruption?",
    answer:
      "Yes. A significant portion of our 25+ years track record includes operational hospitals, continuous commercial offices, IT campuses, and manufacturing units. We establish isolated work zones, implement negative-pressure dust barriers, enforce hot-work safety permits, and schedule high-noise tasks, structural penetrations, or temporary electrical/water isolations during off-peak night shifts and weekends to ensure zero disruption to your daily operations.",
  },
  {
    question: "What Annual Maintenance Contract (AMC) models do you offer, and what is the testing schedule?",
    answer:
      "We offer both Comprehensive AMC (covering preventive servicing, repair labor, and routine spare replacements) and Non-Comprehensive AMC (preventive inspections with emergency callouts). Standard maintenance protocols include weekly/monthly automatic pump starter checks, quarterly sprinkler alarm valve inspections, semi-annual smoke and heat detector sensitivity tests, and annual hydrostatic pressure testing of hydrant mains, landing valves, and delivery hoses in compliance with IS 2190.",
  },
  {
    question: "Which tier-1 OEM brands do you source and integrate for fire protection and electrical systems?",
    answer:
      "As an authorized system integrator, we source directly from certified manufacturers including Tyco, Viking, Minimax, Ceasefire, Safex, Jindal Hissar pipes, Honeywell, Bosch, System Sensor, Ravel, Hochiki, Schneider Electric, ABB, L&T, Legrand, Polycab, and Astral. All materials arrive on site with original manufacturer test certificates, BIS/UL/FM listings, and full warranty coverage.",
  },
  {
    question: "When is Clean Agent Gas Flooding (FM-200 / Novec / CO2) required instead of water sprinklers?",
    answer:
      "Clean agent fire suppression (such as FM-200, Novec 1230 / FK-5-1-12, and CO2 total flooding) is mandatory in mission-critical environments where water discharge would cause catastrophic electrical shorting or permanent equipment loss—including server rooms, data centers, HT/LT substation panel rooms, UPS battery banks, and medical imaging suites. These systems extinguish electrical fires thermally and chemically within 10 seconds without conducting electricity or leaving corrosive residues.",
  },
  {
    question: "What statutory registrations, labor compliances, and safety standards does S.S. Engineers hold?",
    answer:
      "S.S. Engineers & Consultants is an ISO 9001:2008 certified enterprise with active MSME Udyam registration and verified GST registrations in Delhi (07BKMPS9694F1Z9) and Haryana (06BKMPS9694F1ZB). Our on-site technicians and supervisory staff are 100% compliant with Employee Provident Fund (EPF: DL/34311) and ESIC (11001140020001001) regulations, covered under Contractor All-Risk (CAR) insurance, and strictly adhere to daily Tool-Box Talks, PPE compliance, and zero-compromise safety standards.",
  },
  {
    question: "How does your emergency response protocol work for critical faults, pump failures, or false alarms?",
    answer:
      "Our clients have 24x7 direct access to our emergency engineering hotline (+91 98719 36847 / 93102 86848) and the AMC MEP One App dispatch desk. For critical emergencies—such as main fire pump failure, significant hydrant line bursts, or panel ground faults—our mobile emergency response team is dispatched with repair equipment to site within 2 to 4 hours across Delhi NCR.",
  },
  {
    question: "How do we initiate a project survey or track an active work request?",
    answer:
      "You can submit your project parameters directly through our website's Work Request form or via our interactive AI Chat Assistant. Every request is automatically assigned an official reference number (SSE-XXXXXX) logged in our centralized engineering database, and a technical coordinator is assigned within 24 hours to schedule the physical site evaluation.",
  },
];

export const serviceRequestOptions = [
  "Fire Hydrant System",
  "Sprinkler System",
  "Fire Detection & Alarm",
  "FK -5/ Clean Agent",
  "CO2 Flooding",
  "Foam / Emulsifier",
  "Electrical Works (LT/HT)",
  "Plumbing & Pump Rooms",
  "CCTV / Access Control",
  "AMC / Maintenance",
  "Other",
];

export const vendorCategoryOptions = [
  "Fire Fighting System Contractor",
  "Electrical Contractor",
  "Plumbing / PHE Contractor",
  "CCTV / Access Control Integrator",
  "OEM / Distributor",
  "Fabrication / Installation Partner",
  "Testing & Commissioning Agency",
  "AMC / Maintenance Partner",
  "Civil & Allied Services",
  "Other",
];

export const vendorDocumentShareModes = [
  "Email Attachment",
  "Google Drive Link",
  "Physical Dossier",
  "Will Share After Discussion",
];

export const careerOpenings = [
  {
    title: "Electrical Engineer",
    location: "Delhi NCR",
    type: "Full-Time",
    experience: "2+ years",
    description:
      "Design, execution, and maintenance support for LT/HT systems, panels, and site-level coordination.",
  },
];
