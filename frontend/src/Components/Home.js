import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/problems");
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homepage">
      <h1>Hello {location.state.id} and welcome to the home</h1>

      <div className="questions">
        <h2>Question List</h2>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <a href={question.link} target="_blank" rel="noopener noreferrer">
                {question.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
