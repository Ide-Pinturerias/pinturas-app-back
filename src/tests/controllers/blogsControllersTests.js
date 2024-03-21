const { BlogsControllers } = require('#CONTROLLERS');
const { expect } = require('chai');
require('dotenv').config();
const { TOKEN_FOR_TESTS } = process.env;

const MISSING_PARAMS = {};
const NO_BLOG_FOUND_PARAMS = {
  blogId: 'bb8d3fa9-f8ef-4bdd-94e3-8b1851bf77ea',
  blogContent: {},
  token: TOKEN_FOR_TESTS
};
const ONLY_TOKEN_PARAMS = { token: TOKEN_FOR_TESTS };

const BLOGS_CONTROLLERS_TESTS = async function () {
  // 0. Get All Blogs
  describe('Get All Blogs', () => {
    it('Should return an array of blogs with idBlog, image, title, description, active and userId properties',
      async () => {
        const blogs = await BlogsControllers.getAllBlogs();
        expect(blogs).to.be.an('array');
        expect(blogs[0]).to.have.property('idBlog');
        expect(blogs[0]).to.have.property('image');
        expect(blogs[0]).to.have.property('title');
        expect(blogs[0]).to.have.property('description');
        expect(blogs[0]).to.have.property('active');
        expect(blogs[0]).to.have.property('userId');
      }
    );
  });

  // 1. Get Blog by id
  describe('Get Blog by id', () => {
    it('Should return a blog with idBlog, image, title, description, active and userId properties',
      async () => {
        const createdBlog = await BlogsControllers.createBlog({
          blog: {
            title: 'Test Blog',
            description: 'Test Blog Description'
          },
          token: TOKEN_FOR_TESTS
        });
        const blog = await BlogsControllers.getBlogById({
          blogId: createdBlog.idBlog
        });
        expect(blog).to.have.property('idBlog');
        expect(blog).to.have.property('image');
        expect(blog).to.have.property('title');
        expect(blog).to.have.property('description');
        expect(blog).to.have.property('active');
        expect(blog).to.have.property('userId');
        const destroyedBlog = await BlogsControllers.destroyBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(destroyedBlog).to.have.property('idBlog');
      });

    it('Should throw an error if no blog is found', async () => {
      try {
        await BlogsControllers.getBlogById(NO_BLOG_FOUND_PARAMS);
      } catch (error) {
        expect(error.message).to.equal(`Blog with id ${NO_BLOG_FOUND_PARAMS.blogId} not found`);
      }
    });

    it('Should throw an error if params are missing', async () => {
      try {
        await BlogsControllers.getBlogById(MISSING_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing params');
      }
    });
  });

  // 2. Create Blog
  describe('Create Blog', async () => {
    it('Should return a blog with idBlog, image, title, description, active and userId properties',
      async () => {
        const createdBlog = await BlogsControllers.createBlog({
          blog: {
            title: 'Test Blog',
            description: 'Test Blog Description'
          },
          token: TOKEN_FOR_TESTS
        });
        expect(createdBlog).to.have.property('idBlog');
        expect(createdBlog).to.have.property('image');
        expect(createdBlog).to.have.property('title');
        expect(createdBlog).to.have.property('description');
        expect(createdBlog).to.have.property('active');
        expect(createdBlog).to.have.property('userId');
        const destroyedBlog = await BlogsControllers.destroyBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(destroyedBlog).to.have.property('idBlog');
      });

    it('Should throw an error if params are missing', async () => {
      try {
        await BlogsControllers.createBlog(ONLY_TOKEN_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing params');
      }
    });

    it('Should throw an error if no token is provided', async () => {
      try {
        await BlogsControllers.createBlog(MISSING_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing authorization token');
      }
    });
  });

  // 3. Edit Blog
  describe('Edit Blog', () => {
    it('Should return a blog with idBlog, image, title, description, active and userId properties',
      async () => {
        const createdBlog = await BlogsControllers.createBlog({
          blog: {
            title: 'Test Blog',
            description: 'Test Blog Description'
          },
          token: TOKEN_FOR_TESTS
        });
        const editedBlog = await BlogsControllers.editBlog({
          blogId: createdBlog.idBlog,
          blogContent: {
            title: 'Test Blog Edited',
            description: 'Test Blog Description Edited'
          },
          token: TOKEN_FOR_TESTS
        });
        expect(editedBlog).to.have.property('idBlog');
        expect(editedBlog).to.have.property('image');
        expect(editedBlog).to.have.property('title');
        expect(editedBlog).to.have.property('description');
        expect(editedBlog).to.have.property('active');
        expect(editedBlog).to.have.property('userId');
        const destroyedBlog = await BlogsControllers.destroyBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(destroyedBlog).to.have.property('idBlog');
      });

    it('Should throw an error if no blog is found', async () => {
      try {
        await BlogsControllers.editBlog(NO_BLOG_FOUND_PARAMS);
      } catch (error) {
        expect(error.message).to.equal(`Blog with id ${NO_BLOG_FOUND_PARAMS.blogId} not found`);
      }
    });

    it('Should throw an error if params are missing', async () => {
      try {
        await BlogsControllers.editBlog(ONLY_TOKEN_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing params');
      }
    });

    it('Should throw an error if no token is provided', async () => {
      try {
        await BlogsControllers.editBlog(MISSING_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing authorization token');
      }
    });
  });

  // 4. Delete Blog
  describe('Delete Blog', () => {
    it('Should return a blog with idBlog, image, title, description, active and userId properties',
      async () => {
        const createdBlog = await BlogsControllers.createBlog({
          blog: {
            title: 'Test Blog',
            description: 'Test Blog Description'
          },
          token: TOKEN_FOR_TESTS
        });
        const deletedBlog = await BlogsControllers.deleteBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(deletedBlog).to.have.property('idBlog');
        expect(deletedBlog).to.have.property('image');
        expect(deletedBlog).to.have.property('title');
        expect(deletedBlog).to.have.property('description');
        expect(deletedBlog).to.have.property('active');
        expect(deletedBlog).to.have.property('userId');
        // active property should be false
        expect(deletedBlog.active).to.equal(false);
        const destroyedBlog = await BlogsControllers.destroyBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(destroyedBlog).to.have.property('idBlog');
      });

    it('Should throw an error if no blog is found', async () => {
      try {
        await BlogsControllers.deleteBlog(NO_BLOG_FOUND_PARAMS);
      } catch (error) {
        expect(error.message).to.equal(`Blog with id ${NO_BLOG_FOUND_PARAMS.blogId} not found`);
      }
    });

    it('Should throw an error if params are missing', async () => {
      try {
        await BlogsControllers.deleteBlog(ONLY_TOKEN_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing params');
      }
    });
  });

  // 5. Destroy Blog
  describe('Destroy Blog', () => {
    it('Should return a blog with idBlog, image, title, description, active and userId properties',
      async () => {
        const createdBlog = await BlogsControllers.createBlog({
          blog: {
            title: 'Test Blog',
            description: 'Test Blog Description'
          },
          token: TOKEN_FOR_TESTS
        });
        const destroyedBlog = await BlogsControllers.destroyBlog({
          blogId: createdBlog.idBlog,
          token: TOKEN_FOR_TESTS
        });
        expect(destroyedBlog).to.have.property('idBlog');
      });

    it('Should throw an error if no blog is found', async () => {
      try {
        await BlogsControllers.destroyBlog(NO_BLOG_FOUND_PARAMS);
      } catch (error) {
        expect(error.message).to.equal(`Blog with id ${NO_BLOG_FOUND_PARAMS.blogId} not found`);
      }
    });

    it('Should throw an error if params are missing', async () => {
      try {
        await BlogsControllers.destroyBlog(ONLY_TOKEN_PARAMS);
      } catch (error) {
        expect(error.message).to.equal('Missing params');
      }
    });
  });
};

module.exports = BLOGS_CONTROLLERS_TESTS;
