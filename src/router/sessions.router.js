import { Router } from "express";
import userModel from "../dao/models/users.model.js";

const router = Router();

router.post("/registro", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist)
      return res
        .status(400)
        .send({ status: "error", error: "user already existeh" });
    const user = {
      first_name,
      last_name,
      email,
      age,
      password,
    };

    await userModel.create(user);
    res.send({ status: "success", message: "user registred" });
  } catch (error) {
    res.status(500).send({ status: "error", error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, password });

    if (!user)
      return res
        .status(400)
        .send({ status: "error", error: "credenciales incrorrectas" });

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
    };
    res.send({ status: "success", message: "login exitoso" });

  } catch (error) {
    res.status(500).send({ status: "error", error: error });

  }
});

router.get("/logout", (req, res) => {

    req.session.destroy (err => {
        if(err) return res.status(500).send({ status: "error", error: "logout fail" });
        res.redirect("/")
    })
});

export default router;
