/*
 * Main JavaScript for portfolio website
 * Handles mobile menu toggle, animations initialisation and contact form submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Initialise AOS animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true, // Animate elements only once as they come into view
      duration: 700,
      easing: 'ease-out-quart',
    });
  }

  // Initialise VanillaTilt for tilt cards
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
      reverse: true,
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Contact form submission using FormSubmit.co
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg = document.getElementById('formError');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      successMsg?.classList.add('hidden');
      errorMsg?.classList.add('hidden');
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };
      try {
        const response = await fetch(
          'https://formsubmit.co/ajax/iftekharalamsami@gmail.com',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );
        if (response.ok) {
          form.reset();
          successMsg?.classList.remove('hidden');
          successMsg?.classList.add('show');
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        errorMsg?.classList.remove('hidden');
        errorMsg?.classList.add('show');
        console.error(err);
      }
    });
  }
});