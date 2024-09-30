const request = require('supertest');
const express = require('express');
const app = require('./server.js'); // Adjust the path to your Express app
const mongoose = require('mongoose');




describe('API Endpoints', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect('add mongo url');
        server = app.listen(4000, done);
    });

    afterAll(async () => {
        // Close the connection after tests are done
        await mongoose.connection.close();
        server.close(done);
    });

    let token;
    let postId;
    let commentId;
    let storyId;

    test('POST /api/auth/register - should register a new user', async () => {
        const response = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token; // Save token for authenticated requests
    });

    test('POST /api/auth/login - should log in an existing user', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: 'testuser@example.com',
            password: 'password123',
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token; // Save token for authenticated requests
    });

    test('GET /api/auth/user - should retrieve authenticated user profile', async () => {
        const response = await request(app)
            .get('/api/auth/user')
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe('testuser');
    });

    test('POST /api/posts - should create a new post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .set('x-auth-token', token)
            .send({ content: 'This is a test post.' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.content).toBe('This is a test post.');
        postId = response.body._id; // Save post ID for future tests
    });

    test('GET /api/posts/feed - should retrieve the authenticated user\'s feed', async () => {
        const response = await request(app)
            .get('/api/posts/feed')
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /api/posts/:id - should retrieve a specific post by its ID', async () => {
        const response = await request(app)
            .get(`/api/posts/${postId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', postId);
    });

    test('POST /api/comments/:postId - should add a comment to a specific post', async () => {
        const response = await request(app)
            .post(`/api/comments/${postId}`)
            .set('x-auth-token', token)
            .send({ content: 'This is a test comment.' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.content).toBe('This is a test comment.');
        commentId = response.body._id; // Save comment ID for future tests
    });

    test('GET /api/comments/:postId - should retrieve comments for a specific post', async () => {
        const response = await request(app)
            .get(`/api/comments/${postId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/comments/:commentId/reply - should reply to a specific comment', async () => {
        const response = await request(app)
            .post(`/api/comments/${commentId}/reply`)
            .set('x-auth-token', token)
            .send({ content: 'This is a reply to the comment.' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    test('DELETE /api/comments/:id - should delete a specific comment', async () => {
        const response = await request(app)
            .delete(`/api/comments/${commentId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Comment removed');
    });

    test('POST /api/likes/post/:postId - should like a specific post', async () => {
        const response = await request(app)
            .post(`/api/likes/post/${postId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Post liked');
    });

    test('DELETE /api/likes/post/:postId - should unlike a specific post', async () => {
        const response = await request(app)
            .delete(`/api/likes/post/${postId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Post unliked');
    });

    test('POST /api/stories - should create a new story', async () => {
        const response = await request(app)
            .post('/api/stories')
            .set('x-auth-token', token)
            .field('caption', 'This is a test story')
            .attach('media', './icon.png'); // Replace with a valid file path

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Story created successfully');
        storyId = response.body.story._id; // Save story ID for future tests
    });

    test('GET /api/stories - should retrieve all stories for the authenticated user', async () => {
        const response = await request(app)
            .get('/api/stories')
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('DELETE /api/stories/:id - should delete a specific story by its ID', async () => {
        const response = await request(app)
            .delete(`/api/stories/${storyId}`)
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Story deleted successfully');
    });

    test('GET /api/users/profile/:id - should retrieve the profile information of a specific user', async () => {
        const response = await request(app)
            .get('/api/users/profile/testuser') // Assuming you use the username as the identifier
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.username).toBe('testuser');
    });

    test('PUT /api/users/profile - should update the authenticated user\'s profile', async () => {
        const response = await request(app)
            .put('/api/users/profile')
            .set('x-auth-token', token)
            .send({ bio: 'This is my bio.' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.bio).toBe('This is my bio.');
    });

    test('POST /api/users/follow/:id - should follow a specific user', async () => {
        const response = await request(app)
            .post('/api/users/follow/testuser') // Assuming you use the username as the identifier
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User followed');
    });

    test('POST /api/users/unfollow/:id - should unfollow a specific user', async () => {
        const response = await request(app)
            .post('/api/users/unfollow/testuser') // Assuming you use the username as the identifier
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'User unfollowed');
    });

    test('GET /api/users/search - should search for users by a query string', async () => {
        const response = await request(app)
            .get('/api/users/search?query=testuser')
            .set('x-auth-token', token);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
