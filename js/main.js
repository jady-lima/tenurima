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

  let isDragging = false;
  let dragMoved = false;
  let dragStartX = 0;
  let dragStartOffset = 0;
  let activePointerId = null;

  function getCurrentOffset() {
    if (peekModeQuery.matches) {
      const slideWidth = slides[0].getBoundingClientRect().width;
      const inset = Math.max((viewport.clientWidth - slideWidth) / 2, 0);
      return Math.min(Math.max(index * getStep() - inset, 0), getMaxOffset());
    }
    return offset;
  }

  function onPointerDown(e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;

    isDragging = true;
    dragMoved = false;
    dragStartX = e.clientX;
    dragStartOffset = getCurrentOffset();
    activePointerId = e.pointerId;

    viewport.classList.add("is-dragging");
    track.classList.add("is-dragging");
    viewport.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging || e.pointerId !== activePointerId) return;

    const delta = e.clientX - dragStartX;
    if (Math.abs(delta) > 3) dragMoved = true;

    const maxOffset = getMaxOffset();
    const newOffset = Math.min(Math.max(dragStartOffset - delta, 0), maxOffset);
    track.style.transform = `translateX(-${newOffset}px)`;
  }

  function endDrag(e) {
    if (!isDragging || e.pointerId !== activePointerId) return;
    isDragging = false;

    viewport.classList.remove("is-dragging");
    track.classList.remove("is-dragging");

    const delta = e.clientX - dragStartX;

    if (peekModeQuery.matches) {
      const threshold = getStep() * 0.15;
      if (delta < -threshold) {
        index = Math.min(index + 1, slides.length - 1);
      } else if (delta > threshold) {
        index = Math.max(index - 1, 0);
      }
    } else {
      offset = dragStartOffset - delta;
    }

    update();
  }

  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove);
  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);

  viewport.addEventListener("click", (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

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

function supportsExclusiveDetails() {
  const a = document.createElement("details");
  const b = document.createElement("details");
  a.name = b.name = "__exclusive-details-test__";
  document.body.append(a, b);
  a.open = true;
  b.open = true;
  const supported = !a.open;
  a.remove();
  b.remove();
  return supported;
}

document.addEventListener("DOMContentLoaded", () => {
  if (supportsExclusiveDetails()) return;

  document.querySelectorAll(".faq-list").forEach((list) => {
    const items = Array.from(list.querySelectorAll(".faq-item"));

    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  });
});
