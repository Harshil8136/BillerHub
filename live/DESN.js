/**
 * NOTES: DESN - Enbridge Gas NC (formerly Dominion Energy SC & NC / SCANA)
 * =============================================================================
 * Tabs (order): All, Alerts, Fees, Contact, Channels, System
 * Sources: DESN reference (routing, IVR/CSR, hours, account format, links) and DNE.js style for parity.
 */

const DESN_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="banner info" style="margin-bottom:10px;">
        <strong>Routing summary:</strong> North Carolina Gas → DESN; North Carolina Electric → DNE; South Carolina utilities → DESN. 
        Confirm state and whether the customer is Gas vs. Electric before proceeding. 
      </div>

      <h4><i class="fa-solid fa-key"></i> Quick Reference</h4>
      <ul>
        <li><strong>Rebranding:</strong> As of Feb 12, 2025, NC Gas is branded Enbridge Gas North Carolina; payments continue under DESN during descriptor transition.</li>
        <li><strong>CSR hours:</strong> Mon–Fri 7:00am–6:00pm ET; after-hours support for disconnects/emergencies; Sat–Sun closed.</li>
        <li><strong>Account format:</strong> 13 digits (no dashes/spaces).</li>
        <li><strong>Spanish support:</strong> IVR Spanish option 2; NC Gas CSR Spanish option 7.</li>
      </ul>

      <h4><i class="fa-solid fa-phone"></i> Header Contacts</h4>
      <div class="table-container" style="margin-bottom:10px;">
        <table>
          <thead><tr><th>Region</th><th>Type</th><th>Number</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>North Carolina</td><td>IVR</td><td><span class="copyable-phone">800-450-9159</span></td><td>Spanish: option 2</td></tr>
            <tr><td>South Carolina</td><td>IVR</td><td><span class="copyable-phone">800-450-9160</span></td><td>Spanish: option 2</td></tr>
            <tr><td>North Carolina</td><td>CSR (Gas)</td><td><span class="copyable-phone">877-776-2427</span></td><td>Spanish: option 7</td></tr>
            <tr><td>South Carolina</td><td>CSR</td><td><span class="copyable-phone">800-251-7234</span></td><td>—</td></tr>
            <tr><td>North Carolina</td><td>CSR (Electric → DNE)</td><td><span class="copyable-phone">866-366-4357</span></td><td>Route NC Electric to DNE</td></tr>
          </tbody>
        </table>
      </div>

      <h4><i class="fa-solid fa-link"></i> Helpful Links</h4>
      <ul>
        <li><strong>CP:</strong> <a href="https://ipn4.paymentus.com/cp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/cp/desn</a></li>
        <li><strong>ROTP:</strong> <a href="https://ipn4.paymentus.com/rotp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/rotp/desn</a></li>
        <li><strong>AD:</strong> <a href="https://adg-ipn1.paymentus.net/desn?v2=true&amp;lang=en" target="_blank" rel="noopener">Open DESN AD</a></li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Rebranding in progress:</strong> Enbridge Gas NC branding is being rolled out across UI/IVR/email/bank descriptors; continue processing under DESN during transition.</li>
        <li><strong>State/utility verification:</strong> Misrouted NC Electric items must be handled by DNE; verify Gas vs. Electric and NC vs. SC before payment.</li>
        <li><strong>After-hours handling:</strong> CSR supports after-hours calls for disconnects/emergencies; otherwise follow regular hours.</li>
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
      </div>

      <p>Fees and limits vary by state and channel; verify in AD/CP/ROTP before quoting to ensure accuracy.</p>

      <h4>NC Gas (DESN)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Notes</th></tr></thead>
        <tbody>
            <tr><td>CP (guest/registered)</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in CP</td></tr>
            <tr><td>ROTP</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in ROTP</td></tr>
            <tr><td>IVR</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in IVR</td></tr>
            <tr><td>AD</td><td>Debit, Credit, Bank (ACH)</td><td>Agent-assisted; confirm per case</td></tr>
          </tbody>
        </table>
      </div>

      <h4>South Carolina (DESN)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>CP (guest/registered)</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in CP</td></tr>
            <tr><td>ROTP</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in ROTP</td></tr>
            <tr><td>IVR</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee/limit in IVR</td></tr>
            <tr><td>AD</td><td>Debit, Credit, Bank (ACH)</td><td>Agent-assisted; confirm per case</td></tr>
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
        <li><strong>IVR (NC):</strong> <span class="copyable-phone">800-450-9159</span> (Spanish: option 2)</li>
        <li><strong>IVR (SC):</strong> <span class="copyable-phone">800-450-9160</span> (Spanish: option 2)</li>
        <li><strong>CSR (NC Gas):</strong> <span class="copyable-phone">877-776-2427</span> (Spanish: option 7)</li>
        <li><strong>CSR (SC):</strong> <span class="copyable-phone">800-251-7234</span></li>
        <li><strong>CSR Hours:</strong> Mon–Fri 7:00am–6:00pm ET; after-hours for disconnects/emergencies; Sat–Sun closed</li>
        <li><strong>NC Electric (DNE):</strong> <span class="copyable-phone">866-366-4357</span></li>
        <li><strong>CP:</strong> <a href="https://ipn4.paymentus.com/cp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/cp/desn</a></li>
        <li><strong>ROTP:</strong> <a href="https://ipn4.paymentus.com/rotp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/rotp/desn</a></li>
        <li><strong>AD:</strong> <a href="https://adg-ipn1.paymentus.net/desn?v2=true&amp;lang=en" target="_blank" rel="noopener">Open DESN AD</a></li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> CP (guest/registered), ROTP, IVR, AD.</li>
        <li><strong>Scope:</strong> NC Gas and SC utilities via DESN; NC Electric via DNE.</li>
        <li><strong>Guidance:</strong> Confirm state and utility (Gas vs. Electric) prior to processing to avoid misrouting.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Format</h4>
      <ul>
        <li><strong>Pattern:</strong> 13 digits (no dashes/spaces).</li>
      </ul>

      <h4><i class="fa-solid fa-timeline"></i> Operations</h4>
      <ul>
        <li><strong>Rebranding date:</strong> Feb 12, 2025 (Enbridge Gas North Carolina).</li>
        <li><strong>After-hours:</strong> CSR supports disconnect/emergency calls outside standard hours.</li>
      </ul>

      <h4><i class="fa-solid fa-link"></i> Links</h4>
      <ul>
        <li><strong>CP:</strong> <a href="https://ipn4.paymentus.com/cp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/cp/desn</a></li>
        <li><strong>ROTP:</strong> <a href="https://ipn4.paymentus.com/rotp/desn" target="_blank" rel="noopener">ipn4.paymentus.com/rotp/desn</a></li>
        <li><strong>AD:</strong> <a href="https://adg-ipn1.paymentus.net/desn?v2=true&amp;lang=en" target="_blank" rel="noopener">Open DESN AD</a></li>
      </ul>
    `
  }
};
