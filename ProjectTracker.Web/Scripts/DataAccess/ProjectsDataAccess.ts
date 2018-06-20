declare var rootUrl: any;
angular.module("ProjectTrackerApp").service("ProjectsDataAccess", class ProjectsDataAccess
{
    odataUrl: string;
    constructor($resource) {
        this.odataUrl = rootUrl + "/odata/Projects";
        return $resource("", {},
        {
            'SelectAll': { method: 'GET', url: `${this.odataUrl}?$expand=ProjectPhase,ProjectType,ProjectStatus&$orderby=ProjectName` },
            'Save': { method: 'POST', url: `${this.odataUrl}` },
            'Update': { method: 'PUT', params: { ProjectId: "@ProjectId" }, url: `${this.odataUrl}(:ProjectId)` },
            'Select': { method: 'GET', params: { key: "@key" }, url: `${this.odataUrl}(:key)?$expand=ProjectPhase,ProjectType,ProjectStatus` },
            'remove': { method: 'DELETE', params: { key: "@key" }, url: `${this.odataUrl }(:key)` }
        });
    }
})
