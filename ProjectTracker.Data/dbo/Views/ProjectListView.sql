CREATE VIEW [dbo].[ProjectListView]
	AS 
		SELECT		p.ProjectId
				  , p.[ProjectName]
				  , p.[ProjectOwner]
				  , p.[ProjectManager]
				  , pt.[ProjectTypeName]
				  , CASE p.[IsInternalIT]
					WHEN 0 THEN 'No'
					ELSE 'Yes'
					End AS [IsInternalIT]
				  , ps.[ProjectStatusName]
				  , CONVERT(VARCHAR, p.[StartDate], 110) AS StartDate
				  , pp.[ProjectPhaseName]
				  , CAST(p.[PhasePercentComplete] AS VARCHAR) +'%' [PhasePercentComplete]
				  , CONVERT(VARCHAR, p.[PhaseEndDate], 110) AS PhaseEndDate
				  , CAST(p.[OverallPercentComplete] AS VARCHAR) + '%' [OverallPercentComplete]
				  , CONVERT(VARCHAR, p.[ProjectEndDate], 110) AS ProjectEndDate
				  , CASE p.[IsWaiting]
					WHEN 0 THEN 'No'
					ELSE 'Yes'
					END AS [IsWaiting]
				  ,	(STUFF((SELECT (CHAR(10) + '[On ' + CONVERT(VARCHAR, [ph].[ChangedOn], 110) + ' at ' + LTRIM(RIGHT(CONVERT(VARCHAR(20), [ph].[ChangedOn], 100), 7)) + ' ' + REPLACE(UPPER([ph].[ChangedBy]), 'MILKY_WAY\', '')  + ' added]: ' + [ph].[NewComments])
						FROM [Audit].[ProjectHist] AS [ph]
						WHERE p.ProjectId = ph.ProjectId
						ORDER BY HistId Desc
						FOR XML PATH('')), 1, 1, '')) AS [ProjectComments]
		FROM	dbo.Projects p
			 LEFT JOIN dbo.ProjectStatuses ps ON p.ProjectStatusId = ps.ProjectStatusId
			 LEFT JOIN dbo.ProjectTypes pt ON p.ProjectTypeId = pt.ProjectTypeId
			 LEFT JOIN dbo.ProjectPhases pp ON	p.ProjectPhaseId = pp.ProjectPhaseId
		--ORDER BY ps.ProjectStatusName, p.ProjectName 
