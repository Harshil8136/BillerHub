/**
 * NOTES: HOIG - The Hanover Insurance Group
 * =============================================================================
 * This file contains the notes for The Hanover Insurance Group, which includes
 * Citizens Insurance Company of America. The data is based on the KB article.
 */

const HOIG_NOTES = {
  // Top-level tabs for general information
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Required Greeting Script</h4>
      <p>All calls must be answered with the biller's provided script: <strong>"Hello, my name is [Agent Name]. How can I help you with your Hanover/Citizens insurance payment today?"</strong></p>
      <h4>Do Not Discuss Surcharges</h4>
      <p>Surcharges apply based on policy type and location. If a customer objects to or complains about a surcharge, <strong>do not discuss eligibility</strong>. You must refer the customer back to Hanover Customer Care and offer to transfer them.</p>
      <h4>"Account Not Found" Errors</h4>
      <p>If you receive an "Account was not found" error after entering the Customer/Policy # and zip code, verify with the customer that they are providing the zip code associated with the <strong>Customer ID</strong>, not the zip code where the policy is in effect.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>Fees are absorbed for most payment methods. However, a <strong>surcharge</strong> applies to credit card payments, which varies by the policy type.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Policy Type</th>
              <th>Payment Method</th>
              <th>Fee/Surcharge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Personal Lines</strong></td>
              <td>Credit Card (Visa, MC, Discover, AMEX)</td>
              <td><strong>2.10% Surcharge</strong></td>
            </tr>
            <tr>
              <td><strong>Personal Lines</strong></td>
              <td>Debit Card, Bank Account, Walmart Pay</td>
              <td>Absorbed</td>
            </tr>
            <tr>
              <td><strong>Commercial Lines</strong></td>
              <td>Credit Card (Visa, MC, Discover, AMEX)</td>
              <td><strong>3.00% Surcharge</strong></td>
            </tr>
            <tr>
              <td><strong>Commercial Lines</strong></td>
              <td>Debit Card, Bank Account, Walmart Pay</td>
              <td>Absorbed</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">800-573-1187</span></li>
        <li><strong>Customer Service (Cold Transfer):</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-922-8427</span></li>
        <li><strong>Escalations (Warm Transfer):</strong> <span class="copyable-phone" data-copy-label="Escalations Number">800-828-7087</span></li>
      </ul>
      <p>When cold transferring, inform the caller that they will need their policy number.</p>
      <h4>Websites</h4>
      <ul>
        <li><strong>Guest Bill Pay (OTP):</strong> <a href="https://www.hanover.com/pay-your-bill" target="_blank" rel="noopener noreferrer">hanover.com</a></li>
        <li><strong>Registered User Login:</strong> <a href="https://www.myhanoverpolicy.com" target="_blank" rel="noopener noreferrer">myhanoverpolicy.com</a></li>
      </ul>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account & Policy Information</h4>
      <ul>
        <li><strong>Customer Number:</strong> 16 characters (e.g., 1234567890-001-000).</li>
        <li><strong>Policy Number:</strong> 10 characters, may include letters (e.g., ABC1234567).</li>
      </ul>
      <h4>System Details</h4>
      <ul>
        <li><strong>Future-Dated Payments:</strong> Yes, agents can schedule future payments but not past the due date.</li>
        <li><strong>Payment Limits:</strong> Max payment of $500,000. No minimum payment and no limit on the number of payments.</li>
      </ul>
    `
  },

  // Composite services for different payment workflows
  services: {
    established_policy: {
      name: 'Established Policy Payment',
      accountFormat: '16-character Customer Number or 10-character Policy Number + Billing Zip Code.',
      notes: `
        <p>This is the standard process for existing policies. The payment is validated against the customer's account.</p>
        <ol>
          <li>Select 'Generic Policy' as the payment type in the Agent Dashboard.</li>
          <li>Ask for either the 16-digit customer number OR the 10-character policy number.</li>
          <li>Ask for the billing zip code associated with the customer account.</li>
        </ol>
      `
    },
    deposit_payment: {
      name: 'New Policy Deposit',
      accountFormat: '10-character Policy Number. Non-validated.',
      notes: `
        <p>This process is for customers making an initial deposit on a <strong>brand new policy</strong>. These payments are not validated.</p>
        <h4>CSR Script & Flow</h4>
        <ol>
          <li><strong>Ask the first question:</strong> "Is the payment being made today for a brand new policy or a policy that has already been established?"</li>
          <li>If "brand new", ask for the <strong>10-character policy number</strong> (e.g., APN1234567).</li>
          <li>Ask if it is for <strong>Personal</strong> or <strong>Commercial</strong> lines.</li>
          <li>Ask for the <strong>State</strong>.</li>
          <li>If the state is <strong>Michigan</strong>, select the "Citizens" deposit type. For all other states, select "Hanover".</li>
          <li>Select the correct deposit payment option from the dropdown (e.g., Deposit Hanover Personal, Deposit Citizens Commercial).</li>
        </ol>
      `
    }
  }
};