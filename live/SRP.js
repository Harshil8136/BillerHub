/**
 * NOTES: SRP - Salt River Project (Arizona)
 * =============================================================================
 * Stateless notes using standardized tabs in this exact order:
 * alerts (danger), fees (success), contact (info), channels (info), system (secondary).
 * Content derived from SRP reference materials.
 */

const SRP_NOTES = {
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <ul>
        <li><strong>IVR account requirement:</strong> Customers must have their SRP account number to use the IVR; otherwise transfer to SRP CSR (24/7).</li>
        <li><strong>ACH requests:</strong> All ACH payment requests must be transferred to SRP CSR; SRP CSRs will not provide account numbers.</li>
        <li><strong>M‑Power (pre‑paid) follow‑up:</strong> If a payment is made toward an M‑Power smart card and power is needed ASAP, transfer the customer to SRP CSR after the call and provide the confirmation number.</li>
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
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
        <div class="mop-item"><span class="payment-logo paypal-credit"></span><span class="mop-label">PayPal Credit</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
      </div>

      <h4>Residential Power or Water</h4>
      <div class="table-container">
        <table>
          <thead>
            <tr><th>Channel</th><th>Methods</th><th>Fee</th><th>Max (txn)</th><th>Velocity (24h)</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>CP / ROTP / Scheduled</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX); Advanced (PayPal, Amazon Pay, PayPal Credit, Venmo)</td>
              <td>$2.00</td>
              <td>$750</td>
              <td>$1,500</td>
            </tr>
            <tr>
              <td>AD / IVR</td>
              <td>Debit (Visa, MC); Credit (Visa, MC, Discover, AMEX)</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><em>Note:</em> All ACH payment requests must be transferred to SRP CSR (see Contacts).</p>
    `
  },

  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone">855-671-9276</span></li>
        <li><strong>Power (English):</strong> <span class="copyable-phone">(602) 236-8840</span></li>
        <li><strong>Power (Spanish):</strong> <span class="copyable-phone">(602) 236-8845</span></li>
        <li><strong>Power Reconnection:</strong> <span class="copyable-phone">(602) 236-8888</span></li>
        <li><strong>Water (English):</strong> <span class="copyable-phone">(602) 236-3333</span></li>
        <li><strong>Water (Spanish):</strong> <span class="copyable-phone">(602) 236-4444</span></li>
        <li><strong>Website:</strong> <a href="https://www.srpnet.com" target="_blank" rel="noopener">srpnet.com</a></li>
        <li><strong>CSR Hours:</strong> Open 24/7 throughout the year</li>
      </ul>
    `
  },

  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <ul>
        <li><strong>Supported:</strong> CP, ROTP, Scheduled, AD, IVR (IVR requires account number).</li>
        <li><strong>Programs:</strong> SRP “Shared” donation program is available for assisting customers in need.</li>
        <li><strong>Use cases:</strong> Payments may be for Water/Irrigation or Power/Electrical; confirm account type before processing.</li>
      </ul>
    `
  },

  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4><i class="fa-solid fa-id-card"></i> Account Formats</h4>
      <ul>
        <li><strong>Power:</strong> 9 digits (may begin with any number)</li>
        <li><strong>Water:</strong> 7 digits (begins with “0...”) </li>
      </ul>

      <h4><i class="fa-solid fa-link"></i> Useful Links & Processing</h4>
      <ul>
        <li><strong>ROTP:</strong> <a href="https://ipn.paymentus.com/rotp/srp" target="_blank" rel="noopener">ipn.paymentus.com/rotp/srp</a></li>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Address validation:</strong> Canadian postal codes are accepted in the “zip code” field.</li>
      </ul>

      <h4><i class="fa-solid fa-clock"></i> Operational Notes</h4>
      <ul>
        <li><strong>Go Live:</strong> 10/24/2014</li>
        <li><strong>M‑Power follow‑up:</strong> After taking pre‑paid card payments when immediate power is needed, transfer customer to SRP CSR and provide the confirmation number.</li>
      </ul>
    `
  }
};
