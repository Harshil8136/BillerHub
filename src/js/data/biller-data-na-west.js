/**
 * BILLER DATA - North America West
 * ==================
 * Contains biller data for the Mountain and Pacific time zone regions of the US.
 */

const BILLERS_WEST = [
  {
    "id": 9,
    "live": true,
    "name": "PacifiCorp",
    "tla": "PAC",
    "aliases": ["Rocky Mountain Power", "Pacific Power"],
    "paymentTypes": ["Electricity"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PAC+-+PacifiCorp",
    "adLink": "https://adg-ipn1.paymentus.net/pac?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "Pacific Power", "value": "833-277-8689" },
      { "type": "IVR", "label": "Rocky Mtn Power", "value": "833-277-8690" }
    ],
    "timezone": "America/Los_Angeles",
    "notes": "Operates as Pacific Power (Pacific Time) and Rocky Mountain Power (Mountain Time).",
    "areas": ["503", "541", "360", "209", "801", "435", "307", "208", "971"],
    "customFields": []
  },
  {
    "id": 18,
    "live": true,
    "name": "Puget Sound Energy",
    "tla": "PSE",
    "aliases": [],
    "paymentTypes": ["Utilities", "Energy"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PSE+-+Puget+Sound+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/pse?v2=true&lang=en",
    "contacts": [
      { "type": "CSR", "label": "Customer Service", "value": "1-888-225-5773" }
    ],
    "timezone": "America/Los_Angeles",
    "notes": "Serves the Puget Sound region of Washington state.",
    "areas": ["206", "425", "253", "360", "564"],
    "customFields": []
  },
  {
    "id": 19,
    "live": true,
    "name": "Salt River Project",
    "tla": "SRP",
    "aliases": [],
    "paymentTypes": ["Power & Water"],
    "kbLink": "https://kb.paymentus.io/display/CSR/SRP+-+Salt+River+Project",
    "adLink": "https://adg-ipn1.paymentus.net/srp?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "855-671-9276" }
    ],
    "timezone": "America/Phoenix",
    "notes": "Provides power and water to the Phoenix, Arizona metro area.",
    "areas": ["602", "480", "623", "928"],
    "customFields": []
  },
  {
    "id": 30,
    "live": false,
    "name": "Hawaiian Electric Company, Inc.",
    "tla": "HAWE",
    "aliases": ["Hawaiian Electric"],
    "paymentTypes": ["Utilities", "Electricity"],
    "kbLink": "https://kb.paymentus.io/display/CSR/HAWE+-+Hawaiian+Electric+Company%2C+Inc.",
    "adLink": "https://adg-ipn1.paymentus.net/hawe?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "888-826-5006" },
      { "type": "CSR", "label": "CSR (by Island)", "value": "See Notes Tab" }
    ],
    "timezone": "Pacific/Honolulu",
    "notes": "Provides electricity to the islands of Hawai'i.",
    "areas": ["808"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.hawaiianelectric.com/" }
    ]
  },
  {
    "id": 39,
    "live": true,
    "name": "San Diego Gas and Electric",
    "tla": "SDG",
    "aliases": ["SDG&E"],
    "paymentTypes": ["Utilities", "Energy"],
    "kbLink": "https://kb.paymentus.io/display/CSR/SDG+-+San+Diego+Gas+and+Electric",
    "adLink": "https://adg-ipn1.paymentus.net/sdg?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "IVR", "value": "833-894-1030" },
      { "type": "CSR", "label": "Customer Service", "value": "800-411-7343" }
    ],
    "timezone": "America/Los_Angeles",
    "notes": "Serves San Diego and southern Orange counties in California.",
    "areas": ["619", "858", "760", "949"],
    "customFields": [
      { "label": "Biller Website", "value": "https://www.sdge.com/" }
    ]
  }
];

// Combine all regional biller arrays into the main BILLERS constant for the application to use.
const BILLERS = [...BILLERS_EAST, ...BILLERS_CENTRAL, ...BILLERS_WEST];