import { UserController } from "./controller/user.controller";
import { ApolloServer, gql } from 'apollo-server';
import { PokemonController } from "./controller/pokemon.controller";

const typeDefs = gql`

  type Query {
    getUser: User
    getPokemon(input: GetPokemonInput): Pokemon
    getManyPokemons(input: GetManyInput): [Pokemon]
    getPokemonImages(input: GetPokemonInput): Images
    getItem(input: GetItem): Item
    getManyItems(input: GetManyInput): [Item]
    getAllFavorites: [FavoritePokemon]
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

  type Pokemon {
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

const getPokemon = PokemonController.getPokemon;
const getManyPokemons = PokemonController.getManyPokemons;
const getPokemonImages = PokemonController.getPokemonImages;

const getItem = PokemonController.getItem;
const getManyItems = PokemonController.getManyItems;

const resolvers = {
    Query: {
        getUser,
        getPokemon,
        getManyPokemons,
        getPokemonImages,
        getItem,
        getManyItems,
        getAllFavorites
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