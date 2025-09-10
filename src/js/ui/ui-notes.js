/**
 * UI NOTES
 * ==================
 * This file contains the complete, self-contained rendering engine for the
 * interactive notes component. It detects the note type (stateless, stateful,
 * or composite) and routes to the correct renderer.
 */

const UI_Notes = {

  render(notes) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    if (!notes) {
      container.innerHTML = `<p class="empty-state">No detailed notes available for this biller.</p>`;
      return;
    }

    let noteType = 'stateless';
    if (notes.services) {
        noteType = 'composite';
    } else if (notes.states) {
        noteType = 'stateful';
    }
    
    // Set the initial active category. Default to 'all' if it exists, otherwise the first tab.
    const noteKeys = Object.keys(notes);
    NotesFeature.activeCategory = noteKeys.includes('all') ? 'all' : noteKeys[0];

    switch (noteType) {
      case 'composite':
        this._renderCompositeBillerNotes(container, notes, NotesFeature.activeCategory);
        break;
      case 'stateful':
        this._renderStatefulNotes(container, notes);
        break;
      case 'stateless':
      default:
        this._renderStatelessNotes(container, notes, NotesFeature.activeCategory);
        break;
    }
  },

  _renderStatelessNotes(container, notes, activeCategory) {
    const buttonsHtml = Object.keys(notes).map(key => {
      const category = notes[key];
      const isActive = key === activeCategory;
      return `<button role="tab" aria-selected="${isActive}" id="tab-${key}" class="notes-tab-button color-${category.color || 'secondary'} ${isActive ? 'active' : ''}" data-category="${key}">${category.title}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="notes-tabs" role="tablist">${buttonsHtml}</div>
      <div id="notesContentWrapper" role="tabpanel" aria-labelledby="tab-${activeCategory}"></div>
    `;

    this._renderStatelessContent(notes, activeCategory);

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => NotesFeature.handleCategoryClick(e.currentTarget.dataset.category));
    });
  },

  _renderStatefulNotes(container, notes) {
    const stateKeys = Object.keys(notes.states);
    const stateTabsHtml = stateKeys.map((key, index) => {
      const stateName = notes.states[key].name;
      const isActive = index === 0;
      return `<button role="tab" aria-selected="${isActive}" id="tab-${key}" class="notes-tab-button color-primary ${isActive ? 'active' : ''}" data-state-key="${key}">${stateName}</button>`;
    }).join('');

    let additionalNotesHtml = '';
    for (const key in notes) {
      if (key !== 'states') {
        additionalNotesHtml += `<div class="notes-section">
                                  <h3>${notes[key].title}</h3>
                                  <div class="notes-content color-border-${notes[key].color}">${notes[key].content}</div>
                                </div>`;
      }
    }

    container.innerHTML = `
      <h4>State-Specific Information</h4>
      <div class="notes-tabs" role="tablist">${stateTabsHtml}</div>
      <div id="notesContentWrapper" role="tabpanel" aria-labelledby="tab-${stateKeys[0]}"></div>
      ${additionalNotesHtml}
    `;

    this._renderStateContent(notes, stateKeys[0]);

    container.querySelectorAll('.notes-tab-button[data-state-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        const stateKey = e.currentTarget.dataset.stateKey;
        this.updateActiveTab(e.currentTarget);
        this._renderStateContent(notes, stateKey);
      });
    });
  },

  _renderCompositeBillerNotes(container, notes, activeCategory) {
    const tabKeys = Object.keys(notes);
    const tabsHtml = tabKeys.map(key => {
        const tabData = notes[key];
        const title = key === 'services' ? 'Service Details' : tabData.title;
        const color = key === 'services' ? 'info' : tabData.color;
        const isActive = key === activeCategory;
        return `<button role="tab" aria-selected="${isActive}" id="tab-${key}" class="notes-tab-button color-${color || 'secondary'} ${isActive ? 'active' : ''}" data-category="${key}">${title}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="notes-tabs" role="tablist">${tabsHtml}</div>
      <div id="notesContentWrapper" class="notes-section" role="tabpanel" aria-labelledby="tab-${activeCategory}"></div>
    `;

    this._renderCompositeContent(notes, activeCategory);

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.currentTarget.dataset.category;
        this.updateActiveTab(e.currentTarget);
        this._renderCompositeContent(notes, category);
      });
    });
  },
  
  _renderCompositeContent(notes, category) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    let contentHtml = '';
    if (category === 'services') {
        contentHtml = Object.keys(notes.services).map(serviceKey => {
            const service = notes.services[serviceKey];
            return `
                <div class="accordion">
                    <button class="accordion-header">${service.name}</button>
                    <div class="accordion-content">
                        ${service.content || service.notes || ''}
                    </div>
                </div>
            `;
        }).join('');
    } else if (notes[category]) {
        const note = notes[category];
        contentHtml = `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
    }

    wrapper.innerHTML = contentHtml;
    if (window.Anim) Anim.fadeList(wrapper);
    this._attachInteractiveListeners(wrapper);
  },

  _renderStateContent(notes, stateKey) {
    const state = notes.states[stateKey];
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    wrapper.innerHTML = `
      <div class="notes-content color-border-primary">
        <h4>${state.name} Overview</h4>
        ${state.content}
      </div>
    `;
    if (window.Anim) Anim.fadeList(wrapper);
    this._attachInteractiveListeners(wrapper);
  },

  _renderStatelessContent(notes, activeCategory) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;

    let finalHtml = '';
    if (notes[activeCategory]) {
      const note = notes[activeCategory];
      finalHtml = `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
    }

    wrapper.innerHTML = finalHtml;
    if (window.Anim) Anim.fadeList(wrapper);
    this._attachInteractiveListeners(wrapper);
  },
  
  updateActiveTab(activeButton) {
      const parent = activeButton.parentElement;
      parent.querySelectorAll('.notes-tab-button').forEach(btn => {
          const isActive = btn === activeButton;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', isActive);
      });
      const contentWrapper = document.getElementById('notesContentWrapper');
      if (contentWrapper) {
          contentWrapper.setAttribute('aria-labelledby', activeButton.id);
      }
  },

  /**
   * Public method called by the feature controller to update the view.
   * @param {object} notes The full notes object for the current biller.
   * @param {string} activeCategory The key of the tab to make active.
   */
  updateContent(notes, activeCategory) {
    const button = document.querySelector(`.notes-tab-button[data-category="${activeCategory}"]`);
    if (button) {
        this.updateActiveTab(button);
        this._renderStatelessContent(notes, activeCategory);
    }
  },

  _attachInteractiveListeners(parentElement) {
    parentElement.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });

    parentElement.querySelectorAll('.copyable-phone').forEach(el => {
      el.addEventListener('click', (e) => {
        UI.BillerCard.handleCopy(e.currentTarget);
      });
    });
  }
};