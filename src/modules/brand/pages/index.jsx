import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import BrandTable from "../components/BrandTable";
import Button from "react-bootstrap/Button";
import { BiPlus } from "react-icons/bi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import React from "react";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getRoleList();
  //       if(response.isSuccess){
  //         const roleList  = response.data;
  //         setData(roleList)
  //         storeLocal('roleList', roleList);
          

  //       }
  //       // Do something with the data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  
  //   // if(!getLocal('roleList')){
  //   //   fetchData();
  //   // }
  //   fetchData();
  // },[]);
  return (
    <React.Fragment>
     {location.pathname === "/brand" ? (
      <LayoutDefault>
         <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          
          <h4>Danh sách thương hiệu</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() =>{navigate('/brand/create')}}
          >
            <BiPlus size="20" color="white" />
            <span className="ms-1">Tạo thương hiệu mới</span>
          </Button>
        </div>
      </div>
      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col lg={3} className="d-flex">
            <InputGroup className="me-2 me-lg-3">
              <Form.Control type="text" placeholder="Tên" />
            </InputGroup>
          </Col>
          <Col lg={3} className="d-flex">
            <InputGroup className="me-2 me-lg-3">
              <Form.Control type="text" placeholder="Địa Chỉ" />
            </InputGroup>
          </Col>
          <Col lg={4} className="d-flex justify-content-end">
            <div className="btn-toolbar me-2 me-lg-3 ">
              <Button variant="primary" size="m" className="d-flex ">
                <span className="ms-1">Tìm kiếm</span>
              </Button>
            </div>
            <div className="btn-toolbar me-2 me-lg-3 ">
              <Button variant="secondary" size="m" className="d-flex ">
                <span className="ms-1">Thiết lập lại</span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <BrandTable></BrandTable>
      </LayoutDefault>
     ) : <Outlet/>}
    </React.Fragment>
  );
}

export default Index;
