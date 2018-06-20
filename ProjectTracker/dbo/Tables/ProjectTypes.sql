CREATE TABLE [dbo].[ProjectTypes]
(
	[ProjectTypeId] INT NOT NULL IDENTITY(1,1),
	[ProjectTypeName] VARCHAR(25) NOT NULL,
	[ProjectTypeDescription] VARCHAR(100) NOT NULL,
	CONSTRAINT [PK_ProjectTypes] PRIMARY KEY CLUSTERED([ProjectTypeId] ASC)
)
