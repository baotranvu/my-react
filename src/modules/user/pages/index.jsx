import Table from 'react-bootstrap/Table';
import UserRow from '../components/UserRow';
function UserTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>User</th>
          <th>Nhóm quyền</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <UserRow />
      </tbody>
    </Table>
  );
}

export default UserTable;