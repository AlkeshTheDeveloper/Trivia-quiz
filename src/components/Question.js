import React, { useEffect, useState } from "react";

function Question() {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [isAnswer, setIsAnswer] = useState(false);
  async function getData() {
    const url = await fetch("https://jservice.io/api/random");
    const res = await url.json();
    const data = setQuestion(res);
  }
  useEffect(() => {
    getData();
  }, [isAnswer, result]);

  const checkanswer = (e) => {
    if (answer.length && answer === question[0].answer) {
      setResult("correct");
      setIsAnswer(true);
    } else {
      setResult("incorrect");
    }
  };

  return (
    <React.Fragment>
      <div>
        <p className="question">
          Question:
          {question.map((item, index) => (
            <span key={index}> {item.question} </span>
          ))}
        </p>
        <form
          onSubmit={(e) => {
            checkanswer(e);
          }}
        >
          <input
            type="text"
            id="answer"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            required
          />

          <button>Submit</button>
        </form>

        {result ? <p className={result}>{result}</p> : ""}

        {question.map((item, index) => (
          <p key={index}> Hint: {item.answer} </p>
        ))}
      </div>
    </React.Fragment>
  );
}
export default Question;
