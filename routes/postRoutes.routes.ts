import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createPostSchema,
  updatePostSchema,
  sharePostSchema,
} from "../utils/joiSchema.util";
import {
  // Public controllers
  getAllPosts,
  getPostById,
  getTrendingPosts,
  searchPosts,
  // CRUD controllers
  createPost,
  updatePost,
  deletePost,
  // Interaction controllers
  likePost,
  unlikePost,
  addView,
  sharePost,
  // Status controllers
  publishPost,
  archivePost,
  unarchivePost,
} from "../controllers/post";

const router = Router();

router.get("/", getAllPosts);
router.get("/trending/all", getTrendingPosts);
router.get("/search", searchPosts);
router.use(requireAuth);

router.get("/:id", getPostById);
router.post("/", validate(createPostSchema), createPost);
router.put("/:postId", validate(updatePostSchema), updatePost);
router.delete("/:postId", deletePost);

router.post("/:id/like", likePost);
router.post("/:id/unlike", unlikePost);
router.post("/:id/view", addView);
router.post("/:id/share", validate(sharePostSchema), sharePost);

router.put("/:id/publish", publishPost);

router.put("/:id/archive", archivePost);

router.put("/:id/unarchive", unarchivePost);

export default router;
