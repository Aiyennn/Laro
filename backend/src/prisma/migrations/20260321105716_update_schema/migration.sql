/*
  Warnings:

  - You are about to alter the column `name` on the `developer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(70)`.
  - You are about to alter the column `website` on the `developer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `title` on the `game` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `name` on the `genre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `platform` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `manufacturer` on the `platform` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `publisher` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(70)`.
  - You are about to alter the column `country` on the `publisher` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `website` on the `publisher` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `name` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(80)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `country` on table `developer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `developer` MODIFY `name` VARCHAR(70) NOT NULL,
    MODIFY `country` VARCHAR(30) NOT NULL,
    MODIFY `website` VARCHAR(150) NULL,
    MODIFY `description` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `game` MODIFY `title` VARCHAR(30) NOT NULL,
    MODIFY `description` VARCHAR(300) NULL;

-- AlterTable
ALTER TABLE `genre` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(300) NULL;

-- AlterTable
ALTER TABLE `platform` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `manufacturer` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `publisher` MODIFY `name` VARCHAR(70) NOT NULL,
    MODIFY `country` VARCHAR(30) NULL,
    MODIFY `website` VARCHAR(150) NULL,
    MODIFY `description` VARCHAR(300) NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `review_text` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `tag` MODIFY `name` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(150) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('User', 'admin') NOT NULL DEFAULT 'User',
    MODIFY `username` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(80) NOT NULL,
    MODIFY `password` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
