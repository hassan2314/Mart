import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
    // adminProfile,
    currentPasswordChange,
    getCurrentUser,
    loginUser,
    logoutUser,
    // orderHistory,
    refreshToken,
    registerUser,
    updateAccountDetails,
    updateUserAvtar,
    // userProfile,
    
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJwt, logoutUser);

router.route("/refresh-token").post(refreshToken);

router.route("/current-user").get(verifyJwt, getCurrentUser);

// router.route("/user-profile").get(verifyJwt, userProfile);

// router.route("/admin-profile").get(verifyJwt, adminProfile);

// router.route("/order-history").get(verifyJwt, orderHistory);

router.route("/update-account-details").put(verifyJwt, updateAccountDetails);

router.route("/update-user-avatar").put(verifyJwt, upload.single("avatar"), updateUserAvtar);

router.route("/change-password").put(verifyJwt, currentPasswordChange);

export default router;
