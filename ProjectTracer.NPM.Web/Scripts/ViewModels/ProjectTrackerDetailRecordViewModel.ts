/// <reference path="../models/phasemodel.ts" />
/// <reference path="../models/statusmodel.ts" />
/// <reference path="../models/typemodel.ts" />
var EVENT_PROJECT_DETAIL_RECORD_SELECTED = "ProjectDetailRecord_Selected";
var EVENT_PROJECT_DETAIL_RECORD_SAVED = "ProjectDetailRecord_Saved";
var EVENT_PROJECT_DETAIL_RECORD_DELETED = "ProjectDetailRecord_Deleted";
var EVENT_PROJECT_DETAIL_RECORD_ERROR = "ProjectDetailRecord_Error";

angular.module("ProjectTrackerApp").service("ProjectTrackerDetailRecordViewModel", class ProjectTrackerDetailRecordViewModel {

    ProjectsDataAccess: any;
    ProjectStatusesDataAccess: any;
    ProjectPhasesDataAccess: any;
    ProjectTypesDataAccess: any;
    EventUtility: any;
    ProjectTrackerLIstViewModel: any;
    displayMode: string;
    List: any;
    isNew: boolean;
    Project: any;
    AllPhases: any;
    AllTypes: any;
    AllStatuses: any;
    isBusy: boolean;
    canSave: boolean;
    canEdit: boolean;

    const DISPLAY_MODE_LIST = "LIST";
    const DISPLAY_MODE_NONE = "";
    const DISPLAY_MODE_INSERT = "INSERT";
    const DISPLAY_MODE_UPDATE = "UPDATE";

    constructor(ProjectsDataAccess, ProjectStatusesDataAccess, ProjectPhasesDataAccess, ProjectTypesDataAccess, EventUtility, ProjectTrackerListViewModel) {
        this.ProjectsDataAccess = ProjectsDataAccess;
        this.ProjectStatusesDataAccess = ProjectStatusesDataAccess;
        this.ProjectPhasesDataAccess = ProjectPhasesDataAccess;
        this.ProjectTypesDataAccess = ProjectTypesDataAccess;
        this.EventUtility = EventUtility;
        this.displayMode = this.DISPLAY_MODE_NONE;
        this.List = ProjectTrackerListViewModel;
        this.isNew = false;
        this.Project = null;
        this.AllPhases = [];
        this.AllTypes = [];
        this.AllStatuses = [];
        this.isBusy = false;
        this.canSave = true;
        this.canEdit = true;


        this.LoadPhases();
        this.LoadTypes();
        this.LoadStatuses();
    }


    RaiseSelected(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_SELECTED, Message);
    }

    RaiseSaved(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_SAVED, Message);
    }

    RaiseDeleted(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_DELETED, Message);
    }

    RaiseError(Message) {
        this.EventUtility.RaiseEvent(EVENT_PROJECT_DETAIL_RECORD_ERROR, Message);
    }

    IsInInsertMode() {
        return this.displayMode === this.DISPLAY_MODE_INSERT;
    }

    IsInUpdateMode() {
        return this.displayMode === this.DISPLAY_MODE_UPDATE;
    }


    SetProject(Project) {
        if (Project.ProjectId != 0) {
            this.ProjectsDataAccess.Select({ key: Project.ProjectId }).$promise.then(
                (Result) => {
                    Project.Reload(Result);
                    this.Project = Project;
                    this.displayMode = this.DISPLAY_MODE_UPDATE;
                    this.RaiseSelected("'" + Result.ProjectName + "' was loaded successfully");

                }, (error) => {
                    this.RaiseError(error.Message);
                });
        }
        else {
            this.Project = Project;
            this.displayMode = this.DISPLAY_MODE_INSERT;
        }
    }

    ClearProject() {
        if (this.IsInUpdateMode()) {
            this.ProjectsDataAccess.Select({ key: this.Project.ProjectId }).$promise.then(
                (Result) => {
                    if (Result.Success) {
                        this.Project.Reload(Result.Data);
                    }
                    this.Project = null;
                });
        } else {
            this.Project = null;
        }

        this.displayMode = this.DISPLAY_MODE_NONE;
    }

    IsBusy() {
        return this.isBusy;
    }

    CanExecuteSaveCommand = function () {
        return this.Project != null && this.IsInInsertMode() && !this.isBusy && this.canSave;
    }

    CanExecuteEditCommand() {
        return this.Project != null && this.IsInUpdateMode() && !this.isBusy && this.canEdit;
    }

    SaveCommand(form) {
        if ((this.CanExecuteSaveCommand() || this.CanExecuteEditCommand()) && form.$valid)
            this.save();
    }


    //TODO: this will change
    save() {
        this.isBusy = true;

        if (this.isNew) {
            this.ProjectsDataAccess.Save(this.Project.ToObject()).$promise.then(
                (Result) => {
                    this.isBusy = false;
                    this.isNew = false;
                    this.RaiseSaved("Project saved successfully");
                    this.displayMode = this.DISPLAY_MODE_LIST;
                    this.List.ReloadCommand("Project saved successfully");
                },
                (Error) => {
                    this.isBusy = false;
                    this.RaiseError("an error occurred");
                });
        }
        else {
            this.ProjectsDataAccess.Update(this.Project.ProjectId, this.Project.ToObject()).$promise.then(
                (Result) => {
                    this.isBusy = false;
                    this.RaiseSaved("Project saved successfully");
                    this.displayMode = this.DISPLAY_MODE_LIST;
                    this.List.ReloadCommand("Project saved successfully");
                },
                (Error) => {
                    this.isBusy = false;
                    this.RaiseError("an error occurred");
                });
        }
    }

    CanExecuteResetCommand() {
        return this.Project != null && (this.IsInInsertMode() || this.IsInUpdateMode()) && !this.isBusy;
    }

    ResetCommand() {
        if (this.CanExecuteResetCommand()) {
            if (this.IsInUpdateMode()) {
                this.isBusy = true;

                this.ProjectsDataAccess.Select(this.Project.ProjectId).$promise.then(
                    (Result) => {
                        this.isBusy = false;

                        this.Project.Reload(Result.Data);
                        this.RaiseSelected(Result.Message);
                    }, (error) => {
                        this.RaiseError(error.Message);
                    });
            }
            else if (this.IsInInsertMode()) {
                this.Project.Clear();
            }
        }
    }

    LoadPhases() {
        this.AllPhases.length = 0;
        this.isBusy = true;

        this.ProjectPhasesDataAccess.SelectAll().$promise.then(
            (result) => {
                var i = 0;
                var n = result.value.length;

                while (i < n) {
                    this.AllPhases.push(new PhaseModel(result.value[i]));
                    i++;
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }

    LoadTypes() {
        this.AllTypes.length = 0;
        this.isBusy = true;

        this.ProjectTypesDataAccess.SelectAll().$promise.then(
            (result) => {
                var i = 0;
                var n = result.value.length;

                while (i < n) {
                    this.AllTypes.push(new TypeModel(result.value[i]));
                    i++;
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }

    LoadStatuses() {
        this.AllTypes.length = 0;
        this.isBusy = true;

        this.ProjectStatusesDataAccess.SelectAll().$promise.then(
            (result) => {
                var i = 0;
                var n = result.value.length;

                while (i < n) {
                    this.AllStatuses.push(new StatusModel(result.value[i]));
                    i++;
                }
            }, (error) => {
                this.RaiseError(error.Message);
            });

        this.isBusy = false;
    }
});
