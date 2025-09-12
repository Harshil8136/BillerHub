/**
 * ANIMATION UTILITY
 * ==================
 * This file provides a centralized module for handling small, reusable
 * micro-animations using the GSAP library. All animations respect the
 * user's motion preferences.
 */

const Anim = {
  _prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

  /**
   * Applies a subtle "slide up and fade in" entrance animation to an element.
   * @param {HTMLElement} element The DOM element to animate.
   */
  enterCard(element) {
    if (this._prefersReducedMotion || !window.gsap || !element) return;

    gsap.from(element, {
      duration: 0.4,
      y: 10,
      opacity: 0,
      ease: "power2.out",
    });
  },

  /**
   * Applies a simple and quick fade-in effect to an element.
   * @param {HTMLElement} element The DOM element to animate.
   */
  fadeList(element) {
    if (this._prefersReducedMotion || !window.gsap || !element) return;

    gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.2
      }
    );
  },

  /**
   * Applies a "flip-in" entrance animation for cards like the area lookup result.
   * @param {HTMLElement} element The DOM element to animate.
   */
  enterCardFlip(element) {
      if (!element) return;
      if (this._prefersReducedMotion || !window.gsap) {
          gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 0.2 });
          return;
      }
      gsap.from(element, {
          duration: 0.3,
          opacity: 0,
          rotationX: -10,
          transformOrigin: 'top center',
          ease: 'power2.out'
      });
  },

  /**
   * Animates the expand/collapse of the Area Lookup input field.
   * @param {boolean} isActive - True to expand the input, false to collapse it.
   */
  toggleAreaLookup(isActive) {
    if (this._prefersReducedMotion || !window.gsap) {
      // If motion is disabled, just toggle visibility instantly via CSS
      dom.areaLookupInput.style.width = isActive ? '180px' : '0';
      dom.areaLookupInput.style.opacity = isActive ? '1' : '0';
      return;
    }

    if (isActive) {
      gsap.to(dom.areaLookupInput, {
        width: 180,
        opacity: 1,
        paddingLeft: '8px',
        paddingRight: '8px',
        borderWidth: '1px',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(dom.areaLookupInput, {
        width: 0,
        opacity: 0,
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: 0,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
  },
};

window.Anim = Anim;