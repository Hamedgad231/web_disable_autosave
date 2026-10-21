import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { _t } from "@web/core/l10n/translation";

/**
 * Ask the user to discard the unsaved changes or to stay on the record.
 * @returns {Promise<boolean>} true when the changes can be discarded
 */
export function askDiscardChanges(dialogService) {
    return new Promise((resolve) => {
        dialogService.add(
            ConfirmationDialog,
            {
                title: _t("Unsaved changes"),
                body: _t(
                    "This record has unsaved changes. Discard them, or stay here and click Save to keep them."
                ),
                confirmLabel: _t("Discard changes"),
                confirmClass: "btn-danger",
                confirm: () => resolve(true),
                cancelLabel: _t("Stay here"),
                cancel: () => resolve(false),
            },
            { onClose: () => resolve(false) }
        );
    });
}
