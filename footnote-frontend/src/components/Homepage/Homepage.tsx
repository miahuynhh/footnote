import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Homepage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface Project {
  pid: string;
  thumbnailUrl: string;
  title: string;
}

interface NewProject {
  title: string;
  image: string;
  text: string;
}

const Homepage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const newProject: NewProject = {
    title: "Create a New Project",
    image:
      "https://cdn.discordapp.com/attachments/1264335829665448039/1300599343371391018/file-hu0jIFPQTu4pGA4RKhIGQqCY.png?ex=67216d07&is=67201b87&hm=b3503a7e15a556693dce560d57da88ea67e125791855aa812570a7bc96bca2c4&",
    text: "Start a new Footnote project Here!",
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/api/projects");
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateNewProject = () => {
    navigate("/projects/new");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section id="homepage" className="block homepage-block">
      <Container>
        <div className="title-holder">
          <h1>Project Home</h1>
        </div>
        <Row>
          <Col sm={4}>
            <div className="holder">
              <Card>
                <Card.Img variant="top" src={newProject.image} />
                <Card.Body>
                  <Card.Title>{newProject.title}</Card.Title>
                  <Card.Text>{newProject.text}</Card.Text>
                  <Button variant="primary" onClick={handleCreateNewProject}>
                    Create New Project
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
          {projects.map((project) => (
            <Col sm={4} key={project.pid}>
              <div className="holder">
                <Card>
                  <Card.Img variant="top" src={project.thumbnailUrl} />
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/projects/${project.pid}`)}
                    >
                      View Project
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Homepage;
