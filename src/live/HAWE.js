/**
 * NOTES: HAWE - Hawaiian Electric Company, Inc.
 * =============================================================================
 * This file contains the notes for Hawaiian Electric Company, Inc.
 * The data is based on the KB article provided.
 */

const HAWE_NOTES = {
  // Standard Tabs
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Time Zone Difference</h4>
      <p>Please note for customer callbacks that <strong>Hawai'i is 6 hours behind Eastern Time.</strong> For example, if it is 12:00 PM EST in the call center, it is 6:00 AM in Hawai'i.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>Payment fees vary by customer type. As of December 1, 2023, the fee for residential customers is <strong>$3.25</strong>.</p>
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
              <td>$3.25</td>
            </tr>
            <tr>
              <td><strong>Commercial</strong></td>
              <td>$45.00</td>
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
      <p>The main IVR is available for all regions. For direct customer service, provide the customer with the number for their specific island or region.</p>
      <ul>
        <li><strong>IVR (All Islands):</strong> <span class="copyable-phone" data-copy-label="IVR Number">888-826-5006</span></li>
      </ul>
      <h4>Customer Service by Region</h4>
      <ul>
        <li><strong>Oahu:</strong> <span class="copyable-phone" data-copy-label="Oahu CSR">808-548-7311</span></li>
        <li><strong>Maui:</strong> <span class="copyable-phone" data-copy-label="Maui CSR">808-871-9777</span></li>
        <li><strong>Moloka'i & Lana'i:</strong> <span class="copyable-phone" data-copy-label="Moloka'i & Lana'i CSR">877-871-8461</span></li>
        <li><strong>Hilo:</strong> <span class="copyable-phone" data-copy-label="Hilo CSR">808-969-6999</span></li>
        <li><strong>Kona:</strong> <span class="copyable-phone" data-copy-label="Kona CSR">808-329-3584</span></li>
        <li><strong>Waimea:</strong> <span class="copyable-phone" data-copy-label="Waimea CSR">808-885-4605</span></li>
      </ul>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through Web, Mobile, IVR, and the Agent Dashboard.</p>
      <ul>
        <li><strong>Web/Mobile (ROTP):</strong> <a href="https://ipn.paymentus.com/rotp/hawe" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/hawe</a></li>
        <li><strong>Agent Dashboard (AD):</strong> <a href="https://ipn.paymentus.com/biller/stde/hawe?v2=true" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/biller/stde/hawe</a></li>
      </ul>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>12 digits</strong> long with no letters or special characters.</p>
      <h4>Payment Methods</h4>
      <p>All standard payment methods are accepted:</p>
      <ul>
        <li><strong>Debit/Credit:</strong> Visa, Mastercard, Discover, AMEX</li>
        <li><strong>Bank:</strong> Checking, Savings</li>
        <li><strong>Advanced:</strong> PayPal, PayPal Credit, Venmo</li>
      </ul>
      <h4>System Details</h4>
      <ul>
        <li><strong>Go-Live Date:</strong> August 25, 2021</li>
        <li><strong>Scheduled Payments (Autopay):</strong> No</li>
        <li><strong>E-Bill:</strong> No</li>
      </ul>
    `
  },
  // Custom Tab
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <h4>Maximum Payment Amount</h4>
      <p>The maximum amount allowed per transaction varies by customer type.</p>
      <ul>
        <li><strong>Residential:</strong> $500.00</li>
        <li><strong>Commercial:</strong> $2,500.00</li>
      </ul>
      <h4>Payment Velocity Rules</h4>
      <p>The following limits are in place for the number of payments:</p>
      <ul>
        <li><strong>Maximum in 1 day:</strong> 5 payments</li>
        <li><strong>Maximum in 30 days:</strong> 10 payments</li>
      </ul>
    `
  }
};