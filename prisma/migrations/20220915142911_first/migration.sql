/*
  Warnings:

  - A unique constraint covering the columns `[profilePictureKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePictureKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_profilePictureKey_key" ON "User"("profilePictureKey");
