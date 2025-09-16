/**
 * NOTES: GRIN - Grange Mutual Casualty Group
 * =============================================================================
 * This file contains the notes for Grange Mutual Casualty Group (& Integrity Insurance).
 * The data is based on the KB article provided.
 */

const GRIN_NOTES = {
  // Standard Tabs
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>CSRs Cannot Cancel Payments</h4>
      <p>The biller's Customer Service Representatives do not have the ability to cancel payments. Customers must be referred to their financial institution or the customer service number on the back of their card.</p>
      <h4>"Exceeds Maximum Amount" Error</h4>
      <p>If a customer receives the error message "The payment amount exceeds the maximum amount...", it is an issue on the biller's side. This typically happens when the maximum allowed payment amount is set lower than the minimum due amount. The biller must correct this.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>The fee for making a payment is absorbed by the biller. The minimum payment amount is $1.00.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">833-894-0964</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">855-293-3826</span></li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday 8:00 AM to 5:30 PM EST. Spanish is available via option 2. The call center is closed on weekends.</p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through the following channels:</p>
      <ul>
        <li>IVR (Phone)</li>
        <li>ROTP (Online Guest Pay)</li>
        <li>AD (Agent Dashboard)</li>
      </ul>
      <p><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/grin" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/grin</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account & Policy Information</h4>
      <ul>
        <li><strong>Policy #:</strong> 7 numerical digits. Ignore any letters or spaces (e.g., for "PA3", do not include the "3").</li>
        <li><strong>Account #:</strong> 10 numerical digits, including any leading zeros.</li>
        <li><strong>PIN:</strong> 4 digits. The PIN is required for payments and is located on the billing statement.</li>
      </ul>
      <h4>System Details</h4>
      <ul>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Went Live:</strong> March 22, 2024</li>
        <li><strong>Scheduled (Autopay):</strong> No</li>
        <li><strong>Future-Dated Payments:</strong> No</li>
      </ul>
      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Debit/Credit Card:</strong> $25,000</li>
        <li><strong>ACH/Bank Account:</strong> $100,000</li>
      </ul>
    `
  },
  // Custom Tab
  procedures: {
    title: 'Procedures',
    color: 'secondary',
    content: `
      <h4>Agent Dashboard Payments</h4>
      <p>There is no "Payment Type" selection in the Agent Dashboard. Agents should enter the Account or Policy number, and the system will automatically determine the payment type on the next screen.</p>
      <h4>Common Scenarios</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Unsuspend Blocked Payment</strong></td>
              <td>Refer customer back to Grange at 855-293-3826.</td>
            </tr>
            <tr>
              <td><strong>Disputed or Insufficient Funds</strong></td>
              <td>Refer customer to their financial institution or Grange.</td>
            </tr>
            <tr>
              <td><strong>Changing Payment Amount</strong></td>
              <td>The payment amount cannot be changed. Inform the caller of this.</td>
            </tr>
            <tr>
              <td><strong>Non-Payment Questions</strong><br><small>(e.g., coverage, claims, policy info)</small></td>
              <td>Refer customer back to Grange at 855-293-3826.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
};