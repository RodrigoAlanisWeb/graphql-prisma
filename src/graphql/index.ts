import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import { importSchema } from 'graphql-import';
import path from 'path';
import taskResolver from './resolvers/task';
import categoryResolver from './resolvers/category';

const task = importSchema(path.join(__dirname,'./schemas/task.gql'));
const category = importSchema(path.join(__dirname,'./schemas/category.gql'));

const taskSchema: GraphQLSchema = makeExecutableSchema({
    typeDefs: task
});

const categorySchema: GraphQLSchema = makeExecutableSchema({
    typeDefs: category
});

const schema: GraphQLSchema = mergeSchemas({
    schemas: [
        taskSchema,
        categorySchema
    ],
    resolvers: [
        categoryResolver,
        taskResolver
    ]
})

export default schema;
