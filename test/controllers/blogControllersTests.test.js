const { describe, test, expect, beforeAll } = require('vitest');
const { sequelize } = require('../../src/db.js');
const { BlogsControllers } = require('../../src/controllers/index.js');
const { createBlogs, getBlogs, updateBlogs, deleteBlogs } = BlogsControllers;

describe('Blog Controllers', () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    test('should create a new blog', async () => {
        const blog = { title: 'Test Blog', content: 'This is a test blog' };
        const userId = 1;
        const blogs = await createBlogs(blog, userId);
        expect(blogs).toHaveLength(1);
        expect(blogs[0].title).toBe(blog.title);
        expect(blogs[0].content).toBe(blog.content);
    });

    test('should get all blogs', async () => {
        const blogs = await getBlogs();
        expect(blogs).toHaveLength(1);
    });

    test('should update a blog', async () => {
        const blog = { title: 'Updated Blog', content: 'This is an updated blog' };
        const blogId = 1;
        const updatedBlog = await updateBlogs(blogId, blog);
        expect(updatedBlog.title).toBe(blog.title);
        expect(updatedBlog.content).toBe(blog.content);
    });

    test('should delete a blog', async () => {
        const blogId = 1;
        await deleteBlogs(blogId);
        const blogs = await getBlogs();
        expect(blogs).toHaveLength(0);
    });

});
