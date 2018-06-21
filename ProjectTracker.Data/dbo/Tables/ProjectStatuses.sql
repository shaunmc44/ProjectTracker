CREATE TABLE [dbo].[ProjectStatuses]
(
	[ProjectStatusId] INT NOT NULL IDENTITY(1,1),
	[ProjectStatusName] VARCHAR(25) NOT NULL,
	[ProjectStatusDescription] VARCHAR(100) NOT NULL,
	CONSTRAINT [PK_ProjectStatuses] PRIMARY KEY CLUSTERED([ProjectStatusId] ASC)
)
