function initYear() {
  const year = document.getElementById("footerYear");
  if (year) year.textContent = new Date().getFullYear();
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  const button = form.querySelector('button[type="submit"]');
  const fields = form.querySelectorAll("input[required], textarea[required]");

  function setStatus(message, type) {
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (type) status.classList.add(`is-${type}`);
  }

  function validate() {
    let firstInvalid = null;

    fields.forEach((field) => {
      const valid = field.value.trim() !== "" && field.checkValidity();
      field.setAttribute("aria-invalid", valid ? "false" : "true");
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      setStatus(
        "Please fill in your name, a valid email and a message.",
        "error",
      );
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("", null);

    if (!validate()) return;

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        setStatus("Message sent. Thank you, I'll reply soon.", "success");
      } else {
        setStatus(
          "Message not sent. Please try again or email me directly.",
          "error",
        );
      }
    } catch (err) {
      setStatus("Network error. Check your connection and try again.", "error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Clear the error mark as soon as the visitor fixes a field
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setAttribute("aria-invalid", "false");
    });
  });
}

function initSections() {
  initYear();
  initBackToTop();
  initContactForm();
}

initSections();
