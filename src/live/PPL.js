/**
 * NOTES: PPL - PPL Electric Utilities
 * =============================================================================
 * This file contains the notes for PPL Electric Utilities.
 * The data is based on the KB article provided.
 */

const PPL_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>Auto-Pay Conflict:</strong> Customers with auto-pay set up directly with PPL <strong>cannot</strong> make a payment through Paymentus. Their account is blocked by the biller and will appear as invalid. Customers must contact PPL to cancel auto-pay before making a one-time payment.</p>
      
      <h4>Fees</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential</strong></td>
              <td>$2.25</td>
            </tr>
            <tr>
              <td><strong>Commercial</strong></td>
              <td>$2.50</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Contact</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">844-278-3310</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-342-5775</span></li>
      </ul>
      
      <h4>Channels & Payment Methods</h4>
      <p><strong>Bank/ACH payments are only available on WEB and IVR channels.</strong> Live agents cannot process bank payments.</p>
      <p>Accepted card payments:</p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
      </div>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Auto-Pay Conflict</h4>
      <p>PPL customers that have auto-pay set up will not be able to make a payment through Paymentus. If the customer wants to make a One-Time Payment, they must be transferred to PPL to discuss canceling their auto-pay first.</p>
      <p>The account will appear as invalid or suspended, showing an error like "Based on your credit history, we cannot process your request" or "Sorry, we did not get a valid input" in the IVR. See the Troubleshooting tab for how to verify this in the logs.</p>
      <h4>Incorrect Transfers</h4>
      <p>PPL agents may still incorrectly transfer customers to Paymentus for payment cancellations. If this occurs, please note the name of the PPL CSR who made the transfer.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>Fees are applied per transaction and vary by customer type.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Fee</th>
              <th>Maximum Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential Utility Bills</strong></td>
              <td>$2.25</td>
              <td>$1,000</td>
            </tr>
            <tr>
              <td><strong>Commercial Utility Bills</strong></td>
              <td>$2.50</td>
              <td>$1,500</td>
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
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">844-278-3310</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-342-5775</span> (1-800-DIAL-PPL)</li>
      </ul>
      <p><strong>Note:</strong> A Spanish option for the IVR is being developed by the biller but is not yet in production.</p>
      <p><strong>Website:</strong> <a href="https://www.pplelectric.com" target="_blank" rel="noopener noreferrer">www.pplelectric.com</a></p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through WEB (ROTP, OTP, CP), AD, and IVR.</p>
      <p class="notes-content color-border-danger"><strong>Bank (ACH) payments are only available via WEB and IVR.</strong> Live agents cannot process bank payments for this biller.</p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>10 digits</strong> long. Hyphens are not needed.</p>
      <h4>Accepted Payment Methods</h4>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account (Web/IVR only)</span></div>
      </div>
    `
  },
  troubleshooting: {
    title: 'Troubleshooting',
    color: 'secondary',
    content: `
      <h4>Verifying Auto-Pay Blocks</h4>
      <p>If a customer is unsure if they have auto-pay and their payment is failing, you can confirm the block by checking the CIF logs.</p>
      <ol>
        <li>Go to: <strong>Reports > Real Time Logs > Real Time CIF Logs</strong>.</li>
        <li>Enter the Account Number and the Date, then click Search.</li>
        <li>If you get an HTTP Response Code of '200 OK', click on <strong>View</strong> under the Action column.</li>
        <li>In the log details, search for the term <strong>"returnCd"</strong> (using Ctrl+F).</li>
        <li>Check the value within the <code>&lt;returnCd&gt;</code> tag:
          <ul>
            <li><code>&lt;returnCd&gt;0&lt;/returnCd&gt;</code> = No issue, payment should be accepted.</li>
            <li><code>&lt;returnCd&gt;4&lt;/returnCd&gt;</code> = Customer has a scheduled payment setup (auto-pay). Paymentus cannot accept payments. The customer must contact PPL.</li>
          </ul>
        </li>
      </ol>
    `
  }
};