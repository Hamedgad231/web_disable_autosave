import { registry } from "@web/core/registry";

function reloadPage() {
    // The browser must be asked to warn the user...
    const ev = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
        throw new Error("Reloading the page with unsaved changes should warn the user");
    }
    // ...and nothing is saved when the user reloads anyway
    window.location.reload();
}

function hideBrowserTab() {
    Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
    document.dispatchEvent(new Event("visibilitychange"));
    delete document.visibilityState;
}

registry.category("web_tour.tours").add("web_disable_autosave_form", {
    steps: () => [
        {
            content: "Open the first record",
            trigger: ".o_data_row td:contains('Autosave One')",
            run: "click",
        },
        {
            content: "Change the name",
            trigger: ".o_form_view .o_field_widget[name=name] input",
            run: "edit Changed One",
        },
        {
            content: "Switch to another browser tab",
            trigger: ".o_form_view .o_form_status_indicator .o_form_button_save",
            run: hideBrowserTab,
        },
        {
            content: "Go back with the breadcrumb",
            trigger: ".o_breadcrumb .breadcrumb-item.o_back_button",
            run: "click",
        },
        {
            content: "Stay on the record",
            trigger: ".modal:contains('Unsaved changes') button:contains('Stay here')",
            run: "click",
        },
        {
            content: "Still on the record with its changes",
            trigger: ".o_form_view:not(:has(.modal)) .o_form_button_save",
        },
        {
            content: "Go to the next record",
            trigger: ".o_pager_next",
            run: "click",
        },
        {
            content: "Discard the changes",
            trigger: ".modal:contains('Unsaved changes') button:contains('Discard changes')",
            run: "click",
        },
        {
            content: "Second record is open",
            trigger: ".o_breadcrumb .active:contains('Autosave Two')",
        },
        {
            content: "Change the name of the second record",
            trigger: ".o_form_view .o_field_widget[name=name] input",
            run: "edit Changed Two",
        },
        {
            content: "Click New",
            trigger: ".o_form_button_create",
            run: "click",
        },
        {
            content: "Stay on the record",
            trigger: ".modal:contains('Unsaved changes') button:contains('Stay here')",
            run: "click",
        },
        {
            content: "Save",
            trigger: ".o_form_button_save",
            run: "click",
        },
        {
            content: "Saved",
            trigger: ".o_form_view:not(:has(.o_form_button_save:visible))",
        },
        {
            content: "Saved name shown",
            trigger: ".o_breadcrumb .active:contains('Changed Two')",
        },
        {
            content: "Change the name again",
            trigger: ".o_form_view .o_field_widget[name=name] input",
            run: "edit Unsaved Two",
        },
        {
            content: "Reload the page",
            trigger: ".o_form_view .o_form_button_save",
            run: reloadPage,
            expectUnloadPage: true,
        },
        {
            content: "After the reload, the change isn't saved",
            trigger: ".o_form_view .o_field_widget[name=name] input:value(Changed Two)",
        },
        {
            content: "Leave without question once saved",
            trigger: ".o_breadcrumb .breadcrumb-item.o_back_button",
            run: "click",
        },
        {
            content: "Back on the list with the saved name",
            trigger: ".o_list_view .o_data_row td:contains('Changed Two')",
        },
    ],
});

registry.category("web_tour.tours").add("web_disable_autosave_list", {
    steps: () => [
        {
            content: "Edit the row of the tag",
            trigger: ".o_data_row td[name=name]:contains('Autosave Tag')",
            run: "click",
        },
        {
            content: "Change the tag name",
            trigger: ".o_data_row.o_selected_row .o_field_widget[name=name] input",
            run: "edit Changed Tag",
        },
        {
            content: "Go back with the breadcrumb",
            trigger: ".o_breadcrumb .breadcrumb-item.o_back_button",
            run: "click",
        },
        {
            content: "Stay on the list",
            trigger: ".modal:contains('Unsaved changes') button:contains('Stay here')",
            run: "click",
        },
        {
            content: "Reload the page",
            trigger: "body:not(:has(.modal)) .o_data_row.o_selected_row",
            run: reloadPage,
            expectUnloadPage: true,
        },
        {
            content: "After the reload, the change isn't saved",
            trigger: ".o_data_row td[name=name]:contains('Autosave Tag')",
            run: "click",
        },
        {
            content: "Change the tag name again",
            trigger: ".o_data_row.o_selected_row .o_field_widget[name=name] input",
            run: "edit Changed Tag",
        },
        {
            content: "Go back with the breadcrumb",
            trigger: ".o_breadcrumb .breadcrumb-item.o_back_button",
            run: "click",
        },
        {
            content: "Discard the changes",
            trigger: ".modal:contains('Unsaved changes') button:contains('Discard changes')",
            run: "click",
        },
        {
            content: "Left the tag list",
            trigger: ".o_list_view .o_data_row td:contains('Autosave One')",
        },
    ],
});
