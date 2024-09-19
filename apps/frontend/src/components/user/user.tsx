import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      phone
      adressId {
        id
        street
      }
    }
  }
`;
const User = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: '66e98806125e6df18b2b1c3c' },
  });
  console.log(data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div></div>;
};

export default User;
