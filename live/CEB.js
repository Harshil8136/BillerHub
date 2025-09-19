/**
 * NOTES: CEB - Constellation Energy Group
 * =============================================================================
 * Tabs (order): All, Alerts, Fees, Contact, Channels, System
 * Focus: Power vs Gas routing, IVR/CSR segmentation, account formats, hours, CP/ROTP status, invoice entry tips
 */

const CEB_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="banner info" style="margin-bottom:10px;">
        <strong>Routing summary:</strong> Choose <em>Power</em> vs <em>Gas</em> first, then validate account format before payment. Constellation Home Services inquiries should follow KB process (see link) rather than payment flows.
      </div>

      <h4><i class="fa-solid fa-phone"></i> Header Contacts</h4>
      <div class="table-container" style="margin-bottom:10px;">
        <table>
          <thead><tr><th>Segment</th><th>Type</th><th>Number</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Power</td><td>IVR</td><td><span class="copyable-phone">844-309-7088</span></td><td>—</td></tr>
            <tr><td>Power</td><td>CSR (Residential)</td><td><span class="copyable-phone">888-900-7052</span></td><td>Mon–Fri 7:00am–8:00pm ET; Sat 8:00am–5:00pm ET</td></tr>
            <tr><td>Power</td><td>CSR (Business)</td><td><span class="copyable-phone">866-917-8271</span></td><td>Mon–Fri 7:00am–8:00pm ET; Sat 8:00am–5:00pm ET</td></tr>

            <tr><td>Gas</td><td>IVR</td><td><span class="copyable-phone">844-309-7092</span></td><td>—</td></tr>
            <tr><td>Gas</td><td>CSR</td><td><span class="copyable-phone">877-677-4355</span></td><td>Mon–Fri 8:00am–6:00pm ET; Spanish option 2; Sat–Sun Closed</td></tr>
          </tbody>
        </table>
      </div>

      <h4><i class="fa-solid fa-link"></i> Helpful Links</h4>
      <ul>
        <li><strong>Website:</strong> <a href="https://www.constellation.com" target="_blank" rel="noopener">constellation.com</a></li>
        <li><strong>Home Services:</strong> See KB process: <a href="https://kb.paymentus.io/pages/viewpage.action?pageId=64140202" target="_blank" rel="noopener">KB link</a></li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Confirm biller:</strong> Verify the customer is paying Constellation Energy before processing any payment.</li>
        <li><strong>Portal status:</strong> CP is currently non-functioning; passwords cannot be reset at this time.</li>
        <li><strong>Invoice entry tip:</strong> If invoice entry fails, replace hyphens with zeros and retry; IVR may request a statement number.</li>
        <li><strong>Card cap:</strong> Some accounts cannot pay over $10,000 by card—use eCheck or transfer to Constellation CSR if needed.</li>
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
      </div>

      <p>Schedules and ROTP are supported; verify the active channel for exact fee and velocity controls before quoting to customers.</p>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Guidance</th></tr></thead>
          <tbody>
            <tr><td>CP / ROTP</td><td>Debit, Credit, Bank (ACH)</td><td>Check product-specific caps; some accounts capped at $10,000 by card</td></tr>
            <tr><td>IVR</td><td>Debit, Credit, Bank (ACH)</td><td>May prompt for statement number</td></tr>
            <tr><td>AD</td><td>Debit, Credit, Bank (ACH)</td><td>Follow OpCo policies; Paymentus wallets only</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>Power</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">844-309-7088</span></li>
        <li><strong>CSR (Residential):</strong> <span class="copyable-phone">888-900-7052</span> (Mon–Fri 7:00am–8:00pm ET; Sat 8:00am–5:00pm ET)</li>
        <li><strong>CSR (Business):</strong> <span class="copyable-phone">866-917-8271</span> (Mon–Fri 7:00am–8:00pm ET; Sat 8:00am–5:00pm ET)</li>
      </ul>

      <h4>Gas</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">844-309-7092</span></li>
        <li><strong>CSR:</strong> <span class="copyable-phone">877-677-4355</span> (Mon–Fri 8:00am–6:00pm ET; Spanish option 2; Sat–Sun Closed)</li>
      </ul>

      <p><strong>Home Services:</strong> Route by KB at <a href="https://kb.paymentus.io/pages/viewpage.action?pageId=64140202" target="_blank" rel="noopener">KB link</a>.</p>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> CP (web), ROTP (guest), IVR, Agent Dashboard.</li>
        <li><strong>Schedules:</strong> Triggered by Constellation via XOTP; Paymentus manages wallets; no e-bills.</li>
        <li><strong>Guidance:</strong> Confirm segment (Power/Gas) and account format before payment to avoid not-found errors.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Formats</h4>
      <ul>
        <li><strong>Power:</strong> Customer Number (5–6 digits) hyphen (1–5 digits). Examples: <code>954291-46418</code>, <code>20923-1</code>.</li>
        <li><strong>Gas:</strong> Account ID begins with <strong>BG-</strong> or <strong>RG-</strong> + 5 or 6 digits (MUST be uppercase). Examples: <code>BG-100152</code>, <code>RG-23030</code>.</li>
      </ul>

      <h4><i class="fa-solid fa-circle-info"></i> Operational Notes</h4>
      <ul>
        <li><strong>Portal:</strong> CP is non-functioning; password resets unavailable currently.</li>
        <li><strong>Invoice entry:</strong> Replace hyphens with zeros if entry fails; IVR may request statement number.</li>
        <li><strong>Processor:</strong> Braintree; Paymentus wallets only.</li>
      </ul>

      <h4><i class="fa-solid fa-link"></i> Links</h4>
      <ul>
        <li><a href="https://adg-ipn1.paymentus.net/ceb?v2=true&amp;lang=en" target="_blank" rel="noopener">Open CEB AD</a></li>
        <li><a href="https://www.constellation.com" target="_blank" rel="noopener">constellation.com</a></li>
      </ul>
    `
  }
};
