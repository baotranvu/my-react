import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getListUser } from '@modules/user/api/index'
import { createBrand } from "../api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { handleUpload } from "@modules/core/utils";


function Create() {
  const [data, setData] = useState({
    phoneNumber: "",
    name: "",
    address: "",
    imgUrl :'',
    contactEmail:'',
    brandManagerId: "",
  });
  const [managerList, setManagerList] = useState([]);
  const BRAND_MANAGER_CODE= 'BrandManager'
  const [image, setImage] = useState(null);
  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  

  useEffect(() => {
    const fetchManagerList = async () => {
      try {
        const response = await getListUser();
        if (response.isSuccess) {
          const { items } = response.data;
          const manager = items.filter(item => item.role === BRAND_MANAGER_CODE)
          setManagerList(manager);
          
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };

    fetchManagerList();
  }, []);
  async function handleCreate() {
    const createResponse = await createBrand(data);
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
            <Breadcrumb.Item linkProps={{ to: "/brand"}} linkAs={Link} ><span className="text--grey">Danh sách thương hiệu</span></Breadcrumb.Item>
            <Breadcrumb.Item active >
              Tạo mới
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Tạo mới thương hiệu</h4>
        </div>
      </div>
      <Card className="d-flex justify-content-center container">
        <div className="m-2">
          <Form>
            <Form.Group className="mb-3 d-flex justify-content-start ">
              <Form.Group className=" w-25 me-3" controlId="name">
                <Form.Label>Tên Thương Hiệu</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className=" mb-3 w-25" controlId="address">
                <Form.Label>Địa Chỉ</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className=" mb-3 w-75" controlId="upload">
                <Form.Label>Chọn hình ảnh thương hiệu</Form.Label>
                <Form.Control className='mb-2' type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} />
                <Button onClick={handleUpload(image)}>Upload Image</Button>
              </Form.Group>
              <Form.Group className="mb-3 me-3  w-25">
                <Form.Label>Quản lý thương hiệu</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, brandManagerId: e.target.value })}
                >
                  <option value="" defaultChecked>
                   Chọn quản lý
                  </option>
                  {managerList.map((item) => (
                    <option key={item.userId} value={item.userId}>
                      {item.email}
                    </option>
                  ))}
                </Form.Select>
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
