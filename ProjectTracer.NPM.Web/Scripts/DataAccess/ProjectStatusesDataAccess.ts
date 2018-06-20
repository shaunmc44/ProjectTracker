declare var rootUrl: any;
angular.module("ProjectTrackerApp").factory("ProjectStatusesDataAccess", class ProjectStatusesDataAccess {
    odataUrl: string;

    constructor($resource) {
        this.odataUrl = rootUrl + "/odata/ProjectStatuses";
        return $resource("", {},
            {
                'SelectAll': { method: "GET", url: `${this.odataUrl}` },
                'Select': { method: 'GET', params: { key: "@key" }, url: `${this.odataUrl}(:key)` }
            });
    };
});
