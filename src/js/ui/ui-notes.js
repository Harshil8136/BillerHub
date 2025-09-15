/**
 * UI NOTES
 * ==================
 * This file contains the complete, self-contained rendering engine for the
 * interactive notes component. It detects the note type (stateless, stateful,
 * or composite) and routes to the correct renderer.
 */

UI_Notes = {

  render(notes) {
    const container = dom.billerCard.querySelector('#interactiveNotesContainer');
    if (!container) return;
    if (!notes) {
      container.innerHTML = `<p class="empty-state">No detailed notes available for this biller.</p>`;
      return;
    }

    let noteType = 'stateless';
    if (notes.services) noteType = 'composite';
    else if (notes.states) noteType = 'stateful';
    
    const noteKeys = Object.keys(notes);
    NotesFeature.activeCategory = noteKeys.includes('all') ? 'all' : noteKeys[0];

    switch (noteType) {
      case 'composite': this._renderCompositeBillerNotes(container, notes, NotesFeature.activeCategory); break;
      case 'stateful': this._renderStatefulNotes(container, notes); break;
      default: this._renderStatelessNotes(container, notes, NotesFeature.activeCategory); break;
    }
  },

  _renderStatelessNotes(container, notes, activeCategory) {
    const buttonsHtml = Object.keys(notes).map(key => {
      const category = notes[key];
      const isActive = key === activeCategory;
      return `<button role="tab" aria-selected="${isActive}" id="tab-${key}" class="notes-tab-button color-${category.color || 'secondary'} ${isActive ? 'active' : ''}" data-category="${key}">${category.title}</button>`;
    }).join('');

    container.innerHTML = `<div class="notes-tabs" role="tablist">${buttonsHtml}</div><div id="notesContentWrapper" role="tabpanel" aria-labelledby="tab-${activeCategory}"></div>`;
    this._renderStatelessContent(notes, activeCategory);
    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => NotesFeature.handleCategoryClick(e.currentTarget.dataset.category));
    });
  },

  _renderCompositeBillerNotes(container, notes, activeCategory) {
    const tabsHtml = Object.keys(notes).map(key => {
        const tabData = notes[key];
        const title = key === 'services' ? 'Service Details' : tabData.title;
        const color = key === 'services' ? 'info' : tabData.color;
        const isActive = key === activeCategory;
        return `<button role="tab" aria-selected="${isActive}" id="tab-${key}" class="notes-tab-button color-${color || 'secondary'} ${isActive ? 'active' : ''}" data-category="${key}">${title}</button>`;
    }).join('');

    container.innerHTML = `<div class="notes-tabs" role="tablist">${tabsHtml}</div><div id="notesContentWrapper" class="notes-section" role="tabpanel" aria-labelledby="tab-${activeCategory}"></div>`;
    this._renderCompositeContent(notes, activeCategory);
    container.querySelectorAll('.notes-tab-button').forEach(button => {
      button.addEventListener('click', (e) => this.updateCompositeView(notes, e.currentTarget));
    });
  },
  
  _renderCompositeContent(notes, category) {
    const wrapper = dom.billerCard.querySelector('#notesContentWrapper');
    if (!wrapper) return;
    let contentHtml = '';
    if (category === 'services') {
        contentHtml = Object.keys(notes.services).map(serviceKey => {
            const service = notes.services[serviceKey];
            return `<div class="accordion"><button class="accordion-header">${service.name}</button><div class="accordion-content">${service.content || service.notes || ''}</div></div>`;
        }).join('');
    } else if (notes[category]) {
        const note = notes[category];
        contentHtml = `<div class="notes-content color-border-${note.color}">${note.content}</div>`;
    }
    wrapper.innerHTML = contentHtml;
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
      parent.querySelectorAll('.notes-tab-button').forEach(btn => btn.classList.toggle('active', btn === activeButton));
      Telemetry.logEvent('notes_tab_view', { tab: activeButton.dataset.category || activeButton.dataset.stateKey });
  },

  updateContent(notes, activeCategory) {
    const button = document.querySelector(`.notes-tab-button[data-category="${activeCategory}"]`);
    if (button) {
        this.updateActiveTab(button);
        this._renderStatelessContent(notes, activeCategory);
    }
  },

  updateCompositeView(notes, button) {
    this.updateActiveTab(button);
    this._renderCompositeContent(notes, button.dataset.category);
  },

  _attachInteractiveListeners(parentElement) {
    parentElement.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + 'px';
      });
    });
    parentElement.querySelectorAll('.copyable-phone').forEach(el => {
      el.addEventListener('click', (e) => UI.BillerCard.handleCopy(e.currentTarget));
    });
  }
};