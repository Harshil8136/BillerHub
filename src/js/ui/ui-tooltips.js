/**
 * UI TOOLTIPS
 * ==================
 * This new module manages a dynamic, JavaScript-driven tooltip system
 * that ensures tooltips always render within the viewport. It replaces the
 * previous pure-CSS implementation.
 */

UI.Tooltips = {
    tooltipElement: null,
    
    /**
     * Initializes the tooltip system by finding all tooltip triggers
     * and attaching the necessary event listeners for mouse and keyboard.
     */
    init() {
        this.tooltipElement = dom.globalTooltip;
        if (!this.tooltipElement) {
            console.warn('Global tooltip element not found. Tooltips will not function.');
            return;
        }

        const triggers = document.querySelectorAll('[data-tooltip]');
        triggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', (e) => this.show(e.currentTarget));
            trigger.addEventListener('mouseleave', () => this.hide());
            trigger.addEventListener('focusin', (e) => this.show(e.currentTarget));
            trigger.addEventListener('focusout', () => this.hide());
        });
    },

    /**
     * Shows and positions the global tooltip.
     * @param {HTMLElement} triggerElement The element that triggered the tooltip.
     */
    show(triggerElement) {
        if (!this.tooltipElement || !triggerElement.dataset.tooltip) return;
        
        this.tooltipElement.textContent = triggerElement.dataset.tooltip;
        this.tooltipElement.classList.add('is-visible');

        // Defer positioning to the next frame to ensure the tooltip has its final dimensions.
        requestAnimationFrame(() => {
            // This function will be added to positioning.js to calculate the best placement.
            Positioning.positionTooltip(triggerElement, this.tooltipElement);
        });
    },

    /**
     * Hides the global tooltip.
     */
    hide() {
        if (!this.tooltipElement) return;
        this.tooltipElement.classList.remove('is-visible');
    }
};