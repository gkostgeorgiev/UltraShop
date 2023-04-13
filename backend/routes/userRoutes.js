import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUserById,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, isAdmin, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUserByAdmin);

export default router;
