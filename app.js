// 1. Select Form Controls using DOM selectors (getElementById & querySelector)
const bookingForm = document.getElementById('bookingForm');
const matchSelect = document.getElementById('matchSelect');
const standSelect = document.querySelector('#standSelect');
const ticketQtyInput = document.querySelector('#ticketQty');

// 2. Select Booking Summary Card display elements
const summaryMatch = document.getElementById('summaryMatch');
const summaryStand = document.getElementById('summaryStand');
const summaryUnitPrice = document.getElementById('summaryUnitPrice');
const summaryQty = document.getElementById('summaryQty');
const summaryTotal = document.getElementById('summaryTotal');

// Select Toast element
const toastEl = document.getElementById('toast');
let toastTimeout;

/**
 * Displays a temporary toast message at the bottom-right corner
 * @param {string} message - Notification text to display
 */
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

/**
 * Reads selected dropdowns and quantity input, calculates total,
 * and updates the Booking Summary Card live.
 */
function updateBookingSummary() {
  // Read selected match
  const selectedMatch = matchSelect.value || 'Not selected';

  // Read selected stand and its data-price attribute
  const selectedStandOption = standSelect.options[standSelect.selectedIndex];
  const selectedStandName = standSelect.value || 'Not selected';
  const unitPrice = Number(selectedStandOption.getAttribute('data-price')) || 0;

  // Read and sanitize quantity (ensure at least 1, max 10)
  let quantity = parseInt(ticketQtyInput.value, 10);
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
    ticketQtyInput.value = 1;
  } else if (quantity > 10) {
    quantity = 10;
    ticketQtyInput.value = 10;
  }

  // Calculate total price
  const totalPrice = unitPrice * quantity;

  // Update Booking Summary DOM elements
  summaryMatch.textContent = selectedMatch;
  summaryStand.textContent = selectedStandName;
  summaryUnitPrice.textContent = `₹${unitPrice.toLocaleString('en-IN')}`;
  summaryQty.textContent = quantity;
  summaryTotal.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;

  // Confirm live update via toast notification
  showToast('Booking summary updated!');
}

// 3. Add 'change' event listeners to form controls
matchSelect.addEventListener('change', updateBookingSummary);
standSelect.addEventListener('change', updateBookingSummary);
ticketQtyInput.addEventListener('change', updateBookingSummary);

// Optional: Prevent page reload on form submit and show confirmation toast
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!matchSelect.value || !standSelect.value) {
    showToast('Please select both a match and a stand category.');
    return;
  }

  showToast(`Confirmed! ${ticketQtyInput.value} ticket(s) booked for ${matchSelect.value}.`);
});