-- ============================================
-- Clear Database Script for LawyerConnect
-- ============================================
-- WARNING: This will delete ALL data!
-- Use only in development/testing
-- ============================================

USE LawyerConnectDB;
GO

-- Step 1: Delete all bookings (has foreign keys to Users and Lawyers)
PRINT 'Deleting all bookings...';
DELETE FROM Bookings;
PRINT 'Bookings deleted.';
GO

-- Step 2: Delete all payment sessions (if exists)
IF OBJECT_ID('PaymentSessions', 'U') IS NOT NULL
BEGIN
    PRINT 'Deleting all payment sessions...';
    DELETE FROM PaymentSessions;
    PRINT 'Payment sessions deleted.';
END
GO

-- Step 3: Delete all lawyers (has foreign key to Users)
PRINT 'Deleting all lawyers...';
DELETE FROM Lawyers;
PRINT 'Lawyers deleted.';
GO

-- Step 4: Delete all users
PRINT 'Deleting all users...';
DELETE FROM Users;
PRINT 'Users deleted.';
GO

-- Step 5: Reset identity columns (optional - starts IDs from 1 again)
PRINT 'Resetting identity columns...';
DBCC CHECKIDENT ('Bookings', RESEED, 0);
DBCC CHECKIDENT ('Lawyers', RESEED, 0);
DBCC CHECKIDENT ('Users', RESEED, 0);
IF OBJECT_ID('PaymentSessions', 'U') IS NOT NULL
BEGIN
    DBCC CHECKIDENT ('PaymentSessions', RESEED, 0);
END
PRINT 'Identity columns reset.';
GO

-- Step 6: Verify all tables are empty
PRINT '';
PRINT '=== Verification ===';
PRINT 'Users count: ' + CAST((SELECT COUNT(*) FROM Users) AS VARCHAR);
PRINT 'Lawyers count: ' + CAST((SELECT COUNT(*) FROM Lawyers) AS VARCHAR);
PRINT 'Bookings count: ' + CAST((SELECT COUNT(*) FROM Bookings) AS VARCHAR);
IF OBJECT_ID('PaymentSessions', 'U') IS NOT NULL
BEGIN
    PRINT 'PaymentSessions count: ' + CAST((SELECT COUNT(*) FROM PaymentSessions) AS VARCHAR);
END
PRINT '';
PRINT '✅ Database cleared successfully!';
PRINT 'You can now register new users.';
GO
