/**
 * NOTES: CFCO - Chesterfield County Utilities (Chesterfield County, VA)
 * =============================================================================
 * Stateless notes using standardized tabs in this exact order:
 * alerts (danger), fees (primary), contact (info), channels (info), system (secondary).
 * Content derived from the CFCO reference and patterned after DNE’s structure.
 */

const CFCO_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>System down notifications:</strong> PaymentusSystemDown@chesterfield.gov (notify when services are unavailable).</li>
        <li><strong>Re‑registration required:</strong> All logins created prior to April 18, 2019 are invalid and must be re‑registered.</li>
        <li><strong>Assist online first:</strong> Support CP/OTP/password reset and guide portal usage before transferring to the biller.</li>
      </ul>
    `
  },

  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <div class="mop-container" style="margin-bottom:12px;">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank (ACH)</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo paypal-credit"></span><span class="mop-label">PayPal Credit</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr><th>Channel</th><th>Methods</th><th>Fee</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>CP, Web, Mobile</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard); Bank (Checking, Savings); Advanced (PayPal, PayPal Credit, Venmo, Amazon Pay)</td>
              <td>Absorbed</td>
            </tr>
            <tr>
              <td>AD, IVR</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard); Bank (Checking, Savings)</td>
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
        <li><strong>IVR:</strong> <span class="copyable-phone">844-449-7664</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone">804-748-1291</span></li>
        <li><strong>Biller Website:</strong> <a href="https://www.chesterfield.gov/236/Utilities" target="_blank" rel="noopener">chesterfield.gov/236/Utilities</a></li>
        <li><strong>Customer Portal (CP):</strong> <a href="https://ipn2.paymentus.com/biller/stde/cfco" target="_blank" rel="noopener">ipn2.paymentus.com/biller/stde/cfco</a></li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> CP, Web, Mobile (Advanced methods available), AD, IVR (card and bank only).</li>
        <li><strong>Advanced methods:</strong> Available on CP/Web/Mobile (PayPal, PayPal Credit, Venmo, Amazon Pay).</li>
        <li><strong>Guidance:</strong> For format issues, verify account entry and leverage portal access before transferring.</li>
      </ul>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Notes</th></tr></thead>
          <tbody>
            <tr>
              <td>CP / Web / Mobile</td>
              <td>Debit, Credit, Bank (ACH), Advanced</td>
              <td>Self‑service, schedules, payment method updates</td>
            </tr>
            <tr>
              <td>AD / IVR</td>
              <td>Debit, Credit, Bank (ACH)</td>
              <td>Advanced methods not used</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Format & Entry</h4>
      <ul>
        <li><strong>Format:</strong> 00011111-1111111</li>
        <li><strong>Entry rule:</strong> Enter exactly as shown on the bill with <em>leading zeros</em> and <em>no spaces</em>.</li>
      </ul>

      <h4><i class="fa-solid fa-sitemap"></i> Environment & Tools</h4>
      <ul>
        <li><strong>Environment:</strong> IPN2 (use the CP link above for guidance and self‑service flows).</li>
        <li><strong>AD Tip:</strong> Reports &gt; Posting file (last 24 hours) helps infer account length/dashes from recent payments.</li>
      </ul>

      <h4><i class="fa-solid fa-user-shield"></i> Training Access</h4>
      <ul>
        <li><strong>Internal/Training Only:</strong> CP demo login — User ID: <code>test@paymentus.com</code>, PW: <code>Customer_1</code> (not for external sharing).</li>
      </ul>
    `
  }
};
