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
})

router.put('/editexpense', (req, res) => {
	const { expenseId, expenseTitle, expenseAmount } = req.body;
	if(!expenseId && !expenseTitle && !expenseAmount){
		return res.status(422).json({error: "please send all the fields"})
	}
	Expense.findById(expenseId).then((data) => {
		data.expenseAmount = expenseAmount;
		data.expenseTitle = expenseTitle;
		res.send({message: "expense updated sucessfully"});
		data.save();
	}).catch((err) => res.send(err))
})

router.delete('/deleteExpense/:id', (req, res) => {
	const id = req.params.id;
	Expense.findById(id).remove().then((data) => {
		res.send(data);
	}).catch((err) => {
		res.send(err);
	})
})

module.exports = router;