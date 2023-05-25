import Dropdown from "react-bootstrap/Dropdown";
import Figure from "react-bootstrap/Figure";
function AccountInfo() {
  return (
    <Dropdown>
      <Dropdown.Toggle size="sm" variant="Secondary"  id="dropdown-basic">
        <Figure style={{margin:0, marginRight:"10px"}}  >
          <Figure.Image
            width={20}
            height={20}
            alt="avatar"
            src="../../src/assets/avatar.png"
            className="mr-1"
          />
        </Figure>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-2">Đổi mật khẩu</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Đăng xuất</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default AccountInfo;
