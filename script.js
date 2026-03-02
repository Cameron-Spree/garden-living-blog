document.addEventListener('DOMContentLoaded', () => {

  // 1. Paywall Unlock
  const unlockBtn = document.getElementById('unlockPremiumBtn');
  const paywallWrapper = document.getElementById('paywallWrapper');
  const premiumContent = document.getElementById('premiumContent');

  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      unlockBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg> Unlocking...
      `;

      setTimeout(() => {
        paywallWrapper.style.opacity = '0';
        setTimeout(() => {
          paywallWrapper.style.display = 'none';
          premiumContent.classList.add('active');
          // smooth scroll to premium content
          document.getElementById('premium-start').scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }, 1000);
    });
  }

  // 2. Audio Pronunciation Widget
  const pronounceBtns = document.querySelectorAll('.pronounce-btn');
  pronounceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const word = btn.getAttribute('data-word');
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-GB';
        window.speechSynthesis.speak(utterance);
      } else {
        alert('Sorry, your browser does not support text-to-speech.');
      }
    });
  });

  // 3. Decking Calculator
  const calcLength = document.getElementById('calc-length');
  const calcWidth = document.getElementById('calc-width');
  const calcResultBoards = document.getElementById('calc-result-boards');
  const calcResultClips = document.getElementById('calc-result-clips');

  function calculateDecking() {
    const l = parseFloat(calcLength.value) || 0;
    const w = parseFloat(calcWidth.value) || 0;
    if (l > 0 && w > 0) {
      const area = l * w;
      // Assume standard board is 3.6m long by 150mm wide = 0.54 sqm per board
      // Add 10% wastage
      const boardsNeeded = Math.ceil((area / 0.54) * 1.1);
      // Assume 20 clips per sqm
      const clipsNeeded = Math.ceil(area * 20);

      calcResultBoards.textContent = boardsNeeded;
      calcResultClips.textContent = clipsNeeded;
    } else {
      calcResultBoards.textContent = '0';
      calcResultClips.textContent = '0';
    }
  }

  if (calcLength && calcWidth) {
    calcLength.addEventListener('input', calculateDecking);
    calcWidth.addEventListener('input', calculateDecking);
  }

  // 4. Interactive Quiz
  const quizOptions = document.querySelectorAll('.quiz-option');
  if (quizOptions.length > 0) {
    quizOptions.forEach(option => {
      option.addEventListener('click', function () {
        const currentQ = this.closest('.quiz-question');
        const nextQId = this.getAttribute('data-next');

        currentQ.classList.remove('active');

        if (nextQId === 'result') {
          const resultDiv = document.getElementById('quiz-result-final');
          const type = this.getAttribute('data-type') || 'Modern Minimalist';
          resultDiv.innerHTML = `
            <h3>Your Garden Style: ${type}</h3>
            <p>Based on your answers, we highly recommend our Premium Grey Composite Decking to match your aesthetic!</p>
          `;
          document.getElementById('quiz-result-screen').style.display = 'block';
        } else {
          document.getElementById(nextQId).classList.add('active');
        }
      });
    });
  }

  // 5. FAQs Accordion
  const faqBtns = document.querySelectorAll('.faq-btn');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      // Close others
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current
      item.classList.toggle('active');
    });
  });

  // ===============================================
  // Phase 2: Ultimate Premium Features
  // ===============================================

  // Feature 1: ROI Slider
  const roiLevel = document.getElementById('roi-level');
  const roiYears = document.getElementById('roi-years');
  const barTimber = document.getElementById('bar-timber');
  const barComposite = document.getElementById('bar-composite');
  const valTimber = document.getElementById('val-timber');
  const valComposite = document.getElementById('val-composite');

  function updateROI() {
    if (!roiLevel) return;
    const years = parseInt(roiLevel.value);
    roiYears.textContent = years;

    // Fake calculations: Timber costs £1500 upfront + £200/yr upkeep
    // Composite costs £2500 upfront + £0 upkeep
    const tCost = 1500 + (years * 200);
    const cCost = 2500;

    valTimber.textContent = `£${tCost}`;
    valComposite.textContent = `£${cCost}`;

    // Visual bar height (rough percentage of max possible 5500)
    barTimber.style.height = `${(tCost / 5500) * 100}%`;
    barComposite.style.height = `${(cCost / 5500) * 100}%`;
  }
  if (roiLevel) {
    roiLevel.addEventListener('input', updateROI);
    updateROI();
  }

  // Feature 2: Drag & Drop Canvas
  const swatches = document.querySelectorAll('.color-swatch');
  const slots = document.querySelectorAll('.canvas-slot');
  let draggedColor = null;

  swatches.forEach(swatch => {
    swatch.addEventListener('dragstart', (e) => {
      draggedColor = getComputedStyle(swatch).backgroundColor;
    });
  });

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      if (draggedColor) {
        slot.style.backgroundColor = draggedColor;
        slot.classList.add('filled');
      }
    });
  });

  // Feature 3: 3D Texture Viewer
  const textureCard = document.querySelector('.texture-card');
  if (textureCard) {
    textureCard.addEventListener('mousemove', (e) => {
      const rect = textureCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -15; // Max rotation 15deg
      const rotateY = ((x - centerX) / centerX) * 15;

      textureCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    textureCard.addEventListener('mouseleave', () => {
      textureCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }

  // Feature 4: Audio Narrator
  const audioBtn = document.getElementById('audioPlay');
  const audioSpeed = document.getElementById('audioSpeed');
  const progressBar = document.getElementById('audioProgress');
  let isPlaying = false;
  let progressInterval;
  let currentProgress = 0;
  let currentSpeed = 1;

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      audioBtn.innerHTML = isPlaying
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;

      if (isPlaying) {
        progressInterval = setInterval(() => {
          currentProgress += (0.5 * currentSpeed);
          if (currentProgress >= 100) currentProgress = 0;
          progressBar.style.width = `${currentProgress}%`;
        }, 100);
      } else {
        clearInterval(progressInterval);
      }
    });

    audioSpeed.addEventListener('click', () => {
      if (currentSpeed === 1) currentSpeed = 1.5;
      else if (currentSpeed === 1.5) currentSpeed = 2;
      else currentSpeed = 1;
      audioSpeed.textContent = `${currentSpeed}x`;
    });
  }

  // Feature 5: AR Mockup
  const arBtn = document.getElementById('arBtn');
  const arOverlay = document.getElementById('arOverlay');
  const arClose = document.getElementById('arClose');

  if (arBtn && arOverlay) {
    arBtn.addEventListener('click', () => arOverlay.classList.add('active'));
    arClose.addEventListener('click', () => arOverlay.classList.remove('active'));
  }

});
