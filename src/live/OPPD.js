/**
 * NOTES: OPPD - Omaha Public Power District
 * =============================================================================
 * This file contains the notes for the Omaha Public Power District.
 * The data is based on the KB article provided.
 */

const OPPD_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>Bank Draft AutoPay Conflict:</strong> Customers enrolled in automatic payments directly through their bank will be blocked from making payments via Paymentus. Their account will show as "invalid" and we cannot see or remove this block.</p>
      <p><strong>Live Agent E-Check Restriction:</strong> Live agents are <strong>not permitted</strong> to process E-Check (ACH/Bank) payments. Customers must use the Web (ROTP) or IVR for bank payments.</p>
      
      <h4>Fees</h4>
      <p>All payment fees are <strong>absorbed</strong> by the biller.</p>
      
      <h4>Contact</h4>
      <ul>
        <li><strong>IVR (English):</strong> <span class="copyable-phone" data-copy-label="IVR English">844-278-5790</span></li>
        <li><strong>IVR (Spanish):</strong> <span class="copyable-phone" data-copy-label="IVR Spanish">844-216-1010</span></li>
        <li><strong>Customer Service (Toll-Free):</strong> <span class="copyable-phone" data-copy-label="CSR Toll-Free">877-536-4131</span> (Spanish: option 7)</li>
        <li><strong>Customer Service (Local):</strong> <span class="copyable-phone" data-copy-label="CSR Local">402-536-4131</span> (Spanish: option 7)</li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 7:00 AM to 7:00 PM DST. Closed on weekends.</p>

      <h4>System</h4>
      <p>The account number is 7-10 digits long. Customers can make IVR payments using just their phone number.</p>
      
      <h4>Payment Limits</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Minimum</th>
              <th>Maximum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Debit/Credit Card</strong></td>
              <td>$10.00</td>
              <td>$5,000.00</td>
            </tr>
            <tr>
              <td><strong>Bank Account (ACH)</strong></td>
              <td>$1.00</td>
              <td>$25,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Bank Draft AutoPay Conflict</h4>
      <p>If a customer is enrolled in automatic payments directly through their <strong>bank</strong>, their account will be blocked by OPPD from making payments through Paymentus. When an agent attempts a payment, the account will be shown as "Account number is not valid". We cannot see or override this block.</p>
      <h4>Live Agent E-Check Restriction</h4>
      <p>Live agents are <strong>not permitted</strong> to process E-Check (ACH/Bank) payments. Customers wishing to pay from a bank account must be directed to use the self-service Web (ROTP) or IVR channels.</p>
      <h4>IVR Phone Number Payments</h4>
      <p>Customers can make payments in the IVR using just their phone number; an account number is not required for self-service.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>All payment fees are <strong>absorbed</strong> by the biller.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>IVR Numbers</h4>
      <ul>
        <li><strong>English:</strong> <span class="copyable-phone" data-copy-label="IVR English">844-278-5790</span></li>
        <li><strong>Spanish:</strong> <span class="copyable-phone" data-copy-label="IVR Spanish">844-216-1010</span></li>
      </ul>
      <h4>Customer Service</h4>
      <ul>
        <li><strong>Toll-Free:</strong> <span class="copyable-phone" data-copy-label="CSR Toll-Free">877-536-4131</span> (Spanish: option 7)</li>
        <li><strong>Local:</strong> <span class="copyable-phone" data-copy-label="CSR Local">402-536-4131</span> (Spanish: option 7)</li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 7:00 AM to 7:00 PM DST. Closed on weekends.</p>
      <p><strong>Website:</strong> <a href="https://www.oppd.com" target="_blank" rel="noopener noreferrer">www.oppd.com</a></p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through the following channels:</p>
      <ul>
        <li>WEB (ROTP, OTP, Customer Portal)</li>
        <li>AD (Agent Dashboard)</li>
        <li>IVR (Phone)</li>
      </ul>
      <p><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/oppd" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/oppd</a></p>
      <p><strong>CP Link:</strong> <a href="https://ipn.paymentus.com/cp/oppd" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/cp/oppd</a></p>
      <p><strong>AD Link:</strong> <a href="https://adg-ipn1.paymentus.net/oppd?v2=true&lang=en" target="_blank" rel="noopener noreferrer">https://adg-ipn1.paymentus.net/oppd</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>7-10 digits</strong> long.</p>
      <h4>Processor</h4>
      <p>Braintree</p>
      <h4>Accepted Payment Methods</h4>
      <div>
        <span class="payment-logo visa" title="Visa"></span>
        <span class="payment-logo mastercard" title="Mastercard"></span>
        <span class="payment-logo discover" title="Discover"></span>
        <span class="payment-logo ach" title="ACH/Bank Account"></span>
      </div>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <p>The following payment limits apply per transaction.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Minimum Payment</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Debit/Credit Card</strong></td>
              <td>$10.00</td>
              <td>$5,000.00</td>
            </tr>
            <tr>
              <td><strong>Bank Account (ACH)</strong></td>
              <td>$1.00</td>
              <td>$25,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
};