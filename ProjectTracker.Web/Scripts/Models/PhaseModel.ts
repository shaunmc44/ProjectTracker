class PhaseModel {
    ProjectPhaseId: number;
    ProjectPhaseName: string;
    ProjectPhaseDescription: string;

    constructor(Phase) {

        this.ProjectPhaseId = Phase.ProjectPhaseId;
        this.ProjectPhaseName = Phase.ProjectPhaseName;
        this.ProjectPhaseDescription = Phase.ProjectPhaseDescription;
    }
}

