import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>All Projects</h1>
      {projects.map(p => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Budget: ${p.budget}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
