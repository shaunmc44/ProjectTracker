CREATE TABLE [dbo].[ProjectPhases]
(
	[ProjectPhaseId] INT NOT NULL IDENTITY(1,1),
	[ProjectPhaseName] VARCHAR(25) NOT NULL,
	[ProjectPhaseDescription] VARCHAR(100) NOT NULL,
	CONSTRAINT [PK_ProjectPhases] PRIMARY KEY CLUSTERED ([ProjectPhaseId] ASC)
)
