import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getListUser } from "../../user/api/index";
import { getListBrand } from "../../brand/api/index";
import { createStore } from "../api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
function Create() {
  const [data, setData] = useState({
    name: "",
    address: "",
    brandId: "",
    storeManagerId:"",
  });
  const [storeManager, setStoreManager] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const STORE_MANAGER_CODE = 'StoreManager'
  useEffect(() => {
    const fetchStoreManager = async () => {
      try {
        const response = await getListUser();
        if (response.isSuccess) {
          const { items, totalRecord, pageSize } = response.data;
          const storeManager = items.filter(
            (item) => item.role === STORE_MANAGER_CODE
          )
          setStoreManager(storeManager)
          console.log('StoreManager', storeManager)
          
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBrandList = async () => {
      try {
        const response = await getListBrand();
        if (response.isSuccess) {
          const { items, totalRecord, pageSize } = response.data;
          setBrandList(items)
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    }

    // if(!getLocal('roleList')){
    //   fetchData();
    // }
    fetchStoreManager();
    fetchBrandList();
  }, []);
  async function handleCreate() {
    const createResponse = await createStore(data);
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
            <Breadcrumb.Item linkProps={{ to: "/store"}} linkAs={Link} ><span className="text--grey">Danh sách cửa hàng</span></Breadcrumb.Item>
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
            <Form.Group className="mb-3 d-flex justify-content-start ">
              
              <Form.Group className=" w-25" controlId="firstname">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-75 mb-3" controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="w-50" >
            <Form.Group className="mb-3 me-3  w-50">
                <Form.Label>Thuộc thương hiệu</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, brandId: e.target.value })}
                >
                   <option value="" defaultChecked>
                    Tên thương hiệu
                  </option>
                  {brandList.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Cửa hàng trưởng</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, storeManagerId: e.target.value })}
                >
                   <option value="" defaultChecked>
                    Chọn cửa hàng trưởng
                  </option>
                  {storeManager.map((item) => (
                    <option key={item.userId} value={item.userId}>
                      {item.email}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-25" controlId="submit">
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
