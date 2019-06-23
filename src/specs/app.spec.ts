import request from 'supertest';
import app from '../app';

describe('Testing all app routes', () => {
    describe('Register Order', () => {
        it('should send 200 when succeeds', async () => {
            const newOrder = {
                "order": {
                    "userId": "166666",
                    "quantity": 6.98,
                    "price": 300,
                    "orderType": "SELL"
                }
            };

            const response = await request(app)
                .post('/api/registerOrder')
                .send(newOrder)
                .set('Accept', 'application/json')
            expect(response.statusCode).toBe(200);
        });

        it('error if no order is sent', async () => {
            const expectedError = { status: "error", message: "missing order information" };
            const response = await request(app)
                .post('/api/registerOrder')
                .send(JSON.stringify({ nothing: "nothing" }))
                .set('Accept', 'application/json')
            expect(response.body).toEqual(expectedError);
        });
    });

    describe('Order Summary', () => {
        it('should send 200 when runs fine', async () => {
            const response = await request(app)
                .get('/api/getOrderSummary')
            expect(response.status).toBe(200);
        });
    });

    describe('Cancel Order', () => {
        it('should send 200 when runs fine', async () => {
            const orderToBeDeleted = {
                "order": {
                    "userId": "166666",
                    "quantity": 6.98,
                    "price": 300,
                    "orderType": "SELL"
                }
            }
            const response = await request(app)
                .post('/api/cancelOrder')
                .send(orderToBeDeleted)
                .set('Accept', 'application/json')
            expect(response.status).toBe(200);
        });
    });

})
