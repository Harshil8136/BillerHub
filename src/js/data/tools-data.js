/**
 * TOOLS DATA
 * ==================
 * UPDATED: Added an `icon` property to each section of the Fee Tool
 * data to support the new, visually enhanced card-based layout.
 *
 * This file is the manifest for all tools available in the new Tools menu.
 */

const TOOLS_DATA = [
  {
    id: 'kbArticles',
    type: 'modal',
    title: 'KB Article Search',
    icon: 'fa-solid fa-book',
    shortcut: 'Alt+K'
  },
  {
    id: 'feeTool',
    type: 'modal',
    title: 'Paymentus Processing Fee Tool',
    icon: 'fa-solid fa-calculator',
    shortcut: 'Alt+1',
    data: {
      title: 'Paymentus Corporation Service Fee',
      sections: [
        {
          title: 'PSVJ - Service Fee JPMC',
          category: 'live',
          icon: 'fa-solid fa-bolt',
          links: [
            { label: 'DCS1', url: 'https://adg-ipn1.paymentus.net/auth/psvj?index=0&v2=true&lang=en' },
            { label: 'DCS2', url: 'https://adg-ipn1.paymentus.net/auth/psvj?index=1&v2=true&lang=en' },
            { label: 'DCS4', url: 'https://adg-ipn1.paymentus.net/auth/psvj?index=2&v2=true&lang=en' },
            { label: 'DCS5', url: 'https://adg-ipn1.paymentus.net/auth/psvj?index=3&v2=true&lang=en' }
          ]
        },
        {
          title: 'BSF1 - Service Fee BRAINTREE',
          category: 'live',
          icon: 'fa-solid fa-bolt',
          links: [
            { label: 'DCS1', url: 'https://adg-ipn1.paymentus.net/bsf1?v2=true&lang=en' },
            { label: 'DCS2', url: 'https://adg-ipn1.paymentus.net/bsf2?v2=true&lang=en' }
          ]
        },
        {
          title: 'PSVU - Service Fee US',
          category: 'info',
          icon: 'fa-solid fa-server',
          links: [
            { label: 'DCS1', url: 'https://adg-ipn1.paymentus.net/auth/psvu?index=0&v2=true&lang=en' },
            { label: 'DCS2', url: 'https://adg-ipn1.paymentus.net/auth/psvu?index=1&v2=true&lang=en' },
            { label: 'DCS4', url: 'https://adg-ipn1.paymentus.net/auth/psvu?index=2&v2=true&lang=en' },
            { label: 'DCS5', url: 'https://adg-ipn1.paymentus.net/auth/psvu?index=3&v2=true&lang=en' }
          ]
        },
        {
          title: 'PSVC - Service Fee Canada',
          category: 'info',
          icon: 'fa-solid fa-server',
          links: [
            { label: 'DCS1', url: 'https://adg-ipn1.paymentus.net/auth/psvc?index=0&v2=true&lang=en' },
            { label: 'DCS2', url: 'https://adg-ipn1.paymentus.net/auth/psvc?index=1&v2=true&lang=en' },
            { label: 'DCS5', url: 'https://adg-ipn1.paymentus.net/auth/psvc?index=3&v2=true&lang=en' }
          ]
        },
        {
          title: 'PSO Portal',
          category: 'support',
          icon: 'fa-solid fa-life-ring',
          note: 'For searching Confirmation #s from account and Biller info.',
          links: [
            { label: 'DCS1', url: 'https://pso-ipn6.paymentus.net/prodsupport/#/toolbox' },
            { label: 'DCS2', url: 'https://pso-ipn7.paymentus.net/prodsupport/#/toolbox' },
            { label: 'DCS4', url: 'https://pso.ipn4.paymentus.com/prodsupport/#/toolbox' },
            { label: 'DCS5', url: 'https://pso.ipn5.paymentus.com/prodsupport/#/toolbox' },
            { label: 'DCS8', url: 'https://pso.ipn8-use2.paymentus.com/prodsupport/#/toolbox' }
          ]
        }
      ]
    }
  },
  {
    id: 'emailGen',
    type: 'link',
    title: 'Email Generator Pro',
    icon: 'fa-solid fa-envelope-open-text',
    shortcut: 'Alt+2',
    url: 'https://harshil8136.github.io/Email-Generator-Pro/'
  },
  {
    id: 'stickyNotes',
    type: 'link',
    title: 'Advance Sticky Notes',
    icon: 'fa-solid fa-note-sticky',
    shortcut: 'Alt+3',
    url: 'https://harshil8136.github.io/Advance-Sticky-Notes/'
  },
  {
    id: 'viewShortcuts',
    type: 'modal',
    title: 'View Shortcuts',
    icon: 'fa-solid fa-keyboard',
    shortcut: 'Alt+?'
  }
];