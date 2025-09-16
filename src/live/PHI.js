/**
 * NOTES: PHI - Pepco Holdings Inc. (Exelon)
 * =============================================================================
 * This file contains the notes for Pepco Holdings Inc., which is the parent
 * company for Atlantic City Electric, Delmarva Power, and Pepco.
 */

const PHI_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Critical Alerts</h4>
      <p><strong>Confirm Operating Company:</strong> You must confirm with the customer if they are paying <strong>Atlantic City Electric, Delmarva Power, or Pepco</strong> before processing a payment.</p>
      <p><strong>Customer Portal (CP) is Non-Functional:</strong> Do not refer customers to the CP. We cannot reset passwords.</p>
      <p><strong>Balance Display Issue:</strong> The balance may display as $9,999.99. This is an error, and we do not know the true balance. Transfer the customer to the biller if they need their balance.</p>
      
      <h4>Fees (Effective Sep 16, 2024)</h4>
      <p>The fee structure is complex and depends on the customer's account type (Residential/Commercial) and the type of card used (Consumer/Commercial).</p>
      <ul>
        <li><strong>Residential Accounts:</strong> $2.25 fee for all cards and non-registered ACH. No fee for registered/scheduled ACH.</li>
        <li><strong>Commercial Accounts:</strong> 2.60% surcharge for credit cards. No fee for ACH.</li>
      </ul>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Confirm Operating Company</h4>
      <p>Before processing a payment, you must confirm which specific utility the customer is trying to pay: <strong>Atlantic City Electric, Delmarva Power, or Pepco</strong>. Use the Service Details tab for company-specific contact information.</p>
      <h4>Customer Portal (CP) is Non-Functional</h4>
      <p>The customer portal is currently not working. Do not refer customers to it, and be aware that we are unable to reset any passwords for this biller.</p>
      <h4>Balance Display Issue</h4>
      <p>The balance may display in the system as <strong>$9,999.99</strong>. This is an error and does not reflect the customer's true balance. We can still process a payment, but if the customer needs to confirm their balance, they must be transferred to the biller.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>A new, complex fee structure is effective <strong>September 16, 2024</strong>. Fees depend on account type and payment method.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Account Type</th>
              <th>Payment Method</th>
              <th>Fee</th>
              <th>Max Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4"><strong>Residential</strong></td>
              <td>Consumer Debit/Credit Card</td>
              <td>$2.25</td>
              <td>$5,000</td>
            </tr>
            <tr>
              <td>ACH (non-registered, one-time)</td>
              <td>$2.25</td>
              <td>$300,000</td>
            </tr>
             <tr>
              <td>ACH (registered wallet/scheduled)</td>
              <td>No Fee</td>
              <td>$300,000</td>
            </tr>
            <tr>
              <td>Commercial Card</td>
              <td>Not Permitted</td>
              <td>N/A</td>
            </tr>
            <tr>
              <td rowspan="2"><strong>Commercial</strong></td>
              <td>Credit Card (Personal or Commercial)</td>
              <td>2.60% Surcharge</td>
              <td>$100,000</td>
            </tr>
            <tr>
              <td>Bank (ACH)</td>
              <td>No Fee</td>
              <td>$500,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  autopay: {
    title: 'Autopay',
    color: 'secondary',
    content: `
      <h4>Autopay Rules</h4>
      <p>Customers can only sign up for AutoPay in the Agent Dashboard using an <strong>ACH method that already exists in their wallet</strong>. If no wallet method exists, the customer must use their portal to add one first.</p>
      <p>AutoPay payments are generated via a liability-post-process job, not the standard scheduled payment generator.</p>
    `
  },
  services: {
    ace: {
      name: 'Atlantic City Electric',
      content: `
        <h4>Contact Information</h4>
        <ul>
          <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="ACE IVR">1-833-209-5484</span></li>
          <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="ACE CSR">1-800-642-3780</span> (then press 3)</li>
        </ul>
        <p><strong>Website:</strong> <a href="https://www.atlanticcityelectric.com" target="_blank" rel="noopener noreferrer">atlanticcityelectric.com</a></p>
      `
    },
    dpl: {
      name: 'Delmarva Power & Light',
      content: `
        <h4>Contact Information</h4>
        <ul>
          <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="DPL IVR">1-833-209-5486</span></li>
          <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="DPL CSR">1-800-375-7117</span> (DE=1, MD=2, then press 4)</li>
        </ul>
        <p><strong>Website:</strong> <a href="https://www.delmarva.com" target="_blank" rel="noopener noreferrer">delmarva.com</a></p>
      `
    },
    pepco: {
      name: 'Pepco',
      content: `
        <h4>Contact Information</h4>
        <ul>
          <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="Pepco IVR">1-833-209-8415</span></li>
          <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="Pepco CSR">202-833-7500</span> (DC=1, MD=2, then press 3)</li>
          <li><strong>Emergency Line (24/7):</strong> <span class="copyable-phone" data-copy-label="Pepco Emergency">1-877-737-2662</span></li>
        </ul>
        <p><strong>Website:</strong> <a href="https://www.pepco.com" target="_blank" rel="noopener noreferrer">pepco.com</a></p>
      `
    }
  }
};