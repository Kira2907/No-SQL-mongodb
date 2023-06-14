const { User } = require('../models/Users');

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboardData = await User.find({}, ["name", "totalExpense"])
      .sort({ totalExpense: -1 });

    res.status(200).json(leaderboardData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve leaderboard data" });
  }
};