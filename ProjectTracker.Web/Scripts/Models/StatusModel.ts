class StatusModel {
    ProjectStatusId: number;
    ProjectStatusName: string;
    ProjectStatusDescription: string;

    constructor(Status) {

        this.ProjectStatusId = Status.ProjectStatusId;
        this.ProjectStatusName = Status.ProjectStatusName;
        this.ProjectStatusDescription = Status.ProjectStatusDescription;
    }
}