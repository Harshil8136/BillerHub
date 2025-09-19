/**
 * BILLER DATA - North America East
 * ==================
 * Contains biller data for the Eastern time zone regions of the US and Canada.
 */

const BILLERS_EAST = [
  {
    "id": 7,
    "live": true,
    "name": "American Water",
    "tla": "AWK",
    "aliases": ["American Water Works Company"],
    "paymentTypes": ["Utilities", "Water"],
    "kbLink": "https://kb.paymentus.io/display/CSR/AWK+-+American+Water+Works+Company",
    "adLink": "https://adg-ipn1.paymentus.net/awk?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "855-748-6066" },
      { "type": "CSR", "label": "Customer Service", "value": "Varies by State - See Notes" }
    ],
    "timezone": "America/New_York",
    "notes": "National provider (HQ in NJ) with state-specific contacts.",
    "areas": [], // National provider, area codes are not specific
    "customFields": [
      { "label": "Processor", "value": "Braintree" }
    ]
  },
  {
  "id": 55,
  "live": true,
  "name": "Pepco Holdings (Exelon)",
  "tla": "PHI",
  "aliases": [
    "PHI",
    "Pepco",
    "PEPCO",
    "Potomac Electric Power Company",
    "Atlantic City Electric",
    "ACE",
    "Delmarva Power",
    "Delmarva Power & Light",
    "DPL",
    "Exelon"
  ],
  "paymentTypes": ["Utility Bill", "Electricity"],
  "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
  "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "ACE IVR", "value": "833-209-5484" },
    { "type": "IVR", "label": "DPL IVR", "value": "833-209-5486" },
    { "type": "IVR", "label": "Pepco IVR", "value": "833-209-8415" },

    { "type": "CSR", "label": "ACE Customer Service", "value": "800-642-3780" },
    { "type": "CSR", "label": "DPL Customer Service", "value": "800-375-7117" },
    { "type": "CSR", "label": "Pepco Customer Service", "value": "202-833-7500" },

    { "type": "CSR", "label": "Emergency (24/7)", "value": "877-737-2662" }
  ],
  "timezone": "America/New_York",
  "notes": "OpCos: ACE (NJ), DPL (DE/MD), Pepco (DC/MD). CSR hours Mon–Fri 7:00am–8:00pm ET; emergency 24/7. Account format 11 digits. CP currently non-functioning; no password resets; balance shows 9,999.99—transfer to biller for balance.",
  "areas": ["202","212","240","267","301","302","410","443","484","609","732","856","908","215"],
  "customFields": [
    { "label": "ACE CSR Menu", "value": "800-642-3780 → option 3" },
    { "label": "DPL CSR Menu", "value": "800-375-7117 (DE=1, MD=2) → option 4" },
    { "label": "Pepco CSR Menu", "value": "202-833-7500 (DC=1, MD=2) → option 3" },
    { "label": "Account Format", "value": "11 digits" },
    { "label": "CSR Hours", "value": "Mon–Fri 7:00am–8:00pm ET (Emergency 24/7)" },
    { "label": "CP Status", "value": "Portal non-functioning; no password resets; balance = 9,999.99 (transfer to biller for actual balance)" }
  ]
  },
  {
    "id": 3,
    "live": true,
    "name": "Baltimore Gas & Electric",
    "tla": "BGE",
    "aliases": ["BGE Maryland"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165610",
    "adLink": "https://adg-ipn1.paymentus.net/bge?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "1-833-254-9875" },
      { "type": "CSR", "label": "Customer Service", "value": "1-800-685-0123" }
    ],
    "timezone": "America/New_York",
    "areas": ["410", "443", "667", "240", "301"],
    "customFields": []
  },
  {
  "id": 23,
  "live": true,
  "name": "Constellation Energy Group",
  "tla": "CEB",
  "aliases": [
    "Constellation Energy",
    "Constellation Gas",
    "Constellation Power",
    "Constellation Home Services",
    "CDE"
  ],
  "paymentTypes": ["Power", "Gas", "Utilities"],
  "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=19464791",
  "adLink": "https://adg-ipn1.paymentus.net/ceb?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "Power IVR", "value": "844-309-7088" },
    { "type": "IVR", "label": "Gas IVR", "value": "844-309-7092" },

    { "type": "CSR", "label": "Power (Residential)", "value": "888-900-7052" },
    { "type": "CSR", "label": "Power (Business)", "value": "866-917-8271" },
    { "type": "CSR", "label": "Gas (Spanish opt 2)", "value": "877-677-4355" }
  ],
  "timezone": "America/New_York",
  "notes": "Confirm the customer is paying Constellation; CP is currently non-functioning and passwords cannot be reset. IVR may ask for statement number; invoice entry often requires replacing hyphens with zero. Some accounts cannot pay over $10,000 by card—use eCheck or transfer to CEB. No e-bills; schedules triggered by CEB via XOTP; Paymentus manages wallets only.",
  "areas": [],
  "customFields": [
    { "label": "Hours (Power)", "value": "Mon–Fri 7:00am–8:00pm ET; Sat 8:00am–5:00pm ET" },
    { "label": "Hours (Gas)", "value": "Mon–Fri 8:00am–6:00pm ET; Sat–Sun Closed" },
    { "label": "Website", "value": "https://www.constellation.com" },
    { "label": "Account Format (Power)", "value": "Customer Number 5–6 digits, hyphen 1–5 digits (e.g., 954291-46418, 20923-1)" },
    { "label": "Account Format (Gas)", "value": "Account ID: BG- or RG- + 5 or 6 digits (MUST be uppercase), e.g., BG-100152" },
    { "label": "Escalation Email", "value": "cebsupport@paymentus.com" },
    { "label": "Processor", "value": "Braintree" },
    { "label": "MAIDs", "value": "constellationnewenergygas; ConstellationEnergyGroupInc; ConstellationEnergyGroupInc_2; _3; _4" },
    { "label": "Ops Notes", "value": "No E-Bills; schedules via XOTP; replace hyphens with 0 in invoice entry if not found; IVR may require statement number" }
  ]
  },
  {
    "id": 1,
    "live": true,
    "name": "Consumers Energy",
    "tla": "CEMI",
    "aliases": ["Consumer", "CEMI Energy"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/CEMI+-+Consumers+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/CEMI?v2=true",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-329-9593" },
      { "type": "CSR", "label": "Customer Service", "value": "(888) 339-1944" }
    ],
    "timezone": "America/Detroit",
    "areas": ["231", "248", "269", "313", "517", "586", "616", "734", "810", "906", "947", "989"],
    "customFields": []
  },
  {
  "id": 22,
  "live": false,
  "name": "Dominion Energy",
  "tla": "DNE",
  "aliases": ["Dominion Resources Inc"],
  "paymentTypes": ["Utility Bill", "Electric", "Gas"],
  "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58163398",
  "adLink": "https://adg-ipn1.paymentus.net/dne?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "VA/NC", "value": "866-366-4357", "group": "IVR Numbers", "tooltip": "DNE - VA Electric, North Carolina (Gas/Electric)" },
    { "type": "IVR", "label": "Ohio Gas", "value": "833-261-1469", "group": "IVR Numbers", "tooltip": "Dominion Gas Ohio" },
    { "type": "IVR", "label": "MRP", "value": "833-268-4343", "group": "IVR Numbers", "tooltip": "DNE-MRP" },
    { "type": "Internal", "label": "Virginia/NC", "value": "888-429-0011", "group": "Internal Transfers" },
    { "type": "Internal", "label": "Ohio", "value": "866-313-8303", "group": "Internal Transfers" },
    { "type": "Internal", "label": "West Virginia", "value": "866-313-8305", "group": "Internal Transfers" }
  ],
  "timezone": "America/New_York",
  "notes": "Includes VA Electric, NC Gas/Electric, and OH Gas (rebranded as Enbridge Gas OH under DNE until further notice).",
  "areas": ["216","220","234","252","276","330","434","440","540","571","703","740","757","804"],
  "customFields": [
    { "label": "Biller Website", "value": "https://www.dominionenergy.com/" },
    { "label": "CP Link", "value": "https://ipn2.paymentus.com/cp/dne" }
  ]
  },

  {
    "id": 24,
    "live": false,
    "name": "Duquesne Light Co.",
    "tla": "DUQL",
    "aliases": ["Duquesne Light Company"],
    "paymentTypes": ["Utilities", "Electricity"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=143477303",
    "adLink": "https://adg-ipn1.paymentus.net/duql?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "844-598-9868" }
    ],
    "timezone": "America/New_York",
    "notes": "Electric utility company serving southwestern Pennsylvania.",
    "areas": ["412", "724", "878"],
    "customFields": []
  },
  {
    "id": 27,
    "live": true,
    "name": "Hydro One (Electricity)",
    "tla": "HYD1",
    "aliases": ["Hydro One Networks"],
    "paymentTypes": ["Electricity", "Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=5768167",
    "adLink": "https://adg-ipn1.paymentus.net/hyd1?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "877-507-5093" }
    ],
    "timezone": "America/Toronto",
    "areas": ["416", "613", "905", "705", "519", "289", "343", "647", "807"],
    "customFields": []
  },
  {
    "id": 28,
    "live": true,
    "name": "Hydro One (Non-Electricity)",
    "tla": "HYDO",
    "aliases": ["Hydro One Invoices", "Hydro One Work Orders"],
    "paymentTypes": ["Invoice", "Work Order", "Real Estate"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=5768167",
    "adLink": "https://adg-ipn1.paymentus.net/hydo?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "866-764-1083" }
    ],
    "timezone": "America/Toronto",
    "areas": ["416", "613", "905", "705", "519", "289", "343", "647", "807"],
    "customFields": []
  },
  {
    "id": 12,
    "live": false,
    "name": "City of Palm Coast, FL",
    "tla": "PLMC",
    "aliases": ["Palm Coast Utility"],
    "paymentTypes": ["Utilities"],
    "kbLink": null,
    "adLink": "https://adg-ipn1.paymentus.net/plmc?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "386-986-2360" }
    ],
    "timezone": "America/New_York",
    "notes": "KB Link not available for this non-live biller.",
    "areas": ["386"],
    "customFields": []
  },
  {
    "id": 31,
    "live": true,
    "name": "The Hanover Insurance Group",
    "tla": "HOIG",
    "aliases": ["Citizens Insurance Company of America", "Hanover Insurance"],
    "paymentTypes": ["Insurance"],
    "kbLink": "https://kb.paymentus.io/display/CSR/HOIG+-+Hanover+Insurance+Group+%28Citizens+Insurance+Company+of+America%29",
    "adLink": "https://ipn2.paymentus.com/rotp/hoig",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "800-573-1187" },
      { "type": "CSR", "label": "Customer Service", "value": "800-922-8427" }
    ],
    "timezone": "America/New_York",
    "notes": "Includes Citizens Insurance. Note the complex surcharge and deposit payment rules.",
    "areas": ["508", "330", "559", "517", ""],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.hanover.com/" }
    ]
  },
  {
    "id": 33,
    "live": true,
    "name": "Knoxville Utility Board",
    "tla": "KNOX",
    "aliases": ["KUB"],
    "paymentTypes": ["Utility Bill"],
    "kbLink": "https://kb.paymentus.io/display/CSR/KNOX+-+Knoxville+Utility+Board",
    "adLink": "https://adg-ipn1.paymentus.net/knox?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "Standard IVR", "value": "866-819-0066" },
      { "type": "CSR", "label": "Customer Service", "value": "865-524-2911" }
    ],
    "timezone": "America/New_York",
    "notes": "Provides utility services to Knoxville, Tennessee.",  
    "areas": ["865"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.kub.org/" }
    ]
  },
  {
    "id": 34,
    "live": false,
    "name": "New York City Housing Authority",
    "tla": "NYCH",
    "aliases": ["NYHC", "NYCHA"],
    "paymentTypes": ["Housing", "Rent"],
    "kbLink": "https://kb.paymentus.io/display/CSR/NYCH+-+New+York+City+Housing+Authority+%28NYCHA%29NYC+Housing+Authority",
    "adLink": "https://adg-ipn1.paymentus.net/nych?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "Residential IVR (NYCH)", "value": "833-894-0899" },
      { "type": "IVR", "label": "Commercial IVR (NYHC)", "value": "833-894-0971" },
      { "type": "CSR", "label": "Customer Contact Center", "value": "718-707-7771" }
    ],
    "timezone": "America/New_York",
    "notes": "Handles Residential (NYCH) and Commercial (NYHC) accounts.",
    "areas": ["718", "212", "917", "347", "646"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.nyc.gov/site/nycha/index.page" }
    ]
  },
  {
    "id": 37,
    "live": false,
    "name": "PPL Electric Utilities",
    "tla": "PPL",
    "aliases": ["PPL Electric"],
    "paymentTypes": ["Utilities", "Electric"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PPL+-+PPL+Electric+Utilities",
    "adLink": "https://adg-ipn1.paymentus.net/ppl?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "844-278-3310" },
      { "type": "CSR", "label": "Customer Service", "value": "800-342-5775" }
    ],
    "timezone": "America/New_York",
    "notes": "Serves central and eastern Pennsylvania.",
    "areas": ["570", "717", "610", "215", "484"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.pplelectric.com" }
    ]
  },
  {
    "id": 38,
    "live": false,
    "name": "Public Service Electric & Gas Co (PSEG)",
    "tla": "PSG",
    "aliases": ["PSEG"],
    "paymentTypes": ["Utilities", "Gas", "Electric"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PSG+-+Public+Service+%26+Electric+Gas+Co+%28PSEG%29",
    "adLink": "https://adg-ipn1.paymentus.net/psg?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-277-8710" },
      { "type": "CSR", "label": "Customer Service", "value": "1-800-436-7734" }
    ],
    "timezone": "America/New_York",
    "notes": "Serves New Jersey. Does not accept bank payments.",
    "areas": ["201", "551", "609", "640", "732", "848", "856", "908", "973"],
    "customFields": [
      { "label": "Biller Website", "value": "https://nj.pseg.com/" }
    ]
  },
 {
  "id": 43,
  "live": false,
  "name": "City of Hollywood, FL",
  "tla": "HWFL",
  "aliases": ["Hollywood FL Utilities", "Hollywood Water"],
  "paymentTypes": ["Utilities", "Water"],
  "kbLink": "https://kb.paymentus.io/display/CSR/HWFL+-+City+of+Hollywood%2C+FL",
  "adLink": "https://adg-ipn1.paymentus.net/hwfl?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "IVR", "value": "855-748-4344" },
    { "type": "CSR", "label": "Customer Service (Mon–Thu 7am–6pm)", "value": "954-921-3938" },
    { "type": "CSR", "label": "Emergency", "value": "954-967-4357" }
  ],
  "timezone": "America/New_York",
  "notes": "Account format xxxxxx-xxxxxx (6 digits-6 digits). Web/Mobile/Scheduled payments absorbed fees; AD/IVR support card and bank methods. CIS: Munis.",
  "areas": ["954","754"],
  "customFields": [
    { "label": "Biller Website", "value": "http://www.hollywoodfl.org/" }
  ]
},
{
  "id": 44,
  "live": false,
  "name": "Rhode Island Energy",
  "tla": "REI",
  "aliases": ["RI Energy", "Rhode Island Energy"],
  "paymentTypes": ["Utilities", "Electric", "Gas"],
  "kbLink": null,
  "adLink": "https://adg-ipn1.paymentus.net/rei?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "IVR (via Paymentus)", "value": "833-425-1656" },
    { "type": "CSR", "label": "Customer Service", "value": "855-743-1101" }
  ],
  "timezone": "America/New_York",
  "notes": "Basic registration: AD link and primary IVR/CSR contacts; detailed KB tabs to follow.",
  "areas": ["401"],
  "customFields": [
    { "label": "Biller Website", "value": "https://www.rienergy.com" }
  ]
},
{
  "id": 46,
  "live": false,
  "name": "Chesterfield County, VA",
  "tla": "CFCO",
  "aliases": ["Chesterfield County Utilities"],
  "paymentTypes": ["Utilities", "Water"],
  "kbLink": "https://kb.paymentus.io/display/CSR/CFCO+-+Chesterfield+County+Utilities",
  "adLink": "https://adg-ipn1.paymentus.net/cfco?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "IVR", "value": "844-449-7664" },
    { "type": "CSR", "label": "Customer Service", "value": "804-748-1291" }
  ],
  "timezone": "America/New_York",
  "notes": "Account format 00011111-1111111; enter exactly as shown with leading zeros and no spaces. CP/Web/Mobile and AD/IVR accept Debit (Visa, Mastercard), Credit (Visa, Mastercard), and Bank (Checking, Savings). Fees absorbed.",
  "areas": ["804"],
  "customFields": [
    { "label": "Biller Website", "value": "https://www.chesterfield.gov/236/Utilities" },
    { "label": "CP Link", "value": "https://ipn2.paymentus.com/biller/stde/cfco" }
  ]
},
{
  "id": 47,
  "live": false,
  "name": "Durham NC",
  "tla": "DHNC",
  "aliases": [
    "Durham",
    "City of Durham",
    "Durham NC Utility",
    "Durham Utilities",
    "Durham Water",
    "Utility Bill",
    "Miscellaneous Payment",
    "Cross Connections",
    "City Services",
    "Development Services",
    "Building Permit",
    "Fire Flow",
    "Building Inspections",
    "Government",
    "Durham County Utility",
    "DHNM", "DHCC", "DHDS", "DHBP", "DHNS", "DHNB", "DUCT"
  ],
  "paymentTypes": ["Utility Bill"],
  "kbLink": "https://kb.paymentus.io/display/CSR/DHNC+-+Durham%2C+NC",
  "adLink": "https://adg-ipn1.paymentus.net/dhnc?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "IVR (Utilities)", "value": "844-592-4918" },
    { "type": "IVR", "label": "IVR (Other Services)", "value": "844-592-4920" },
    { "type": "CSR", "label": "Customer Service", "value": "919-560-1200" }
  ],
  "timezone": "America/New_York",
  "notes": "Single Durham entry for search; open card to access a Directory tab listing all Durham services (DHNM/DHCC/DHDS/DHBP/DHNS/DHNB/DUCT) with their AD links and IVR/CSR routing.",
  "areas": ["919","984"],
  "customFields": [
    { "label": "Biller Website", "value": "https://durhamnc.gov/" },
    { "label": "AD Link Formula", "value": "https://adg-ipn1.paymentus.net/[TLA]?v2=true&lang=en" }
  ]
},

