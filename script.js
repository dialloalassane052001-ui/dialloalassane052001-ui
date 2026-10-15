/* ===== TYPING EFFECT ===== */
const roles = [
  "Data Scientist",
  "Machine Learning Engineer",
  "Deep Learning · XAI",
  "Python · PyTorch · XGBoost"
];
const typingEl = document.getElementById("typing");
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const current = roles[roleIdx];
  typingEl.textContent = current.substring(0, charIdx);

  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(type, 70);
  } else if (deleting && charIdx > 0) {
    charIdx--;
    setTimeout(type, 35);
  } else {
    if (!deleting) {
      deleting = true;
      setTimeout(type, 1800);
    } else {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(type, 300);
    }
  }
}
type();

/* ===== BURGER MENU ===== */
const burger = document.getElementById("burger");
const navLinks = document.querySelector(".nav-links");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("active"), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* ===== COMPTEURS ANIMÉS ===== */
const counters = document.querySelectorAll(".stat-num");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || "";
      let current = 0;
      const step = target / 60;
      const update = () => {
        current += step;
        if (current < target) {
          el.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };
      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ===== BARRES DE COMPÉTENCES ===== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.level + "%";
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-fill").forEach(el => skillObserver.observe(el));

/* ===== EFFET PARALLAX LÉGER SUR LE FOND ===== */
document.addEventListener("mousemove", (e) => {
  const glow = document.querySelector(".bg-glow");
  if (!glow) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  glow.style.transform = `translate(${x}px, ${y}px)`;
});
