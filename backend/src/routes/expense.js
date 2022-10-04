const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Expense = mongoose.model("Expense");


router.post("/addexpense", (req, res) => {
	const { expenseTitle, expenseAmount, date } = req.body;
	if (!expenseTitle || !expenseAmount) {
		return res.status(422).json({ error: "Please add all the fields!" });
	}
	const expense = new Expense({
		expenseAmount,
		expenseTitle,
		createdAt: date
	});
	expense
		.save()
		.then((expense) => {
			res.json({ message: "Saved Successfully!" });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/expense', (req, res) => {
	Expense.find({}).sort({createdAt: -1}).exec((err, docs) => {
		if(err){
			res.send(err);
		}
		if(docs){
			res.status(200).json({expenses: docs});
		}
	})

	Expense.find({}).sort({createdAt: -1}).exec((err, docs) => { 
		console.log(err);
		console.log(docs);
	});
})


module.exports = router;