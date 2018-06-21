CREATE TRIGGER [ProjectOnDelete] ON [dbo].[Projects] FOR DELETE
AS
BEGIN
	DECLARE curProjectDelete CURSOR FAST_FORWARD FOR
		SELECT ProjectId, ProjectTypeId, ProjectStatusId, IsInternalIT, ProjectName, ProjectOwner, 
				ProjectManager,	StartDate, ProjectPhaseId, PhasePercentComplete, PhaseEndDate, 
				OverallPercentComplete, ProjectEndDate, IsWaiting, Comments, ProjectDescription
		FROM deleted;

	DECLARE @OldProjectId INT, 
			@OldProjectStatusId INT,
			@OldProjectTypeId INT,
			@OldIsInternalIT BIT,
			@OldProjectName VARCHAR(150),
			@OldProjectOwner VARCHAR(50),
			@OldProjectManager VARCHAR(50),
			@OldStartDate DATE,
			@OldProjectPhaseId INT,
			@OldPhasePercentComplete INT,
			@OldPhaseEndDate DATE,
			@OldOverallPercentComplete INT,
			@OldProjectEndDate DATE,
			@OldIsWaiting BIT,
			@OldComments VARCHAR(MAX),
			@OldProjectDescription VARCHAR(5000),

			@ChangedOn DATETIME,
			@ChangedBy VARCHAR(50);
			
	SET @ChangedOn = GETDATE();
	SET @ChangedBy = SYSTEM_USER;

	OPEN curProjectDelete;

	FETCH curProjectDelete INTO
		@OldProjectId, @OldProjectTypeId, @OldProjectStatusId, @OldIsInternalIT, @OldProjectName, @OldProjectOwner,
		@OldProjectManager, @OldStartDate, @OldProjectPhaseId, @OldPhasePercentComplete, @OldPhaseEndDate,
		@OldOverallPercentComplete, @OldProjectEndDate, @OldIsWaiting, @OldComments, @OldProjectDescription

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
			@OldProjectId, @ChangedOn, @ChangedBy, 'Deleted',
			@OldProjectTypeId, @OldProjectStatusId, @OldIsInternalIT, @OldProjectName, @OldProjectOwner, @OldProjectManager,
			@OldStartDate, @OldProjectPhaseId, @OldPhasePercentComplete, @OldPhaseEndDate, @OldOverallPercentComplete, @OldProjectEndDate,
			@OldIsWaiting, @OldComments, @OldProjectDescription,

			NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
		)

		SET @OldProjectId = NULL;
		SET @OldProjectTypeId = NULL;
		SET @OldProjectStatusId = NULL;
		SET @OldIsInternalIT = NULL;
		SET @OldProjectName = NULL;
		SET @OldProjectOwner = NULL;
		SET @OldProjectManager = NULL;
		SET @OldStartDate = NULL;
		SET @OldProjectPhaseId = NULL;
		SET @OldPhasePercentComplete = NULL;
		SET @OldPHaseEndDate = NULL;
		SET @OldOverallPercentComplete = NULL;
		SET @OldProjectEndDate = NULL;
		SET @OldIsWaiting = NULL;
		SET @OldComments = NULL;
		SET @OldProjectDescription = NULL;

		FETCH curProjectDelete INTO
		@OldProjectId, @OldProjectTypeId, @OldProjectStatusId, @OldIsInternalIT, @OldProjectName, @OldProjectOwner,
		@OldProjectManager, @OldStartDate, @OldProjectPhaseId, @OldPhasePercentComplete, @OldPhaseEndDate,
		@OldOverallPercentComplete, @OldProjectEndDate, @OldIsWaiting, @OldComments, @OldProjectDescription

	END

	CLOSE curProjectDelete;
	DEALLOCATE curProjectDelete;

END
