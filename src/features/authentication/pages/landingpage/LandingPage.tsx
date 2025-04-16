import type React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo2 from "../../../../assets/logo2.png";
import "./landingPage.css";
import { useEffect, useState } from "react";

const LandingPage: React.FC = () => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const animationSteps = ["Loading", "Loading.", "Loading..", "Loading..."];
    let stepIndex = 0;

    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % animationSteps.length;
      setLoadingText(animationSteps[stepIndex]);
    }, 500); // Change every 500ms

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <Container
      fluid
      className="d-flex vh-100 align-items-center justify-content-center bg-light"
    >
      <Row>
        <Col className="text-center">
          <Image
            src={logo2}
            alt="Centered Placeholder"
            className="pulse-animation"
            roundedCircle
          />
          <h3 className="mt-3">{loadingText}</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;