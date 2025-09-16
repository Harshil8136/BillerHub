/**
 * NOTES: DNE - Dominion Energy (Dominion Resources Inc)
 * =============================================================================
 * Structure: Stateless notes with standardized tabs in this order:
 * All, Alerts, Fees, Contact, Channels, System, Programs.
 * - Header phones inside All: IVR (with tooltips) and Internal Transfers (red).
 * - Region tables for OH and VA/NC, plus Programs table for RKEG/DGIN/FTHD/SCLM.
 */

const DNE_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="rebranding-note">
        <strong>Rebranding:</strong> Ohio Gas is now <em>Enbridge Gas OH</em> but remains under TLA DNE during transition; UI/IVR/email/bank descriptors updated while payments continue under DNE until late 2025/early 2026. <strong>AutoPay</strong> is ACH-only and must be managed via the portal; re-authorization for prior bank drafts cannot be completed by phone. <strong>No live agent payments</strong> by Paymentus or DNE CSRs. <strong>No cancellations</strong>; advise customers to contact their financial institution to cancel/dispute. <strong>No password resets</strong> handled by Paymentus. 
      </div>

      <h4><i class="fa-solid fa-id-card"></i> Account Formats</h4>
      <ul>
        <li><strong>MRP (Misc.):</strong> 9 digits</li>
        <li><strong>Electric:</strong> 10 digits</li>
        <li><strong>Ohio Gas:</strong> 13 digits</li>
      </ul>

      <h4><i class="fa-solid fa-scale-balanced"></i> Snapshot: Fees & Limits</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Region</th><th>Customer</th><th>Method</th><th>Fee</th><th>Max</th><th>Velocity</th></tr></thead>
          <tbody>
            <tr><td><strong>OH</strong></td><td>Residential</td><td>Card</td><td>$1.65</td><td>$1,000</td><td>5 in 3 days; 10 in 30 days</td></tr>
            <tr><td><strong>OH</strong></td><td>Non-Residential</td><td>Card</td><td>$14.95</td><td>$15,000</td><td>Max 5 in 3 days; Max 10 in 30 days</td></tr>
            <tr><td><strong>VA/NC</strong></td><td>Residential</td><td>Card</td><td>$1.65</td><td>$1,000</td><td>5 in 3 days; 10 in 30 days</td></tr>
            <tr><td><strong>VA/NC</strong></td><td>Non-Residential</td><td>Card</td><td>$14.95</td><td>$15,000</td><td>Max 5 in 3 days; Max 10 in 30 days</td></tr>
            <tr><td><strong>All (Registered CP)</strong></td><td>—</td><td>ACH</td><td>Absorbed</td><td>Lesser of 5× bill or $5,000</td><td>Per biller controls</td></tr>
          </tbody>
        </table>
      </div>

      <h4><i class="fa-solid fa-list-check"></i> Critical Policies</h4>
      <ul>
        <li><strong>No cancellations:</strong> Not allowed by DNE, including management; direct customers to their bank for cancellation/dispute.</li>
        <li><strong>Channels:</strong> IVR and web (ROTP/CP) only; no live payments by CSRs.</li>
        <li><strong>Velocity:</strong> When limit is reached, IVR prompts customer to choose a different MOP or press <strong>#</strong> to end call.</li>
        <li><strong>Cutoff:</strong> System cutoff 5:00 PM EST.</li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>No cancellations:</strong> DNE does not allow payment cancellations; advise customers to contact their financial institution.</li>
        <li><strong>CSRs cannot take payments:</strong> Only IVR and the DNE website are supported.</li>
        <li><strong>No password resets:</strong> Paymentus does not assist with DNE portal password resets.</li>
        <li><strong>AutoPay:</strong> ACH-only via portal; re-authorization of bank draft cannot be completed by phone.</li>
        <li><strong>Routing:</strong> NC Electric via DNE; NC/SC Utility payments via DESN; WV Gas now Hope Gas; Questar limited to MRP under DNE.</li>
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
      </div>

      <h4>Ohio (Enbridge Gas OH under DNE)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Customer</th><th>Channel</th><th>Methods</th><th>Fee</th><th>Max</th><th>Velocity</th></tr></thead>
          <tbody>
            <tr>
              <td>Residential</td>
              <td>Guest Web / IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); ACH; Advanced (PayPal, PayPal Credit, Amazon Pay)</td>
              <td>$1.65</td><td>$1,000</td><td>5 in 3 days; 10 in 30 days</td>
            </tr>
            <tr>
              <td>Non-Residential</td>
              <td>Guest Web / IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); ACH; Advanced (online)</td>
              <td>$14.95</td><td>$15,000</td><td>Max 5 in 3 days; Max 10 in 30 days</td>
            </tr>
            <tr>
              <td>Registered CP</td>
              <td>One-time / Future-dated / Recurring</td>
              <td>ACH (saved account)</td>
              <td>Absorbed</td><td>Lesser of 5× bill or $5,000</td><td>Per biller controls</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Virginia & North Carolina (NC gas only)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Customer</th><th>Channel</th><th>Methods</th><th>Fee</th><th>Max</th><th>Velocity</th></tr></thead>
          <tbody>
            <tr>
              <td>Residential</td>
              <td>Guest Web / IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); ACH; Advanced (PayPal, PayPal Credit, Amazon Pay)</td>
              <td>$1.65</td><td>$1,000</td><td>5 in 3 days; 10 in 30 days</td>
            </tr>
            <tr>
              <td>Non-Residential</td>
              <td>Guest Web / IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); ACH; Advanced (online)</td>
              <td>$14.95</td><td>$15,000</td><td>Max 5 in 3 days; Max 10 in 30 days</td>
            </tr>
            <tr>
              <td>Registered CP</td>
              <td>One-time / Future-dated / Recurring</td>
              <td>ACH (saved account)</td>
              <td>Absorbed</td><td>Lesser of 5× bill or $5,000</td><td>Per biller controls</td>
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
        <li><strong>Website:</strong> <a href="https://www.dominionenergy.com/" target="_blank" rel="noopener">dominionenergy.com</a></li>
        <li><strong>Enbridge Gas OH:</strong> <a href="https://www.enbridgegas.com/ohio" target="_blank" rel="noopener">enbridgegas.com/ohio</a></li>
        <li><strong>Hours (VA/NC):</strong> 8:00 AM – 5:00 PM, Monday–Friday</li>
        <li><strong>Hours (OH):</strong> 7:00 AM – 7:00 PM, Monday–Friday</li>
      </ul>
      <p><em>NC Electric handled by DNE; NC/SC Utility payments handled under DESN; WV Gas now Hope Gas.</em></p>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> IVR, Web (ROTP/CP). <em>No live agent payments.</em></li>
        <li><strong>Customer Portal (CP – AutoPay):</strong> <a href="https://ipn2.paymentus.com/cp/dne" target="_blank" rel="noopener">ipn2.paymentus.com/cp/dne</a></li>
        <li><strong>ROTP:</strong> Navigate via dominionenergy.com &gt; Billing &gt; Select State to reach OTP/Guest Pay.</li>
        <li><strong>AutoPay IVR (VA/NC):</strong> <span class="copyable-phone">833-648-0174</span> (option 2)</li>
        <li><strong>AutoPay IVR (OH):</strong> <span class="copyable-phone">833-648-0176</span></li>
        <li><strong>IVR Branching:</strong> Press <strong>1</strong> for Residential, <strong>2</strong> for Non‑Residential.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <ul>
        <li><strong>Go Live:</strong> April 18, 2021</li>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>System Cutoff:</strong> 5:00 PM EST</li>
        <li><strong>Velocity Handling:</strong> When limits reached, IVR prompts for different MOP or <strong>#</strong> to end the call.</li>
        <li><strong>State Routing:</strong> DESN for NC/SC utilities; WV Gas transitioned to Hope Gas; Questar sale to Enbridge — MRP remains under DNE.</li>
      </ul>

      <h4>Case Subjects (Salesforce)</h4>
      <ul>
        <li>IVR Assistance</li>
        <li>Payment request</li>
        <li>Payment request from CS</li>
        <li>Cancellation request</li>
        <li>Cancellation request from CS</li>
      </ul>
    `
  },

  programs: {
    title: 'Programs',
    color: 'info',
    content: `
      <div class="table-container">
        <table>
          <thead><tr><th>TLA</th><th>Program</th><th>Channel</th><th>Methods</th><th>Fee</th><th>Max</th></tr></thead>
          <tbody>
            <tr><td>RKEG</td><td>Roanoke & Gaston Lake (License/Permit)</td><td>ROTP</td><td>Checking, Debit, Credit</td><td>Absorbed</td><td>$100,000</td></tr>
            <tr><td>DGIN</td><td>DG Interconnection (Init/Study/Estimates/Final)</td><td>XOTP</td><td>Checking</td><td>Absorbed</td><td>$1,000,000</td></tr>
            <tr><td>FTHD</td><td>Fort Hood (Connection Charge)</td><td>ROTP</td><td>Debit, Credit</td><td>Absorbed</td><td>$50,000</td></tr>
            <tr><td>SCLM</td><td>South Lake Management (Application Fee)</td><td>XOTP</td><td>Checking, Debit, Credit</td><td>Absorbed</td><td>$1,500</td></tr>
          </tbody>
        </table>
      </div>
      <p><em>SC Utility via DESN supports active accounts (not new-account deposits) per source constraints.</em></p>
    `
  }
};