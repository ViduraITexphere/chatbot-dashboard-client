import React, { useState, useEffect } from "react";
import "./transcript.css"; // External CSS file for styling

const Transcript = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [filteredTranscripts, setFilteredTranscripts] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [expanded, setExpanded] = useState({});
  const [readStatus, setReadStatus] = useState({});
  const [noteInput, setNoteInput] = useState({});
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
            mode: "cors",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTranscripts(data.transcripts);
        setFilteredTranscripts(data.transcripts);

        // Initialize read status
        const initialReadStatus = {};
        data.transcripts.forEach((transcript) => {
          initialReadStatus[transcript._id] = transcript.read;
        });
        setReadStatus(initialReadStatus);
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

  const toggleAccordion = async (sessionId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [sessionId]: !prevExpanded[sessionId],
    }));

    // Check if the transcript has not been marked as read yet
    if (!readStatus[sessionId]) {
      try {
        const response = await fetch(
          `http://localhost:5000/transcripts/${sessionId}/read`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTranscripts((prevTranscripts) =>
          prevTranscripts.map((transcript) =>
            transcript._id === sessionId
              ? { ...transcript, read: true }
              : transcript
          )
        );
        setFilteredTranscripts((prevTranscripts) =>
          prevTranscripts.map((transcript) =>
            transcript._id === sessionId
              ? { ...transcript, read: true }
              : transcript
          )
        );

        // Update read status
        setReadStatus((prevReadStatus) => ({
          ...prevReadStatus,
          [sessionId]: true,
        }));
      } catch (error) {
        console.error("Error updating transcript read status:", error);
      }
    }
  };

  const handleDelete = async (sessionId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/transcripts/${sessionId}`, // Updated URL without /api
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setTranscripts((prevTranscripts) =>
        prevTranscripts.filter((transcript) => transcript._id !== sessionId)
      );
      setFilteredTranscripts((prevTranscripts) =>
        prevTranscripts.filter((transcript) => transcript._id !== sessionId)
      );

      setReadStatus((prevReadStatus) => {
        const newReadStatus = { ...prevReadStatus };
        delete newReadStatus[sessionId];
        return newReadStatus;
      });
    } catch (error) {
      console.error("Error deleting transcript:", error);
    }
  };

  const addNoteToTranscript = async (sessionId, note) => {
    try {
      const response = await fetch(
        `http://localhost:5000/transcripts/${sessionId}/note`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ note }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Optionally, update the transcript state with the updated transcript including the note
    } catch (error) {
      console.error("Error adding note to transcript:", error);
    }
  };

  const handleNoteChange = (event, sessionId) => {
    setNoteInput({
      ...noteInput,
      [sessionId]: event.target.value,
    });
  };

  const handleSubmitNote = async (sessionId) => {
    if (noteInput[sessionId].trim() === "") {
      alert("Note cannot be empty");
      return;
    }

    // Call addNoteToTranscript function to send a POST request
    addNoteToTranscript(sessionId, noteInput[sessionId]);

    // Optionally, update local state or refresh transcripts
    setNoteInput({
      ...noteInput,
      [sessionId]: "", // Clear the note input field after submission
    });
  };

  return (
    <div className="transcript-container">
      <div className="transcript-header">
        <h2>Transcripts</h2>
        <input type="date" value={filterDate} onChange={handleFilterChange} />
      </div>
      {filteredTranscripts.map((transcript, index) => (
        <div
          className={`transcript-item ${transcript.read ? "read" : ""}`}
          key={index}
          onClick={() => toggleAccordion(transcript._id)}
        >
          <div className="accordion-header">
            <h3>
              Transcript {index + 1} -{" "}
              {new Date(transcript.timestamp).toLocaleDateString()}
            </h3>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(transcript._id);
              }}
            >
              Delete
            </button>
          </div>
          {expanded[transcript._id] && (
            <div className="accordion-content">
              {transcript.transcripts.map((session, idx) => (
                <div className="session" key={idx}>
                  <strong>Transcript ID:</strong> {session._id}
                  {session.transcript.map((message, msgIdx) => (
                    <div className="message" key={msgIdx}>
                      <strong>{message.sender}:</strong> {message.message}
                    </div>
                  ))}
                </div>
              ))}
              <textarea
                rows="4"
                className="note-input"
                placeholder="Add note..."
                value={noteInput[transcript._id] || ""}
                onChange={(e) => handleNoteChange(e, transcript._id)}
                onClick={(e) => e.stopPropagation()} // Prevent accordion from closing
              />
              <button
                className="add-note-button"
                onClick={() => handleSubmitNote(transcript._id)}
              >
                Add Note
              </button>
              {transcript.note && (
                <div className="note">
                  <strong>Note:</strong> {transcript.note}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Transcript;
