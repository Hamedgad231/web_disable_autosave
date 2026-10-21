import { useBus } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";

import { askDiscardChanges } from "./discard_dialog";

patch(FormController.prototype, {
    setup() {
        super.setup(...arguments);
        // A field being typed in isn't committed to the record yet
        this.fieldIsDirty = false;
        useBus(this.model.bus, "FIELD_IS_DIRTY", (ev) => (this.fieldIsDirty = ev.detail));
    },

    /**
     * Discard the changes of the record after the user confirmed it.
     * @returns {Promise<boolean>} true when there is nothing left to save
     */
    async confirmDiscardChanges() {
        const root = this.model.root;
        if (!(await root.isDirty())) {
            return true;
        }
        const discard = await askDiscardChanges(this.dialogService);
        if (discard) {
            await root.discard();
        }
        return discard;
    },

    async beforeVisibilityChange() {
        // Don't save when switching to another browser tab
    },

    async beforeLeave({ forceLeave } = {}) {
        if (forceLeave) {
            return true;
        }
        return this.confirmDiscardChanges();
    },

    beforeUnload(ev) {
        // Reload or close of the browser tab: let the browser ask, never save
        const root = this.model.root;
        if (root && (root.dirty || this.fieldIsDirty)) {
            ev.preventDefault();
            ev.returnValue = "Unsaved changes";
        }
    },

    async onPagerUpdate() {
        if (await this.confirmDiscardChanges()) {
            return super.onPagerUpdate(...arguments);
        }
    },

    async create() {
        if (await this.confirmDiscardChanges()) {
            return super.create(...arguments);
        }
    },
});
