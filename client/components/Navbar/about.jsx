import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h1>About TELEDOCS</h1>
          <p>
            At TELEDOCS, we believe in providing accessible healthcare services to everyone. Our platform connects you with
            certified medical professionals from the comfort of your home. Whether you need a quick consultation or ongoing care, 
            we are here to ensure that high-quality healthcare is only a few clicks away.
          </p>
          <p>
            We prioritize patient satisfaction, confidentiality, and convenience. With TELEDOCS, you can schedule appointments, 
            track your health records, and receive personalized care, all from a single platform. Join us in revolutionizing 
            healthcare delivery!
          </p>
          <Button variant="primary" href="#contact">Contact Us</Button>
        </Col>

      </Row>
    </Container>
  );
};

export default AboutUs;