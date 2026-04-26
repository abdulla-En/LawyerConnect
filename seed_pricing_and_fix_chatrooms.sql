USE [LawyerConnectDB];
GO

SET NOCOUNT ON;

-- 1) Fix schema drift causing booking failure
IF COL_LENGTH('dbo.ChatRooms', 'IsArchived') IS NULL
BEGIN
    ALTER TABLE [dbo].[ChatRooms]
    ADD [IsArchived] bit NOT NULL
        CONSTRAINT [DF_ChatRooms_IsArchived] DEFAULT (0);

    PRINT 'Added ChatRooms.IsArchived';
END
ELSE
BEGIN
    PRINT 'ChatRooms.IsArchived already exists';
END
GO

-- 2) Seed random pricing rows for all current lawyers
IF NOT EXISTS (SELECT 1 FROM [dbo].[Specializations]) OR NOT EXISTS (SELECT 1 FROM [dbo].[InteractionTypes])
BEGIN
    PRINT 'Skipped pricing seed: missing Specializations or InteractionTypes data.';
    RETURN;
END

;WITH BaseSpecializationPerLawyer AS
(
    SELECT
        l.Id AS LawyerId,
        COALESCE(
            (
                SELECT TOP (1) ls.SpecializationId
                FROM [dbo].[LawyerSpecializations] ls
                WHERE ls.LawyerId = l.Id
                ORDER BY NEWID()
            ),
            (
                SELECT TOP (1) s.Id
                FROM [dbo].[Specializations] s
                ORDER BY NEWID()
            )
        ) AS SpecializationId
    FROM [dbo].[Lawyers] l
)
INSERT INTO [dbo].[LawyerPricings]
(
    [LawyerId],
    [SpecializationId],
    [InteractionTypeId],
    [Price],
    [DurationMinutes]
)
SELECT
    b.LawyerId,
    b.SpecializationId,
    it.Id AS InteractionTypeId,
    CAST(300 + (ABS(CHECKSUM(NEWID())) % 1701) AS decimal(18,2)) AS Price, -- 300..2000
    CASE ABS(CHECKSUM(NEWID())) % 4
        WHEN 0 THEN 30
        WHEN 1 THEN 45
        WHEN 2 THEN 60
        ELSE 90
    END AS DurationMinutes
FROM BaseSpecializationPerLawyer b
CROSS JOIN [dbo].[InteractionTypes] it
WHERE NOT EXISTS
(
    SELECT 1
    FROM [dbo].[LawyerPricings] lp
    WHERE lp.LawyerId = b.LawyerId
      AND lp.SpecializationId = b.SpecializationId
      AND lp.InteractionTypeId = it.Id
);

PRINT 'Pricing seed completed.';
GO

