// ---------------------------------------------
// Typing effect for the hero terminal line
// ---------------------------------------------
const typedEl = document.getElementById('typed');
const lines = [
  "learning always.",
  "developing a project idea on weekdays.",
  "Writing next-bestseller on weekends.",
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
  const current = lines[lineIndex];

  if(!deleting){
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  const speed = deleting ? 28 : 42;
  setTimeout(typeLoop, speed);
}

if(typedEl){
  typeLoop();
}

// ---------------------------------------------
// Scroll reveal
// ---------------------------------------------
const revealEls = document.querySelectorAll('.reveal');

if('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ---------------------------------------------
// Mobile nav toggle
// ---------------------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

if(navToggle && navLinks){
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------------------------------------------
// Copy email to clipboard
// ---------------------------------------------
const copyEmailBtn = document.getElementById('copyEmail');

if(copyEmailBtn){
  const hint = copyEmailBtn.querySelector('.contact__copy-hint');
  const defaultHint = hint ? hint.textContent : '';

  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email;
    try{
      await navigator.clipboard.writeText(email);
      if(hint) hint.textContent = 'copied to clipboard ✓';
    } catch(err){
      if(hint) hint.textContent = 'copy failed — email is above';
    }
    setTimeout(() => { if(hint) hint.textContent = defaultHint; }, 2000);
  });
}