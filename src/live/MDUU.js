/**
 * NOTES: MDUU - MDU Resources Group
 * =============================================================================
 * Structure: Stateless notes with standardized tabs in this order (after an All tab):
 * All, Alerts, Fees, Contact, Channels, System, Directory.
 * Purpose: Parent-level card guiding agents to the right operating company/workflow.
 */

const MDUU_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <div class="rebranding-note">
        <strong>MDU Resources Group</strong> processes payments for several operating companies. 
        When users search for <em>Montana‑Dakota Utilities</em>, <em>Great Plains Natural Gas</em>, 
        <em>Intermountain Gas Company</em>, or <em>Cascade Natural Gas</em>, suggest MDU Resources Group (TLA: MDUU)
        and route via the <em>Directory</em> tab.
      </div>

      <h4><i class="fa-solid fa-compass"></i> Covered Companies & Regions</h4>
      <ul>
        <li><strong>Montana‑Dakota Utilities:</strong> North Dakota, South Dakota, Montana, Wyoming</li>
        <li><strong>Great Plains Natural Gas:</strong> North Dakota, Minnesota</li>
        <li><strong>Intermountain Gas Company:</strong> Idaho</li>
        <li><strong>Cascade Natural Gas:</strong> Washington, Oregon</li>
      </ul>

      <p><em>Tip:</em> Confirm the customer’s state and company first, then open the correct AD link from the Directory.</p>
    `
  },

  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Parent routing:</strong> This is a parent profile; validate the customer’s operating company and region before proceeding.</li>
        <li><strong>Search hint:</strong> Subsidiary names will return this card via aliases (e.g., “Cascade Natural Gas” suggests MDUU).</li>
      </ul>
    `
  },

  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>Fees vary by operating company and channel. Use the company’s AD view to confirm current fee schedule before quoting.</p>
      <div class="mop-container" style="margin-bottom:12px;">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank (ACH)</span></div>
      </div>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>CP / Web / Mobile</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee in company AD</td></tr>
            <tr><td>IVR</td><td>Debit, Credit, Bank (ACH)</td><td>Confirm fee in company AD</td></tr>
            <tr><td>AD</td><td>Debit, Credit, Bank (ACH)</td><td>Agent tools; confirm fee each case</td></tr>
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
        <li><strong>IVR:</strong> <span class="copyable-phone">833-425-1698</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone">800-638-3278</span></li>
      </ul>
      <p>Company websites and portal links may differ by operating company; confirm from the Directory/company AD.</p>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported (varies by company):</strong> IVR, CP/Web/Mobile, AD.</li>
        <li><strong>Routing:</strong> Identify the customer’s operating company first, then proceed to the correct AD/portal.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <ul>
        <li><strong>Parent profile:</strong> MDU Resources Group (TLA: MDUU) aggregates multiple utilities under one umbrella.</li>
        <li><strong>Search behavior:</strong> Aliases ensure searches for operating companies suggest MDUU.</li>
        <li><strong>AD link base:</strong> <code>https://adg-ipn1.paymentus.net/mduu?v2=true&amp;lang=en</code> (check per-company AD views as needed).</li>
      </ul>
    `
  },

  directory: {
    title: 'Directory',
    color: 'info',
    content: `
      <div class="table-container">
        <table>
          <thead><tr><th>Company</th><th>Region</th><th>Notes</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Montana‑Dakota Utilities</strong></td>
              <td>ND, SD, MT, WY</td>
              <td>Use IVR/CP/AD as enabled; verify fees in AD</td>
            </tr>
            <tr>
              <td><strong>Great Plains Natural Gas</strong></td>
              <td>ND, MN</td>
              <td>Use IVR/CP/AD as enabled; verify fees in AD</td>
            </tr>
            <tr>
              <td><strong>Intermountain Gas Company</strong></td>
              <td>ID</td>
              <td>Use IVR/CP/AD as enabled; verify fees in AD</td>
            </tr>
            <tr>
              <td><strong>Cascade Natural Gas</strong></td>
              <td>WA, OR</td>
              <td>Use IVR/CP/AD as enabled; verify fees in AD</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="note">Confirm the specific company in AD to view current fees, limits, and validation rules.</p>
    `
  }
};
