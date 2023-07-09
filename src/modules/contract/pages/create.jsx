import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getListUser } from "../../user/api/index";
import { getListStore } from "../../store/api";
import { createContract } from "../api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
function Create() {
  const [data, setData] = useState({
   storeId: "",
   investorId: "",
   startDate: "",
   endDate: "",
  });
  const [investor, setInvestor] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const INVESTOR_CODE = 'Investor'
  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const response = await getListUser();
        if (response.isSuccess) {
          const { items, totalRecord, pageSize } = response.data;
          const investor = items.filter(
            (item) => item.role === INVESTOR_CODE
          )
          setInvestor(investor)
          console.log('Investor', investor)
          
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStoreList = async () => {
      try {
        const response = await getListStore();
        if (response.isSuccess) {
          const { items, totalRecord, pageSize } = response.data;
          setStoreList(items)
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    }

    // if(!getLocal('roleList')){
    //   fetchData();
    // }
    fetchInvestor();
    fetchStoreList();
  }, []);
  async function handleCreate() {
    const createResponse = await createContract(data);
    if (createResponse.isSuccess) {
      alert("Tạo thành công");
    }
  }
  return (
    <LayoutDefault>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item linkProps={{ to: "/user"}} linkAs={Link} ><span className="text--grey">Danh sách người dùng</span></Breadcrumb.Item>
            <Breadcrumb.Item active >
              Tạo mới
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Tạo mới tài khoản</h4>
        </div>
      </div>
      <Card className="d-flex justify-content-center container">
        <div className="m-2">
          <Form>
          <Form.Group className="w-50" >
            <Form.Group className="mb-3 me-3  w-50">
                <Form.Label>Thuộc cửa hàng</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, storeId: e.target.value })}
                >
                   <option value="" defaultChecked>
                    Tên cửa hàng
                  </option>
                  {storeList.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Nhà đầu tư</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, investorId: e.target.value })}
                >
                   <option value="" defaultChecked>
                    Chọn nhà đầu tư
                  </option>
                  {investor.map((item) => (
                    <option key={item.userId} value={item.userId}>
                      {item.email}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3 d-flex ">
                <Form.Group className="w-25" controlId="startDate">
                <Form.Label>Ngày hợp đồng có hiệu lực</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setData({ ...data, startDate: new Date(e.target.value) })
                  }
                />
              </Form.Group>
              <Form.Group className="w-25" controlId="endDate">
                <Form.Label>Ngày hợp đồng hết hạn</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setData({ ...data, endDate: new Date(e.target.value) })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-25" controlId="address">
              <Button
                variant="primary"
                size="m"
                className="d-flex "
                onClick={() => handleCreate()}
              >
                <span className="ms-1">Tạo mới</span>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Card>
    </LayoutDefault>
  );
}

export default Create;
