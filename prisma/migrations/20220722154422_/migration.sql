/*
  Warnings:

  - A unique constraint covering the columns `[userId,favoritePokemonId]` on the table `FavoritePokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FavoritePokemon_userId_favoritePokemonId_key" ON "FavoritePokemon"("userId", "favoritePokemonId");
