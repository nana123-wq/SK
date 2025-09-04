
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 06/19/2025 17:45:29
-- Generated from EDMX file: C:\Users\17857\Desktop\版本T0\T2\SKill\SK\Models\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [MyDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[DM]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DM];
GO
IF OBJECT_ID(N'[dbo].[New]', 'U') IS NOT NULL
    DROP TABLE [dbo].[New];
GO
IF OBJECT_ID(N'[dbo].[Order]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Order];
GO
IF OBJECT_ID(N'[dbo].[Script]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Script];
GO
IF OBJECT_ID(N'[dbo].[Transaction]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Transaction];
GO
IF OBJECT_ID(N'[dbo].[User]', 'U') IS NOT NULL
    DROP TABLE [dbo].[User];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'DM'
CREATE TABLE [dbo].[DM] (
    [DId] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Description] nvarchar(500)  NULL,
    [Image] nvarchar(255)  NULL,
    [Popularity] nchar(10)  NULL,
    [Skill] nchar(10)  NULL
);
GO

-- Creating table 'New'
CREATE TABLE [dbo].[New] (
    [RId] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(100)  NOT NULL,
    [Content] nvarchar(255)  NULL
);
GO

-- Creating table 'Script'
CREATE TABLE [dbo].[Script] (
    [SId] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(100)  NOT NULL,
    [Type] nvarchar(50)  NULL,
    [Content] nvarchar(max)  NULL,
    [img] nvarchar(255)  NULL,
    [StarLevel] int  NULL,
    [Discription] nvarchar(max)  NULL
);
GO

-- Creating table 'User'
CREATE TABLE [dbo].[User] (
    [UId] int IDENTITY(1,1) NOT NULL,
    [Account] nvarchar(50)  NOT NULL,
    [PassWord] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'Order'
CREATE TABLE [dbo].[Order] (
    [OId] int  NOT NULL,
    [ScriptTitle] nchar(10)  NULL,
    [CustomName] nchar(10)  NULL,
    [Phone] nvarchar(50)  NULL,
    [Time] datetime  NULL,
    [PlayerCount] int  NULL
);
GO

-- Creating table 'Transaction'
CREATE TABLE [dbo].[Transaction] (
    [Id] int  NOT NULL,
    [OrderId] int  NULL,
    [ScriptTitle] nchar(10)  NULL,
    [Amount] nchar(10)  NULL,
    [Number] int  NULL,
    [TransactionTime] datetime  NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [DId] in table 'DM'
ALTER TABLE [dbo].[DM]
ADD CONSTRAINT [PK_DM]
    PRIMARY KEY CLUSTERED ([DId] ASC);
GO

-- Creating primary key on [RId] in table 'New'
ALTER TABLE [dbo].[New]
ADD CONSTRAINT [PK_New]
    PRIMARY KEY CLUSTERED ([RId] ASC);
GO

-- Creating primary key on [SId] in table 'Script'
ALTER TABLE [dbo].[Script]
ADD CONSTRAINT [PK_Script]
    PRIMARY KEY CLUSTERED ([SId] ASC);
GO

-- Creating primary key on [UId] in table 'User'
ALTER TABLE [dbo].[User]
ADD CONSTRAINT [PK_User]
    PRIMARY KEY CLUSTERED ([UId] ASC);
GO

-- Creating primary key on [OId] in table 'Order'
ALTER TABLE [dbo].[Order]
ADD CONSTRAINT [PK_Order]
    PRIMARY KEY CLUSTERED ([OId] ASC);
GO

-- Creating primary key on [Id] in table 'Transaction'
ALTER TABLE [dbo].[Transaction]
ADD CONSTRAINT [PK_Transaction]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------