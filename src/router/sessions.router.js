import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate('register', {failureRedirect : 'fail-register'}), async (req, res) => {
  //la logica fue trasladada al passport
  res.send({ status: "success", message: "user registred" });
});

router.get('/fail-register', async (req,res) => {
  res.send ({status:'error ', message: 'Register failed'});
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/'}), async (req, res) => {
  if(!req.user) return res.status(500).send({status: 'error', error: 'Invalis Credentials'});
  req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      role: req.user.role
  };
  res.send({status: 'error', error: 'Login failed'});

      //   if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      //     req.session.user = {
      //         name: `Coder House`,
      //         email: email,
      //         age: 0,
      //         role: 'admin'
      //     };
      //     return res.send({ status: 'success', message: 'Login success' });
      // };
    // router.get('/fail-login', async (req,res) => {
    //   res.send ({status:'error ', message: 'login failed'});
    // })

});

router.get("/logout", (req, res) => {
    req.session.destroy (err => {
        if(err) return res.status(500).send({ status: "error", error: "logout fail" });
        res.redirect("/")
    })
});

export default router;
