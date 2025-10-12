import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware";
import editProfile from "../controllers/user/editProfile.controllers";
import multer from "multer";
import { storageAvatars, storageBanner } from "../configs/multerConfig";
import upload from "../controllers/user/upload.controller";
import toggleFollowUser from "../controllers/user/toggleFollowUser.controller";
const router = Router();

const uploadAvatar = multer({storage : storageAvatars});
const uploadBanner = multer({storage : storageBanner });


router.use(requireAuth);
router.put("/edit-profile", editProfile);
router.post("/upload-avatar", uploadAvatar.single("avatar"), upload)
router.post("/upload-banner", uploadBanner.single("banner"), upload)
router.put("/follow-toggle/:id", toggleFollowUser);

export default router;
