/*
  Warnings:

  - The primary key for the `FavoritePokemon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FavoritePokemon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FavoritePokemon" DROP CONSTRAINT "FavoritePokemon_pkey",
DROP COLUMN "id";
