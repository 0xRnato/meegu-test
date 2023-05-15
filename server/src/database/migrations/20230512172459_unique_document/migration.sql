/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `document` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `document` VARCHAR(191) NOT NULL,
    MODIFY `acceptedTermsAndConditions` BOOLEAN NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `User_document_key` ON `User`(`document`);
