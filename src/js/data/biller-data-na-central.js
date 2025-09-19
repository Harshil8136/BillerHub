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
      { type: "IVR", label: "Main IVR", value: "833-375-4919", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "512-494-9400", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "800-588-9477", group: "IVR Numbers" },
      { type: "CSR", label: "Residential", value: "800-334-7661", group: "Customer Service" },
      { type: "CSR", label: "Business", value: "877-426-6331", group: "Customer Service" },
      { type: "CSR", label: "Spanish", value: "800-955-8237", group: "Customer Service", annotation: "Spanish" }
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
      { type: "CSR", label: "Tax Office", value: "214-653-7811", group: "Customer Service" }
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
      { type: "CSR", label: "Treasury Office", value: "214-653-7321", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "866-288-6894", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "877-766-2284", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "877-253-0147", group: "IVR Numbers" },
      { type: "CSR", label: "Residential/Business", value: "888-427-5632", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "833-648-0173", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "800-456-6622", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "833-648-0173", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "800-456-6622", group: "Customer Service" }
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
      { type: "IVR", label: "By State", value: "See Notes for State Numbers", group: "IVR Numbers" }
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
      { type: "IVR", label: "Main IVR", value: "888-826-5029", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "817-884-1111", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "833-894-0964", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "855-293-3826", group: "Customer Service" }
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
      { type: "IVR", label: "US IVR", value: "844-294-9234", group: "IVR Numbers", annotation: "JMIC" },
      { type: "IVR", label: "Canada IVR", value: "844-294-9252", group: "IVR Numbers", annotation: "JMCP" },
      { type: "CSR", label: "Main CSR", value: "888-884-2424", group: "Customer Service" }
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
      { type: "IVR", label: "IVR", value: "844-278-5790", group: "IVR Numbers", annotation: "English" },
      { type: "IVR", label: "IVR", value: "844-216-1010", group: "IVR Numbers", annotation: "Spanish" },
      { type: "CSR", label: "Main CSR", value: "877-536-4131", group: "Customer Service" }
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
      { type: "IVR", label: "Main IVR", value: "866-377-1059", group: "IVR Numbers" },
      { type: "CSR", label: "Main CSR", value: "800-257-4044", group: "Customer Service" }
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
      { type: "CSR", label: "Main CSR", value: "866-909-4458", group: "Customer Service" },
      { type: "IVR", label: "No IVR", value: "No IVR Available", group: "IVR Numbers" }
    ],
    timezone: "America/Chicago",
    notes: "National provider for US and Canada with many payment types. No IVR.",
    areas: [],
    customFields: [
      { label: "Biller Website", value: "https://www.wm.com" }
    ]
  }
  
];