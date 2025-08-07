const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../../server');
const Task = require('../../models/Task');
const User = require('../../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'testsecret';

let token;
let taskId;

beforeAll(async () => {
    // Connect to in-memory test DB or test Mongo URI
    await mongoose.connect(process.env.MONGO_URI);

    // Create mock user + generate token
    const user = await User.create({ username: 'testuser', password: 'testpass', email: 'test@example.com' });
    token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY);
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});

describe('Task (Quiz) API', () => {
    test('GET /api/quizzes should return empty array initially', async () => {
        const res = await request(app).get('/api/quizzes');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('POST /api/quizzes should create a new task with auth', async () => {
        const res = await request(app)
            .post('/api/quizzes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'Some description',
                dueDate: new Date(),
                type: 'quiz',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('Test Task');
        taskId = res.body._id;
    });

    test('PUT /api/quizzes/:id should update a task', async () => {
        const res = await request(app)
            .put(`/api/quizzes/${taskId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated Task Title' });

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Updated Task Title');
    });

    test('DELETE /api/quizzes/:id should delete a task', async () => {
        const res = await request(app)
            .delete(`/api/quizzes/${taskId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Deleted successfully');
    });
});
