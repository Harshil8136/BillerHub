/**
 * NOTES: KNOX - Knoxville Utility Board
 * =============================================================================
 * This file contains the notes for the Knoxville Utility Board.
 * The data is based on the KB article provided.
 */

const KNOX_NOTES = {
  all: {
    title: 'All',
    color: 'primary',
    content: `
      <h4>Fees</h4>
      <p>All payment fees are <strong>absorbed</strong> by the biller. The minimum payment amount is $1.00.</p>
      
      <h4>Contact</h4>
      <p>Multiple IVR numbers are available. The Standard IVR is used for customer self-service and for transfers from KUB agents.</p>
      <ul>
        <li><strong>Standard IVR (English/Spanish):</strong> <span class="copyable-phone" data-copy-label="Standard IVR">866-819-0066</span> (Spanish: option 2)</li>
        <li><strong>Assisted Agent IVR (English):</strong> <span class="copyable-phone" data-copy-label="Assisted IVR (English)">866-371-2661</span></li>
        <li><strong>Assisted Agent IVR (Spanish):</strong> <span class="copyable-phone" data-copy-label="Assisted IVR (Spanish)">855-227-5192</span></li>
        <li><strong>Customer Service:</strong> <span class="copyable-phone" data-copy-label="CSR Number">865-524-2911</span> (Spanish: option 2)</li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 7:00 AM to 6:00 PM EST. Closed on weekends.</p>
      
      <h4>Channels</h4>
      <p>Payments are accepted through AD (Agent Dashboard), IVR (Phone), and OTP (Online Guest Pay).</p>
      <p><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/knox" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/knox</a></p>
      <p><strong>AD Link:</strong> <a href="https://ipn.paymentus.com/biller/stde/knox?v2=true" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/biller/stde/knox</a></p>

      <h4>System</h4>
      <p>The account number is <strong>10 digits</strong> long. Scheduled Payments are available, but E-Bill is not.</p>
      
      <h4>Payment Limits</h4>
      <p>The following payment limits and velocity rules apply. The minimum payment for all types is $1.00.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Maximum Payment</th>
              <th>Velocity Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential</strong></td>
              <td>$4,000.00</td>
              <td>3 payments in 27 days</td>
            </tr>
            <tr>
              <td><strong>Commercial</strong></td>
              <td>$7,500.00</td>
              <td>2 payments in 27 days</td>
            </tr>
            <tr>
              <td><strong>Donations</strong></td>
              <td>No Limit</td>
              <td>Multiple payments allowed</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  fees: {
    title: 'Fees',
    color: 'success',
    content: `
      <p>All payment fees are <strong>absorbed</strong> by the biller. The minimum payment amount is $1.00.</p>
    `
  },
  contact: {
    title: 'Contact',
    color: 'info',
    content: `
      <p>Multiple IVR numbers are available. The Standard IVR is used for customer self-service and for transfers from KUB agents.</p>
      <h4>IVR Numbers</h4>
      <ul>
        <li><strong>Standard IVR (English/Spanish):</strong> <span class="copyable-phone" data-copy-label="Standard IVR">866-819-0066</span> (Spanish: option 2)</li>
        <li><strong>Assisted Agent IVR (English):</strong> <span class="copyable-phone" data-copy-label="Assisted IVR (English)">866-371-2661</span></li>
        <li><strong>Assisted Agent IVR (Spanish):</strong> <span class="copyable-phone" data-copy-label="Assisted IVR (Spanish)">855-227-5192</span></li>
      </ul>
      <h4>Customer Service</h4>
      <ul>
        <li><strong>CSR Number:</strong> <span class="copyable-phone" data-copy-label="CSR Number">865-524-2911</span> (Spanish: option 2)</li>
      </ul>
      <p><strong>CSR Hours:</strong> Monday-Friday, 7:00 AM to 6:00 PM EST. Closed on weekends.</p>
    `
  },
  channels: {
    title: 'Channels',
    color: 'info',
    content: `
      <p>Payments are accepted through the following channels:</p>
      <ul>
        <li>AD (Agent Dashboard)</li>
        <li>IVR (Phone)</li>
        <li>OTP (Online Guest Pay / ROTP)</li>
      </ul>
      <p><strong>ROTP Link:</strong> <a href="https://ipn.paymentus.com/rotp/knox" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/rotp/knox</a></p>
      <p><strong>AD Link:</strong> <a href="https://ipn.paymentus.com/biller/stde/knox?v2=true" target="_blank" rel="noopener noreferrer">https://ipn.paymentus.com/biller/stde/knox</a></p>
    `
  },
  system: {
    title: 'System',
    color: 'secondary',
    content: `
      <h4>Account Format</h4>
      <p>The account number is <strong>10 digits</strong> long.</p>
      <h4>Payment Methods</h4>
      <ul>
        <li><strong>Debit/Credit:</strong> Visa, Mastercard, Discover</li>
        <li><strong>Bank:</strong> Checking, Savings</li>
      </ul>
      <h4>System Details</h4>
      <ul>
        <li><strong>Go-Live Date:</strong> November 18, 2020</li>
        <li><strong>Scheduled Payments:</strong> Yes</li>
        <li><strong>E-Bill:</strong> No</li>
      </ul>
    `
  },
  limits: {
    title: 'Payment Limits',
    color: 'secondary',
    content: `
      <p>The following payment limits and velocity rules apply. The minimum payment for all types is $1.00.</p>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Type</th>
              <th>Maximum Payment</th>
              <th>Velocity Rule</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Residential</strong></td>
              <td>$4,000.00</td>
              <td>3 payments in 27 days</td>
            </tr>
            <tr>
              <td><strong>Commercial</strong></td>
              <td>$7,500.00</td>
              <td>2 payments in 27 days</td>
            </tr>
            <tr>
              <td><strong>Donations</strong></td>
              <td>No Limit</td>
              <td>Multiple payments allowed</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }
};