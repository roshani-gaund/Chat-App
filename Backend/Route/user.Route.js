import express from 'express';
import { signup,login, checkAuth,logout, updateProfile } from '../Controller/user.controller.js';
import { protectRoute } from '../Middleware/auth.middleware.js';
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,updateProfile);
router.get("/check" , protectRoute, checkAuth);
router.get("/test", protectRoute, (req, res) => {
  res.json({ message: "protectRoute WORKING" });
});
export default router;