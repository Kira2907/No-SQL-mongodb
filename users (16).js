const { User } = require("../models/Users");
const bcrypt = require('bcrypt');

exports.signUsers = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.loginUsers = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    const userId = user._id;

    res.status(200).json({ userId });
  } catch (err) {
    res.status(500).send(err);
  }
};

 