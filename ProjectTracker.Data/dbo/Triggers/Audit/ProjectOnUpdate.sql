CREATE TRIGGER [ProjectOnUpdate] ON [dbo].[Projects] FOR UPDATE
AS
BEGIN
	DECLARE curProjectInsert CURSOR FAST_FORWARD FOR
		SELECT ProjectId, ProjectTypeId, ProjectStatusId, IsInternalIT, ProjectName, ProjectOwner, 
				ProjectManager,	StartDate, ProjectPhaseId, PhasePercentComplete, PhaseEndDate, 
				OverallPercentComplete, ProjectEndDate, IsWaiting, Comments, ProjectDescription
		FROM inserted;

		DECLARE curProjectDelete CURSOR FAST_FORWARD FOR
		SELECT ProjectId, ProjectTypeId, ProjectStatusId, IsInternalIT, ProjectName, ProjectOwner, 
				ProjectManager,	StartDate, ProjectPhaseId, PhasePercentComplete, PhaseEndDate, 
				OverallPercentComplete, ProjectEndDate, IsWaiting, Comments, ProjectDescription
		FROM deleted;

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
			@NewProjectDescription VARCHAR(5000),

			@OldProjectId INT, 
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

	OPEN curProjectInsert;
	OPEN curProjectDelete;

	FETCH curProjectDelete INTO
		@OldProjectId, @OldProjectTypeId, @OldProjectStatusId, @OldIsInternalIT, @OldProjectName, @OldProjectOwner,
		@OldProjectManager, @OldStartDate, @OldProjectPhaseId, @OldPhasePercentComplete, @OldPhaseEndDate,
		@OldOverallPercentComplete, @OldProjectEndDate, @OldIsWaiting, @OldComments, @OldProjectDescription

	FETCH curProjectInsert INTO
		@NewProjectId, @NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner,
		@NewProjectManager, @NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate,
		@NewOverallPercentComplete, @NewProjectEndDate, @NewIsWaiting, @NewComments, @NewProjectDescription

	WHILE @@FETCH_STATUS = 0
	BEGIN
	
		IF @OldProjectTypeId = @NewProjectTypeId
		BEGIN
			SET @OldProjectTypeId = NULL;
			SET @NewProjectTypeId = NULL;
		END

		IF @OldProjectStatusId = @NewProjectStatusId
		BEGIN
			SET @OldProjectStatusId = NULL;
			SET @NewProjectStatusId = NULL;
		END
	
		IF @OldIsInternalIT = @NewIsInternalIT
		BEGIN
			SET @OldIsInternalIT = NULL;
			SET @NewIsInternalIT = NULL;
		END

		IF @OldProjectName = @NewProjectName
		BEGIN
			SET @OldProjectName = NULL;
			SET @NewProjectName = NULL;
		END

		IF @OldProjectOwner = @NewProjectOwner
		BEGIN
			SET @OldProjectOwner = NULL;
			SET @NewProjectOwner = NULL;
		END

		IF @OldProjectManager = @NewProjectManager
		BEGIN
			SET @OldProjectManager = NULL;
			SET @NewProjectManager = NULL;
		END

		IF @OldStartDate = @NewStartDate
		BEGIN
			SET @OldStartDate = NULL;
			SET @NewStartDate = NULL;
		END

		IF @OldProjectPhaseId = @NewProjectPhaseId
		BEGIN
			SET @OldProjectPhaseId = NULL;
			SET @NewProjectPhaseId = NULL;
		END

		IF @OldPhasePercentComplete = @NewPhasePercentComplete
		BEGIN
			SET @OldPhasePercentComplete = NULL;
			SET @NewPHasePercentComplete = NULL;
		END

		IF @OldPhaseEndDate = @NewPhaseEndDate
		BEGIN
			SET @OldPhaseEndDate = NULL;
			SET @NewPHaseEndDate = NULL;
		END

		IF @OldOverallPercentComplete = @NewOverallPercentComplete
		BEGIN
			SET @OldOverallPercentComplete = NULL;
			SET @NewOverallPercentComplete = NULL;
		END

		IF @OldProjectEndDate = @NewProjectEndDate
		BEGIN
			SET @OldProjectEndDate = NULL;
			SET @NewProjectEndDate = NULL;
		END

		IF @OldIsWaiting = @NewIsWaiting
		BEGIN
			SET @OldIsWaiting = NULL;
			SET @NewIsWaiting = NULL;
		END

		IF @OldComments = @NewComments
		BEGIN
			SET @OldComments = NULL;
			SET @NewComments = NULL;
		END

		IF @OldProjectDescription = @NewProjectDescription
		BEGIN
			SET @OldProjectDescription = NULL;
			SET @NewProjectDescription = NULL;
		END

		IF @OldProjectTypeId IS NOT NULL OR
			@OldProjectStatusId IS NOT NULL OR
			@OldIsInternalIT IS NOT NULL OR 
			@OldProjectName IS NOT NULL OR
			@OldProjectOwner IS NOT NULL OR
			@OldProjectManager IS NOT NULL OR
			@OldStartDate IS NOT NULL OR
			@OldProjectPhaseId IS NOT NULL OR 
			@OldPhasePercentComplete IS NOT NULL OR
			@OldPhaseEndDate IS NOT NULL OR
			@OldOverallPercentComplete IS NOT NULL OR
			@OldProjectEndDate IS NOT NULL OR
			@OldIsWaiting IS NOT NULL OR
			@OldComments IS NOT NULL OR
			@OldProjectDescription IS NOT NULL OR

			@NewProjectTypeId IS NOT NULL OR
			@NewProjectStatusId IS NOT NULL OR
			@NewIsInternalIT IS NOT NULL OR
			@NewProjectName IS NOT NULL OR
			@NewProjectOwner IS NOT NULL OR
			@NewProjectManager IS NOT NULL OR
			@NewStartDate IS NOT NULL OR
			@NewProjectPhaseId IS NOT NULL OR
			@NewPhasePercentComplete IS NOT NULL OR
			@NewPhaseEndDate IS NOT NULL OR
			@NewOverallPercentComplete IS NOT NULL OR 
			@NewProjectEndDate IS NOT NULL OR
			@NewIsWaiting IS NOT NULL OR
			@NewComments IS NOT NULL OR
			@NewProjectDescription IS NOT NULL
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
				@NewProjectId, @ChangedOn, @ChangedBy, 'Updated',
				@OldProjectTypeId, @OldProjectStatusId, @OldIsInternalIT, @OldProjectName, @OldProjectOwner, @OldProjectManager,
				@OldStartDate, @OldProjectPhaseId, @OldPhasePercentComplete, @OldPhaseEndDate, @OldOverallPercentComplete, @OldProjectEndDate,
				@OldIsWaiting, @OldComments, @OldProjectDescription,
			
				@NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner, @NewProjectManager,
				@NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate, @NewOverallPercentComplete, @NewProjectEndDate,
				@NewIsWaiting, @NewComments, @NewProjectDescription
			)

		END

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

		FETCH curProjectInsert INTO
		@NewProjectId, @NewProjectTypeId, @NewProjectStatusId, @NewIsInternalIT, @NewProjectName, @NewProjectOwner,
		@NewProjectManager, @NewStartDate, @NewProjectPhaseId, @NewPhasePercentComplete, @NewPhaseEndDate,
		@NewOverallPercentComplete, @NewProjectEndDate, @NewIsWaiting, @NewComments, @NewProjectDescription

	END

	CLOSE curProjectInsert;
	DEALLOCATE curProjectInsert;

	CLOSE curProjectDelete;
	DEALLOCATE curProjectDelete;
END
