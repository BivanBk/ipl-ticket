// ==========================================
// 1. Mobile Hamburger Menu Toggle
// ==========================================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  });
});

// ==========================================
// 2. Match Team Filter Logic
// ==========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const matchCards = document.querySelectorAll(".match-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active filter button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedTeam = btn.getAttribute("data-team");

    matchCards.forEach((card) => {
      const cardTeams = card.getAttribute("data-teams");
      if (selectedTeam === "ALL" || cardTeams.includes(selectedTeam)) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    showToast(selectedTeam === "ALL" ? "Showing all matches" : `Filtered matches for ${selectedTeam}`);
  });
});

// ==========================================
// 3. Grid vs. List View Toggle
// ==========================================
const matchGrid = document.getElementById("matchGrid");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");

gridViewBtn.addEventListener("click", () => {
  matchGrid.classList.remove("list-view");
  gridViewBtn.classList.add("active");
  listViewBtn.classList.remove("active");
});

listViewBtn.addEventListener("click", () => {
  matchGrid.classList.add("list-view");
  listViewBtn.classList.add("active");
  gridViewBtn.classList.remove("active");
});

// ==========================================
// 4. Booking Form & Live Summary (Activity 7 + Quick Select)
// ==========================================
const bookingForm = document.getElementById("bookingForm");
const matchSelect = document.getElementById("matchSelect");
const standSelect = document.querySelector("#standSelect");
const ticketQtyInput = document.querySelector("#ticketQty");

const summaryMatch = document.getElementById("summaryMatch");
const summaryStand = document.getElementById("summaryStand");
const summaryPrice = document.getElementById("summaryPrice");
const summaryQty = document.getElementById("summaryQty");
const summaryTotal = document.querySelector("#summaryTotal");

const toastElement = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2500);
}

function updateBookingSummary() {
  const selectedMatch = matchSelect.value || "Not selected";
  const selectedOption = standSelect.options[standSelect.selectedIndex];
  const selectedStand = standSelect.value || "Not selected";
  const unitPrice = Number(selectedOption.getAttribute("data-price")) || 0;

  let quantity = parseInt(ticketQtyInput.value, 10);
  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  } else if (quantity > 10) {
    quantity = 10;
    ticketQtyInput.value = 10;
  }

  const totalPrice = unitPrice * quantity;

  summaryMatch.textContent = selectedMatch;
  summaryStand.textContent = selectedStand;
  summaryPrice.textContent = `₹${unitPrice.toLocaleString("en-IN")}`;
  summaryQty.textContent = quantity;
  summaryTotal.textContent = `₹${totalPrice.toLocaleString("en-IN")}`;

  showToast("Booking summary updated!");
}

matchSelect.addEventListener("change", updateBookingSummary);
standSelect.addEventListener("change", updateBookingSummary);
ticketQtyInput.addEventListener("change", updateBookingSummary);

// Pre-fill booking dropdown when clicking "Select Match" on any schedule card
document.querySelectorAll(".card-cta").forEach((cta) => {
  cta.addEventListener("click", () => {
    const matchValue = cta.getAttribute("data-match");
    if (matchValue) {
      matchSelect.value = matchValue;
      updateBookingSummary();
    }
  });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!matchSelect.value || !standSelect.value) {
    showToast("Please select both a match and a stand category.");
    return;
  }
  showToast("Booking confirmed! Check your summary.");
});