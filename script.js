document.documentElement.classList.add("js");

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];
const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pointerEffectsAllowed = motionAllowed && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (menuToggle && navLinksContainer) {
  menuToggle.setAttribute("aria-expanded", "false");
  const closeMenu = () => {
    navLinksContainer.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinksContainer.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
};
const sectionObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveLink(entry.target.id)),
  { rootMargin: "-30% 0px -55%", threshold: 0 },
);
sections.forEach((section) => sectionObserver.observe(section));

const caseStudyModal = document.querySelector(".case-study-modal");
const modalTitle = document.querySelector(".modal-title");
const closeModal = () => {
  if (!caseStudyModal) return;
  caseStudyModal.classList.remove("open");
  caseStudyModal.setAttribute("aria-hidden", "true");
};
document.querySelectorAll(".case-study-trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!caseStudyModal || !modalTitle) return;
    modalTitle.textContent = trigger.dataset.project;
    caseStudyModal.classList.add("open");
    caseStudyModal.setAttribute("aria-hidden", "false");
  });
});
document.querySelector(".modal-close")?.addEventListener("click", closeModal);
caseStudyModal?.addEventListener("click", (event) => event.target === caseStudyModal && closeModal());
document.addEventListener("keydown", (event) => event.key === "Escape" && closeModal());

if (pointerEffectsAllowed) {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let lastTrailTime = 0;
  let frameRequested = false;

  const updatePointerEffects = () => {
    frameRequested = false;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (mouseY >= rect.top && mouseY <= rect.bottom) {
        section.style.setProperty("--mx", `${mouseX - rect.left}px`);
        section.style.setProperty("--my", `${mouseY - rect.top}px`);
      }
    });
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(updatePointerEffects);
    }
    if (event.timeStamp - lastTrailTime > 48) {
      const trail = document.createElement("span");
      trail.className = "cursor-trail";
      trail.style.left = `${mouseX}px`;
      trail.style.top = `${mouseY}px`;
      document.body.appendChild(trail);
      trail.addEventListener("animationend", () => trail.remove());
      lastTrailTime = event.timeStamp;
    }
  });

  document.addEventListener("click", (event) => {
    const bubble = document.createElement("span");
    const colors = ["#7468c7", "#58a9c9", "#ed7056", "#62b58e", "#c58ad8"];
    bubble.className = "click-bubble";
    bubble.style.left = `${event.clientX}px`;
    bubble.style.top = `${event.clientY}px`;
    bubble.style.setProperty("--bubble-color", colors[Math.floor(Math.random() * colors.length)]);
    document.body.appendChild(bubble);
    bubble.addEventListener("animationend", () => bubble.remove());
  });

  document.querySelector("#resume")?.addEventListener("click", (event) => {
    const starColors = ["#7468c7", "#edc65b", "#ffffff", "#c58ad8"];
    for (let index = 0; index < 5 + Math.floor(Math.random() * 4); index += 1) {
      const star = document.createElement("span");
      star.className = "resume-star";
      star.textContent = "✦";
      star.style.left = `${event.clientX}px`;
      star.style.top = `${event.clientY}px`;
      star.style.setProperty("--star-color", starColors[Math.floor(Math.random() * starColors.length)]);
      star.style.setProperty("--star-x", `${(Math.random() - 0.5) * 180}px`);
      star.style.setProperty("--star-y", `${(Math.random() - 0.5) * 180}px`);
      star.style.setProperty("--star-delay", `${Math.random() * 0.08}s`);
      document.body.appendChild(star);
      star.addEventListener("animationend", () => star.remove());
    }
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.24;
    ringY += (mouseY - ringY) * 0.24;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("a, button, .magnetic").forEach((element) => {
    element.addEventListener("mouseenter", () => cursorRing.classList.add("active"));
    element.addEventListener("mouseleave", () => cursorRing.classList.remove("active"));
  });
  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const moveX = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
      const moveY = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    element.addEventListener("mouseleave", () => { element.style.transform = ""; });
  });
}


const resumeModal = document.querySelector("#resumeModal");
const resumeFrame = document.querySelector("#resumeFrame");
const viewResume = document.querySelector("#viewResume");
const downloadResume = document.querySelector("#downloadResume");
const openResumeTab = document.querySelector("#openResumeTab");
const modalDownloadResume = document.querySelector("#modalDownloadResume");
const resumeUpload = document.querySelector("#resumeUpload");
const resumeUploadStatus = document.querySelector("#resumeUploadStatus");
let uploadedResumeUrl = "";
let currentResumeUrl = "assets/Akanksha_Devops.pdf";
let currentResumeName = "Akanksha_Devops.pdf";

function openResume() {
  resumeFrame.src = `${currentResumeUrl}#view=FitH`;
  resumeModal.classList.add("open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeResume() {
  resumeModal.classList.remove("open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resumeFrame.removeAttribute("src");
}

const updateResumeLinks = () => {
  [viewResume, downloadResume, openResumeTab, modalDownloadResume].forEach((link) => {
    if (!link) return;
    link.href = currentResumeUrl;
  });
  [downloadResume, modalDownloadResume].forEach((link) => {
    if (link) link.download = currentResumeName;
  });
};

resumeUpload?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    resumeUploadStatus.textContent = "Please choose a PDF file to upload.";
    resumeUpload.value = "";
    return;
  }

  if (uploadedResumeUrl) URL.revokeObjectURL(uploadedResumeUrl);
  uploadedResumeUrl = URL.createObjectURL(file);
  currentResumeUrl = uploadedResumeUrl;
  currentResumeName = file.name;
  updateResumeLinks();
  resumeUploadStatus.textContent = `Using uploaded resume: ${file.name}`;
});

window.addEventListener("beforeunload", () => {
  if (uploadedResumeUrl) URL.revokeObjectURL(uploadedResumeUrl);
});

document.querySelectorAll("[data-open-resume]").forEach((el) => {
  el.addEventListener("click", (e) => {
    // On phones, PDF iframes don't render, so let the link open the PDF in a new tab
    if (window.matchMedia("(max-width: 800px)").matches) return;
    e.preventDefault();
    openResume();
  });
});
document.querySelector("#closeResume").addEventListener("click", closeResume);
resumeModal.addEventListener("click", (e) => {
  if (e.target === resumeModal) closeResume();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && resumeModal.classList.contains("open")) closeResume();
});

updateResumeLinks();