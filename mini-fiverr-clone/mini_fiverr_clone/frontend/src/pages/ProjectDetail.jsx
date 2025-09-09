import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api.js";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <p><strong>Budget:</strong> ${project.budget}</p>
      <p><strong>Posted By:</strong> {project.postedBy.name}</p>
    </div>
  );
};

export default ProjectDetail;
