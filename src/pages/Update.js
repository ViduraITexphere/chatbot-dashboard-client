// UpdateProject.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Update.css";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import toast, { Toaster } from "react-hot-toast";

const UpdateProject = () => {
  const { id } = useParams();
  console.log("Project ID:", id);
  const [projectData, setProjectData] = useState({
    title: "",
    model: "",
    // Add other fields as needed
  });

  useEffect(() => {
    // Fetch project data for the given ID and update state
    // This is a placeholder for your actual data fetching logic
    const fetchProjectData = async () => {
      try {
        // Replace this with your actual API call or data fetching method
        const response = await fetch(
          // `http://localhost:5000/getProjectsToUpdate/${id}`
          // `https://chatbot-1-o9pg.onrender.com/getProjectsToUpdate/${id}`
          // `https://chatbot-new.onrender.com/getProjectsToUpdate/${id}`
          `https://chatbot-dashboard-server.vercel.app/getProjectsToUpdate/${id}`
        );
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjectData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        // `http://localhost:5000/updateProject/${id}`,
        // `https://chatbot-1-o9pg.onrender.com/updateProject/${id}`,
        // `https://chatbot-new.onrender.com/updateProject/${id}`,
        `https://chatbot-dashboard-server.vercel.app/updateProject/${id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (response.ok) {
        console.log("Project updated successfully!");
        toast.success("Project updated successfully!", {
          style: {
            fontSize: "12px",
            fontWeight: "500",
          },
        });
        // Add any further actions or notifications here
      } else {
        console.error("Failed to update project:", response.statusText);
        // Handle error cases here
      }
    } catch (error) {
      console.error("Error updating project:", error);
      // Handle error cases here
    }
  };

  // Function to handle project deletions
  const handleDelete = async () => {
    try {
      const response = await fetch(
        // `http://localhost:5000/deleteProject/${id}`,
        // `https://chatbot-1-o9pg.onrender.com/deleteProject/${id}`,
        // `https://chatbot-new.onrender.com/deleteProject/${id}`,
        `https://chatbot-dashboard-server.vercel.app/deleteProject/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Redirect to the home page
        console.log("Project deleted successfully!");
        toast.success("Project deleted successfully!", {
          style: {
            fontSize: "12px",
            fontWeight: "500",
            color: "red",
          },
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);

        // Add any further actions or notifications here
      } else {
        console.error("Failed to delete project:", response.statusText);
        // Handle error cases here
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      // Handle error cases here
    }
  };

  return (
    <div className="update__container">
      <div className="update__header">
        <h1>Update Project</h1>
        <EditNoteIcon />
      </div>
      <div className="update__wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={projectData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="model">Model:</label>
            <textarea
              type="text"
              id="model"
              name="model"
              rows={4}
              value={projectData.model}
              onChange={handleChange}
            />
          </div>
          {/* Add other input fields for additional data */}
          <div className="button__wrapper">
            <button type="submit">
              <AutoFixHighIcon
                sx={{
                  fontSize: "1rem",
                  marginLeft: "5px",
                }}
              />
              Update Project{" "}
            </button>
          </div>
        </form>
      </div>
      <div className="bottom__button__wrapper">
        <button className="back__button" onClick={() => window.history.back()}>
          <ArrowBackIcon
            style={{
              fontSize: "1rem",
            }}
          />
          Go Back
        </button>
        <button className="delete__button" onClick={handleDelete}>
          <DeleteForeverIcon
            style={{
              fontSize: "1rem",
            }}
          />
          Delete Project
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default UpdateProject;
