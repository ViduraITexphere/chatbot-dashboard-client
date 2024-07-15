import React, { useState } from "react";
import "./App.css";

import { RouterProvider } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div>
      <RouterProvider router={MainRoutes} />
    </div>
  );
}

// function App() {
//   const [inputData, setInputData] = useState("");
//   const [responseData, setResponseData] = useState(null);

//   const handleChange = (e) => {
//     setInputData(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/insertData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ input: inputData }),
//       });
//       const data = await response.json();
//       setResponseData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Error fetching data. Please check the console for details.");
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Submit Data</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter data:
//           <input type="text" value={inputData} onChange={handleChange} />
//         </label>
//         <button type="submit">Submit Data</button>
//       </form>
//       {responseData && (
//         <div>
//           <h2>Response Data:</h2>
//           <pre>{JSON.stringify(responseData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

export default App;
