const router = require("express").Router();
const Die = require("../models/die.model");

const errorResponse = (res, error) => {
	return res.status(500).json({
		Error: error.message,
	});
};

router.post("/add", async (req, res) => {
	try {
		const { sides, color, material, hollow, uses } = req.body;
		const die = new Die({
			sides,
			color,
			material,
			hollow,
			uses,
		});

		const newDie = await die.save();

		res.status(200).json({
			die: newDie,
			message: "New die added to the bag",
		});
	} catch (err) {
		errorResponse(res, err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const getDie = await Die.findOne({ _id: id });

		getDie
			? res.status(200).json({
					message: `You found a D${getDie.sides} in your bag.`,
					getDie,
			  })
			: res.status(404).json({
					message: `You coudln't find that particular D${getDie.sides} in your bag...`,
			  });
	} catch (err) {
		errorResponse(res, err);
	}
});

router.get("/", async (req, res) => {
	try {
		const getAllDice = await Die.find();

		getAllDice
			? res.status(200).json({
					message:
						"Well, you made the mess, now you get to look at all of your dice.",
					getAllDice,
			  })
			: res.status(400).json({
					message:
						"Well that sucks. Looks like the dice goblin struck again. Your bag is empty.",
			  });
	} catch (err) {
		errorResponse(res, err);
	}
});

router.get("/color/:color", async (req, res) => {
	try {
		const { color } = req.params;

		const getDice = await Die.find({ color: color });

		getDice.length > 0
			? res.status(200).json({
					message: `These are all the dice you have in this color.`,
					getDice,
			  })
			: res.status(404).json({
					message: "You don't have any dice of this color.",
			  });
	} catch (err) {
		errorResponse(res, err);
	}
});

module.exports = router;
