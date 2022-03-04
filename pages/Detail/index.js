import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function Detail() {
  const { char_id } = useParams();
  const [char, setChar] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`)
      .then(res => res.data)
      .then(data => setChar(data[0]));
  }, [char_id]);

  return (
    <div id="container">
      {char && (
        <div>
          <div>
            <h1 className="special">{char.name}</h1>
          </div>

          <div className="special">
            <div>
              <img
                src={char.img}
                alt=""
                style={{ width: "400px", height: "600px" }}
              />
            </div>

            <div>
              <ul>
                <li>
                  <p>Birthday: {char.birthday}</p>
                </li>
                <li>
                  <p>Occupation: {char.occupation}</p>
                </li>
                <li>
                  <p>Nickname: {char.nickname}</p>
                </li>
                <li>
                  <p>Status: {char.status}</p>
                </li>
                <li>
                  <p>Portrayed: {char.portrayed}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
