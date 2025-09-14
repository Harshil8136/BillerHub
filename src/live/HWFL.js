/**
 * NOTES: HWFL - City of Hollywood, FL
 * =============================================================================
 * Stateless notes with tabs: All, Alerts, Fees, Contact, Channels, System, Account.
 * Uses payment-logo classes defined in notes.css (visa, mastercard, discover, amex, ach, paypal, paypal-credit, amazon-pay, venmo).
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
      <p><strong>Format:</strong> 6 digits – 6 digits (<code>xxxxxx-xxxxxx</code>)</p>

      <h4><i class="fa-solid fa-credit-card"></i> Payment Summary</h4>
      <div class="mop-container" style="margin: 6px 0 10px;">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank (ACH)</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
      </div>
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
        <li><strong>Emergency Routing:</strong> Use <span class="copyable-phone">954-967-4357</span> on Fridays, weekends, and holidays.</li>
        <li><strong>CSR Hours:</strong> Customer Service is available Mon–Thu 7:00 AM–6:00 PM via <span class="copyable-phone">954-921-3938</span> (Option 5).</li>
      </ul>
    `
  },

  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>Methods by Channel</h4>
      <div class="table-container" style="margin-bottom:10px;">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Fee</th></tr></thead>
          <tbody>
            <tr>
              <td>Web, Mobile, Scheduled</td>
              <td>
                <div class="mop-inline">
                  <span class="payment-logo visa" title="Visa"></span>
                  <span class="payment-logo mastercard" title="Mastercard"></span>
                  <span class="payment-logo amex" title="AMEX"></span>
                  <span class="payment-logo ach" title="Bank (ACH)"></span>
                  <span class="payment-logo paypal" title="PayPal"></span>
                  <span class="payment-logo amazon-pay" title="Amazon Pay"></span>
                </div>
                <div class="mop-text">Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings); Advanced (PayPal, Walmart Pay)</div>
              </td>
              <td><strong>Absorbed</strong></td>
            </tr>
            <tr>
              <td>AD, IVR</td>
              <td>
                <div class="mop-inline">
                  <span class="payment-logo visa" title="Visa"></span>
                  <span class="payment-logo mastercard" title="Mastercard"></span>
                  <span class="payment-logo amex" title="AMEX"></span>
                  <span class="payment-logo ach" title="Bank (ACH)"></span>
                </div>
                <div class="mop-text">Debit (Visa, Mastercard); Credit (Visa, Mastercard, AMEX); Bank (Checking, Savings)</div>
              </td>
              <td>Not specified</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="hint">Logos indicate accepted methods; availability may vary by channel.</p>
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
        <li><strong>Supported:</strong> Web, Mobile, Scheduled, Agent Dashboard (AD), IVR</li>
        <li><strong>Web/Mobile/Scheduled Methods:</strong>
          <span class="payment-logo visa" title="Visa"></span>
          <span class="payment-logo mastercard" title="Mastercard"></span>
          <span class="payment-logo amex" title="AMEX"></span>
          <span class="payment-logo ach" title="Bank (ACH)"></span>
          <span class="payment-logo paypal" title="PayPal"></span>
          <span class="payment-logo amazon-pay" title="Amazon Pay"></span>
        </li>
        <li><strong>AD/IVR Methods:</strong>
          <span class="payment-logo visa" title="Visa"></span>
          <span class="payment-logo mastercard" title="Mastercard"></span>
          <span class="payment-logo amex" title="AMEX"></span>
          <span class="payment-logo ach" title="Bank (ACH)"></span>
        </li>
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
        <li><strong>Tip:</strong> Enter the account number exactly as shown including the hyphen.</li>
      </ul>
    `
  }
};
