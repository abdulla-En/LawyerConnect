-- =============================================
-- LawyerConnect DB Schema Fix Script
-- Applies all missing migration changes safely
-- =============================================

USE LawyerConnectDB;
GO

-- =============================================
-- 1. Create RefreshTokens table (newMigration)
-- =============================================
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'RefreshTokens')
BEGIN
    CREATE TABLE [RefreshTokens] (
        [Id] uniqueidentifier NOT NULL,
        [UserId] int NOT NULL,
        [TokenHash] nvarchar(512) NOT NULL,
        [ExpiresAt] datetime2 NOT NULL,
        [Revoked] bit NOT NULL DEFAULT 0,
        [CreatedAt] datetime2 NOT NULL,
        [ReplacedByTokenId] uniqueidentifier NULL,
        [IpAddress] nvarchar(max) NULL,
        [UserAgent] nvarchar(max) NULL,
        CONSTRAINT [PK_RefreshTokens] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RefreshTokens_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_RefreshTokens_RefreshTokens_ReplacedByTokenId] FOREIGN KEY ([ReplacedByTokenId]) REFERENCES [RefreshTokens]([Id]) ON DELETE NO ACTION
    );
    CREATE UNIQUE INDEX [IX_RefreshTokens_TokenHash] ON [RefreshTokens]([TokenHash]);
    CREATE UNIQUE INDEX [IX_RefreshTokens_ReplacedByTokenId] ON [RefreshTokens]([ReplacedByTokenId]) WHERE [ReplacedByTokenId] IS NOT NULL;
    CREATE INDEX [IX_RefreshTokens_UserId] ON [RefreshTokens]([UserId]);
    PRINT 'RefreshTokens table created.';
END
ELSE PRINT 'RefreshTokens table already exists.';
GO

-- =============================================
-- 2. Add RevokeReason & RevokedDate to RefreshTokens (AlterTableRefreshTokenMigration)
-- =============================================
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='RefreshTokens' AND COLUMN_NAME='RevokeReason')
BEGIN
    ALTER TABLE [RefreshTokens] ADD [RevokeReason] int NULL;
    PRINT 'Added RevokeReason (int) to RefreshTokens.';
END
ELSE PRINT 'RevokeReason already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='RefreshTokens' AND COLUMN_NAME='RevokedDate')
BEGIN
    ALTER TABLE [RefreshTokens] ADD [RevokedDate] datetime2 NULL;
    PRINT 'Added RevokedDate to RefreshTokens.';
END
ELSE PRINT 'RevokedDate already exists.';
GO

-- =============================================
-- 3. Fix Lawyers table (Phase2Models + model columns)
-- =============================================

-- Rename Verified -> IsVerified
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='Verified')
   AND NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='IsVerified')
BEGIN
    EXEC sp_rename 'Lawyers.Verified', 'IsVerified', 'COLUMN';
    PRINT 'Renamed Verified to IsVerified in Lawyers.';
END
ELSE PRINT 'IsVerified rename already done or not needed.';
GO

-- Drop Price column
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='Price')
BEGIN
    ALTER TABLE [Lawyers] DROP COLUMN [Price];
    PRINT 'Dropped Price from Lawyers.';
END
ELSE PRINT 'Price already removed from Lawyers.';
GO

-- Drop Specialization column
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='Specialization')
BEGIN
    ALTER TABLE [Lawyers] DROP COLUMN [Specialization];
    PRINT 'Dropped Specialization from Lawyers.';
END
ELSE PRINT 'Specialization already removed from Lawyers.';
GO

-- Add AverageRating column (exists in model but not in any migration)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='AverageRating')
BEGIN
    ALTER TABLE [Lawyers] ADD [AverageRating] decimal(18,2) NOT NULL DEFAULT 0;
    PRINT 'Added AverageRating to Lawyers.';
END
ELSE PRINT 'AverageRating already exists.';
GO

-- Add ReviewsCount column (exists in model but not in any migration)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Lawyers' AND COLUMN_NAME='ReviewsCount')
BEGIN
    ALTER TABLE [Lawyers] ADD [ReviewsCount] int NOT NULL DEFAULT 0;
    PRINT 'Added ReviewsCount to Lawyers.';
END
ELSE PRINT 'ReviewsCount already exists.';
GO

-- =============================================
-- 4. Fix Bookings table (Phase2Models)
-- =============================================

-- Drop TransactionId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='TransactionId')
BEGIN
    ALTER TABLE [Bookings] DROP COLUMN [TransactionId];
    PRINT 'Dropped TransactionId from Bookings.';
