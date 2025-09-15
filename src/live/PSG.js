/**
 * NOTES: PSG - Public Service & Electric Gas Co (PSEG)
 * =============================================================================
 * This file contains the notes for Public Service & Electric Gas Co.
 * The data is based on the KB article provided.
 */

const PSG_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Alerts</h4>
      <p><strong>Bank (ACH) payments are NOT accepted.</strong> This biller only accepts card and advanced payment methods like PayPal/Venmo.</p>
      
      <h4>Fees</h4>
      <p>A flat fee of <strong>$3.50</strong> is applied to all transactions.</p>
      
      <h4>Contact</h4>
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">833-277-8710</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">1-800-436-7734</span></li>
      </ul>
      
      <h4>Payment Limits</h4>
      <ul>
        <li><strong>Maximum Payment Amount:</strong> $2,000.00</li>
        <li><strong>Velocity Limit:</strong> 5 payments within a rolling 30-day period.</li>
      </ul>

      <h4>System & Payment Methods</h4>
      <p>The account number is typically 10 digits. Autopay, Future-Dated Payments, and E-Bill are not supported.</p>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
      </div>
    `
  },
  alerts: {
    title: 'Alerts',
    color: 'danger',
    content: `
      <h4>Bank (ACH) Payments Not Accepted</h4>
      <p>This biller does not accept payments from checking or savings accounts. Payments must be made with a debit card, credit card, or an advanced payment method like PayPal or Venmo.</p>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>A flat fee of <strong>$3.50</strong> is applied to each transaction.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <ul>
        <li><strong>IVR:</strong> <span class="copyable-phone" data-copy-label="IVR Number">833-277-8710</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">1-800-436-7734</span></li>
      </ul>
      <p><strong>Website:</strong> <a href="https://nj.pseg.com/#" target="_blank" rel="noopener noreferrer">https://nj.pseg.com/</a></p>
      <p><strong>SLA Support Email:</strong> psgsupport@paymentus.com</p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through a wide range of channels:</p>
      <ul>
        <li>AD (Agent Dashboard)</li>
        <li>CP (Customer Portal)</li>
        <li>IVR (Phone)</li>
        <li>ROTP (Guest Pay)</li>
        <li>XOTP</li>
      </ul>
      <p><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/psg" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/psg</a></p>
      <p><strong>CP Link:</strong> <a href="https://ipn.paymentus.com/cp/psg" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/cp/psg</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is typically <strong>10 digits</strong>, but may vary.</p>
      <h4>System Details</h4>
      <ul>
        <li><strong>Processor:</strong> Braintree</li>
        <li><strong>Scheduled (Autopay) Payments:</strong> No</li>
        <li><strong>Future-Dated Payments:</strong> No</li>
        <li><strong>E-Bill:</strong> No</li>
      </ul>
      <h4>Accepted Payment Methods</h4>
      <div class="mop-container">
        <div class="mop-item"><span class="payment-logo visa"></span><span class="mop-label">Visa</span></div>
        <div class="mop-item"><span class="payment-logo mastercard"></span><span class="mop-label">Mastercard</span></div>
        <div class="mop-item"><span class="payment-logo discover"></span><span class="mop-label">Discover</span></div>
        <div class="mop-item"><span class="payment-logo amex"></span><span class="mop-label">AMEX</span></div>
        <div class="mop-item"><span class="payment-logo paypal"></span><span class="mop-label">PayPal</span></div>
        <div class="mop-item"><span class="payment-logo venmo"></span><span class="mop-label">Venmo</span></div>
      </div>
       <small>Note: Apple Pay and Google Pay are also listed as accepted methods and will be presented by the customer's browser or device where applicable.</small>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <h4>Maximum Payment Amount</h4>
      <p>The maximum amount allowed per transaction is <strong>$2,000.00</strong>.</p>
      <h4>Velocity Rules</h4>
      <p>A maximum of <strong>five payments</strong> can be made within a rolling 30-day period.</p>
    `
  }
};