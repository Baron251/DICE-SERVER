const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

const errorResponse = (res, error) => {
	return res.status(500).json({
		Error: error.message,
	});
};

router.post("/signup", async (req, res) => {
	try {
		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 13),
		});

		const newUser = await user.save();

		const token = jwt.sign({ email: user.email }, SECRET, {
			expiresIn: "1 day",
		});

        res.status(200).json({
            user: newUser,
            message: "Success! User Created!",
            token
        })
	} catch (err) {
		errorResponse(res, err);
	}
});

module.exports = router;
