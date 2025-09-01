/**
 * BILLER DATA SHARD: D-Z (Consolidated)
 * ==================
 * This file contains the remaining portion of the master biller list.
 * It pushes its contents into the global BILLERS array.
 */

BILLERS.push(
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
    "id": 10,
    "live": true,
    "name": "Galveston County, TX",
    "tla": "GALV",
    "aliases": ["Galveston Tax"],
    "paymentTypes": ["County Tax"],
    "kbLink": "https://kb.paymentus.io/display/CSR/GALV+-+Galveston+County%2C+TX",
    "adLink": "https://adg-ipn1.paymentus.net/galv?v2=true&lang=en",
    "ivr": "866-288-694",
    "csr": "877-766-2284",
    "notes": ""
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
  }
);