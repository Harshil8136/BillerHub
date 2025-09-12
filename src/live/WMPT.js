/**
 * NOTES: WMPT - Waste Management
 * =============================================================================
 * This file contains the notes for Waste Management.
 * It is a composite note handling a large number of distinct payment types.
 */

const WMPT_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>No IVR Available:</strong> This biller does not have an IVR. All calls must be handled by a live agent or directed to the website.</p>
      <p><strong>Debit Cards Not Accepted:</strong> This biller does not accept debit cards as a payment method.</p>
      
      <h4>Fees</h4>
      <p>ACH (Bank) payments have an absorbed fee. Credit Card fees vary by the specific payment type selected.</p>
      
      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Credit Card Maximum:</strong> $50,000</li>
        <li><strong>ACH (Bank) Maximum:</strong> $5,000,000</li>
      </ul>

      <h4>System Details</h4>
      <p>The account number is 9 digits long. The daily cutoff time for payments is <strong>8:00 PM EST</strong>.</p>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>No IVR Available</h4>
      <p>Waste Management does not have an IVR system for payments. Customers calling for self-service must be handled by an agent or directed to the website.</p>
      <h4>Debit Cards Not Accepted</h4>
      <p>This biller does not accept debit cards. Accepted methods are Credit Card, ACH (Bank), and certain Advanced Payment Methods online.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <ul>
        <li><strong>ACH (Bank) Payments:</strong> Fee is absorbed by the biller.</li>
        <li><strong>Credit Card Payments:</strong> Fee varies depending on the specific payment type selected in the payment flow.</li>
      </ul>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">866-909-4458</span></li>
      </ul>
      <p><strong>Website for Online Payments:</strong> <a href="https://www.wm.com/us/en/mywm/my-payment/billing" target="_blank" rel="noopener noreferrer">www.wm.com</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>9 digits</strong> long.</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Processor:</strong> Chase Paymentech (Standard), Braintree (Advanced Payment Methods)</li>
        <li><strong>Go-Live Date:</strong> August 23, 2024</li>
        <li><strong>Cutoff Time:</strong> 8:00 PM EST</li>
        <li><strong>Scheduled (Autopay) Payments:</strong> Yes</li>
        <li><strong>Future-Dated Payments:</strong> Yes</li>
        <li><strong>E-Bill:</strong> No</li>
      </ul>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <p>The maximum allowed payment amount varies significantly by payment method.</p>
       <ul>
        <li><strong>Credit Card Maximum:</strong> $50,000</li>
        <li><strong>ACH (Bank) Maximum:</strong> $5,000,000</li>
      </ul>
    `
  },
  services: {
    residential_us: { name: 'Residential US' },
    res_migrated_us: { name: 'Residential Migrated US' },
    nonres_us: { name: 'Non-Residential US' },
    nonres_autopay_us: { name: 'Non-Residential Autopay Migrated US' },
    exemption_us: { name: 'Exemption Res and Non-Res US' },
    wmra_biz_us: { name: 'WMRA Business US' },
    sbs_natl_us: { name: 'SBS National Accounts US' },
    bagster_us: { name: 'Bagster US' },
    lamptracker: { name: 'Lamptracker' },
    thinkgreen: { name: 'Think Green From Home' },
    rolloff_biz_us: { name: 'Rolloff Business US' },
    energy_env_services: { name: 'Energy and Environmental Services' },
    residential_ca: { name: 'Residential CA' },
    res_migrated_ca: { name: 'Residential Migrated CA' },
    nonres_ca: { name: 'Non-Residential CA' },
    nonres_autopay_ca: { name: 'Non-Residential Autopay Migrated CA' },
    exemption_ca: { name: 'Exemption Res and Non-Res CA' },
    wmra_biz_ca: { name: 'WMRA Business CA' },
    sbs_natl_ca: { name: 'SBS National Accounts CA' },
  }
};