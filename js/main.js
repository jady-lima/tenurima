document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".testimonials-carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".testimonials-viewport");
  const track = carousel.querySelector(".testimonials-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".testimonials-btn--prev");
  const nextBtn = carousel.querySelector(".testimonials-btn--next");

  if (!viewport || !track || !prevBtn || !nextBtn || slides.length === 0) return;

  const peekModeQuery = window.matchMedia("(max-width: 900px)");

  let offset = 0; 
  let index = 0;

  function getStep() {
    if (slides.length < 2) return viewport.clientWidth;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  function getMaxOffset() {
    return Math.max(track.scrollWidth - viewport.clientWidth, 0);
  }

  function update() {
    const maxOffset = getMaxOffset();

    if (peekModeQuery.matches) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const inset = Math.max((viewport.clientWidth - slideWidth) / 2, 0);
      const target = Math.min(Math.max(index * getStep() - inset, 0), maxOffset);

      track.style.transform = `translateX(-${target}px)`;
      prevBtn.disabled = index <= 0;
      nextBtn.disabled = index >= slides.length - 1;
    } else {
      offset = Math.min(Math.max(offset, 0), maxOffset);

      track.style.transform = `translateX(-${offset}px)`;
      prevBtn.disabled = offset <= 0;
      nextBtn.disabled = offset >= maxOffset;
    }
  }

  prevBtn.addEventListener("click", () => {
    if (peekModeQuery.matches) {
      index = Math.max(index - 1, 0);
    } else {
      offset -= getStep();
    }
    update();
  });

  nextBtn.addEventListener("click", () => {
    if (peekModeQuery.matches) {
      index = Math.min(index + 1, slides.length - 1);
    } else {
      offset += getStep();
    }
    update();
  });

  window.addEventListener("resize", update);

  update();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".info-footer-track").forEach((track) => {
    const footer = track.parentElement;
    const originalNodes = Array.from(track.children);

    if (originalNodes.length === 0) return;

    while (track.scrollWidth < footer.clientWidth) {
      originalNodes.forEach((node) => track.appendChild(node.cloneNode(true)));
    }

    Array.from(track.children).forEach((node) => track.appendChild(node.cloneNode(true)));
  });
});
