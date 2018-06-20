/// <reference path="../utilities/dateutility.ts" />
class ProjectModel {
    ProjectId: number;
    ProjectName: string;
    ProjectTypeId: number;
    ProjectStatusId: number;
    IsInternalIT: boolean;
    ProjectOwner: string;
    ProjectManager: string;
    StartDate: Date;
    ProjectPhaseId: number;
    PhasePercentComplete: number;
    PhaseEndDate: Date;
    OverallPercentComplete: number;
    ProjectEndDate: Date;
    IsWaiting: boolean;
    Comments: string;
    ProjectPhaseName: string;
    ProjectTypeName: string;
    ProjectStatusName: string;
    DateUtility: any;

    constructor(Project) {
        this.DateUtility = new DateUtility();
        if (Project !== null) {
            this.ProjectId = Project.ProjectId;
            this.ProjectName = Project.ProjectName;
            this.ProjectTypeId = Project.ProjectTypeId;
            this.ProjectStatusId = Project.ProjectStatusId;
            this.IsInternalIT = Project.IsInternalIT;
            this.ProjectOwner = Project.ProjectOwner;
            this.ProjectManager = Project.ProjectManager;
            this.StartDate = Project.StartDate;
            this.ProjectPhaseId = Project.ProjectPhaseId;
            this.PhasePercentComplete = Project.PhasePercentComplete;
            this.PhaseEndDate = Project.PhaseEndDate;
            this.OverallPercentComplete = Project.OverallPercentComplete;
            this.ProjectEndDate = Project.ProjectEndDate;
            this.IsWaiting = Project.IsWaiting;
            this.Comments = Project.Comments;

            this.ProjectPhaseName = Project.ProjectPhase.ProjectPhaseName;
            this.ProjectTypeName = Project.ProjectType.ProjectTypeName;
            this.ProjectStatusName = Project.ProjectStatus.ProjectStatusName;
        }
        else {
            this.ProjectId = 0;
            this.ProjectName = null;
            this.ProjectTypeId = 1;
            this.ProjectStatusId = 1;
            this.IsInternalIT = null;
            this.ProjectOwner = null;
            this.ProjectManager = null;
            this.StartDate = null;
            this.ProjectPhaseId = 1;
            this.PhasePercentComplete = 0;
            this.PhaseEndDate = null;
            this.OverallPercentComplete = 0;
            this.ProjectEndDate = null;
            this.IsWaiting = null;
            this.Comments = null;
        }
    }

    FormattedStartDate() { return this.DateUtility.ToShortDateString(this.DateUtility.ToJavaScriptDate(this.StartDate)); }
    FormattedPhaseEndDate() { return this.DateUtility.ToShortDateString(this.DateUtility.ToJavaScriptDate(this.PhaseEndDate)); }
    FormattedEndDate() { return this.DateUtility.ToShortDateString(this.DateUtility.ToJavaScriptDate(this.ProjectEndDate)); }

    Reload(NewProject) {
        this.ProjectId = NewProject.ProjectId;
        this.ProjectName = NewProject.ProjectName;
        this.ProjectTypeId = NewProject.ProjectTypeId;
        this.ProjectStatusId = NewProject.ProjectStatusId;
        this.IsInternalIT = NewProject.IsInternalIT;
        this.ProjectOwner = NewProject.ProjectOwner;
        this.ProjectManager = NewProject.ProjectManager;
        this.StartDate = NewProject.StartDate;
        this.ProjectPhaseId = NewProject.ProjectPhaseId;
        this.PhasePercentComplete = NewProject.PhasePercentComplete;
        this.PhaseEndDate = NewProject.PhaseEndDate;
        this.OverallPercentComplete = NewProject.OverallPercentComplete;
        this.ProjectEndDate = NewProject.ProjectEndDate;
        this.IsWaiting = NewProject.IsWaiting;
        this.Comments = NewProject.Comments;
    }

    Clear() {
        this.ProjectName = null;
        this.ProjectTypeId = null;
        this.ProjectStatusId = null;
        this.IsInternalIT = null;
        this.ProjectOwner = null;
        this.ProjectManager = null;
        this.StartDate = null;
        this.ProjectPhaseId = null;
        this.PhasePercentComplete = null;
        this.PhaseEndDate = null;
        this.OverallPercentComplete = null;
        this.ProjectEndDate = null;
        this.IsWaiting = null;
        this.Comments = null;
    }

    ToObject() {
        return {
            ProjectId: this.ProjectId,
            ProjectName: this.ProjectName,
            ProjectTypeId: this.ProjectTypeId,
            ProjectStatusId: this.ProjectStatusId,
            IsInternalIT: this.IsInternalIT === true ? true : false,
            ProjectOwner: this.ProjectOwner,
            ProjectManager: this.ProjectManager,
            StartDate: this.StartDate,
            ProjectPhaseId: this.ProjectPhaseId,
            PhasePercentComplete: this.PhasePercentComplete,
            PhaseEndDate: this.PhaseEndDate,
            OverallPercentComplete: this.OverallPercentComplete,
            ProjectEndDate: this.ProjectEndDate,
            IsWaiting: this.IsWaiting === true ? true : false,
            Comments: this.Comments
        };
    }
}
