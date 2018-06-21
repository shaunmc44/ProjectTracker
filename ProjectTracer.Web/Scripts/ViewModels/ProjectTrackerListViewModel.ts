/// <reference path="../models/projectmodel.ts" />
var EVENT_PROJECT_LIST_LOADED = "ProjectList_Loaded";
var EVENT_PROJECT_LIST_ERROR = "ProjectList_Error";

angular.module("ProjectTrackerApp").service("ProjectTrackerListViewModel", class ProjectTrackerListViewModel {
    ProjectsDataAccess: any;
    EventUtility: any;
    isBusy: boolean;
    AllProjects: any;

    constructor(ProjectsDataAccess, EventUtility) {
        this.ProjectsDataAccess = ProjectsDataAccess;
        this.EventUtility = EventUtility;
        this.AllProjects = [];

        this.LoadItems(null);
    }

    RaiseItemsLoaded(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_LIST_LOADED, Message, this.AllProjects);
    }

    RaiseError(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_LIST_ERROR, Message);
    }

    IsBusy() {
        return this.isBusy;
    }

    LoadItems(PassThroughMessage) {
        this.AllProjects.length = 0;
        this.isBusy = true;

        this.ProjectsDataAccess.SelectAll().$promise.then((result) => {
            var i = 0;
            var n = result.value.length;

            while (i < n) {
                this.AllProjects.push(new ProjectModel(result.value[i]));
                i++;
            }

            if (PassThroughMessage) {
                this.RaiseItemsLoaded(PassThroughMessage);
            }
            else {
                this.RaiseItemsLoaded("Projects were retrieved successfully");
            }
        }, (error) => {
            this.RaiseError(error.Message);
        });

        this.isBusy = false;
    }


    CanExecuteReloadCommand() {
        return !this.isBusy;
    }

    ReloadCommand(PassThroughMessage) {
        if (this.CanExecuteReloadCommand()) {
            this.LoadItems(PassThroughMessage);
        }
    }
});
