SET IDENTITY_INSERT [dbo].[ProjectPhases] ON
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(1, 'Define and Plan','A project that is in the Define and Plan phase');
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(2, 'Set Up Test Environment','A project that is ready for the test environment to be set u8p');
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(3, 'Train and Test','A project in the Train and Test phase');
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(4, 'Set Up Prod Environment','A project that is ready to have the prod environment set up');
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(5, 'System Setup and Cutover','A project that is ready to have the system set up and cut over to');
INSERT INTO dbo.ProjectPhases(ProjectPhaseId, ProjectPhaseName, ProjectPhaseDescription) VALUES(6, 'Post Implementation','A project in the post implementation phase');
SET IDENTITY_INSERT [dbo].[ProjectPhases] OFF

SET IDENTITY_INSERT [dbo].[ProjectTypes] ON
INSERT INTO dbo.[ProjectTypes](ProjectTypeId, ProjectTypeName, ProjectTypeDescription) VALUES(1, 'Active','A project that is actively being worked');
INSERT INTO dbo.[ProjectTypes](ProjectTypeId, ProjectTypeName, ProjectTypeDescription) VALUES(2, 'Approved','A project that is approved to start');
INSERT INTO dbo.[ProjectTypes](ProjectTypeId, ProjectTypeName, ProjectTypeDescription) VALUES(3, 'Completed','A project that is completed');
INSERT INTO dbo.[ProjectTypes](ProjectTypeId, ProjectTypeName, ProjectTypeDescription) VALUES(4, 'Ideas','A project that is just an idea');
SET IDENTITY_INSERT [dbo].[ProjectTypes] OFF

SET IDENTITY_INSERT [dbo].[ProjectStatuses] ON
INSERT INTO dbo.[ProjectStatuses](ProjectStatusId, ProjectStatusName, ProjectStatusDescription) VALUES(1, 'Active','A project that is actively being worked');
INSERT INTO dbo.[ProjectStatuses](ProjectStatusId, ProjectStatusName, ProjectStatusDescription) VALUES(2, 'Inactive','A project that is approved to start');
SET IDENTITY_INSERT [dbo].[ProjectStatuses] OFF