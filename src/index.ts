import { UserController } from "./controller/user.controller";
import { ApolloServer, gql } from 'apollo-server';
import { JwtService } from "./repository/jwt.service";

const typeDefs = gql`

  type Query {
    getUser: User
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

`;

const createUser = UserController.create;
const getUser = UserController.getUser
const logInUser = UserController.logIn

const resolvers = {
    Query: {
        getUser
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