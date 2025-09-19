/**
* BILLER DATA - North America Central
* ==================
* Contains biller data for the Central and surrounding time zone regions of the US.
*/

const BILLERS_CENTRAL = [
  {
    id: 2,
    live: true,
    name: "Austin Energy",
    tla: "AETX",
    aliases: ["AETX Austin", "City of Austin"],
    paymentTypes: ["Utility Bill", "Energy"],
    kbLink: "https://kb.paymentus.io/display/CSR/AETX+-+Austin+Energy",
    adLink: "https://adg-ipn1.paymentus.net/aetx?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "833-375-4919" },
      { type: "CSR", label: "Customer Service", value: "512-494-9400" }
    ],
    timezone: "America/Chicago",
    areas: ["512", "737"],
    customFields: []
  },

  {
    id: 8,
    live: true,
    name: "Commonwealth Edison",
    tla: "COMD",
    aliases: ["ComEd"],
    paymentTypes: ["Utilities", "Electricity"],
    kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=47000139",
    adLink: "https://adg-ipn1.paymentus.net/COMD?v2=true",
    contacts: [
      { type: "IVR", label: "IVR", value: "800-588-9477" },
      { type: "CSR", label: "Residential", value: "800-334-7661" },
      { type: "CSR", label: "Spanish", value: "800-955-8237" },
      { type: "CSR", label: "Business", value: "877-426-6331" }
    ],
    timezone: "America/Chicago",
    areas: ["312", "773", "847", "630", "815", "708", "224", "331"],
    customFields: []
  },

  {
    id: 25,
    live: true,
    name: "Dallas County Tax Office",
    tla: "DCN3",
    aliases: ["Dallas County Property Tax"],
    paymentTypes: ["County Tax", "Property Tax"],
    kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=184237309",
    adLink: "https://adg-ipn1.paymentus.net/dcn3?v2=true&lang=en",
    contacts: [
      { type: "CSR", label: "Tax Office", value: "214-653-7811" },
      { type: "CSR", label: "Customer Service", value: "214-653-7811" }
    ],
    timezone: "America/Chicago",
    areas: ["214", "469", "972", "945"],
    customFields: []
  },

  {
    id: 26,
    live: false,
    name: "Dallas County Treasury",
    tla: "DCTO",
    aliases: ["Dallas County Courts", "Dallas Police"],
    paymentTypes: ["Treasury", "Court Fees", "Police Fees"],
    kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=184237309",
    adLink: "https://adg-ipn1.paymentus.net/dcto?v2=true&lang=en",
    contacts: [
      { type: "CSR", label: "Treasury Office", value: "214-653-7321" },
      { type: "CSR", label: "Customer Service", value: "214-653-7811" }
    ],
    timezone: "America/Chicago",
    notes: "Handles Treasury payments. We DO NOT take live payments.",
    areas: ["214", "469", "972", "945"],
    customFields: []
  },

  {
    id: 10,
    live: true,
    name: "Galveston County, TX",
    tla: "GALV",
    aliases: ["Galveston Tax"],
    paymentTypes: ["County Tax"],
    kbLink: "https://kb.paymentus.io/display/CSR/GALV+-+Galveston+County%2C+TX",
    adLink: "https://adg-ipn1.paymentus.net/galv?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "866-288-6894" },
      { type: "CSR", label: "Customer Service", value: "877-766-2284" }
    ],
    timezone: "America/Chicago",
    areas: ["409", "281"],
    customFields: []
  },

  {
    id: 14,
    live: true,
    name: "MidAmerican Energy Company",
    tla: "MEC",
    aliases: [],
    paymentTypes: ["Energy bill"],
    kbLink: "https://kb.paymentus.io/display/CSR/MEC+-+MidAmerican+Energy+Company",
    adLink: "https://adg-ipn1.paymentus.net/mec?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "877-253-0147" },
      { type: "CSR", label: "Customer Service", value: "888-427-5632" },
      { type: "CSR", label: "Business", value: "888-427-5632" }
    ],
    timezone: "America/Chicago",
    notes: "Serves Iowa, Illinois, South Dakota, and Nebraska.",
    areas: ["515", "319", "309", "605", "618", "402", "712"],
    customFields: []
  },

  {
    id: 15,
    live: true,
    name: "Nissan Motor Acceptance (Retail)",
    tla: "NMAC",
    aliases: ["Nissan Finance"],
    paymentTypes: ["Retail Finance"],
    kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=83467694",
    adLink: "https://adg-ipn1.paymentus.net/nmac?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "833-648-0173" },
      { type: "CSR", label: "Customer Service", value: "800-456-6622" }
    ],
    timezone: "America/Chicago",
    notes: "National provider (HQ in TN). Handles RETAIL payments.",
    areas: [],
    customFields: []
  },

  {
    id: 16,
    live: true,
    name: "Nissan Motor Acceptance (Lease)",
    tla: "NSAN",
    aliases: ["Nissan Leasing"],
    paymentTypes: ["Lease Payments"],
    kbLink: "https://kb.paymentus.io/pages/viewpage.action?pageId=83467694",
    adLink: "https://adg-ipn1.paymentus.net/nsan?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "833-648-0173" },
      { type: "CSR", label: "Customer Service", value: "800-456-6622" }
    ],
    timezone: "America/Chicago",
    notes: "National provider (HQ in TN). Handles LEASE payments.",
    areas: [],
    customFields: []
  },

  {
    id: 17,
    live: true,
    name: "NiSource (Columbia Gas / NIPSCO)",
    tla: "NSRC",
    aliases: ["NiSource", "Columbia Gas", "Nipsco"],
    paymentTypes: ["Utility Bill"],
    kbLink: "https://kb.paymentus.io/display/CSR/NSRC+-+NiSource",
    adLink: "https://adg-ipn1.paymentus.net/nsrc?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "See Notes for State Numbers" }
    ],
    timezone: "America/Chicago",
    notes: "Parent company for utilities in multiple states (HQ in IN).",
    areas: ["219", "260", "317", "614", "412", "773", "859"],
    customFields: []
  },

  {
    id: 21,
    live: true,
    name: "Tarrant County, TX",
    tla: "TGXH",
    aliases: ["Tarrant Tax"],
    paymentTypes: ["County Tax", "Property Tax"],
    kbLink: "https://kb.paymentus.io/display/CSR/TGXH+-+Tarrant+County%2C+TX",
    adLink: "https://adg-ipn1.paymentus.net/tgxh?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "888-826-5029" },
      { type: "CSR", label: "Customer Service", value: "817-884-1111" }
    ],
    timezone: "America/Chicago",
    areas: ["817", "682"],
    customFields: []
  },

  {
    id: 29,
    live: true,
    name: "Grange Mutual Casualty Group",
    tla: "GRIN",
    aliases: ["Integrity Insurance", "Grange Insurance"],
    paymentTypes: ["Insurance"],
    kbLink: "https://kb.paymentus.io/display/CSR/GRIN+-+Grange+Mutual+Casualty+Group+%28%26+Integrity+Insurance%29",
    adLink: "https://adg-ipn1.paymentus.net/grin?v2=true",
    contacts: [
      { type: "IVR", label: "IVR", value: "833-894-0964" },
      { type: "CSR", label: "Customer Service", value: "855-293-3826" }
    ],
    timezone: "America/New_York",
    notes: "Also operates as Integrity Insurance.",
    areas: ["614", "216", "330", "419", "513", "740"],
    customFields: [
      { label: "Biller Website", value: "https://www.grangeinsurance.com/" }
    ]
  },

  {
    id: 32,
    live: true,
    name: "Jewelers Mutual Insurance Company",
    tla: "JMIC",
    aliases: ["JMCP", "JMIC", "Jewelers Mutual"],
    paymentTypes: ["Insurance"],
    kbLink: "https://kb.paymentus.io/display/CSR/JMIC+JMCP+-+Jewelers+Mutual+Insurance+Company",
    adLink: "https://adg-ipn1.paymentus.net/jmic?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "US IVR (JMIC)", value: "844-294-9234" },
      { type: "IVR", label: "CAN IVR (JMCP)", value: "844-294-9252" },
      { type: "CSR", label: "Customer Service", value: "888-884-2424" }
    ],
    timezone: "America/Chicago",
    notes: "Handles both US (JMIC) and Canadian (JMCP) accounts. Confirm with customer before processing.",
    areas: [],
    customFields: [
      { label: "Biller Website", value: "https://www.jewelersmutual.com" }
    ]
  },

  {
    id: 35,
    live: true,
    name: "Omaha Public Power District",
    tla: "OPPD",
    aliases: ["Omaha Power"],
    paymentTypes: ["Utilities", "Power"],
    kbLink: "https://kb.paymentus.io/display/CSR/OPPD+-+Omaha+Public+Power+District",
    adLink: "https://adg-ipn1.paymentus.net/oppd?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR (English)", value: "844-278-5790" },
      { type: "IVR", label: "IVR (Spanish)", value: "844-216-1010" },
      { type: "CSR", label: "Customer Service", value: "877-536-4131" }
    ],
    timezone: "America/Chicago",
    notes: "Serves Omaha, Nebraska and surrounding areas.",
    areas: ["402", "308", "531"],
    customFields: [
      { label: "Biller Website", value: "https://www.oppd.com" }
    ]
  },

  {
    id: 36,
    live: true,
    name: "Otter Tail Power Company",
    tla: "OTPC",
    aliases: ["Otter Tail Power"],
    paymentTypes: ["Utilities", "Power"],
    kbLink: "https://kb.paymentus.io/display/CSR/OTPC+-+Otter+Tail+Power+Company",
    adLink: "https://adg-ipn1.paymentus.net/otpc?v2=true&lang=en",
    contacts: [
      { type: "IVR", label: "IVR", value: "866-377-1059" },
      { type: "CSR", label: "Customer Service", value: "800-257-4044" }
    ],
    timezone: "America/Chicago",
    notes: "Serves parts of Minnesota, North Dakota, and South Dakota.",
    areas: ["218", "320", "701", "605"],
    customFields: [
      { label: "Biller Website", value: "https://www.otpco.com" }
    ]
  },

  {
    id: 40,
    live: false,
    name: "Waste Management",
    tla: "WMPT",
    aliases: ["WM"],
    paymentTypes: ["Waste Management"],
    kbLink: "https://kb.paymentus.io/display/CSR/WMPT+-+Waste+Management",
    adLink: "https://adg-ipn1.paymentus.net/WMPT?v2=true&lang=en",
    contacts: [
      { type: "CSR", label: "Customer Service", value: "866-909-4458" },
      { type: "IVR", label: "IVR", value: "No IVR Available" }
    ],
    timezone: "America/Chicago",
    notes: "National provider for US and Canada with many payment types. No IVR.",
    areas: [],
    customFields: [
      { label: "Biller Website", value: "https://www.wm.com" }
    ]
  }
  
];
