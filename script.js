// Add your real contact details here before sharing the site.
const CONTACT_EMAIL = "";
const CONTACT_PHONE = "";

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const emailDetail = document.querySelector("#email-detail");
const phoneDetail = document.querySelector("#phone-detail");
const contactSetup = document.querySelector("#contact-setup");

document.querySelector("#current-year").textContent = new Date().getFullYear();

if (CONTACT_EMAIL) {
  const emailLink = document.querySelector("#email-link");
  emailLink.href = `mailto:${CONTACT_EMAIL}`;
  emailLink.textContent = CONTACT_EMAIL;
  emailDetail.hidden = false;
}

if (CONTACT_PHONE) {
  const phoneLink = document.querySelector("#phone-link");
  const dialablePhone = CONTACT_PHONE.replace(/[^\d+]/g, "");
  phoneLink.href = `tel:${dialablePhone}`;
  phoneLink.textContent = CONTACT_PHONE;
  phoneDetail.hidden = false;
}

if (CONTACT_EMAIL || CONTACT_PHONE) {
  contactSetup.hidden = true;
}

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!CONTACT_EMAIL) {
    formStatus.textContent = "The contact email hasn’t been set up yet. Add your business email in script.js before using this form.";
    return;
  }

  const formData = new FormData(contactForm);
  const subject = `Project enquiry from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    `Interested in: ${formData.get("project")}`,
    "",
    String(formData.get("message"))
  ].join("\n");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formStatus.textContent = "Opening your email app with your project details…";
  window.location.href = mailto;
});
