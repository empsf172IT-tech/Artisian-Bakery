/**
 * CRUMBÉ — Artisan Bakery
 * Core Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Navigation & Scroll Spy ---
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Handle scroll effect for glassmorphism
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled', 'shadow-md');
    } else {
      navbar.classList.remove('scrolled', 'shadow-md');
    }

    // Scroll spy for active link indicator
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Controls
  const toggleMobileMenu = (open) => {
    if (open) {
      mobileNavDrawer.classList.remove('translate-x-full');
      mobileNavBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    } else {
      mobileNavDrawer.classList.add('translate-x-full');
      mobileNavBackdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', () => toggleMobileMenu(false));
  }
  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // --- 2. Interactive Menu Filtering (Section 5) ---
  const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');
  const menuContainer = document.getElementById('menuItemsContainer');

  menuFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button styling
      menuFilterBtns.forEach((b) => {
        b.classList.remove('bg-[#4A2E25]', 'text-[#FFF7ED]', 'shadow-md');
        b.classList.add('bg-[#FFFDF9]', 'text-[#4A2E25]', 'border', 'border-[#E9A6A1]/40');
      });
      btn.classList.add('bg-[#4A2E25]', 'text-[#FFF7ED]', 'shadow-md');
      btn.classList.remove('bg-[#FFFDF9]', 'border-[#E9A6A1]/40');

      const filterValue = btn.getAttribute('data-filter');

      // Animate filtering
      menuItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // --- 3. Custom Cake Dream Modal (Section 6 & CTA buttons) ---
  const cakeModal = document.getElementById('cakeOrderModal');
  const openModalBtns = document.querySelectorAll('.open-cake-modal-btn');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');
  const modalBackdrop = cakeModal ? cakeModal.querySelector('.modal-backdrop') : null;
  const cakeOrderForm = document.getElementById('cakeOrderForm');

  const openModal = () => {
    if (!cakeModal) return;
    cakeModal.classList.remove('modal-hidden');
    cakeModal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
    // Focus first input
    const firstInput = cakeModal.querySelector('input, select');
    if (firstInput) firstInput.focus();
  };

  const closeModal = () => {
    if (!cakeModal) return;
    cakeModal.classList.remove('modal-visible');
    cakeModal.classList.add('modal-hidden');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cakeModal && cakeModal.classList.contains('modal-visible')) {
      closeModal();
    }
  });

  // Custom Cake Form Validation & Submit
  if (cakeOrderForm) {
    cakeOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('cakeCustomerName');
      const emailInput = document.getElementById('cakeCustomerEmail');
      const eventDateInput = document.getElementById('cakeEventDate');
      const cakeStyleInput = document.getElementById('cakeStyleSelect');
      const guestCountInput = document.getElementById('cakeGuestCount');

      let isValid = true;

      // Validation
      if (!nameInput.value.trim()) {
        showInputError(nameInput, 'Please enter your name.');
        isValid = false;
      } else {
        clearInputError(nameInput);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showInputError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearInputError(emailInput);
      }

      if (!eventDateInput.value) {
        showInputError(eventDateInput, 'Please choose a target date.');
        isValid = false;
      } else {
        clearInputError(eventDateInput);
      }

      if (isValid) {
        // Show success state in modal
        const submitBtn = cakeOrderForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-cocoa inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Submitting Bespoke Request...
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
          cakeOrderForm.reset();
          submitBtn.innerHTML = 'Send Dream Cake Request';
          submitBtn.disabled = false;
          closeModal();
          showToast('Thank you! Your custom cake inquiry has been received. Our head pastry chef will reach out within 24 hours.');
        }, 1100);
      }
    });
  }

  // --- 4. Contact & Visit Form Validation (Section 10) ---
  const contactForm = document.getElementById('contactInquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const type = document.getElementById('contactInquiryType');
      const message = document.getElementById('contactMessage');
      const feedbackDiv = document.getElementById('contactFormFeedback');

      let isValid = true;

      if (!name.value.trim()) {
        showInputError(name, 'Please enter your full name.');
        isValid = false;
      } else {
        clearInputError(name);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        showInputError(email, 'Please enter a valid email address.');
        isValid = false;
      } else {
        clearInputError(email);
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        showInputError(message, 'Please provide a message with at least 10 characters.');
        isValid = false;
      } else {
        clearInputError(message);
      }

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-[#4A2E25] inline" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> Sending...
        `;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();

          if (feedbackDiv) {
            feedbackDiv.classList.remove('hidden');
            feedbackDiv.innerHTML = `
              <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start space-x-3 shadow-sm animate-fade-in">
                <svg class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <p class="font-bold">Message Delivered with Care!</p>
                  <p class="mt-0.5">Thank you for writing to CRUMBÉ. A member of our artisan team will respond to your inquiry shortly.</p>
                </div>
              </div>
            `;

            setTimeout(() => {
              feedbackDiv.classList.add('hidden');
            }, 8000);
          }

          showToast('Your message has been sent successfully! We look forward to connecting.');
        }, 1000);
      }
    });
  }

  // --- 5. Helper Validation Functions ---
  function showInputError(inputElement, errorMessage) {
    inputElement.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
    let parent = inputElement.parentElement;
    let errorSpan = parent.querySelector('.input-error-msg');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.className = 'input-error-msg text-xs text-rose-600 font-medium mt-1 block';
      parent.appendChild(errorSpan);
    }
    errorSpan.textContent = errorMessage;
  }

  function clearInputError(inputElement) {
    inputElement.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
    let parent = inputElement.parentElement;
    let errorSpan = parent.querySelector('.input-error-msg');
    if (errorSpan) {
      errorSpan.remove();
    }
  }

  // --- 6. Toast Notification Manager ---
  function showToast(message) {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto bg-[#4A2E25] text-[#FFF7ED] p-4 rounded-2xl shadow-2xl border border-[#E9A6A1]/40 flex items-start space-x-3 transition-all duration-300 transform translate-y-4 opacity-0';
    toast.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-[#E9A6A1]/20 flex items-center justify-center flex-shrink-0 text-[#E9A6A1] mt-0.5">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <div class="flex-1">
        <p class="text-xs uppercase tracking-wider text-[#E9A6A1] font-bold">CRUMBÉ Patisserie</p>
        <p class="text-sm font-medium mt-0.5 text-cream-50 leading-snug">${message}</p>
      </div>
      <button class="text-[#FFF7ED]/60 hover:text-[#FFF7ED] ml-2 text-lg font-light leading-none focus:outline-none" aria-label="Close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Close button
    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('opacity-0', 'translate-y-4');
      setTimeout(() => toast.remove(), 300);
    });

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('opacity-0', 'translate-y-4');
    });

    // Auto dismiss
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('opacity-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5500);
  }

  // --- 7. Intersection Observer for Scroll Reveal ---
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
      observer.observe(el);
    });
  } else {
    revealElements.forEach((el) => {
      el.classList.remove('opacity-0', 'translate-y-8');
    });
  }

  // --- 8. Privacy & Terms Modal ---
  const policyModal = document.getElementById('policyModal');
  const openPrivacyBtn = document.getElementById('openPrivacyBtn');
  const openTermsBtn = document.getElementById('openTermsBtn');
  const closePolicyBtn = document.getElementById('closePolicyBtn');
  const confirmPolicyBtn = document.getElementById('confirmPolicyBtn');
  const policyModalBackdrop = policyModal ? policyModal.querySelector('.modal-backdrop') : null;

  const togglePolicyModal = (show) => {
    if (!policyModal) return;
    if (show) {
      policyModal.classList.remove('modal-hidden');
      policyModal.classList.add('modal-visible');
      document.body.style.overflow = 'hidden';
    } else {
      policyModal.classList.remove('modal-visible');
      policyModal.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }
  };

  if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => togglePolicyModal(true));
  if (openTermsBtn) openTermsBtn.addEventListener('click', () => togglePolicyModal(true));
  if (closePolicyBtn) closePolicyBtn.addEventListener('click', () => togglePolicyModal(false));
  if (confirmPolicyBtn) confirmPolicyBtn.addEventListener('click', () => togglePolicyModal(false));
  if (policyModalBackdrop) policyModalBackdrop.addEventListener('click', () => togglePolicyModal(false));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && policyModal && policyModal.classList.contains('modal-visible')) {
      togglePolicyModal(false);
    }
  });

  // --- 9. Graceful Image Fallbacks ---
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', function () {
      this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%23FEEDDE'/%3E%3Ctext x='50%25' y='46%25' font-family='serif' font-size='28' font-weight='bold' fill='%234A2E25' text-anchor='middle'%3ECRUMBÉ%3C/text%3E%3Ctext x='50%25' y='58%25' font-family='sans-serif' font-size='14' letter-spacing='2' fill='%23E9A6A1' text-anchor='middle'%3EARTISAN PATISSERIE%3C/text%3E%3C/svg%3E";
    });
  });

  // --- 10. Back to Top Controller ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-6');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-6');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 11. Theme Toggle Controller ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const mobileThemeText = document.getElementById('mobileThemeText');

  const updateThemeUI = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
      if (mobileThemeText) mobileThemeText.textContent = 'Day Mode ☀️';
    } else {
      document.documentElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
      if (mobileThemeText) mobileThemeText.textContent = 'Dark Mode 🌙';
    }
  };

  // Initialize theme icons based on current class
  const isInitiallyDark = document.documentElement.classList.contains('dark');
  updateThemeUI(isInitiallyDark);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('crumbe-theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // Global helper for opening modal from anywhere
  window.openCrumbModal = openModal;
});
