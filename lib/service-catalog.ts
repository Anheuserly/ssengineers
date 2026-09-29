export type ServiceCategory = {
  name: string;
  summary: string;
  services: string[];
};

export const serviceCatalog: ServiceCategory[] = [
  {
    name: "Fire Fighting & Fire Safety",
    summary: "Design, supply, installation, testing, commissioning and maintenance for life-safety systems.",
    services: [
      "Fire Sprinkler Systems",
      "Yard and External Hydrant Systems",
      "Internal Hydrant Systems",
      "Addressable Fire Detection Systems",
      "Conventional Fire Detection Systems",
      "Wireless and Standalone Fire Detection",
      "Fire Fighting Equipment",
      "Fire Extinguishers",
      "FM-200 Waterless Fire Protection",
      "CO2 Gas Flooding Systems",
      "Emulsifier Systems",
      "Mechanical Foam and Water Systems",
      "Fire Ball and Fire Killer Systems",
      "Clean Agent Systems",
      "Fire Resistance Paints",
      "Fire Fighting AMC and Maintenance",
    ],
  },
  {
    name: "Electrical Services",
    summary: "Reliable electrical distribution, control and maintenance for facilities and projects.",
    services: [
      "LT and HT Electrical Works",
      "Internal Electrification",
      "External Electrification",
      "Power Cables",
      "HT and LT Panels",
      "Distribution Boards and DB Panels",
      "11 KV Transformers",
      "HT and LT Circuit Breakers",
      "Bus Couplers and Isolators",
      "DG Sets",
      "Control and Relay Panels",
      "Motor Control Centers",
      "Digital DC and DC Drives",
      "Electrical Fittings",
      "Electrical AMC and Maintenance",
    ],
  },
  {
    name: "Plumbing Services",
    summary: "Plumbing, water systems and pump-room work for residential and commercial sites.",
    services: [
      "Residential Plumbing",
      "Commercial Plumbing",
      "All Types of Plumbing Works",
      "Pump Room Works",
      "Plumbing Installation and Maintenance",
    ],
  },
  {
    name: "ELV, Security and IBMS",
    summary: "Connected, monitored and secure building infrastructure.",
    services: [
      "Computer Networking",
      "Structured and Rack Cabling",
      "Fibre Cabling",
      "Riser Cabling",
      "CCTV Systems",
      "Access Control Systems",
      "Attendance Systems",
      "E-Security Systems",
      "Integrated Building Management Systems",
      "Public Address Systems",
    ],
  },
  {
    name: "Design, Supply and Installation",
    summary: "Integrated engineering delivery from design through testing, commissioning and handover.",
    services: ["Turnkey Design, Supply and Installation"],
  },
  {
    name: "AMC and Maintenance",
    summary: "Planned maintenance and compliance support for fire, electrical and related MEP systems.",
    services: [
      "Fire Detection AMC",
      "FM-200 and CO2 Flooding AMC",
      "Related MEP Systems AMC",
    ],
  },
];

export const serviceRequestOptions = [
  ...serviceCatalog.flatMap((category) => category.services),
  "Other",
];
