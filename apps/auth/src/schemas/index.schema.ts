import { mergeTypeDefs } from '@graphql-tools/merge';
import { buildSchema, print } from 'graphql';
import { usersGQLSchema } from './user/user.schema';

export const mergedGQLSchema = mergeTypeDefs([usersGQLSchema]);
export const typeDefs = buildSchema(print(mergedGQLSchema));

// export const schema = buildSchema(usersGQLSchema);
