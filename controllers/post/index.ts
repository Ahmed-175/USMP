/**
 * Post Controllers Index
 * 
 * This file exports all post-related controllers organized by functionality:
 * - Public controllers (no authentication required)
 * - CRUD controllers (create, read, update, delete)
 * - Interaction controllers (like, unlike, view, share)
 * - Status controllers (publish, archive, unarchive)
 */

// Public Controllers (no auth required)
export {
  getAllPosts,
  getPostById,
  searchPosts,
  getTrendingPosts
} from './public.controller';

// CRUD Controllers (auth required)
export {
  createPost,
  updatePost,
  deletePost
} from './crud.controller';

// Interaction Controllers (auth required)
export {
  likePost,
  unlikePost,
  addView,
  sharePost
} from './interaction.controller';

// Status Controllers (auth required)
export {
  publishPost,
  archivePost,
  unarchivePost
} from './status.controller';

