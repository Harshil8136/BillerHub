/**
 * UI NOTES
 * ==================
 * This file is responsible for all DOM manipulation related to the
 * interactive notes component. It renders the tabs and content panels.
 */

const UI_Notes = {

  /**
   * Performs the initial full render of the notes component.
   * @param {object} notes - The notes data object for the current biller.
   * @param {string} activeCategory - The key of the category to display initially.
   */
  render(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    if (!notes) {
      container.innerHTML = `<p>No detailed notes available for this biller.</p>`;
      return;
    }

    // Create category buttons (tabs)
    const categories = { all: { title: 'ALL', color: 'primary' }, ...notes };
    const buttonsHtml = Object.keys(categories).map(key => {
      const category = categories[key];
      const isActive = key === activeCategory ? 'active' : '';
      return `<button class="notes-tab-button color-${category.color} ${isActive}" data-category="${key}">
                ${category.title}
              </button>`;
    }).join('');

    // Assemble the full component HTML
    container.innerHTML = `
      <div class="notes-tabs">${buttonsHtml}</div>
      <div class="notes-content"></div>
    `;

    // Render the content for the initially active category
    this.renderContent(notes, activeCategory);

    // Attach event listeners to the newly created buttons
    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        NotesFeature.handleCategoryClick(e.currentTarget.dataset.category);
      });
    });
  },

  /**
   * Updates the component when a new category is selected.
   * @param {object} notes - The notes data object.
   * @param {string} activeCategory - The key of the newly selected category.
   */
  update(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    // Update the active state on buttons
    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.classList.toggle('active', button.dataset.category === activeCategory);
    });

    // Re-render just the content panel
    this.renderContent(notes, activeCategory);
  },

  /**
   * Renders the HTML content for the selected category into the content panel.
   * @param {object} notes - The notes data object.
   * @param {string} activeCategory - The key of the category to display.
   */
  renderContent(notes, activeCategory) {
    const contentPanel = dom.billerCard.querySelector('.notes-content');
    if (!contentPanel) return;

    let finalHtml = '';

    if (activeCategory === 'all') {
      // If 'all' is selected, concatenate the content of all categories
      for (const key in notes) {
        finalHtml += notes[key].content;
      }
    } else if (notes[activeCategory]) {
      // Otherwise, show the content for the specific category
      finalHtml = notes[activeCategory].content;
    }
    
    const categoryColor = activeCategory === 'all' ? 'primary' : notes[activeCategory]?.color || 'secondary';
    contentPanel.className = `notes-content color-border-${categoryColor}`;
    contentPanel.innerHTML = finalHtml;

    // After rendering, attach listeners for any interactive elements like phone numbers
    this.attachCopyListeners(contentPanel);
  },

  /**
   * Attaches click-to-copy functionality to phone numbers.
   * @param {HTMLElement} parentElement - The element to search within for phone numbers.
   */
  attachCopyListeners(parentElement) {
    parentElement.querySelectorAll('.copyable-phone').forEach(phoneEl => {
      phoneEl.addEventListener('click', () => {
        const phoneNumber = phoneEl.textContent;
        navigator.clipboard.writeText(phoneNumber).then(() => {
          // Provide visual feedback
          const originalText = phoneEl.innerHTML;
          phoneEl.innerHTML = 'Copied!';
          phoneEl.classList.add('copied');
          setTimeout(() => {
            phoneEl.innerHTML = originalText;
            phoneEl.classList.remove('copied');
          }, 1200);
        }).catch(err => console.error('Failed to copy phone number:', err));
      });
    });
  }
};