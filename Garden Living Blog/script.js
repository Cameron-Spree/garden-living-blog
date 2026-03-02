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
      option.addEventListener('click', function() {
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
    btn.addEventListener('click', function() {
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
});
