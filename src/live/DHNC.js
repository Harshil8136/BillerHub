/**
 * NOTES: DHNC - Durham, NC (Primary: Utility Bill)
 * =============================================================================
 * Structure: Stateless notes with standardized tabs in this order (after an All tab):
 * All, Alerts, Fees, Contact, Channels, System, Directory.
 *
 * Highlights:
 * - Place password reset guidance first (All) due to high call volume.
 * - Use standardized tab order and green Fees tab.
 * - Include a multi-service Directory tab listing all Durham TLAs with AD links.
 */

const DHNC_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="rebranding-note">
        <strong>Durham, NC – Utility Bill – TLA: DHNC.</strong> This biller has multiple services under different TLAs; see the <em>Directory</em> tab for links and routing notes. 
      </div>

      <h4><i class="fa-solid fa-key"></i> Password Reset – Start Here</h4>
      <ul>
        <li><strong>Most common request:</strong> Password reset for DHNC portal/AD.</li>
        <li><strong>Password rules (CP/AD):</strong> Minimum 8 characters, must include at least one number and letter, and one uppercase letter (example: <code>Help1234</code>).</li>
        <li><strong>Training credential note:</strong> Test profile password currently <code>Demo2009</code> (internal/training only; do not share externally).</li>
      </ul>

      <h4><i class="fa-solid fa-id-card"></i> Account Entry (Utilities – DHNC)</h4>
      <ul>
        <li><strong>Format:</strong> 13 characters total, pattern <code>######-######</code> (6 digits – dash – 6 digits).</li>
        <li><strong>Guidance:</strong> If format issues occur, verify digits and dash placement; use AD “Reports &gt; Posting file” to infer recent valid formats.</li>
      </ul>

      <h4><i class="fa-solid fa-circle-info"></i> Operations</h4>
      <ul>
        <li><strong>CIF first, then RT:</strong> CIF structure initially; transitions to real-time (RT) via Munis.</li>
        <li><strong>Posting file delivery:</strong> Via SFTP shortly after cutoff at 8:00 PM EST (same day).</li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Custom passwords:</strong> Enforce portal/AD password rules (min 8, include number, letter, and uppercase).</li>
        <li><strong>Multi-service biller:</strong> Multiple TLAs are active; confirm the correct service and route via Directory.</li>
        <li><strong>No IVR:</strong> DHNS, DHNB, and DUCT do not have IVR; use online channels and CSR where applicable.</li>
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

      <h4>DHNC (Utilities – Primary)</h4>
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

      <h4>Other Durham TLAs (DHNM, DHCC, DHDS, DHBP, DHNS, DHNB)</h4>
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
        <li><strong>Website:</strong> <a href="https://durhamnc.gov/" target="_blank" rel="noopener">durhamnc.gov</a></li>
        <li><strong>DHNC IVR (Utilities):</strong> <span class="copyable-phone">844-592-4918</span></li>
        <li><strong>Shared IVR (most other TLAs):</strong> <span class="copyable-phone">844-592-4920</span> (No IVR for DHNS, DHNB, DUCT)</li>
        <li><strong>CSR (most TLAs):</strong> <span class="copyable-phone">919-560-1200</span></li>
        <li><strong>CSR (DUCT):</strong> <span class="copyable-phone">919-560-0430</span></li>
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
        <li><strong>DHNS (Fire Flow):</strong> ROTP only (no IVR).</li>
        <li><strong>DHNB (Building Inspections):</strong> CP, OTP, ROTP, Autopay (no IVR).</li>
        <li><strong>DUCT (Government):</strong> Online only; no IVR.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Format (Utilities – DHNC)</h4>
      <ul>
        <li><strong>Pattern:</strong> <code>######-######</code> (13 characters including the dash).</li>
        <li><strong>Entry:</strong> Ensure 6 digits, dash, 6 digits; validate against examples from AD posting reports when needed.</li>
      </ul>

      <h4><i class="fa-solid fa-sitemap"></i> Billing Architecture</h4>
      <ul>
        <li><strong>Onboarding path:</strong> CIF structure to start; transitioning to RT (via Munis).</li>
        <li><strong>Posting file:</strong> Delivered via SFTP shortly after the 8:00 PM EST cutoff.</li>
      </ul>

      <h4><i class="fa-solid fa-link"></i> AD Link Formula (Agent use)</h4>
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
          <thead>
            <tr><th>TLA</th><th>Use For</th><th>AD Link</th><th>IVR</th><th>CSR</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>DHNC</strong></td>
              <td>Utility Bill</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhnc?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>844-592-4918</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHNM</strong></td>
              <td>Miscellaneous Payment</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhnm?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>844-592-4920</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHCC</strong></td>
              <td>Cross Connections (City Services)</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhcc?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>844-592-4920</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHDS</strong></td>
              <td>Development Services</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhds?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>844-592-4920</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHBP</strong></td>
              <td>Building Permit</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhbp?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>844-592-4920</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHNS</strong></td>
              <td>Fire Flow</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhns?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>No IVR</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DHNB</strong></td>
              <td>Building Inspections</td>
              <td><a href="https://adg-ipn1.paymentus.net/dhnb?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>No IVR</td>
              <td>919-560-1200</td>
            </tr>
            <tr>
              <td><strong>DUCT</strong></td>
              <td>Government</td>
              <td><a href="https://adg-ipn1.paymentus.net/duct?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></td>
              <td>No IVR</td>
              <td>919-560-0430</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="note">Directory is for quick routing; verify service selection and fees in the respective sections.</p>
    `
  }
};