{
  "id": 57,
  "live": false,
  "name": "Henrico VA",
  "tla": "HNRO",
  "aliases": ["Henrico County", "Henrico County VA"],
  "paymentTypes": ["Invoice"],
  "kbLink": "https://kb.paymentus.io/display/CSR/HNRO+-+Henrico+County%2C+VA",
  "adLink": "https://adg-ipn1.paymentus.net/hnro?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "IVR", "value": "855-748-6015" },
    { "type": "CSR", "label": "Customer Service", "value": "804-501-4000" },
    { "type": "CSR", "label": "Utilities", "value": "804-501-4275" },
    { "type": "CSR", "label": "After Hours / Weekends", "value": "804-501-5025" }
  ],
  "timezone": "America/New_York",
  "notes": "Multiple bill types with absorbed fees; Utility 11–15 digits; Real Estate 9 digits (starts 9); Personal Property 9 digits (starts 5); Building Permit 12 chars (3 letters + '201').",
  "areas": ["804"],
  "customFields": [
    { "label": "CP Link", "value": "https://ipn.paymentus.com/cp/hnro" },
    { "label": "System", "value": "HNR2: AD and XOTP; No scheduled payments; No e-bill" }
  ]
},
{
  id: 41,
  live: true,
  name: "Enbridge Gas North/South Carolina",
  tla: "DESN",
  aliases: [
    "Enbridge Gas NC",
    "Enbridge Gas North Carolina",
    "Enbridge Gas SC",
    "Dominion Energy NC Gas",
    "Dominion Energy South Carolina",
    "SCANA",
    "SCANA Energy",
    "DESN",
    "NC Gas",
    "SC Electric"
  ],
  paymentTypes: ["Utility Bill", "NC Utility", "SC Utility"],
  kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=184237309",
  adLink: "https://adg-ipn1.paymentus.net/desn?v2=true&lang=en",
  contacts: [
    { type: "IVR", label: "SC IVR", value: "800-450-9160" },
    { type: "IVR", label: "NC IVR", value: "800-450-9159" },
    { type: "CSR", label: "SC Customer Service", value: "800-251-7234" },
    { type: "CSR", label: "NC Gas", value: "877-776-2427" },
    { type: "CSR", label: "NC Electric (DNE Routing)", value: "866-366-4357" }
  ],
  timezone: "America/New_York",
  notes: "Rebranded to Enbridge Gas North Carolina on Feb 12, 2025; NC Gas and SC utility payments process under DESN; NC Electric routes to DNE; account number is 13 digits; CSR hours Mon–Fri 7:00am–6:00pm ET with after-hours support for disconnects/emergencies; Sat–Sun closed.",
  areas: ["252","336","472","704","743","803","821","828","839","843","854","864","910","919","980","984"],
  customFields: [
    { label: "CP", value: "https://ipn4.paymentus.com/cp/desn" },
    { label: "ROTP", value: "https://ipn4.paymentus.com/rotp/desn" },
    { label: "Account Format", value: "13 digits (no dashes)" },
    { label: "CSR Hours", value: "Mon–Fri 7:00am–6:00pm ET; after-hours for disconnects/emergencies; Sat–Sun closed" },
    { label: "Routing", value: "NC Gas/SC via DESN; NC Electric via DNE" },
    { label: "Go Live", value: "2024-03-16" },
    { label: "Escalation Email", value: "desnsupport@paymentus.com" },
    { label: "MAIDs", value: "dominionenergyscabs; dominionenergyncgasabs; dominionenergyncgasnonabs; dominionenergyscnonabs" }
  ]
}
];