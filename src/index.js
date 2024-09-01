import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

const app = express();
const PORT = 3000;

const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];

const typeDefs = `#graphql

# Comments in GraphQL

  type Book {
    title: String
	author: String
  }

  type Query{
	books: [Book],
  }

`;

const resolvers = {
	Query: {
		books: () => books,
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

await server.start();

app.use(express.json());
app.use('/graphql', expressMiddleware(server));

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
