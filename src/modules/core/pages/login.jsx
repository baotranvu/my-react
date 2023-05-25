import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function LoginPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center w-100 min-vh-100 " > 
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Địa chỉ Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
}

export default LoginPage;
