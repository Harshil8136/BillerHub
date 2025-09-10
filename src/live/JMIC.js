/**
 * NOTES: JMIC / JMCP - Jewelers Mutual Insurance Company
 * =============================================================================
 * This file contains the notes for Jewelers Mutual Insurance Company.
 * It is a composite note that handles both US (JMIC) and Canadian (JMCP) payments.
 */

const JMIC_NOTES = {
  // Top-level tabs for general information
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Confirm US (JMIC) vs. Canada (JMCP)</h4>
      <p>Before processing any payment, you <strong>must</strong> confirm with the customer if their policy is in the <strong>US (JMIC)</strong> or <strong>Canada (JMCP)</strong>. Use the correct TLA and payment details for the corresponding country as outlined in the Service Details tab.</p>
      <h4>Do Not Adjust AutoPay</h4>
      <p>Agents are instructed to ignore the "Enroll in AutoPay" section of the payment flow. <strong>Do not</strong> ask the customer about it or make any adjustments to their AutoPay status.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>All payment fees are <strong>absorbed</strong> by the biller for both US and Canadian transactions.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <p>The following contact information is for general inquiries for both US and Canadian customers.</p>
      <ul>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">(888) 884-2424</span></li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 8:00 AM to 7:00 PM (Time Zone not specified)</p>
      <p><strong>Website:</strong> <a href="https://www.jewelersmutual.com" target="_blank" rel="noopener noreferrer">www.jewelersmutual.com</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>10 digits</strong> long with no letters or special characters.</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Go-Live Date:</strong> July 29th, 2024 (Tentative)</li>
        <li><strong>Scheduled Payments:</strong> Yes</li>
        <li><strong>SLA Biller Support Email:</strong> jmicsupport@paymentus.com</li>
      </ul>
    `
  },

  // Composite services for country-specific workflows
  services: {
    jmic_us: {
      name: 'JMIC - United States Payments',
      content: `
        <h4>IVR Numbers (US)</h4>
        <ul>
            <li><strong>Main IVR:</strong> <span class="copyable-phone" data-copy-label="US IVR">844-294-9234</span></li>
            <li><strong>AIVR:</strong> <span class="copyable-phone" data-copy-label="US AIVR">833-523-0368</span></li>
        </ul>
        <h4>Payment Methods (US)</h4>
        <ul>
            <li><strong>Credit:</strong> Visa, Mastercard, Discover, AMEX</li>
            <li><strong>Bank:</strong> Checking, Savings</li>
            <li><strong>Advanced:</strong> PayPal, Walmart Pay <small>(Note: Not available via IVR or AD)</small></li>
        </ul>
        <h4>Payment Limits (US)</h4>
        <ul>
            <li><strong>Credit Card Max:</strong> $100,000</li>
            <li><strong>Bank Account Max:</strong> $200,000</li>
        </ul>
      `
    },
    jmcp_ca: {
      name: 'JMCP - Canadian Payments',
      content: `
        <h4>IVR Numbers (Canada)</h4>
        <ul>
            <li><strong>Main IVR:</strong> <span class="copyable-phone" data-copy-label="Canadian IVR">844-294-9252</span></li>
            <li><strong>AIVR:</strong> <span class="copyable-phone" data-copy-label="Canadian AIVR">833-970-2354</span></li>
        </ul>
        <h4>Payment Methods (Canada)</h4>
        <ul>
            <li><strong>Credit:</strong> Visa, Mastercard, AMEX</li>
            <li><strong>Bank:</strong> Checking, Savings</li>
        </ul>
        <h4>Payment Limits (Canada)</h4>
        <ul>
            <li><strong>Credit Card Max:</strong> $100,000</li>
            <li><strong>Bank Account Max:</strong> $200,000</li>
        </ul>
      `
    }
  }
};