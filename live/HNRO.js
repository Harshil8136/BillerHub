/**
 * NOTES: HNRO - Henrico County, VA
 * =============================================================================
 * Stateless notes using standardized tabs in this exact order:
 * alerts (danger), fees (success), contact (info), channels (info), system (secondary).
 * Content based on Henrico references and HNRO documentation.
 */

const HNRO_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>Choose the right bill type:</strong> Select the correct payment category (Utility, Real Estate, Personal Property, etc.) and ensure the account number matches the bill to avoid rejection or delays.</li>
        <li><strong>CSR routing:</strong> Weekday service line is for general inquiries; after-hours and weekends use the designated number below.</li>
        <li><strong>Account formats vary:</strong> Validate length and required prefixes per bill type before submitting (see System).</li>
      </ul>
    `
  },

  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <h4>Methods & Channels</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Channel</th><th>Methods</th><th>Fee</th></tr></thead>
          <tbody>
            <tr>
              <td>CP / ROTP / Scheduled / AD</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard, Discover, AMEX); Bank (Checking, Savings)</td>
              <td>Absorbed</td>
            </tr>
            <tr>
              <td>IVR</td>
              <td>Debit (Visa, Mastercard); Credit (Visa, Mastercard, Discover, AMEX); Bank (Checking, Savings)</td>
              <td>Absorbed</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4>Per‑Payment Limits (by type)</h4>
      <div class="table-container">
        <table>
          <thead><tr><th>Payment Type</th><th>Limit per Payment</th></tr></thead>
          <tbody>
            <tr><td>Personal Property (per item)</td><td>$200,000.00</td></tr>
            <tr><td>Real Estate (OTP & Scheduled)</td><td>$200,000.00</td></tr>
            <tr><td>Utility Bill (OTP & Scheduled)</td><td>$50,000.00</td></tr>
            <tr><td>Business License</td><td>$100,000.00</td></tr>
            <tr><td>Building Permit Fee</td><td>$50,000.00</td></tr>
            <tr><td>Planning Fees</td><td>$50,000.00</td></tr>
            <tr><td>Parking Ticket</td><td>$500.00</td></tr>
            <tr><td>False Alarm Fee</td><td>$500.00</td></tr>
          </tbody>
        </table>
      </div>
      <p><em>Note:</em> Confirm bill type and account number format to prevent posting errors.</p>
    `
  },

  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">855-748-6015</span></li>
        <li><strong>CSR (Weekdays):</strong> <span class="copyable-phone">804-501-4000</span> (8:00 AM – 4:30 PM ET, Mon–Fri)</li>
        <li><strong>Utilities (Pay by Phone / Support):</strong> <span class="copyable-phone">804-501-4275</span></li>
        <li><strong>After Hours / Weekends:</strong> <span class="copyable-phone">804-501-5025</span></li>
        <li><strong>Website:</strong> <a href="https://henrico.us" target="_blank" rel="noopener">henrico.us</a></li>
        <li><strong>Customer Portal (CP):</strong> <a href="https://ipn.paymentus.com/cp/hnro" target="_blank" rel="noopener">ipn.paymentus.com/cp/hnro</a></li>
        <li><strong>Agent Dashboard (AD):</strong> <a href="https://adg-ipn1.paymentus.net/hnro?v2=true&amp;lang=en" target="_blank" rel="noopener">Open AD</a></li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> IVR, CP, ROTP, Scheduled, and AD.</li>
        <li><strong>Accepted methods:</strong> Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); Bank (Checking, Savings).</li>
        <li><strong>Processing:</strong> Payments are accepted across categories (Utility, Taxes, Fees); pick the correct type before paying.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Formats (by bill)</h4>
      <ul>
        <li><strong>Utility Bills:</strong> 11–15 digits</li>
        <li><strong>Real Estate Tax:</strong> 9 digits, starts with "9"</li>
        <li><strong>Personal Property Tax:</strong> 9 digits, starts with "5"</li>
        <li><strong>Building Permit:</strong> 12 characters, begins with 3 letters and "201"</li>
      </ul>

      <h4><i class="fa-solid fa-sitemap"></i> Environment & Notes</h4>
      <ul>
        <li><strong>TLA:</strong> HNRO</li>
        <li><strong>Environment:</strong> IPN</li>
        <li><strong>Coverage:</strong> Multiple categories (personal property, real estate, utility, permits, planning, parking, false alarm).</li>
      </ul>
    `
  }
};
