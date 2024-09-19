import axios from 'axios';

export const GetProductDetail = async (id) => {
  var config = {
    method: 'get',
    url: `http://localhost:3000/products/${id}`,
    headers: {},
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response?.data));
  } catch (err) {
    console.log(err);
  }

  return {
    id: '66df274a9df01bde6dd1b811',
    price: 10,
    stock: 10,
    name: 'tshirt',
  };
};
