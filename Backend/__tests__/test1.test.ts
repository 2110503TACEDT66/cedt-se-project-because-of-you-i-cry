const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // Import the app instance from server.js
const Tag = require('../models/Tag'); // Import your Tag model

let mongoServer;

// Set up an in-memory MongoDB instance before running the tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear all data after every test case
afterEach(async () => {
  await Tag.deleteMany({});
});

// Stop the in-memory MongoDB instance after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Tag Routes', () => {
  describe('GET /api-informations/tags', () => {
    it('should return all tags', async () => {
      const tag1 = new Tag({ name: 'Tag 1' });
      const tag2 = new Tag({ name: 'Tag 2' });
      await tag1.save();
      await tag2.save();

      const response = await request(app).get('/api-informations/tags');
      console.log('Response Body:', response.body);
      expect(response.body.success).toBe(true); 
        expect(response.body.tags.length).toBe(2); 
        expect(response.body.tags.some(tag => tag.name === 'Tag 1')).toBe(true);
        expect(response.body.tags.some(tag => tag.name === 'Tag 2')).toBe(true);
    });
  });

//   describe('POST /api-informations/tags', () => {
//     it('should create a new tag', async () => {
//       const newTag = { name: 'New Tag' };
//       const response = await request(app)
//         .post('/api-informations/tags')
//         .send(newTag)
//         .set('Authorization', `Bearer ${adminToken}`); // Provide a valid admin token

//       expect(response.status).toBe(201);
//       expect(response.body.name).toBe(newTag.name);
//     });
//   });

  // Add more test cases for other routes and scenarios
});