import Switch from "../../core/components/SwitchButton";
function UserRow() {
  return (
    <tr>
      <td>1</td>
      <td>example@gmail.com</td>
      <td>Example</td>
      <td>
        <Switch />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-link btn-rounded btn-sm fw-bold"
        >
          Cập nhật
        </button>
        <button
          type="button"
          className="btn btn-link btn-rounded btn-sm fw-bold"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default UserRow;
