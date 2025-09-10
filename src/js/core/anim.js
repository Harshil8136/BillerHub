/**
 * ANIMATION UTILITY
 * ==================
 * This file provides a centralized module for handling small, reusable
 * micro-animations using the GSAP library, as outlined in the approved plan.
 *
 * All animations are designed to be safe: they will only run if the GSAP
 * library has been successfully loaded from the CDN. This prevents errors
 * if the external resource fails, allowing the UI to degrade gracefully.
 */

const Anim = {
  /**
   * Applies a subtle "slide up and fade in" entrance animation to an element.
   * This is ideal for newly rendered content like the main biller card.
   * @param {HTMLElement} element The DOM element to animate.
   */
  enterCard(element) {
    // Safety check: only proceed if GSAP is loaded and the element exists.
    if (window.gsap && element) {
      gsap.from(element, {
        duration: 0.22, // Corresponds to the plan's --motion-duration-md
        y: 8,
        opacity: 0,
        ease: "power2.out",
      });
    }
  },

  /**
   * Applies a simple and quick fade-in effect to an element.
   * Useful for lists or content that appears without a position change,
   * such as the search suggestions dropdown.
   * @param {HTMLElement} element The DOM element to animate.
   */
  fadeList(element) {
    // Safety check: only proceed if GSAP is loaded and the element exists.
    if (window.gsap && element) {
      gsap.fromTo(
        element,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.16 // Corresponds to the plan's --motion-duration-sm
        }
      );
    }
  },

  /**
   * Animates the expand/collapse of the Area Lookup input field.
   * @param {boolean} isActive - True to expand the input, false to collapse it.
   */
  toggleAreaLookup(isActive) {
    if (window.gsap) {
      if (isActive) {
        // Expand animation
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
        // Collapse animation
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
    }
  },
};

// Expose the Anim object to the global window scope for use in other scripts,
// maintaining compatibility with the project's architecture.
window.Anim = Anim;