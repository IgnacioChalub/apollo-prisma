import { UserController } from "./controller/user.controller";
import { ApolloServer, gql } from 'apollo-server';
import { PokemonController } from "./controller/pokemon.controller";

const typeDefs = gql`

  type Query {
    getUser: User
    getPokemon(input: GetPokemonInput): Pokemon
    getManyPokemons(input: GetManyPokemonsInput): [Pokemon]
    getPokemonImages(input: GetPokemonInput): Images
  }

  type Mutation {
    createUser(input: CreateUserInput): User
    logInUser(input: LogInUserInput): LogInUserResponse
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

  input GetPokemonInput {
    id: Int
  }

  input GetManyPokemonsInput {
    offset: Int!
    limit: Int!
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

const getPokemon = PokemonController.getPokemon;
const getManyPokemons = PokemonController.getManyPokemons;
const getPokemonImages = PokemonController.getPokemonImages;

const resolvers = {
    Query: {
        getUser,
        getPokemon,
        getManyPokemons,
        getPokemonImages
    },
    Mutation: {
        logInUser,
        createUser
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