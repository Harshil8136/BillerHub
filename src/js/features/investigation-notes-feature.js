/**
 * INVESTIGATION NOTES FEATURE
 * ==================
 * UPDATED: The "Copy All" and "Copy for TLs" functions now wrap their
 * output in a Markdown code block (```). This is the definitive fix to
 * ensure text pastes as a multi-line block in chat applications.
 *
 * This module contains all the business logic for the Investigation Notes panel.
 */

Features.InvestigationNotes = {
    LS_KEY: 'biller-hub-investigation-notes-v1',
    isInitialized: false,
    
    fields: [
        { id: 'processingFee', label: 'Processing fee/amount of charge –' },
        { id: 'dateAppeared', label: 'Date charge appeared –' },
        { id: 'mop', label: 'MOP (Debit/Credit/ACH) –' },
        { id: 'mopLast4', label: 'Last 4 digits of the MOP -' },
        { id: 'location', label: 'What country/state/province does the customer live in?' },
        { id: 'customerName', label: 'Customer’s name –' },
        { id: 'customerPhone', label: "Customer's phone # -" },
        { id: 'customerEmail', label: "Customer's email (Optional)" }
    ],

    /**
     * Initializes the feature by attaching event listeners to the form controls
     * within the Fee Tool modal, including new formatters.
     */
    init() {
        if (this.isInitialized || !dom.feeToolModal) return;

        const form = dom.feeToolModal.querySelector('.investigation-notes-form');
        if (!form) return;

        const debouncedSave = Utils.debounce(() => this.save(form), 250);

        // --- Attach General Listeners ---
        form.querySelectorAll('.notes-input, .notes-select').forEach(input => {
            input.addEventListener('input', debouncedSave);
        });
        
        form.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            
            if (target.classList.contains('notes-copy-line')) this.handleCopyLine(target);
            else if (target.classList.contains('notes-copy-all')) this.handleCopyAll(form);
            else if (target.classList.contains('notes-clear')) this.handleClear(form);
            else if (target.classList.contains('notes-tl-copy')) this.handleCopyForTL(form);
            else if (target.classList.contains('notes-dcs-copy')) this.handleCopyForDCS(form);
        });

        // --- Attach Specific Field Formatters ---
        const amountInput = form.querySelector('#processingFee');
        amountInput?.addEventListener('blur', (e) => this._formatAmount(e.target, debouncedSave));

        const phoneInput = form.querySelector('#customerPhone');
        phoneInput?.addEventListener('input', (e) => this._formatPhone(e.target));
        
        this.load(form);
        this.isInitialized = true;
    },
    
    save(form) {
        const data = {};
        this.fields.forEach(field => {
            const input = form.querySelector(`#${field.id}`);
            if (input) data[field.id] = input.value;
        });
        Utils.storageSet(this.LS_KEY, data);
    },

    load(form) {
        const savedData = Utils.storageGet(this.LS_KEY);
        if (savedData) {
            this.fields.forEach(field => {
                const input = form.querySelector(`#${field.id}`);
                if (input && savedData[field.id] != null) {
                    input.value = savedData[field.id];
                }
            });
        }
    },
    
    async handleCopyLine(button) {
        const fieldId = button.dataset.field;
        const field = this.fields.find(f => f.id === fieldId);
        const input = dom.feeToolModal.querySelector(`#${fieldId}`);
        if (!field || !input) return;

        const valueToCopy = input.value.trim();
        const success = await Utils.copyToClipboard(valueToCopy);

        if (success) {
            UI.Toasts.show(`${field.label} value copied`);
        } else {
            UI.Toasts.show('Copy failed.', 'error');
        }
    },

    async handleCopyAll(form) {
        const lines = this.fields.map(field => {
            const input = form.querySelector(`#${field.id}`);
            const value = input ? input.value.trim() : '';
            return value ? `${field.label} ${value}` : null;
        }).filter(Boolean);

        const markdownList = lines.map(line => `* ${line}`).join('\n');
        const fullText = "```\n" + markdownList + "\n```";
        const success = await Utils.copyToClipboard(fullText);
        
        if (success) {
            UI.Toasts.show('Copied as a formatted block for chat');
        } else {
            UI.Toasts.show('Copy failed.', 'error');
        }
    },
    
    async handleCopyForTL(form) {
        const header = "Hello Tl's. Could I get some assistance with this processing fee:";
        const lines = this.fields.map(field => {
            const input = form.querySelector(`#${field.id}`);
            const value = input ? input.value.trim() : '';
            return value ? `${field.label} ${value}` : null;
        }).filter(Boolean);
        
        const markdownList = lines.map(line => `* ${line}`).join('\n');
        const message = "```\n" + `${header}\n\n${markdownList}` + "\n```";
        const success = await Utils.copyToClipboard(message);
        
        if (success) {
            UI.Toasts.show('TL message copied as a formatted block');
        } else {
            UI.Toasts.show('Copy failed.', 'error');
        }
    },
    
    async handleCopyForDCS(form) {
        const amountInput = form.querySelector('#processingFee');
        const dateInput = form.querySelector('#dateAppeared');

        const amountValue = amountInput ? amountInput.value.trim() : '';
        const dateValue = dateInput ? dateInput.value.trim() : '';

        if (!amountValue || !dateValue) {
            UI.Toasts.show('Amount and Date are required for this feature.', 'error');
            return;
        }

        const dateParts = dateValue.split('/');
        if (dateParts.length !== 3 || dateParts[2].length !== 4 || isNaN(parseInt(dateParts[0])) || isNaN(parseInt(dateParts[1])) || isNaN(parseInt(dateParts[2]))) {
            UI.Toasts.show('Invalid date format. Please use MM/DD/YYYY.', 'error');
            return;
        }
        
        const [month, day, year] = dateParts;
        
        const dataToCopy = [amountValue, amountValue, month, day, year, month, day, year].join('\t');
        const success = await Utils.copyToClipboard(dataToCopy);

        if (success) {
            UI.Toasts.show("Copied! Paste into the 'From:' amount field.");
        } else {
            UI.Toasts.show('Copy failed.', 'error');
        }
    },

    handleClear(form) {
        form.querySelectorAll('.notes-input, .notes-select').forEach(input => input.value = '');
        localStorage.removeItem(this.LS_KEY);
        UI.Toasts.show('Notes cleared');
    },

    _formatAmount(inputElement, saveCallback) {
        const value = inputElement.value.trim();
        if (value === '') return;

        const number = parseFloat(value);
        if (!isNaN(number)) {
            inputElement.value = number.toFixed(2);
            saveCallback();
        }
    },
    
    _formatPhone(inputElement) {
        const formatted = this._formatPhoneNumber(inputElement.value);
        inputElement.value = formatted;
    },

    _formatPhoneNumber(value) {
        if (!value) return '';
        let digits = value.replace(/\D/g, '');

        if (digits.startsWith('1')) {
            digits = digits.substring(1);
        }

        digits = digits.substring(0, 10);

        const areaCode = digits.substring(0, 3);
        const middle = digits.substring(3, 6);
        const last = digits.substring(6, 10);

        if (digits.length > 6) {
            return `${areaCode}-${middle}-${last}`;
        } else if (digits.length > 3) {
            return `${areaCode}-${middle}`;
        } else if (digits.length > 0) {
            return areaCode;
        }
        return '';
    }
};``` Hello Tl's. Could I get some assistance with this processing fee: * Processing fee/amount of charge – 2.73 * Date charge appeared – 07/07/2002 * Customer's phone # - 234-545-3645 ```