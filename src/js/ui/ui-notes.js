/**
 * UI NOTES
 * ==================
 * This file is responsible for all DOM manipulation related to the
 * interactive notes component.
 */

const UI_Notes = {

  render(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    if (!notes) {
      container.innerHTML = `<p>No detailed notes available for this biller.</p>`;
      return;
    }

    if (notes.states) {
      this._renderStatefulNotes(container, notes);
    } else {
      this._renderStatelessNotes(container, notes, activeCategory);
    }
  },

  _renderStatelessNotes(container, notes, activeCategory) {
    const categories = { all: { title: 'ALL', color: 'primary' }, ...notes };
    const buttonsHtml = Object.keys(categories).map(key => {
      const category = categories[key];
      const isActive = key === activeCategory ? 'active' : '';
      return `<button class="notes-tab-button color-${category.color} ${isActive}" data-category="${key}">${category.title}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="notes-tabs" role="tablist">${buttonsHtml}</div>
      <div id="statelessNotesContentWrapper"></div>
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
      return `<button class="notes-tab-button color-primary ${index === 0 ? 'active' : ''}" data-state-key="${key}">${stateName}</button>`;
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
      <div id="stateSpecificContent"></div>
      ${additionalNotesHtml}
    `;
    
    this._renderStateContent(notes, stateKeys[0]);
    
    container.querySelectorAll('.notes-tab-button[data-state-key]').forEach(button => {
      button.addEventListener('click', (e) => {
        container.querySelectorAll('.notes-tab-button[data-state-key]').forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this._renderStateContent(notes, e.currentTarget.dataset.stateKey);
      });
    });

    this._attachInteractiveListeners(container);
  },

  _renderStateContent(notes, stateKey) {
    const state = notes.states[stateKey];
    const contentContainer = document.getElementById('stateSpecificContent');
    if (!contentContainer) return;

    const contentHtml = `
      <div class="notes-content color-border-primary">
        <h4>${state.name} Overview</h4>
        <ul>
          <li><strong>Website:</strong> <a href="${state.website}" target="_blank" rel="noopener noreferrer">${state.website}</a></li>
          <li><strong>Account Format:</strong> ${state.account_format}</li>
        </ul>
        ${state.content}
      </div>
    `;
    contentContainer.innerHTML = contentHtml;
    this._attachInteractiveListeners(contentContainer);
  },

  _renderStatelessContent(notes, activeCategory) {
    const wrapper = dom.billerCard.querySelector('#statelessNotesContentWrapper');
    if (!wrapper) return;

    let finalHtml = '';
    if (activeCategory === 'all') {
        finalHtml = Object.keys(notes).map(key => {
            const note = notes[key];
            return `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
        }).join('');
    } else if (notes[activeCategory]) {
        const note = notes[activeCategory];
        finalHtml = `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
    }
    
    wrapper.innerHTML = finalHtml;
    this._attachInteractiveListeners(wrapper);
  },

  update(notes, activeCategory) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;

    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.classList.toggle('active', button.dataset.category === activeCategory);
    });
    this._renderStatelessContent(notes, activeCategory);
  },

  _attachInteractiveListeners(parentElement) {
    this._initCopyablePhones(parentElement);
    this._initAccordions(parentElement);
    this._initTableFilters(parentElement);
  },

  _initCopyablePhones(parentElement) {
    parentElement.querySelectorAll('.copyable-phone').forEach(phoneEl => {
      if (phoneEl.dataset.listenerAttached) return;
      phoneEl.dataset.listenerAttached = 'true';
      phoneEl.addEventListener('click', () => { /* copy logic */ });
    });
  },

  _initAccordions(parentElement) {
    parentElement.querySelectorAll('.accordion-header').forEach(accordion => {
      if (accordion.dataset.listenerAttached) return;
      accordion.dataset.listenerAttached = 'true';
      accordion.addEventListener('click', () => {
        accordion.classList.toggle('active');
        const content = accordion.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  },

  _initTableFilters(parentElement) {
    parentElement.querySelectorAll('.notes-filter-controls').forEach(controls => {
        const table = controls.nextElementSibling?.querySelector('table');
        if (!table) return;
        // ... filter logic
    });
  }
};