END
ELSE PRINT 'TransactionId already removed from Bookings.';
GO

-- Add DurationSnapshot
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='DurationSnapshot')
BEGIN
    ALTER TABLE [Bookings] ADD [DurationSnapshot] int NOT NULL DEFAULT 0;
    PRINT 'Added DurationSnapshot to Bookings.';
END
ELSE PRINT 'DurationSnapshot already exists.';
GO

-- Add InteractionTypeId
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='InteractionTypeId')
BEGIN
    ALTER TABLE [Bookings] ADD [InteractionTypeId] int NOT NULL DEFAULT 0;
    PRINT 'Added InteractionTypeId to Bookings.';
END
ELSE PRINT 'InteractionTypeId already exists.';
GO

-- Add PriceSnapshot
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='PriceSnapshot')
BEGIN
    ALTER TABLE [Bookings] ADD [PriceSnapshot] decimal(18,2) NOT NULL DEFAULT 0;
    PRINT 'Added PriceSnapshot to Bookings.';
END
ELSE PRINT 'PriceSnapshot already exists.';
GO

-- Add SpecializationId
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='Bookings' AND COLUMN_NAME='SpecializationId')
BEGIN
    ALTER TABLE [Bookings] ADD [SpecializationId] int NOT NULL DEFAULT 0;
    PRINT 'Added SpecializationId to Bookings.';
END
ELSE PRINT 'SpecializationId already exists.';
GO

-- =============================================
-- 5. Create new tables (Phase2Models)
-- =============================================

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'InteractionTypes')
BEGIN
    CREATE TABLE [InteractionTypes] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_InteractionTypes] PRIMARY KEY ([Id])
    );
    PRINT 'Created InteractionTypes table.';
END
ELSE PRINT 'InteractionTypes already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Specializations')
BEGIN
    CREATE TABLE [Specializations] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Description] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Specializations] PRIMARY KEY ([Id])
    );
    PRINT 'Created Specializations table.';
END
ELSE PRINT 'Specializations already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Notifications')
BEGIN
    CREATE TABLE [Notifications] (
        [Id] int NOT NULL IDENTITY,
        [UserId] int NOT NULL,
        [Title] nvarchar(max) NOT NULL,
        [Message] nvarchar(max) NOT NULL,
        [Type] nvarchar(max) NOT NULL,
        [IsRead] bit NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Notifications] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Notifications_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE
    );
    CREATE INDEX [IX_Notifications_UserId] ON [Notifications]([UserId]);
    PRINT 'Created Notifications table.';
END
ELSE PRINT 'Notifications already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChatRooms')
BEGIN
    CREATE TABLE [ChatRooms] (
        [Id] int NOT NULL IDENTITY,
        [BookingId] int NOT NULL,
        [IsArchived] bit NOT NULL DEFAULT 0,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ChatRooms] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ChatRooms_Bookings_BookingId] FOREIGN KEY ([BookingId]) REFERENCES [Bookings]([Id]) ON DELETE CASCADE
    );
    CREATE UNIQUE INDEX [IX_ChatRooms_BookingId] ON [ChatRooms]([BookingId]);
    PRINT 'Created ChatRooms table.';
END
ELSE PRINT 'ChatRooms already exists.';
GO

-- Add IsArchived to ChatRooms if table already existed from older schema
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChatRooms')
   AND NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='ChatRooms' AND COLUMN_NAME='IsArchived')
BEGIN
    ALTER TABLE [ChatRooms] ADD [IsArchived] bit NOT NULL CONSTRAINT [DF_ChatRooms_IsArchived] DEFAULT 0;
    PRINT 'Added IsArchived to ChatRooms.';
