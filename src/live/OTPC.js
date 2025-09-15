/**
 * NOTES: OTPC - Otter Tail Power Company
 * =============================================================================
 * This file contains the notes for Otter Tail Power Company.
 * The data is based on the KB article provided.
 */

const OTPC_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Fees</h4>
      <p>All payment fees are <strong>absorbed</strong> by the biller.</p>
      
      <h4>Contact</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">866-377-1059</span> (Spanish: option 2)</li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-257-4044</span></li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 8:00 AM to 5:00 PM CDT.</p>
      
      <h4>System & Payment Methods</h4>
      <p>The account number is 8 digits long. When processing payments in the Agent Dashboard, the only option to select is "IVR Utility Bill".</p>
      <p><strong>IVR & Agent Dashboard Methods:</strong></p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account</span></div>
      </div>
      <p><strong>Web Portal (CP/ROTP) Methods:</strong></p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
      </div>

      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Standard Maximum:</strong> $800.00 per payment.</li>
        <li><strong>ACH (Bank) Maximum:</strong> $600,000.00 per payment.</li>
      </ul>
      <p>Multiple payments can be made.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>All payment fees are <strong>absorbed</strong> by the biller.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">866-377-1059</span> (Spanish: option 2)</li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">800-257-4044</span></li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 8:00 AM to 5:00 PM CDT. Closed on weekends.</p>
      <p><strong>Website:</strong> <a href="https://www.otpco.com" target="_blank" rel="noopener noreferrer">www.otpco.com</a></p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through IVR, Agent Dashboard (AD), Customer Portal (CP), and Guest Pay (ROTP).</p>
      <ul>
        <li><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/otpc" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/otpc</a></li>
        <li><strong>CP Link:</strong> <a href="https://ipn.paymentus.com/cp/otpc" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/cp/otpc</a></li>
      </ul>
      <p><strong>Agent Dashboard Note:</strong> When processing a payment, you must select the Payment Type: "IVR Utility Bill". This should be the only available option.</p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>8 digits</strong> long.</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Go-Live Date:</strong> August 29th, 2023</li>
        <li><strong>Scheduled (Autopay) Payments:</strong> No</li>
      </ul>
      <h4>Payment Methods by Channel</h4>
      <p><strong>IVR & Agent Dashboard Methods:</strong></p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account</span></div>
      </div>
      <p><strong>Web Portal (CP/ROTP) Methods:</strong></p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo ach"></span><span class="mop-label">Bank Account</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo paypal-credit"></span><span class="mop-label">PayPal Credit</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
        <div class="mop-item"><span class="payment-logo amazon-pay"></span><span class="mop-label">Amazon Pay</span></div>
      </div>
      <small>Note: The PDF mentions Apple Pay and Google Pay, but these are typically presented by the browser/device and not as standalone logos.</small>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <p>The maximum allowed payment amount depends on the payment method.</p>
      <ul>
        <li><strong>Standard Maximum (Cards, etc.):</strong> $800.00</li>
        <li><strong>ACH (Bank Account) Maximum:</strong> $600,000.00</li>
      </ul>
      <p>Multiple payments can be made, as there are no specific velocity limits mentioned.</p>
    `
  }
};