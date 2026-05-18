router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const exists = await UserModel.findOne({ email });

  if (exists) {
    return res.status(400).send({ status: "error", error: "User exists" });
  }

  const newUser = await UserModel.create({
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
  });

  res.send({ status: "success", payload: newUser });
});

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    const token = generateToken(req.user);

    res.send({
      status: "success",
      token,
    });
  },
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send({
      status: "success",
      payload: req.user,
    });
  },
);
