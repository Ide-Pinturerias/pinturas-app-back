const { Router } = require('express');
const { BlogsHandlers } = require('#HANDLERS');
const { auth, createRateLimiter, blogsUploads } = require('#MIDDLEWARES');

const router = Router();

// To limit the number of requests per IP for /blogs
const blogRateLimiter = createRateLimiter(0, 1, 5); // 5 requests per hour

// 1. POST /blogs
router.post(
  '/',
  [blogsUploads.single('image'), auth, blogRateLimiter],
  BlogsHandlers.createBlog
);
// 2. DELETE /blogs/:id
router.delete('/:id', [auth, blogRateLimiter], BlogsHandlers.deleteBlog);
// 3. GET /details/:id
router.get('/details/:id', BlogsHandlers.getBlogById);
// 4. GET /blogs
router.get('/', BlogsHandlers.getAllBlogs);
// 5. PUT /blogs
router.put('/:id', [blogsUploads.single('image'), auth, blogRateLimiter], BlogsHandlers.editBlog);
// 6. DESTROY /blogs
router.post('/destroy', [auth, blogRateLimiter], BlogsHandlers.destroyBlog);

module.exports = router;
