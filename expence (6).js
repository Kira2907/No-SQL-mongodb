const { User, Expense } = require("../models/Users");

exports.addExpense = async (req, res) => {
  const { amount, description, category, userId } = req.body;

  try {
    const expense = await Expense.create({
      amount,
      description,
      category,
      userId,
    });

    console.log(expense);

    const user = await User.findById(userId);
    let totalExpense = user.totalExpense || 0;

    totalExpense += amount;

    await User.findByIdAndUpdate(userId, { totalExpense });

    res.status(201).json(expense);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const userId = req.query.userId;

    const skip = (page - 1) * limit;

    const totalCount = await Expense.countDocuments({ userId });

    const expenses = await Expense.find({ userId })
      .limit(limit)
      .skip(skip);

        res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.query.userId;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const amount = expense.amount;

    await User.findByIdAndUpdate(userId, { $inc: { totalExpense: -amount } });

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};