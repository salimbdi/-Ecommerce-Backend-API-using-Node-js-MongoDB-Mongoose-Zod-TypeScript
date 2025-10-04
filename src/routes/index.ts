import { Router } from 'express';
const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "Welcome to my backend API ms stark 🚀" });
});


// import and mount other routers, e.g.:
// router.use('/users', usersRouter);

export default router;
