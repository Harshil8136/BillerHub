/**
 * NOTES: HWFL - City of Hollywood, FL
 * =============================================================================
 * Stateless notes with standardized tabs in this order:
 * All, Alerts, Fees, Contact, Channels, System, Account.
 */

const HWFL_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4><i class="fa-solid fa-phone"></i> Key Numbers</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">855-748-4344</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone">954-921-3938</span> (Option 5; Mon–Thu 7:00 AM–6:00 PM)</li>
        <li><strong>Emergency:</strong> <span class="copyable-phone">954-967-4357</span> (Fridays, weekends, holidays)</li>
      </ul>

      <h4><i class="fa-solid fa-id-card"></i> Account Format</h4>
      <p><strong>Format:</strong> 6 digits – 6 digits shown as <code>xxxxxx-xxxxxx</code></p>

      <h4><i class="fa-solid fa-credit-card"></i> Payment Summary</h4>
      <ul>
        <li><strong>Web/Mobile/Scheduled:</strong> Debit (Visa, Mastercard), Credit (Visa, Mastercard, AMEX), Bank (Checking, Savings), Advanced (PayPal, Walmart Pay) — <strong>fees absorbed</strong></li>
        <li><strong>AD/IVR:</strong> Debit (Visa, Mastercard), Credit (Visa, Mastercard, AMEX), Bank (Checking, Savings)</li>
      </ul>

      <h4><i class="fa-solid fa-building-columns"></i> System</h4>
      <ul>
        <li><strong>CIS:</strong> Munis</li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Emergency Routing:</strong> Use <span class="copyable-phone">954-967-4357</span> for emergencies on Fridays, weekends, and holidays.</li>
        <li><strong>CSR Hours:</strong> General customer service is available Mon–Thu 7:00 AM–6:00 PM via <span class="copyable-phone">954-921-3938</span> (Option 5).</li>
      </ul>
    `
  },

  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Fee</th></tr></thead>
          <tbody>
            <tr>
              <td>Web, Mobile, Scheduled</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings); Advanced (PayPal, Walmart Pay)</td>
              <td><strong>Absorbed</strong></td>
            </tr>
            <tr>
              <td>AD, IVR</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings)</td>
              <td>Not specified</td>
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
        <li><strong>Website:</strong> <a href="http://www.hollywoodfl.org/" target="_blank" rel="noopener">hollywoodfl.org</a></li>
        <li><strong>IVR:</strong> <span class="copyable-phone">855-748-4344</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone">954-921-3938</span> (Option 5; Mon–Thu 7:00 AM–6:00 PM)</li>
        <li><strong>Emergency:</strong> <span class="copyable-phone">954-967-4357</span> (Fridays, weekends, holidays)</li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported Channels:</strong> Web, Mobile, Scheduled, Agent Dashboard (AD), IVR</li>
        <li><strong>Methods (Web/Mobile/Scheduled):</strong> Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings); Advanced (PayPal, Walmart Pay)</li>
        <li><strong>Methods (AD/IVR):</strong> Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings)</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <ul>
        <li><strong>Platform:</strong> IPN1</li>
        <li><strong>CIS:</strong> Munis</li>
        <li><strong>Account Format:</strong> <code>xxxxxx-xxxxxx</code> (6 digits – 6 digits)</li>
      </ul>
    `
  },

  account: {
    title: 'Account',
    color: 'secondary',
    content: `
      <ul>
        <li><strong>Format:</strong> 6 digits – 6 digits (e.g., <code>123456-789123</code>)</li>
        <li><strong>Guidance:</strong> Enter the account number exactly as shown including the hyphen.</li>
      </ul>
    `
  }
};
