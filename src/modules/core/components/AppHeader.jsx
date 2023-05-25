import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AccountInfo from "../../user/components/AccountInfo";
function AppHeader() {
  return (
    <Container bg="light" className="d-flex justify-content-between">
      <Navbar  expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="../../src/assets/react.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Tổng quát</Nav.Link>
            <Nav.Link href="#link">Giao dịch</Nav.Link>
            <Nav.Link href="#home">Đối tác</Nav.Link>
            <Nav.Link href="#link">Nhân viên</Nav.Link>
            <NavDropdown title="Báo cáo" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Báo cáo tháng
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Bán cáo năm
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AccountInfo />
    </Container>
  );
}

export default AppHeader;
