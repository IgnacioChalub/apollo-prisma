-- CreateTable
CREATE TABLE "FavoritePokemon" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "favoritePokemonId" TEXT NOT NULL,

    CONSTRAINT "FavoritePokemon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoritePokemon" ADD CONSTRAINT "FavoritePokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
