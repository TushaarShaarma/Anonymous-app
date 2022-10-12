import React, { useState } from "react";
import "./SaveResponse.css";

function SaveResponse() {
  const [userName, setUserName] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const userResponse = [];
  const [allResponses, setAllResponses] = useState([]);

  //to get all the responses from api
  fetch(
    "https://anonymous-msg-app-default-rtdb.asia-southeast1.firebasedatabase.app/message.json"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (const dataItem in data) {
        userResponse.push({
          userName: data[dataItem].userName,
          userMessage: data[dataItem].userMessage,
        });
      }
      setAllResponses(userResponse);
      // setUserResponse(data);
    });
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userName)
    // console.log(userMessage)

    //creating new entries in api
    fetch(
      "https://anonymous-msg-app-default-rtdb.asia-southeast1.firebasedatabase.app/message.json",
      {
        method: "POST",
        header: { "Content -Type": "application/json" },
        body: JSON.stringify({
          userName: userName,
          userMessage: userMessage,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="container">
      <div className="container-box">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input
              className="input-user-name"
              type="text"
              placeholder="Enter Name"
              onChange={handleUserNameChange}
              value={userName}
            />
            <input
              className="input-user-message"
              type="text"
              placeholder="Enter your message"
              onChange={handleUserMessageChange}
              value={userMessage}
            />
            <button className="input-submit" type="submit">
              Submit
            </button>
          </form>
        </div>

        <div className="response-container">
          {allResponses &&
            allResponses.map((item) => {
              return (
                <div className="response-item">
                  <p className="response-name">{item.userName}:</p>
                  <p className="response-message">{item.userMessage}</p>
                </div>
              );
            })}
        </div>
      </div>
      <h6>Made by Tushar Sharma</h6>
    </div>
  );
}

export default SaveResponse;
