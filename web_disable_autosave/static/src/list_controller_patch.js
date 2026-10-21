import { useBus } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";
import { ListController } from "@web/views/list/list_controller";

import { askDiscardChanges } from "./discard_dialog";

patch(ListController.prototype, {
    setup() {
        super.setup(...arguments);
        // A field being typed in isn't committed to the edited row yet
        this.fieldIsDirty = false;
        useBus(this.model.bus, "FIELD_IS_DIRTY", (ev) => (this.fieldIsDirty = ev.detail));
    },

    async beforeLeave() {
        const editedRecord = this.model.root.editedRecord;
        if (editedRecord && (await editedRecord.isDirty())) {
            if (!(await askDiscardChanges(this.dialogService))) {
                return false;
            }
            return this.model.root.leaveEditMode({ discard: true });
        }
        return super.beforeLeave(...arguments);
    },

    beforeUnload(ev) {
        // Reload or close of the browser tab: let the browser ask, never save
        if (this.editedRecord && (this.editedRecord.dirty || this.fieldIsDirty)) {
            ev.preventDefault();
            ev.returnValue = "Unsaved changes";
        }
    },
});
