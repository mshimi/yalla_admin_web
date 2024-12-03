import {  useState } from "react";
import { Card, Col, Container, Row, Form, Button, Image } from "react-bootstrap";
import { useAuthQueries } from "../controllers/AuthQueries";
import logo2 from "../../../assets/logo2.png"
const LoginPage: React.FC = () => {

  const { useLoginMutation } = useAuthQueries();
  const loginMutation = useLoginMutation();
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [validated, setValidated] = useState(false);

       
      
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          const form = event.currentTarget;
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.stopPropagation();
          } else {
            loginMutation.mutate({ email, password });
          }
          setValidated(true);
        };
      
        return (
          <Container
            className="d-flex align-items-start justify-content-center pt-5"
            style={{ height: "100vh" }}
          >
            <Row className="w-100">
              <Col xs={12} md={6} lg={4} className="mx-auto text-center">
                {/* Logo */}
                <div
                  className="mb-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={logo2}
                    fluid
                    style={{
                      maxHeight: "30vh",
                      width: "auto",
                    }}
                  />
                </div>
      
                {/* Login Card */}
                <Card className="shadow-sm">
                  <Card.Body>
                    <h3 className="text-center mb-4">Login</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          // type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid email.
                        </Form.Control.Feedback>
                      </Form.Group>
      
                      <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a password.
                        </Form.Control.Feedback>
                      </Form.Group>
      
                      <Button variant="primary" type="submit" className="w-100">
                        Login
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        );
      
};

export default LoginPage;