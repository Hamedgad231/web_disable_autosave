import { patch } from "@web/core/utils/patch";
import { ListRenderer } from "@web/views/list/list_renderer";

patch(ListRenderer.prototype, {
    onGlobalClick(ev) {
        // Editable list view: a click outside of a changed row keeps it in edition instead of saving
        // it, use the Save or Discard button (lines of one2many fields are still handled by their form)
        const editedRecord = this.editedRecord();
        if (!this.isX2Many && editedRecord && (editedRecord.dirty || this.lastIsDirty)) {
            return;
        }
        return super.onGlobalClick(...arguments);
    },
});
