/**
 * NOTES: NYCH / NYHC - New York City Housing Authority
 * =============================================================================
 * This file contains the notes for the NYC Housing Authority (NYCHA).
 * It is a composite note handling both Residential (NYCH) and Commercial (NYHC) accounts.
 */

const NYCH_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>Biller Status:</strong> This biller is not currently live for payments.</p>
      <p>For online payments, the letter at the end of the Account Number is <strong>case-sensitive</strong>.</p>
      
      <h4>Fees (Residential)</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Debit Card</strong> (Visa, MC, Discover)</td>
              <td>0.8% of payment amount</td>
            </tr>
            <tr>
              <td><strong>Credit Card</strong> (Visa, MC, Discover, AMEX)</td>
              <td>2.25% of payment amount</td>
            </tr>
            <tr>
              <td><strong>Bank Account</strong> (Checking, Savings)</td>
              <td>Absorbed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Fees for Commercial (NYHC) accounts are not specified in the documentation.</p>
      
      <h4>Contact</h4>
      <p>For all public housing and Section 8 inquiries, use the main Customer Contact Center number.</p>
      <ul>
        <li><strong>Customer Contact Center (CCC):</strong> <span class="copyable-phone" data-copy-label="CCC Number">718-707-7771</span></li>
      </ul>
      <p>For inquiries in a specific neighborhood, use the local Borough Management Office numbers:</p>
      <ul>
        <li><strong>Bronx:</strong> <span class="copyable-phone" data-copy-label="Bronx Office">718-409-8626</span></li>
        <li><strong>Brooklyn:</strong> <span class="copyable-phone" data-copy-label="Brooklyn Office">718-491-6967</span></li>
        <li><strong>Manhattan:</strong> <span class="copyable-phone" data-copy-label="Manhattan Office">917-206-3500</span></li>
        <li><strong>Queens/Staten Island:</strong> <span class="copyable-phone" data-copy-label="Queens/SI Office">718-553-4700</span></li>
      </ul>

      <h4>System</h4>
      <p>The account number is 9 digits long. Autopay, Future-Dated Payments, and E-Bill are all supported.</p>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Biller Status</h4>
      <p>This biller is <strong>not currently live</strong> for taking payments.</p>
      <h4>Case-Sensitive Account Number</h4>
      <p>When assisting a customer paying online, please advise them that the letter at the end of their Tenant Account Number is <strong>case-sensitive</strong>.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>Fees are applied based on the payment type for <strong>Residential (NYCH)</strong> accounts.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Payment Method</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Debit Card</strong> (Visa, MC, Discover)</td>
              <td>0.8% of payment amount</td>
            </tr>
            <tr>
              <td><strong>Credit Card</strong> (Visa, MC, Discover, AMEX)</td>
              <td>2.25% of payment amount</td>
            </tr>
            <tr>
              <td><strong>Bank Account</strong> (Checking, Savings)</td>
              <td>Absorbed</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Note: The fee structure for Commercial (NYHC) accounts is not specified in the documentation.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <p>For all public housing and Section 8 inquiries, use the main Customer Contact Center number.</p>
      <ul>
        <li><strong>Customer Contact Center (CCC):</strong> <span class="copyable-phone" data-copy-label="CCC Number">718-707-7771</span></li>
      </ul>
      <h4>Borough Management Offices</h4>
      <p>For inquiries related to a specific neighborhood, residents can contact their local office:</p>
      <ul>
        <li><strong>Bronx:</strong> <span class="copyable-phone" data-copy-label="Bronx Office">718-409-8626</span></li>
        <li><strong>Brooklyn:</strong> <span class="copyable-phone" data-copy-label="Brooklyn Office">718-491-6967</span></li>
        <li><strong>Manhattan:</strong> <span class="copyable-phone" data-copy-label="Manhattan Office">917-206-3500</span></li>
        <li><strong>Queens/Staten Island:</strong> <span class="copyable-phone" data-copy-label="Queens/SI Office">718-553-4700</span></li>
      </ul>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>9 digits</strong> long. For the Residential IVR, customers will also need their <strong>Tenant ID</strong> and their full <strong>Tenant Account Number</strong> (which includes a letter at the end).</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Go-Live Date:</strong> June 29th, 2024</li>
        <li><strong>Processor:</strong> Chase Paymentech</li>
        <li><strong>Scheduled (Autopay) Payments:</strong> Yes</li>
        <li><strong>Future-Dated Payments:</strong> Yes</li>
        <li><strong>E-Bill:</strong> Yes</li>
      </ul>
    `
  },
  services: {
    nych_residential: {
      name: 'NYCH - Residential Payments',
      content: `
        <h4>Contact & Links</h4>
        <ul>
          <li><strong>Residential IVR:</strong> <span class="copyable-phone" data-copy-label="Residential IVR">833-894-0899</span></li>
          <li><strong>Online Payments:</strong> <a href="http://on.nyc.gov/onlinerentpayment" target="_blank" rel="noopener noreferrer">on.nyc.gov/onlinerentpayment</a></li>
        </ul>
        <h4>Residential IVR Payment Guide</h4>
        <p>Customers must wait for the prompt to finish before entering information. The process requires both the Tenant ID and the full Tenant Account Number (e.g., 12345678D).</p>
        <ol>
          <li>Enter the <strong>Tenant ID</strong>, followed by #.</li>
          <li>System repeats the ID. Press 1 to confirm.</li>
          <li>Enter the <strong>numeric part</strong> of the Tenant Account Number, followed by #.</li>
          <li>Enter the number on the keypad corresponding to the <strong>alpha character</strong> of the Tenant Account Number.</li>
          <li>The system will offer choices to confirm the letter. For example, if the letter is 'D', the customer would have pressed '3'. The system will say "For the letter D press 1". The customer must press 1 to confirm 'D'.</li>
          <li>Press # to finish.</li>
          <li>System repeats the full account info. Press 1 to confirm and proceed with payment.</li>
        </ol>
      `
    },
    nyhc_commercial: {
      name: 'NYHC - Commercial Payments',
      content: `
        <h4>Contact & Links</h4>
        <ul>
          <li><strong>Commercial IVR:</strong> <span class="copyable-phone" data-copy-label="Commercial IVR">833-894-0971</span></li>
          <li><strong>Online Payments:</strong> <a href="http://on.nyc.gov/commercialrentpayment" target="_blank" rel="noopener noreferrer">on.nyc.gov/commercialrentpayment</a></li>
        </ul>
        <p>The payment process for commercial accounts is more straightforward and does not require the complex multi-step verification of the residential IVR.</p>
      `
    }
  }
};