CREATE TABLE [dbo].[Projects]
(
	[ProjectId] INT NOT NULL IDENTITY(1,1),
	[ProjectTypeId] INT NULL,
	[ProjectStatusId] INT NULL,
	[IsInternalIT] BIT NULL,
	[ProjectName] VARCHAR(150) NULL,
	[ProjectOwner] VARCHAR(50) NULL,
	[ProjectManager] VARCHAR(50) NULL,
	[StartDate] DATE NULL,
	[ProjectPhaseId] INT NULL,
	[PhasePercentComplete] INT NULL,
	[PhaseEndDate] DATE NULL,
	[OverallPercentComplete] INT NULL,
	[ProjectEndDate] DATE NULL,
	[IsWaiting] BIT NULL DEFAULT 0,
	[Comments] VARCHAR(MAX) NULL,
	[ProjectDescription] VARCHAR(5000) NULL, 
    CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED ([ProjectId] ASC),
	CONSTRAINT [FK_Projects_ProjectStatuses] FOREIGN KEY ([ProjectStatusId]) REFERENCES [dbo].[ProjectStatuses] ([ProjectStatusId]),
	CONSTRAINT [FK_Projects_ProjectPhases] FOREIGN KEY([ProjectPhaseId]) REFERENCES [dbo].[ProjectPhases] ([ProjectPhaseId]),
	CONSTRAINT [FK_Projects_ProjectTypes] FOREIGN KEY([ProjectTypeId]) REFERENCES [dbo].[ProjectTypes] ([ProjectTypeId])
)
