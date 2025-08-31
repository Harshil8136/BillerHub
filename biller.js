/**
 * BILLER DATA MODULE
 * ==================
 * This file contains the master list of all biller information.
 * * To add a new biller:
 * 1. Copy an existing object block (from `{` to `}`).
 * 2. Paste it at the end of the list, before the closing `];`.
 * 3. Update the information for the new biller.
 * * FIELD GUIDE:
 * - id: A unique number for each biller.
 * - live: `true` if the biller is live, `false` otherwise.
 * - name: The full, official name of the biller.
 * - tla: The primary Three-Letter Acronym used to identify the biller.
 * - aliases: An array of other names or acronyms for better search matching.
 * - paymentTypes: An array of payment categories (e.g., ['Utilities']).
 * - kbLink: The full URL to the KnowledgeBase article.
 * - adLink: The full URL to the Admin Gateway.
 * - ivr: The Interactive Voice Response phone number.
 * - csr: The Customer Service Representative phone number.
 * - notes: Any important operational notes for the agent.
 */

export const BILLERS = [
  {
    "id": 1,
    "live": true,
    "name": "Consumers Energy",
    "tla": "CEMI",
    "aliases": ["Consumer", "CEMI Energy"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/CEMI+-+Consumers+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/CEMI?v2=true",
    "ivr": "866-329-9593",
    "csr": "800-477-5050",
    "notes": "Primary energy provider for Michigan."
  },
  {
    "id": 2,
    "live": true,
    "name": "Austin Energy",
    "tla": "AETX",
    "aliases": ["AETX Austin"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/AETX+-+Austin+Energy",
    "adLink": "https://adg-ipn1.paymentus.net/aetx?v2=true&lang=en",
    "ivr": "833-375-4919",
    "csr": "512-494-9400",
    "notes": "Serves the city of Austin, Texas."
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
    "ivr": "1-833-254-9875",
    "csr": "1-800-685-0123",
    "notes": ""
  },
  {
    "id": 4,
    "live": true,
    "name": "Atlantic City Electric",
    "tla": "PHI",
    "aliases": ["ACE", "Atlantic Electric"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "ivr": "833-209-5484",
    "csr": "800-642-3780",
    "notes": "Part of the PHI (Pepco Holdings, Inc.) group."
  },
  {
    "id": 5,
    "live": true,
    "name": "Delmarva Power",
    "tla": "PHI",
    "aliases": ["Delmarva"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "ivr": "833-209-5486",
    "csr": "800-375-7117",
    "notes": "Serves the Delmarva Peninsula. Part of the PHI group."
  },
  {
    "id": 6,
    "live": true,
    "name": "Pepco",
    "tla": "PHI",
    "aliases": ["Potomac Electric Power Company"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=58165643",
    "adLink": "https://adg-ipn1.paymentus.net/phi?v2=true&lang=en",
    "ivr": "833-209-8415",
    "csr": "202-833-7500",
    "notes": "Serves the Washington D.C. metro area. Part of the PHI group."
  },
  {
    "id": 7,
    "live": true,
    "name": "American Water",
    "tla": "AWK",
    "aliases": ["American Water Works Company"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/AWK+-+American+Water+Works+Company",
    "adLink": "https://adg-ipn1.paymentus.net/awk?v2=true&lang=en",
    "ivr": "855-748-6066",
    "csr": "(Refer KB link)",
    "notes": "CSR number varies by state; agent must check the KB link."
  },
  {
    "id": 8,
    "live": true,
    "name": "ComEd",
    "tla": "COMD",
    "aliases": ["Commonwealth Edison"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/pages/viewpage.action?pageId=47000139",
    "adLink": "https://adg-ipn1.paymentus.net/COMD?v2=true",
    "ivr": "800-588-9477",
    "csr": "800-334-7661",
    "notes": "Largest electric utility in Illinois."
  },
  {
    "id": 9,
    "live": true,
    "name": "Pacific Power / RMP",
    "tla": "PAC",
    "aliases": ["PacifiCorp", "Rocky Mountain Power"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://kb.paymentus.io/display/CSR/PAC+-+PacifiCorp",
    "adLink": "https://adg-ipn1.paymentus.net/PAC?v2=true",
    "ivr": "833-277-8689 RMP / 833-277-8690 PAC",
    "csr": "888-221-7070",
    "notes": "Operates as Pacific Power and Rocky Mountain Power. Note separate IVR numbers."
  },
  {
    "id": 10,
    "live": true,
    "name": "Galveston County, TX",
    "tla": "GALV",
    "aliases": ["Galveston Tax"],
    "paymentTypes": ["County Tax"],
    "kbLink": "https://kb.paymentus.io/display/CSR/GALV+-+Galveston+County%2C+TX",
    "adLink": "https://adg-ipn1.paymentus.net/galv?v2=true&lang=en",
    "ivr": "866-288-6894",
    "csr": "877-766-2284",
    "notes": ""
  },
  {
    "id": 11,
    "live": false,
    "name": "Enbridge Solutions",
    "tla": "ESI",
    "aliases": ["Enbridge"],
    "paymentTypes": ["Utilities"],
    "kbLink": "https://paymentus.lightning.force.com/lightning/r/Opportunity/0067000000AINYwAAP/view",
    "adLink": null,
    "ivr": "866-613-2531",
    "csr": "877-362-7434",
    "notes": "This biller is currently not live."
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
    "ivr": "386-986-2360",
    "csr": "386-986-2360",
    "notes": "KB Link not available for this non-live biller."
  }
];