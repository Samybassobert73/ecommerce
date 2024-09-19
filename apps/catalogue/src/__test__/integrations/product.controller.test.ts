import request from 'supertest';
import app from '../../app';
import { product } from '../mock-data/product';
const endpointUrl = '/products/';

let firstProduct;
describe(endpointUrl, () => {
  it('POST ' + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(product);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(product.title);
    expect(response.body.quantity).toBe(product.quantity);
  });
  it('GET ' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    firstProduct = response.body[0];
  });

  it('UPDATE BY ID' + endpointUrl, async () => {
    const response = await request(app)
      .put(endpointUrl + firstProduct._id)
      .send({ title: 'updated title' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('updated title');
  });

  it('GET BY ID' + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl + firstProduct._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('updated title');
  });

  it('DELETE BY ID' + endpointUrl, async () => {
    const response = await request(app).delete(endpointUrl + firstProduct._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('updated title');
  });
});
