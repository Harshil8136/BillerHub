/**
 * NOTES: PHI - Pepco Holdings Inc. (an Exelon Company)
 * =============================================================================
 * Tabs (order): All, Alerts, Fees, Contact, Channels, System
 * Focus: OpCo routing (ACE/DPL/Pepco), IVR/CSR lines, hours, emergency, account format, official links
 */

const PHI_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="banner info" style="margin-bottom:10px;">
        <strong>OpCos:</strong> Atlantic City Electric (ACE – NJ), Delmarva Power & Light (DPL – DE/MD), and Pepco (DC/MD); verify the correct OpCo and state before proceeding. 
      </div>

      <h4><i class="fa-solid fa-phone"></i> Header Contacts</h4>
      <div class="table-container" style="margin-bottom:10px;">
        <table>
          <thead><tr><th>OpCo</th><th>Type</th><th>Number</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>ACE</td><td>IVR</td><td><span class="copyable-phone">1-833-209-5484</span></td><td>State selection prompts; Spanish available</td></tr>
            <tr><td>ACE</td><td>CSR</td><td><span class="copyable-phone">1-800-642-3780</span></td><td>Menu option 3 (starts in English)</td></tr>

            <tr><td>DPL</td><td>IVR</td><td><span class="copyable-phone">1-833-209-5486</span></td><td>State selection prompts; Spanish available</td></tr>
            <tr><td>DPL</td><td>CSR</td><td><span class="copyable-phone">1-800-375-7117</span></td><td>DE=Option 1, MD=Option 2; then option 4 (starts in English)</td></tr>

            <tr><td>Pepco</td><td>IVR</td><td><span class="copyable-phone">1-833-209-8415</span></td><td>State selection prompts; Spanish available</td></tr>
            <tr><td>Pepco</td><td>CSR</td><td><span class="copyable-phone">202-833-7500</span></td><td>DC=Option 1, MD=Option 2; then option 3 (starts in English)</td></tr>

            <tr><td>All OpCos</td><td>Emergency</td><td><span class="copyable-phone">1-877-737-2662</span></td><td>24/7 emergency line</td></tr>
          </tbody>
        </table>
      </div>

      <h4><i class="fa-solid fa-link"></i> Helpful Links</h4>
      <ul>
        <li><strong>ACE:</strong> <a href="https://www.atlanticcityelectric.com" target="_blank" rel="noopener">atlanticcityelectric.com</a></li>
        <li><strong>DPL:</strong> <a href="https://www.delmarva.com" target="_blank" rel="noopener">delmarva.com</a></li>
        <li><strong>Pepco:</strong> <a href="https://www.pepco.com" target="_blank" rel="noopener">pepco.com</a></li>
      </ul>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>CSR hours:</strong> Mon–Fri 7:00am–8:00pm ET; use the 24/7 emergency line for outage or hazard conditions when appropriate.</li>
        <li><strong>Language:</strong> IVR flows include Spanish options; CSR lines start in English with Spanish selection in menus as noted per OpCo.</li>
        <li><strong>OpCo verification:</strong> Confirm ACE vs. DPL vs. Pepco and the customer’s state before quoting any instructions or numbers.</li>
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

      <p>Fees and limits can vary by OpCo, channel, and customer segment; confirm current fee and velocity settings in the active channel flow before quoting.</p>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Guidance</th></tr></thead>
          <tbody>
            <tr><td>IVR</td><td>Debit, Credit, Bank (ACH)</td><td>Follow menu prompts; confirm OpCo and state</td></tr>
            <tr><td>CP / ROTP</td><td>Debit, Credit, Bank (ACH)</td><td>Verify fees/limits at time of payment</td></tr>
            <tr><td>AD (Agent)</td><td>Debit, Credit, Bank (ACH)</td><td>Use AD policies per OpCo</td></tr>
          </tbody>
        </table>
      </div>
    `
  },

  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <h4>Atlantic City Electric (ACE)</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">1-833-209-5484</span> (state prompts; Spanish available)</li>
        <li><strong>CSR:</strong> <span class="copyable-phone">1-800-642-3780</span> (option 3)</li>
        <li><strong>Website:</strong> <a href="https://www.atlanticcityelectric.com" target="_blank" rel="noopener">atlanticcityelectric.com</a></li>
      </ul>

      <h4>Delmarva Power & Light (DPL)</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">1-833-209-5486</span> (state prompts; Spanish available)</li>
        <li><strong>CSR:</strong> <span class="copyable-phone">1-800-375-7117</span> (DE=1, MD=2; then option 4)</li>
        <li><strong>Website:</strong> <a href="https://www.delmarva.com" target="_blank" rel="noopener">delmarva.com</a></li>
      </ul>

      <h4>Pepco</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">1-833-209-8415</span> (state prompts; Spanish available)</li>
        <li><strong>CSR:</strong> <span class="copyable-phone">202-833-7500</span> (DC=1, MD=2; then option 3)</li>
        <li><strong>Website:</strong> <a href="https://www.pepco.com" target="_blank" rel="noopener">pepco.com</a></li>
      </ul>

      <h4>Emergency (All OpCos)</h4>
      <ul>
        <li><strong>24/7 Line:</strong> <span class="copyable-phone">1-877-737-2662</span></li>
      </ul>

      <p><em>CSR Hours:</em> Mon–Fri 7:00am–8:00pm ET.</p>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> CP (web), ROTP, IVR, and Agent Dashboard (AD), with menus and prompts varying by OpCo and state.</li>
        <li><strong>Language:</strong> IVR supports Spanish selection in menus; CSR lines start in English and provide Spanish options as indicated per OpCo.</li>
        <li><strong>Guidance:</strong> Use the correct OpCo numbers and follow state selection prompts to ensure proper routing.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Format</h4>
      <ul>
        <li><strong>Pattern:</strong> 11 digits.</li>
      </ul>

      <h4><i class="fa-solid fa-clock"></i> Hours & Emergency</h4>
      <ul>
        <li><strong>CSR Hours:</strong> Mon–Fri 7:00am–8:00pm ET.</li>
        <li><strong>Emergency:</strong> 1-877-737-2662 (24/7).</li>
      </ul>

      <h4><i class="fa-solid fa-sitemap"></i> Coverage</h4>
      <ul>
        <li><strong>ACE:</strong> New Jersey; <strong>DPL:</strong> Delaware and Maryland; <strong>Pepco:</strong> District of Columbia and Maryland.</li>
      </ul>
    `
  }
};
