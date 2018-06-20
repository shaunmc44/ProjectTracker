angular.module("ProjectTrackerApp").service("PageQuantityUtility", class PageQuantityUtility {
    GetDefaultPageQuantity(DefaultSelectedValue) {
        if (DefaultSelectedValue === undefined || DefaultSelectedValue === null)
        { return 20; } else { return DefaultSelectedValue; }
    }
});
