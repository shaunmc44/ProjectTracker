declare var rootUrl: any;
angular.module("ProjectTrackerApp").factory("ProjectTypesDataAccess", class ProjectTypesDataAccess {
    odataUrl: string;

    constructor($resource) {
        this.odataUrl = rootUrl + "/odata/ProjectTypes";
        return $resource("", {},
            {
                'SelectAll': { method: "GET", url: `${this.odataUrl}` },
                'Select': { method: 'GET', params: { key: "@key" }, url: `${this.odataUrl}(:key)` }
            });
    };
});