END
ELSE PRINT 'IsArchived already exists on ChatRooms.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChatMessages')
BEGIN
    CREATE TABLE [ChatMessages] (
        [Id] int NOT NULL IDENTITY,
        [ChatRoomId] int NOT NULL,
        [SenderId] int NOT NULL,
        [Message] nvarchar(max) NOT NULL,
        [SentAt] datetime2 NOT NULL,
        CONSTRAINT [PK_ChatMessages] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_ChatMessages_ChatRooms_ChatRoomId] FOREIGN KEY ([ChatRoomId]) REFERENCES [ChatRooms]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_ChatMessages_Users_SenderId] FOREIGN KEY ([SenderId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION
    );
    CREATE INDEX [IX_ChatMessages_ChatRoomId] ON [ChatMessages]([ChatRoomId]);
    CREATE INDEX [IX_ChatMessages_SenderId] ON [ChatMessages]([SenderId]);
    PRINT 'Created ChatMessages table.';
END
ELSE PRINT 'ChatMessages already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Reviews')
BEGIN
    CREATE TABLE [Reviews] (
        [Id] int NOT NULL IDENTITY,
        [BookingId] int NOT NULL,
        [UserId] int NOT NULL,
        [LawyerId] int NOT NULL,
        [Rating] int NOT NULL,
        [Comment] nvarchar(max) NOT NULL,
        [CreatedAt] datetime2 NOT NULL,
        CONSTRAINT [PK_Reviews] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Reviews_Bookings_BookingId] FOREIGN KEY ([BookingId]) REFERENCES [Bookings]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Reviews_Lawyers_LawyerId] FOREIGN KEY ([LawyerId]) REFERENCES [Lawyers]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Reviews_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE NO ACTION
    );
    CREATE UNIQUE INDEX [IX_Reviews_BookingId] ON [Reviews]([BookingId]);
    CREATE INDEX [IX_Reviews_LawyerId] ON [Reviews]([LawyerId]);
    CREATE INDEX [IX_Reviews_UserId] ON [Reviews]([UserId]);
    PRINT 'Created Reviews table.';
END
ELSE PRINT 'Reviews already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LawyerPricings')
BEGIN
    CREATE TABLE [LawyerPricings] (
        [LawyerId] int NOT NULL,
        [SpecializationId] int NOT NULL,
        [InteractionTypeId] int NOT NULL,
        [Price] decimal(18,2) NOT NULL,
        [DurationMinutes] int NOT NULL,
        CONSTRAINT [PK_LawyerPricings] PRIMARY KEY ([LawyerId], [SpecializationId], [InteractionTypeId]),
        CONSTRAINT [FK_LawyerPricings_Lawyers_LawyerId] FOREIGN KEY ([LawyerId]) REFERENCES [Lawyers]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_LawyerPricings_Specializations_SpecializationId] FOREIGN KEY ([SpecializationId]) REFERENCES [Specializations]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_LawyerPricings_InteractionTypes_InteractionTypeId] FOREIGN KEY ([InteractionTypeId]) REFERENCES [InteractionTypes]([Id]) ON DELETE NO ACTION
    );
    CREATE INDEX [IX_LawyerPricings_SpecializationId] ON [LawyerPricings]([SpecializationId]);
    CREATE INDEX [IX_LawyerPricings_InteractionTypeId] ON [LawyerPricings]([InteractionTypeId]);
    PRINT 'Created LawyerPricings table.';
END
ELSE PRINT 'LawyerPricings already exists.';
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'LawyerSpecializations')
BEGIN
    CREATE TABLE [LawyerSpecializations] (
        [LawyerId] int NOT NULL,
        [SpecializationId] int NOT NULL,
        CONSTRAINT [PK_LawyerSpecializations] PRIMARY KEY ([LawyerId], [SpecializationId]),
        CONSTRAINT [FK_LawyerSpecializations_Lawyers_LawyerId] FOREIGN KEY ([LawyerId]) REFERENCES [Lawyers]([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_LawyerSpecializations_Specializations_SpecializationId] FOREIGN KEY ([SpecializationId]) REFERENCES [Specializations]([Id]) ON DELETE CASCADE
    );
    CREATE INDEX [IX_LawyerSpecializations_SpecializationId] ON [LawyerSpecializations]([SpecializationId]);
    PRINT 'Created LawyerSpecializations table.';
END
ELSE PRINT 'LawyerSpecializations already exists.';
GO

-- =============================================
-- 6. Add FK indexes for Bookings new columns
-- =============================================
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Bookings_InteractionTypeId' AND object_id = OBJECT_ID('Bookings'))
BEGIN
    CREATE INDEX [IX_Bookings_InteractionTypeId] ON [Bookings]([InteractionTypeId]);
    PRINT 'Created IX_Bookings_InteractionTypeId index.';
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name='IX_Bookings_SpecializationId' AND object_id = OBJECT_ID('Bookings'))
BEGIN
    CREATE INDEX [IX_Bookings_SpecializationId] ON [Bookings]([SpecializationId]);
    PRINT 'Created IX_Bookings_SpecializationId index.';
END
GO

PRINT '=== Schema fix completed successfully! ===';
GO
