CREATE TRIGGER [ProjectOnInsert] ON [dbo].[Projects] FOR INSERT
AS
BEGIN
	DECLARE curProjectInsert CURSOR FAST_FORWARD FOR
		SELECT ProjectId, ProjectTypeId, ProjectStatusId, IsInternalIT, ProjectName, ProjectOwner, 
				ProjectManager,	StartDate, ProjectPhaseId, PhasePercentComplete, PhaseEndDate, 
				OverallPercentComplete, ProjectEndDate, IsWaiting, Comments, ProjectDescription
		FROM inserted;

	DECLARE @NewProjectId INT, 
			@NewProjectStatusId INT,
			@NewProjectTypeId INT,
			@NewIsInternalIT BIT,
			@NewProjectName VARCHAR(150),
			@NewProjectOwner VARCHAR(50),
			@NewProjectManager VARCHAR(50),
			@NewStartDate DATE,
			@NewProjectPhaseId INT,
			@NewPhasePercentComplete INT,
			@NewPhaseEndDate DATE,
			@NewOverallPercentComplete INT,
			@NewProjectEndDate DATE,
			@NewIsWaiting BIT,
			@NewComments VARCHAR(MAX),
			@NewProjectDescription VARCHAR(MAX),

			@ChangedOn DATETIME,
			@ChangedBy VARCHAR(50);
			
	SET @ChangedOn = GETDATE();
	SET @ChangedBy = SYSTEM_USER;

	OPEN curProjectInsert;

	FETCH curProjectInsert INTO
		@NewProjectId, @NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner,
		@NewProjectManager, @NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate,
		@NewOverallPercentComplete, @NewProjectEndDate, @NewIsWaiting, @NewComments, @NewProjectDescription

	WHILE @@FETCH_STATUS = 0
	BEGIN

		INSERT INTO [Audit].ProjectHist
		(
			ProjectId, ChangedOn, ChangedBy, Operation,
			OldProjectTypeId, OldProjectStatusId, OldIsInternalIT, OldProjectName, OldProjectOwner, OldProjectManager,
			OldStartDate, OldProjectPhaseId, OldPhasePercentComplete, OldPhaseEndDate, OldOverallPercentComplete, OldProjectEndDate,
			OldIsWaiting, OldComments, OldProjectDescription,

			NewProjectTypeId, NewProjectStatusId, NewIsInternalIT, NewProjectName, NewProjectOwner, NewProjectManager,
			NewStartDate, NewProjectPhaseId, NewPhasePercentComplete, NewPhaseEndDate, NewOverallPercentComplete, NewProjectEndDate,
			NewIsWaiting, NewComments, NewProjectDescription
		)
		VALUES
		(
			@NewProjectId, @ChangedOn, @ChangedBy, 'Inserted',
			NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
			
			@NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner, @NewProjectManager,
			@NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate, @NewOverallPercentComplete, @NewProjectEndDate,
			@NewIsWaiting, @NewComments, @NewProjectDescription
		)

		SET @NewProjectId = NULL;
		SET @NewProjectTypeId = NULL;
		SET @NewProjectStatusId = NULL;
		SET @NewIsInternalIT = NULL;
		SET @NewProjectName = NULL;
		SET @NewProjectOwner = NULL;
		SET @NewProjectManager = NULL;
		SET @NewStartDate = NULL;
		SET @NewProjectPhaseId = NULL;
		SET @NewPhasePercentComplete = NULL;
		SET @NewPHaseEndDate = NULL;
		SET @NewOverallPercentComplete = NULL;
		SET @NewProjectEndDate = NULL;
		SET @NewIsWaiting = NULL;
		SET @NewComments = NULL;
		SET @NewProjectDescription = NULL;

		FETCH curProjectInsert INTO
		@NewProjectId, @NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner,
		@NewProjectManager, @NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate,
		@NewOverallPercentComplete, @NewProjectEndDate, @NewIsWaiting, @NewComments, @NewProjectDescription

	END

	CLOSE curProjectInsert;
	DEALLOCATE curProjectInsert;

END
