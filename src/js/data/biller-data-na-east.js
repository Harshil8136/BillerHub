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
    "aliases": ["Constellation Energy"],
    "paymentTypes": ["Power", "Gas", "Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=19464791",
    "adLink": "https://adg-ipn1.paymentus.net/ceb?v2=true&lang=en",
    "contacts": [
      { "type": "IVR", "label": "Power IVR", "value": "844-309-7088" },
      { "type": "IVR", "label": "Gas IVR", "value": "844-309-7092" }
    ],
    "timezone": "America/New_York",
    "notes": "Parent company for Power and Gas utilities (HQ in MD).",
    "areas": [], // Services multiple states
    "customFields": []
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
  "aliases": ["Dominion Energy", "Dominion Resources Inc"],
  "paymentTypes": ["Utility Bill", "Electric", "Gas"],
  "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58163398",
  "adLink": "https://adg-ipn1.paymentus.net/dne?v2=true&lang=en",
  "contacts": [
    { "type": "IVR", "label": "VA Electric / NC (Gas/Electric) IVR", "value": "866-366-4357" },
    { "type": "IVR", "label": "Dominion Gas Ohio IVR", "value": "833-261-1469" },
    { "type": "IVR", "label": "DNE-MRP IVR", "value": "833-268-4343" },
    { "type": "Internal", "label": "CSR Transfer (OH)", "value": "866-313-8303" },
    { "type": "Internal", "label": "CSR Transfer (WV)", "value": "866-313-8305" },
    { "type": "Internal", "label": "CSR Transfer (VA/NC)", "value": "888-429-0011" }
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
    "adLink": "https://adg-ipn1.paymentus.net/hyd1?v2=true&lang=en",
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
}
];



