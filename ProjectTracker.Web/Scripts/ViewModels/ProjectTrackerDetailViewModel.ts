angular.module("ProjectTrackerApp").service("ProjectTrackerDetailViewModel", class ProjectTrackerDetailViewModel {

    Project: any;
    displayMode: string;
    Record: any;

    const DISPLAY_MODE_NONE = "NONE";
    const DISPLAY_MODE_RECORD = "RECORD";


    constructor(ProjectTrackerDetailRecordViewModel, EventUtility) {

        this.displayMode = this.DISPLAY_MODE_NONE;
        this.Project = null;

        this.Record = ProjectTrackerDetailRecordViewModel;
    }
    IsInRecordMode() {
        return this.displayMode == this.DISPLAY_MODE_RECORD;
    }

    IsBusy() {
        return this.Record.IsBusy()
    }

    SetProject(Project) {
        this.Project = Project;
        this.Record.SetProject(Project);

        this.displayMode = this.DISPLAY_MODE_RECORD;
    }

    ClearProject() {
        this.Project = null;
        this.Record.ClearProject();

        this.displayMode = this.DISPLAY_MODE_RECORD;
    }

    CanExecuteRecordCommand() {
        return this.Project != null && !this.IsInRecordMode() && !this.IsBusy();
    }

    RecordCommand() {
        if (this.CanExecuteRecordCommand()) {
            this.Record.SetProject(this.Project);
            this.displayMode = this.DISPLAY_MODE_RECORD;
        }
    }
});
