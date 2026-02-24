/* ================================
   GESTION LANGUE (Google Translate)
================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'fr',
    includedLanguages: 'fr,en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

function setLang(lang) {
  const select = document.querySelector(".goog-te-combo");
  if (!select) return;

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  // Activation des boutons
  document.getElementById("btn-fr").classList.remove("active");
  document.getElementById("btn-en").classList.remove("active");
  document.getElementById(`btn-${lang}`).classList.add("active");

  // Sauvegarde dans localStorage
  localStorage.setItem("lang", lang);
}

// Charger la langue sauvegardée au chargement
window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("lang");
  if (savedLang) {
    setTimeout(() => setLang(savedLang), 1000);
  }
});


/* ================================
   ANIMATIONS AU SCROLL
================================ */
const observerOptions = { threshold: 0.15 };

const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);
document.querySelectorAll(".animate, .about-container, .card, .domaine-card, .contact-form, .contact-info")
  .forEach(el => observer.observe(el));


/* ================================
   FORMULAIRE CONTACT
================================ */
const contactForm = document.querySelector(".contact-form form");

contactForm.addEventListener("submit", async e => {
  e.preventDefault();

  // Récupération des champs
  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const phone = contactForm.querySelector('input[name="phone"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();

  // Vérification des champs obligatoires
  let errors = [];
  if (!name) errors.push("Nom");
  if (!email) errors.push("Email");
  if (!message) errors.push("Message");

  if (errors.length > 0) {
    alert("Veuillez remplir les champs obligatoires : " + errors.join(", "));
    return;
  }

  // Préparer les données pour Web3Forms
  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Merci ${name} ! Votre message a été envoyé avec succès.`);
      contactForm.reset();
    } else {
      alert(`Erreur lors de l'envoi : ${result.message || "Veuillez réessayer."}`);
    }
  } catch (error) {
    console.error(error);
    alert("Erreur réseau : impossible d'envoyer le message.");
  }
});


/* ================================
   BOUTONS HERO (fadeUp au chargement)
================================ */
window.addEventListener("load", () => {
  const heroItems = document.querySelectorAll(".hero-text p, .hero-text .btn");
  heroItems.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
    el.classList.add("fadeUp");
  });
});


/* ================================
   RIPPLE EFFECT SUR TOUS LES BOUTONS
================================ */
document.querySelectorAll("button, .btn, .btn-about").forEach(btn => {
  btn.addEventListener("click", e => {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    btn.appendChild(circle);

    const d = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = d + "px";

    const rect = btn.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left - d / 2 + "px";
    circle.style.top = e.clientY - rect.top - d / 2 + "px";

    setTimeout(() => circle.remove(), 600);
  });
});