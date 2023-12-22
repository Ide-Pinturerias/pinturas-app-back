const { Router } = require('express');
const { BlogsHandlers } = require('../handlers/');
const { blogsUploads } = require('../middlewares/');
const auth = require('../middlewares/auth');

const router = Router();

// 1. POST /blogs
router.post(
  '/',
  [blogsUploads.single('image'), auth],
  BlogsHandlers.createBlog
);
// 2. DELETE /blogs/:id
router.delete('/:id', auth, BlogsHandlers.deleteBlog);
// 3. GET /details/:id
router.get('/details/:id', BlogsHandlers.getBlogById);
// 4. GET /blogs
router.get('/', BlogsHandlers.getAllBlogs);
// 5. PUT /blogs
router.put('/:id', [blogsUploads.single('image'), auth], BlogsHandlers.editBlog);
// 6. DESTROY /blogs
router.post('/destroy', auth, BlogsHandlers.destroyBlog);

module.exports = router;
