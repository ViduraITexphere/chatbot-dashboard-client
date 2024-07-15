import React, { useState, useEffect } from "react";
import "./transcript.css";

const Transcript = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [filteredTranscripts, setFilteredTranscripts] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const objectId = new URLSearchParams(window.location.search).get("objectId");

  useEffect(() => {
    const fetchTranscripts = async () => {
      if (!objectId) {
        console.error("ObjectId is missing from the URL");
        return;
      }

      try {
        const response = await fetch(
          `https://chatbot-transcript-get-server.vercel.app/api/transcripts?objectId=${objectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors", // Ensure CORS mode is set
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTranscripts(data.transcripts);
      } catch (error) {
        console.error("Error fetching transcripts:", error);
      }
    };

    fetchTranscripts();
  }, [objectId]);

  const handleFilterChange = (event) => {
    setFilterDate(event.target.value);
  };

  useEffect(() => {
    if (filterDate) {
      const filtered = transcripts.filter(
        (transcript) =>
          new Date(transcript.timestamp).toDateString() ===
          new Date(filterDate).toDateString()
      );
      setFilteredTranscripts(filtered);
    } else {
      setFilteredTranscripts(transcripts);
    }
  }, [filterDate, transcripts]);

  return (
    <div className="transcript-container">
      <div className="transcript-header">
        <h2>Transcripts</h2>
        <input type="date" value={filterDate} onChange={handleFilterChange} />
      </div>
      {filteredTranscripts.map((transcript, index) => (
        <div className="transcript-item" key={index}>
          <input type="checkbox" className="toggle" id={`toggle${index}`} />
          <label className="toggle-label" htmlFor={`toggle${index}`}>
            Transcript {index + 1} -{" "}
            {new Date(transcript.timestamp).toLocaleDateString()}
          </label>
          <div className="transcript-content">
            {transcript.transcripts.map((session, idx) => (
              <div className="session" key={idx}>
                {session.transcript.map((message, msgIdx) => (
                  <div className="message" key={msgIdx}>
                    <strong>{message.sender}:</strong> {message.message}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transcript;
