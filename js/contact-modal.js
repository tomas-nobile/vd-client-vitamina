(function() {
  const API_ENDPOINT = 'https://nvz1x3m8tk.execute-api.us-east-1.amazonaws.com/production/vitamina/contact';
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('contact-modal-close');
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const errorBox = document.getElementById('form-error');
  const pageWrapper = document.querySelector('.page-wrapper');
  const whatsappBtn = document.getElementById('contact-whatsapp-btn');

  function openModal(planType = null) {
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (pageWrapper) pageWrapper.classList.add('modal-blurred');
    
    // Actualizar mensaje de WhatsApp según el plan
    if (whatsappBtn) {
      let message = '';
      switch(planType) {
        case 'landing':
          message = 'Hola! Me interesa el plan de Landing Page. ¿Podemos conversar sobre los detalles?';
          break;
        case 'website':
          message = 'Hola! Me interesa el plan de Website Premium. ¿Podemos conversar sobre los detalles?';
          break;
        case 'other':
          message = 'Hola! Me interesa cotizar para UX/UI, Branding, Software y Automatizaciones. ¿Podemos conversar sobre mi proyecto?';
          break;
        default:
          message = 'Hola! Me interesa conocer más sobre los servicios de Vitamina Digital. ¿Podemos conversar?';
      }
      
      const encodedMessage = encodeURIComponent(message);
      whatsappBtn.href = `https://wa.me/5491169008951?text=${encodedMessage}`;
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if (pageWrapper) pageWrapper.classList.remove('modal-blurred');
  }

  // Open triggers: footer CTA, any link to #contacto, any mailto; plus plan CTAs preselect motive
  const contactTriggers = Array.from(document.querySelectorAll('a[href="#contacto"], .footer_cta, a[href^="mailto:"]'));
  contactTriggers.forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      // reset motive to default placeholder for generic triggers
      const motiveSelect = document.getElementById('contact-motivo');
      if (motiveSelect) motiveSelect.value = '';
      openModal(); // Sin parámetro para mensaje general
    });
  });

  // Preselect motive when clicking plan CTAs
  const motiveSelect = document.getElementById('contact-motivo');
  const planLandingBtn = document.querySelector('.plans_component .plan_card:nth-child(1) .plan_cta a');
  const planWebsiteBtn = document.querySelector('.plans_component .plan_card.is-featured .plan_cta a');
  const planOtherBtn = document.querySelector('.plans_component .plan_card:nth-child(3) .plan_cta a');

  if (planLandingBtn) {
    planLandingBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (motiveSelect) motiveSelect.value = 'Landing Page';
      openModal('landing');
    });
  }
  if (planWebsiteBtn) {
    planWebsiteBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (motiveSelect) motiveSelect.value = 'Website Premium';
      openModal('website');
    });
  }
  if (planOtherBtn) {
    planOtherBtn.addEventListener('click', function(e) {
      e.preventDefault();
      if (motiveSelect) motiveSelect.value = 'UX/UI · Branding · Software y Automatizaciones';
      openModal('other');
    });
  }

  // Close on X
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking overlay
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      // Hide previous messages
      if (successBox) successBox.style.display = 'none';
      if (errorBox) {
        errorBox.style.display = 'none';
        errorBox.querySelector('div').textContent = 'Hubo un problema al enviar tu mensaje. Intentalo de nuevo.';
      }

      const fullName = (document.getElementById('contact-fullName') || {}).value?.trim() || '';
      const email = (document.getElementById('contact-email') || {}).value?.trim() || '';
      const countryCode = (document.getElementById('contact-country-code') || {}).value || '+54';
      const phoneNumber = (document.getElementById('contact-phone') || {}).value?.trim() || '';
      const mobilePhone = phoneNumber ? `${countryCode}${phoneNumber}` : '';
      const motivo = (document.getElementById('contact-motivo') || {}).value?.trim() || '';
      const commentInput = (document.getElementById('contact-comment') || {}).value?.trim() || '';
      const comment = motivo ? `Motivo: ${motivo}\n\n${commentInput}` : commentInput;
      const newsletter = !!(document.getElementById('contact-newsletter') || {}).checked;

      // Client-side validation
      if (!fullName || !email || !comment) {
        if (errorBox) {
          errorBox.querySelector('div').textContent = 'Completá los campos requeridos.';
          errorBox.style.display = 'block';
        }
        return;
      }
      if (!isValidEmail(email)) {
        if (errorBox) {
          errorBox.querySelector('div').textContent = 'Ingresá un email válido.';
          errorBox.style.display = 'block';
        }
        return;
      }

      const payload = { fullName, email, mobilePhone, comment, newsletter };

      try {
        const resp = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          if (successBox) successBox.style.display = 'block';
          form.reset();
          setTimeout(closeModal, 2200);
        } else {
          if (errorBox) errorBox.style.display = 'block';
        }
      } catch (err) {
        if (errorBox) errorBox.style.display = 'block';
      }
    });
  }
})();


