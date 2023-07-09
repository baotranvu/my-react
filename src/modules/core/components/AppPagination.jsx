import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

function AppPagination() {
  return (
    <Pagination className="d-flex-column align-items-center justify-content-between">
      <div className="d-flex align-items-center justify-content-center">
        <Form.Select className="me-2 me-lg-3">
          <option defaultChecked value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </Form.Select>
        <p style={{whiteSpace: "nowrap", textAlign: "center", marginTop: "1rem"}}>Hiển thị 1-10 của 30 </p>
      </div>

      <div className="d-flex">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{5}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </div>
    </Pagination>
  );
}

export default AppPagination;
