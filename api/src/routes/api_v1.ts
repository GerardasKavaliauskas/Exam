import express from 'express';
import userRouter from './userAPI';
import eventRouter from './eventAPI'
// import rateRouter from './rateAPI';
// import tagRouter from './tagAPI';

const router = express.Router();

// -- // -- // -- // -- //

router.use('/users/', userRouter);
router.use('/events/', eventRouter);
// router.use('/rates/', rateRouter);
// router.use('/tags/', tagRouter);

export default router;

// -- // -- // -- // -- //

// USERS

// GET: /users, /users/:id
// POST: /users
// PUT: /users/:id
// DELETE: /users/:id
