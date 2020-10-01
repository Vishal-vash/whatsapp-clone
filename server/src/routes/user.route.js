import express from "express";
import User from "../models/user.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//Create a new user
router.post("/api/users/new", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateToken(); //Create a unique token
    await user.save(); //Save the user
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

//Login a user
router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.phone,
      req.body.password
    );
    const token = await user.generateToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send()
  }
});

//Fetch logged in user
router.get("/api/users/me", auth, async(req, res) => {
  res.send(req.user)
})

//Update logged in user
router.patch("/api/users/me", auth, async (req, res) => {
  const requestedUpdatesArr = Object.keys(req.body);
  const allowedUpdatesArr = ["name", "phone", "password", "country"];
  const isUpdateAllowed = requestedUpdatesArr.every(update => allowedUpdatesArr.includes(update));

  if(!isUpdateAllowed) {
    res.status(400).send({error: "Invalid updates provided."})
  }

  try {
    requestedUpdatesArr.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user)
  } catch (error) {
    res.status(400).send({})
  }
})

//Delete a user
router.delete("/api/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send({})
  }
})

export default router;
