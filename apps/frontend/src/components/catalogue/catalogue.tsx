import React, { useEffect } from 'react';
import ItemCard from '../itemCard/itemCard';
import CardList from '../cardList/cardList';
import axios from 'axios';
import z from 'zod';
import { useQuery } from 'react-query';
import styled from 'styled-components';
const ProductSchema = z.array(
  z.object({
    _id: z.string(),
    title: z.string(),
    stock: z.number(),
    price: z.number(),
  })
);

export type Product = z.infer<typeof ProductSchema>;

const CatalogueContainer = styled.div`
  height: 100%; /* Prend toute la hauteur disponible */
  overflow-y: auto; /* Active le scroll vertical */
`;

const Catalogue = () => {
  const getProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products');
      const parsedProducts = ProductSchema.safeParse(res.data);
      if (!parsedProducts.success) {
        throw new Error('Invalid data');
      }
      return parsedProducts.data;
    } catch (e) {
      console.log(e);
    }
  };
  const { isLoading, data, error } = useQuery('products', getProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <CatalogueContainer>
      <CardList>
        {data?.map((product) => (
          <ItemCard key={product._id} product={product} />
        ))}
      </CardList>
    </CatalogueContainer>
  );
};

export default Catalogue;
