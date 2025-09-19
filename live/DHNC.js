/**
 * NOTES: DHNC - Durham, NC (Primary: Utility Bill)
 * =============================================================================
 * Tabs (order): All, Alerts, Fees, Contact, Channels, System, Directory
 * - All: Password reset first workflow and quick account guidance
 * - Fees: Green tab; absorbed for DHNC vs. surcharge/flat for other TLAs
 * - Directory: Single-table overview for all Durham services (one-card model)
 */

const DHNC_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="rebranding-note">
        <strong>Durham, NC — Single card:</strong> This entry consolidates all Durham services; open the <em>Directory</em> tab for other TLAs and one‑click AD links. 
      </div>

      <h4><i class="fa-solid fa-key"></i> Password Reset — Start Here</h4>
      <ul>
        <li><strong>Most common request:</strong> Portal/AD password reset support.</li>
        <li><strong>Password rules (CP/AD):</strong> Minimum 8 characters, include at least one number, one letter, and one uppercase letter (example: <code>Help1234</code>).</li>
        <li><strong>Training note:</strong> Test profile password currently <code>Demo2009</code> (internal only; do not share externally).</li>
      </ul>

      <h4><i class="fa-solid fa-id-card"></i> Account Entry (Utilities – DHNC)</h4>
      <ul>
        <li><strong>Format:</strong> <code>######-######</code> (6 digits – dash – 6 digits; total 13 including the dash).</li>
        <li><strong>Tip:</strong> If format issues occur, verify digits and dash placement; use AD “Reports &gt; Posting file” to see recent valid entries.</li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Consolidated routing:</strong> Multiple Durham services exist; confirm service, then use the <em>Directory</em> tab to open the correct AD.</li>
        <li><strong>Password rules:</strong> Enforce the AD/portal requirement (min 8, number, letter, uppercase) to reduce failed resets.</li>
        <li><strong>IVR gaps:</strong> DHNS, DHNB, and DUCT have no IVR; route to online channels or CSR as listed.</li>
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
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank (ACH)</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo paypal-credit"></span><span class="mop-label">PayPal Credit</span></div>
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
        <div class="mop-item"><span class="payment-logo walmart-pay"></span><span class="mop-label">Walmart Pay</span></div>
      </div>

      <h4>DHNC (Utilities — Primary)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Fee</th></tr></thead>
          <tbody>
            <tr>
              <td>ROTP, OTP, CP, Autopay</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); Bank (Checking, Savings); Advanced (PayPal, PayPal Credit, Amazon Pay, Walmart Pay, Venmo)</td>
              <td>Absorbed</td>
            </tr>
            <tr>
              <td>IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); Bank (Checking, Savings)</td>
              <td>Absorbed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Other Durham Services (Summary)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Channels</th><th>Methods</th><th>Fee</th></tr></thead>
          <tbody>
            <tr>
              <td>CP, OTP, ROTP, Autopay, IVR (where available)</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX)</td>
              <td>3.30% of payment amount</td>
            </tr>
            <tr>
              <td>CP, OTP, ROTP, Autopay</td>
              <td>Bank (Checking, Savings)</td>
              <td>$0.50 flat</td>
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
        <li><strong>IVR (Utilities):</strong> <span class="copyable-phone">844-592-4918</span></li>
        <li><strong>IVR (Other services):</strong> <span class="copyable-phone">844-592-4920</span> (no IVR for DHNS, DHNB, DUCT)</li>
        <li><strong>CSR (most services):</strong> <span class="copyable-phone">919-560-1200</span></li>
        <li><strong>CSR (DUCT):</strong> <span class="copyable-phone">919-560-0430</span></li>
        <li><strong>Website:</strong> <a href="https://durhamnc.gov/" target="_blank" rel="noopener">durhamnc.gov</a></li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>DHNC (Utilities):</strong> ROTP, OTP, CP, Autopay, IVR.</li>
        <li><strong>DHNM / DHCC / DHDS / DHBP:</strong> CP, OTP, ROTP, Autopay, IVR.</li>
        <li><strong>DHNS:</strong> ROTP only (no IVR).</li>
        <li><strong>DHNB:</strong> CP, OTP, ROTP, Autopay (no IVR).</li>
        <li><strong>DUCT:</strong> Online only; no IVR.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Format (Utilities — DHNC)</h4>
      <ul>
        <li><strong>Pattern:</strong> <code>######-######</code> (13 characters including the dash).</li>
        <li><strong>Entry:</strong> 6 digits, dash, 6 digits; confirm against examples in AD posting reports if unsure.</li>
      </ul>

      <h4><i class="fa-solid fa-link"></i> AD Link Formula</h4>
      <ul>
        <li><strong>Pattern:</strong> <code>https://adg-ipn1.paymentus.net/[TLA]?v2=true&amp;lang=en</code> (replace <code>[TLA]</code> with DHNC, DHNM, DHCC, DHDS, DHBP, DHNS, DHNB, or DUCT).</li>
      </ul>
    `
  },

  directory: {
    title: 'Directory',
    color: 'info',
    content: `
      <div class="table-container">
        <table>
          <thead><tr><th>TLA</th><th>Use For</th><th>AD Link</th><th>IVR</th><th>CSR</th></tr></thead>
          <tbody>
            <tr><td><strong>DHNC</strong></td><td>Utility Bill</td><td><a href="https://adg-ipn1.paymentus.net/dhnc?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>844-592-4918</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHNM</strong></td><td>Miscellaneous Payment</td><td><a href="https://adg-ipn1.paymentus.net/dhnm?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>844-592-4920</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHCC</strong></td><td>Cross Connections (City Services)</td><td><a href="https://adg-ipn1.paymentus.net/dhcc?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>844-592-4920</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHDS</strong></td><td>Development Services</td><td><a href="https://adg-ipn1.paymentus.net/dhds?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>844-592-4920</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHBP</strong></td><td>Building Permit</td><td><a href="https://adg-ipn1.paymentus.net/dhbp?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>844-592-4920</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHNS</strong></td><td>Fire Flow</td><td><a href="https://adg-ipn1.paymentus.net/dhns?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>No IVR</td><td>919-560-1200</td></tr>
            <tr><td><strong>DHNB</strong></td><td>Building Inspections</td><td><a href="https://adg-ipn1.paymentus.net/dhnb?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>No IVR</td><td>919-560-1200</td></tr>
            <tr><td><strong>DUCT</strong></td><td>Government</td><td><a href="https://adg-ipn1.paymentus.net/duct?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td><td>No IVR</td><td>919-560-0430</td></tr>
          </tbody>
        </table>
      </div>
      <p class="note">Directory is for quick routing; verify service selection and fees in the respective sections.</p>
    `
  }
};
