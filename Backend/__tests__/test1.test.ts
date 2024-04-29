const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Import the app instance from server.js
const Tag = require("../models/Tag"); // Import your Tag model
const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const Campground = require("../models/Campground");

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
  await Campground.deleteMany({});
});

// Stop the in-memory MongoDB instance after all tests are done
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const generateAdminToken = async () => {
  const adminUser = await User.create({
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    tel: "0881000000",
  });

  const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return token;
};

describe("Tag Routes", () => {
  describe("GET /api-informations/tags", () => {
    it("should return all tags", async () => {
      const tag1 = new Tag({ name: "Tag 1" });
      const tag2 = new Tag({ name: "Tag 2" });
      await tag1.save();
      await tag2.save();

      const response = await request(app).get("/api-informations/tags");
      //   console.log("Response Body:", response.body);
      expect(response.body.success).toBe(true);
      expect(response.body.tags.length).toBe(2);
      expect(response.body.tags.some((tag) => tag.name === "Tag 1")).toBe(true);
      expect(response.body.tags.some((tag) => tag.name === "Tag 2")).toBe(true);
    });
  });

  describe("POST /api-informations/tags", () => {
    it("should create a new tag", async () => {
      const adminToken = await generateAdminToken();
      const newTag = { name: "New Tag" };
      const response = await request(app)
        .post("/api-informations/tags")
        .send(newTag)
        .set("Authorization", `Bearer ${adminToken}`);
    //   console.log("Response Body:", response.body);
      expect(response.status).toBe(201);
      expect(response.body.tag.name).toBe(newTag.name);

      const getTagResponse = await request(app).get("/api-informations/tags");
      expect(getTagResponse.body.success).toBe(true);
      expect(getTagResponse.body.tags.length).toBe(1);
      expect(
        getTagResponse.body.tags.some((tag) => tag.name === "New Tag")
      ).toBe(true);
    });
  });

  describe('GET /api-informations/tags/campgrounds/:campgroundId/similar2', () => {
    it('should return campgrounds with similar tags', async () => {
      // Create some tags
      const tag1 = new Tag({ name: 'Lakeside' });
      const tag2 = new Tag({ name: 'Boating' });
      const tag3 = new Tag({ name: 'Fishing' });
      await tag1.save();
      await tag2.save();
      await tag3.save();

      // Create a campground with tag1 and tag2
      const campground1 = new Campground({
        name: 'Campground 1',
        address: '123 Main St',
        district: 'District 1',
        province: 'Province 1',
        region: 'Region 1',
        postalcode: '12345',
        tel: '1234567890',
        url: 'https://example.com',
        maxReservations: 10,
        coverpicture: 'https://example.com/cover.jpg',
        picture: ['https://example.com/pic1.jpg', 'https://example.com/pic2.jpg'],
        description: 'This is a campground',
        price: 100,
        rating: 4.5,
        tags: [tag1._id, tag2._id , tag3._id]
      });
      await campground1.save();

      // Create another campground with tag2 and tag3
      const campground2 = new Campground({
        name: 'Campground 2',
        address: '456 Main St',
        district: 'District 2',
        province: 'Province 2',
        region: 'Region 2',
        postalcode: '67890',
        tel: '0987654321',
        url: 'https://example.com/campground2',
        maxReservations: 15,
        coverpicture: 'https://example.com/cover2.jpg',
        picture: ['https://example.com/pic3.jpg', 'https://example.com/pic4.jpg'],
        description: 'This is another campground',
        price: 150,
        rating: 4.2,
        tags: [tag2._id]
      });
      await campground2.save();

      const campground3 = new Campground({
        name: 'Campground 3',
        address: '456 Main St',
        district: 'District 3',
        province: 'Province 3',
        region: 'Region 3',
        postalcode: '67890',
        tel: '0987654321',
        url: 'https://example.com/campground2',
        maxReservations: 15,
        coverpicture: 'https://example.com/cover2.jpg',
        picture: ['https://example.com/pic3.jpg', 'https://example.com/pic4.jpg'],
        description: 'This is another campground',
        price: 150,
        rating: 4.2,
        tags: [tag1._id,tag2._id, tag3._id]
      });
      await campground3.save();

      const campground4 = new Campground({
        name: 'Campground 4',
        address: '456 Main St',
        district: 'District 4',
        province: 'Province 4',
        region: 'Region 4',
        postalcode: '67890',
        tel: '0987654321',
        url: 'https://example.com/campground2',
        maxReservations: 15,
        coverpicture: 'https://example.com/cover2.jpg',
        picture: ['https://example.com/pic3.jpg', 'https://example.com/pic4.jpg'],
        description: 'This is another campground',
        price: 150,
        rating: 4.2,
        tags: []
      });
      await campground4.save();

      const campground5 = new Campground({
        name: 'Campground 5',
        address: '456 Main St',
        district: 'District 5',
        province: 'Province 5',
        region: 'Region 2',
        postalcode: '67890',
        tel: '0987654321',
        url: 'https://example.com/campground2',
        maxReservations: 15,
        coverpicture: 'https://example.com/cover2.jpg',
        picture: ['https://example.com/pic3.jpg', 'https://example.com/pic4.jpg'],
        description: 'This is another campground',
        price: 150,
        rating: 4.2,
        tags: [tag1._id,tag2._id]
      });
      await campground5.save();

      const response = await request(app).get(`/api-informations/tags/campgrounds/${campground1._id}/similar2`);

      console.log("Response Body:", response.body);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(3);
      expect(response.body.data[0].name).toBe('Campground 3');
      expect(response.body.data[1].name).toBe('Campground 5');
      expect(response.body.data[2].name).toBe('Campground 2');
      expect(response.body.data).not.toContainEqual(
        expect.objectContaining({ name: 'Campground 4' })
      );
    });
  });
});
