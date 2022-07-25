import { UserController } from "./controller/user.controller";
import { ApolloServer, gql } from 'apollo-server';
import { PokemonController } from "./controller/pokemon.controller";

const typeDefs = gql`

  type Query {
    getUser: User
    getPokemonsList(input: GetManyInput): [PokemonIdentifiers]
    getPokemon(input: GetPokemonInput): Pokemon
    getPokemonWithImages(input: GetPokemonInput): PokemonWithImages
    getManyPokemons(input: GetManyInput): [Pokemon]
    getManyPokemonsWithImages(input: GetManyInput): [PokemonWithImages]
    getPokemonImages(input: GetPokemonInput): Images
    getItemsList(input: GetManyInput): [ItemsIdentifiers]
    getItem(input: GetItem): Item
    getManyItems(input: GetManyInput): [Item]
    getAllFavorites: [FavoritePokemon]
    getRegionsList: [RegionName]
    getRegionLocations(input: GetRegionLocationsInput): [LocationsName]
    getLocation(input: GetLocationInput): Location
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    logInUser(input: LogInUserInput): LogInUserResponse
    addFavoritePokemon(input: AddFavoritePokemonInput): String
  }

  input CreateUserInput {
    username: String
    email: String
    password: String
  }

  input LogInUserInput {
    username: String
    password: String
  }

  type LogInUserResponse {
    token: String
    user: User
  }

  type User {
    id: String
    username: String
    email: String
  }

  type FavoritePokemon {
    id: String
    favoritePokemonId: String
  }

  input GetPokemonInput {
    id: String
  }

  input GetManyInput {
    offset: Int!
    limit: Int!
  }

  input GetItem {
    id: String!
  }

  input AddFavoritePokemonInput {
    id: String!
  }

  input GetRegionLocationsInput {
    name: String
  }

  input GetLocationInput {
    name: String
  }

  type Location {
    name: String
    areas: [Area]
  }

  type Area {
    name: String
  }

  type RegionName {
    name: String
  }

  type LocationsName {
    name: String
  }

  type ItemsIdentifiers {
    name: String
    id: String
  }

  type Item {
    id: String
    name: String
    cost: Int
    fling_power: Int
    sprites: ItemSprites
  }

  type ItemSprites {
    default: String
  }

  type PokemonIdentifiers {
    name: String
    id: String
  }

  type Pokemon {
    id: String
    name: String
    is_legendary: Boolean
    is_mythical: Boolean
    capture_rate: Int
    habitat: Habitat
    is_baby: Boolean
  }

  type PokemonWithImages {
    id: String
    name: String
    is_legendary: Boolean
    is_mythical: Boolean
    capture_rate: Int
    habitat: Habitat
    is_baby: Boolean
    sprites: Sprites
  }

  type Habitat {
    name: String
  }

  type Images {
    id: String
    name: String
    sprites: Sprites
  }

  type Sprites {
    back_default: String
    front_default: String
  }

`;

const createUser = UserController.create;
const getUser = UserController.getUser;
const logInUser = UserController.logIn;

const addFavoritePokemon = UserController.addFavoritePokemon;
const getAllFavorites = UserController.getAllFavorites;

const getPokemonsList = PokemonController.getPokemonsList;
const getPokemon = PokemonController.getPokemon;
const getManyPokemons = PokemonController.getManyPokemons;
const getPokemonWithImages = PokemonController.getPokemonWithImages;
const getManyPokemonsWithImages = PokemonController.getManyPokemonsWithImages;
const getPokemonImages = PokemonController.getPokemonImages;

const getItemsList = PokemonController.getItemsList;
const getItem = PokemonController.getItem;
const getManyItems = PokemonController.getManyItems;

const getRegionsList = PokemonController.getRegionsList;
const getRegionLocations = PokemonController.getRegionLocations;
const getLocation = PokemonController.getLocation;

const resolvers = {
    Query: {
        getUser,
        getPokemonsList,
        getPokemon,
        getPokemonWithImages,
        getManyPokemons,
        getManyPokemonsWithImages,
        getPokemonImages,
        getItemsList,
        getItem,
        getManyItems,
        getAllFavorites,
        getRegionsList,
        getRegionLocations,
        getLocation,
    },
    Mutation: {
        logInUser,
        createUser,
        addFavoritePokemon
    }
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { token };
    },
  });
  
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
