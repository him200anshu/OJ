const axios = require('axios');
const { Problem } = require('./mongo');

const fetchp=async () =>{
  try {
    const response = await axios.get("https://leetcode.com/api/problems/all/");
    const problems = response.data?.stat_status_pairs || [];
    
    for (let i = 0; i < problems.length; i++) {
      const problemData = problems[i];
      const post = new Problem({
        problemId: problemData.stat.question_id,
        title: problemData.stat.question__title,
        difficulty: problemData.difficulty.level,
        paidOnly: problemData.paid_only,
      });
      await post.save();
    }
    
    console.log("All problems fetched and saved successfully!");
  } catch (error) {
    console.log("Error fetching and saving problems:", error.message);
  }
}

module.exports = fetchp;
