/*
  Warnings:

  - You are about to drop the column `profilePictureKey` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_profilePictureKey_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictureKey",
ADD COLUMN     "hasProfilePicture" BOOLEAN NOT NULL DEFAULT false;
