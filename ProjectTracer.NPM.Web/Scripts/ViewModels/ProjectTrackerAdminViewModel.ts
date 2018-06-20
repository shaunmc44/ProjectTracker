/// <reference path="../models/projectmodel.ts" />
/// <reference path="../utilities/dateutility.ts" />
angular.module("ProjectTrackerApp").service("ProjectTrackerAdminViewModel", class ProjectTrackerAdminViewModel {

    displayMode: string;
    reloadList: boolean;
    Message: string;
    ErrorMessage: string;
    List: any;
    Detail: any;
    canSave: boolean;
    canEdit: boolean;

    const DISPLAY_MODE_NONE = "";
    const DISPLAY_MODE_LIST = "LIST";
    const DISPLAY_MODE_DETAIL = "DETAIL";

    constructor(ProjectTrackerListViewModel, ProjectTrackerDetailViewModel, ProjectsDataAccess, EventUtility, ProjectTrackerDetailRecordViewModel) {
        this.displayMode = this.DISPLAY_MODE_NONE;
        this.reloadList = false;
        this.Message = "Loading...";
        this.ErrorMessage = "";
        this.canSave = true;
        this.canEdit = true;

        this.List = ProjectTrackerListViewModel;
        EventUtility.Subscribe(EVENT_PROJECT_LIST_LOADED, this.ProjectList_Loaded);
        EventUtility.Subscribe(EVENT_PROJECT_LIST_ERROR, this.ProjectList_Error);

        this.Detail = ProjectTrackerDetailViewModel;
        EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_SELECTED, this.ProjectDetailRecord_Selected);
        EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_SAVED, this.ProjectDetailRecord_Saved);
        EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_DELETED, this.ProjectDetailRecord_Deleted);
        EventUtility.Subscribe(EVENT_PROJECT_DETAIL_RECORD_ERROR, this.ProjectDetail_Error);

    }

    IsInListMode() { return this.displayMode === this.DISPLAY_MODE_LIST; }
    IsInDetailMode() { return this.displayMode === this.DISPLAY_MODE_DETAIL; }

    SetMessage(Message) {
        this.Message = Message;
        this.ErrorMessage = "";
    }

    SetErrorMessage(Message) {
        this.Message = "";
        this.ErrorMessage = Message;
    }

    public ProjectList_Loaded = (Message) => {
        this.SetMessage(Message);

        if (this.displayMode == this.DISPLAY_MODE_NONE) {
            this.displayMode = this.DISPLAY_MODE_LIST;
        }
    }

    public ProjectList_Error = (Message) => {
        this.SetErrorMessage(Message);
    }



    public ProjectDetailRecord_Selected = (Message) => {
        this.SetMessage(Message);
    }


    public ProjectDetailRecord_Saved = (Message) => {
        this.SetMessage(Message);
        this.reloadList = true;
        this.Detail.ClearProject();
        this.displayMode = this.DISPLAY_MODE_LIST;
    }

    public ProjectDetailRecord_Deleted = (Message) => {
        this.reloadList = true;
        this.CloseCommand(Message);
    }

    public ProjectDetail_Error = (Message) => {
        this.SetErrorMessage(Message);
    }

    IsBusy() {
        return this.Detail.IsBusy() || this.List.IsBusy();
    }

    SelectProject(Project) {
        this.Detail.SetProject(Project);
        this.displayMode = this.DISPLAY_MODE_DETAIL;
        this.reloadList = false;
    }

    CanExecuteCloseCommand() {
        return this.IsInDetailMode() && !this.IsBusy();
    }

    CloseCommand(Message) {
        if (this.CanExecuteCloseCommand()) {
            this.Detail.ClearProject();
            this.displayMode = this.DISPLAY_MODE_LIST;

            if (this.reloadList) {
                this.List.ReloadCommand(Message);
                this.reloadList = false;
            }
            this.Detail.Record.isNew = false;
            this.SetMessage(Message);
        }
    }


    CanExecuteNewCommand() {
        return this.IsInListMode() && !this.IsBusy() && this.canSave;
    };

    NewCommand() {
        if (this.CanExecuteNewCommand()) {
            this.Detail.SetProject(new ProjectModel(null));
            this.displayMode = this.DISPLAY_MODE_DETAIL;
            this.SetMessage("A new project was created successfully.");
            this.Detail.Record.isNew = true;
        }
    }


    CanExecuteEditCommand() {
        return this.IsInListMode() && !this.IsBusy() && this.canEdit;
    }
});
