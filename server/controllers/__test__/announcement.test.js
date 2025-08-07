const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server'); 
const Announcement = require('../../models/Announcement');
const jwt = require('jsonwebtoken');

let mongoServer;
let token;

const mockUserId = new mongoose.Types.ObjectId();
const mockUser = {
  id: mockUserId.toString(),
  username: 'testuser',
};
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  token = jwt.sign(mockUser, process.env.SECRET_KEY || 'testsecret');
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Announcement.deleteMany();
});

describe('Announcement API', () => {
  it('GET /api/announcements should return empty array initially', async () => {
    const res = await request(app).get('/api/announcements');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/announcements should create an announcement', async () => {
    const res = await request(app)
      .post('/api/announcements')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Announcement',
        content: 'This is a test announcement',
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test Announcement');
  });

  it('PUT /api/announcements/:id should update an announcement', async () => {
    const announcement = await Announcement.create({
      title: 'Old Title',
      content: 'Old content',
      user: mockUserId,
    });

    const res = await request(app)
      .put(`/api/announcements/${announcement._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Title');
  });

  it('DELETE /api/announcements/:id should delete an announcement', async () => {
    const announcement = await Announcement.create({
      title: 'To be deleted',
      content: 'Content',
      user: mockUserId,
    });

    const res = await request(app)
      .delete(`/api/announcements/${announcement._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted successfully');
  });
});
