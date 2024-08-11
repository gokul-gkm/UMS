// routes/adminRoutes.js

import express from 'express';
import {
  authAdmin,
  logoutAdmin,
  getUsers,
  getUserById,
  editUser,
    deleteUser,
    createUser
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth', authAdmin);
router.post('/logout', logoutAdmin);
router.route('/users').get(protect, admin, getUsers).post(protect, admin, createUser);
router.route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, editUser)
  .delete(protect, admin, deleteUser);

export default router;