﻿CREATE TABLE [Audit].[ProjectHist]
(
	[HistId] INT NOT NULL PRIMARY KEY IDENTITY(1,1), 
    [ProjectId] INT NOT NULL,
	[Operation] VARCHAR(10) NOT NULL,
	[ChangedBy] VARCHAR(50) NOT NULL,
	[ChangedOn] DATETIME NOT NULL,
	[OldProjectTypeId] INT NULL,
	[OldProjectStatusId] INT NULL,
	[OldIsInternalIT] BIT NULL,
	[OldProjectName] VARCHAR(150) NULL,
	[OldProjectOwner] VARCHAR(50) NULL,
	[OldProjectManager] VARCHAR(50) NULL,
	[OldStartDate] DATE NULL,
	[OldProjectPhaseId] INT NULL,
	[OldPhasePercentComplete] INT NULL,
	[OldPhaseEndDate] DATE NULL,
	[OldOverallPercentComplete] INT NULL,
	[OldProjectEndDate] DATE NULL,
	[OldIsWaiting] BIT NULL,
	[OldComments] VARCHAR(MAX) NULL,
    [OldProjectDescription] VARCHAR(5000) NULL,
	[NewProjectTypeId] INT NULL,
	[NewProjectStatusId] INT NULL,
	[NewIsInternalIT] BIT NULL,
	[NewProjectName] VARCHAR(150) NULL,
	[NewProjectOwner] VARCHAR(50) NULL,
	[NewProjectManager] VARCHAR(50) NULL,
	[NewStartDate] DATE NULL,
	[NewProjectPhaseId] INT NULL,
	[NewPhasePercentComplete] INT NULL,
	[NewPhaseEndDate] DATE NULL,
	[NewOverallPercentComplete] INT NULL,
	[NewProjectEndDate] DATE NULL,
	[NewIsWaiting] BIT NULL,
	[NewComments] VARCHAR(MAX) NULL, 
    [NewProjectDescription] VARCHAR(5000) NULL
)