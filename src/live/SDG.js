/**
 * NOTES: SDG - San Diego Gas and Electric
 * =============================================================================
 * This file contains the notes for San Diego Gas and Electric (SDG&E).
 * The data is based on the KB article provided.
 */

const SDG_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>Account Number Entry:</strong> The account number on the customer's bill is 13 digits, but you must <strong>only enter the first 12 digits</strong>. The last digit must be excluded.</p>
      <p><strong>Unsupported Payment Types:</strong> Payments for "EDI payments" or "Group Bill" accounts are <strong>not accepted</strong>. If a standard payment fails, check the Troubleshooting tab for instructions on how to verify the account type.</p>
      
      <h4>Fees</h4>
      <p>A flat fee of <strong>$1.50</strong> is applied to each transaction.</p>
      
      <h4>Contact</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">833-894-1030</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-411-7343</span></li>
      </ul>
      <p><strong>CSR Hours:</strong> Mon-Fri: 7:00 AM - 8:00 PM PST, Saturday: 10:00 AM - 6:00 PM PST.</p>

      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Maximum Payment Amount:</strong> $1,000.00</li>
        <li><strong>Velocity Limit:</strong> 5 payments in 5 days, or 7 payments in 30 days.</li>
      </ul>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Account Number Format</h4>
      <p>The customer's bill shows a 13-digit account number. When processing a payment, you must <strong>ignore the last digit</strong> and enter only the first 12 digits. Leading zeros must be included.</p>
      
      <h4>Unsupported Payment Types</h4>
      <p>We cannot accept payments for accounts flagged as "EDI payments" or "Group Bill". If a customer's payment fails and you suspect this is the cause, follow the steps in the Troubleshooting tab to verify.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>A flat fee of <strong>$1.50</strong> is applied to each transaction.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">833-894-1030</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-411-7343</span></li>
      </ul>
      <p><strong>CSR Hours of Operation:</strong></p>
      <ul>
        <li><strong>Monday - Friday:</strong> 7:00 AM - 8:00 PM PST</li>
        <li><strong>Saturday:</strong> 10:00 AM - 6:00 PM PST</li>
        <li><strong>Sunday:</strong> Closed (except for emergencies)</li>
      </ul>
      <p><strong>Website:</strong> <a href="https://www.sdge.com/" target="_blank" rel="noopener noreferrer">https://www.sdge.com/</a></p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through IVR, Customer Portal (CP), Guest Pay (ROTP), and the Agent Dashboard (AD).</p>
      <ul>
        <li><strong>ROTP Link:</strong> <a href="https://ipn4.paymentus.com/rotp/SDG" target="_blank" rel="noopener noreferrer">https://ipn4.paymentus.com/rotp/SDG</a></li>
        <li><strong>CP Link:</strong> <a href="https://ipn4.paymentus.com/cp/SDG" target="_blank" rel="noopener noreferrer">https://ipn4.paymentus.com/cp/SDG</a></li>
      </ul>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>Use the first <strong>12 digits</strong> of the 13-digit number on the customer's bill. After entering the account number, you can verify the account with either the customer's ZIP code or the last 4 digits of their SSN.</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Go-Live Date:</strong> April 15, 2025</li>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Scheduled (Autopay) Payments:</strong> No</li>
        <li><strong>Future-Dated Payments:</strong> No</li>
        <li><strong>E-Bill:</strong> No</li>
      </ul>
      <h4>Accepted Payment Methods</h4>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
      </div>
      <small>Note: Apple Pay and Google Pay are also accepted and will be presented by the customer's device.</small>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <h4>Maximum Payment Amount</h4>
      <p>The maximum amount allowed per transaction is <strong>$1,000.00</strong>.</p>
      <h4>Velocity Rules</h4>
      <p>The following limits are in place for the number of payments:</p>
      <ul>
        <li><strong>Maximum in 5 days:</strong> 5 payments</li>
        <li><strong>Maximum in 30 days:</strong> 7 payments</li>
      </ul>
    `
  },
  troubleshooting: {
    title: 'Troubleshooting',
    color: 'secondary',
    content: `
      <h4>Getting Balance Information in AD</h4>
      <p>When making a payment in the Agent Dashboard, you must enter both the 12-digit account number and the <strong>last 4 digits of the customer's SSN</strong> to retrieve the balance. The balance will populate after a payment method is selected on the next screen.</p>
      <h4>Verifying EDI/Group Bill Accounts</h4>
      <p>If a customer's payment fails and you suspect it's an unsupported account type, check the Real Time CIF log:</p>
      <ol>
        <li>In the AD, go to: <strong>Reports > Real Time Logs > Real Time CIF Logs</strong>.</li>
        <li>Enter the account number and date, then search.</li>
        <li>In the response, look for the <strong>GroupBill</strong> or <strong>EDICustomer</strong> fields.</li>
        <li>If either field has a value of "X" (e.g., <code>"GroupBill":"X"</code>), the account is unsupported. The customer must be transferred back to SDG to make their payment. If the fields are empty (e.g., <code>"GroupBill":""</code>), the account is a standard energy bill and should be payable.</li>
      </ol>
    `
  }
};