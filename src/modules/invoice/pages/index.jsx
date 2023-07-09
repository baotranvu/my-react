import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import InprogressTable from "../components/InprogressTable";
import CompeletedTable from "../components/CompletedTable";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import {  Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { getListInvoiceByStore } from "../api";
import { useDispatch } from "react-redux";
import ShortStoreTable from "@modules/store/components/ShortStoreTable";
import React from "react";
import {updateLoading} from "@modules/core/redux/loading";
function Index() {
  const [isShowInvoiceTable, setIsShowInvoiceTable] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const INVOICE_STATUS = [
    { id: 1, name: "Đang xử lý" },
    { id: 2, name: "Hợp lệ" },
    { id: 3, name: "Bị từ chối" },
    { id: 4, name: "Đã hủy" },
  ]
  
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [approvedInvoices, setApprovedInvoices] = useState([]);
  const [rejectedInvoices, setRejectedInvoices] = useState([]);
  const [name, setName] = useState("");
  const fetchData = async (id) => {
    try {
      dispatch(updateLoading(true));
      const response = await getListInvoiceByStore(id);
      if (response.isSuccess) {
        const { items } = response.data;
        const pendingInvoices = items.filter(item => item.status == INVOICE_STATUS[0].id);
        const approvedInvoices = items.filter(item => item.status == INVOICE_STATUS[1].id);
        const rejectedInvoices = items.filter(item => item.status == INVOICE_STATUS[2].id);
        setApprovedInvoices(approvedInvoices);
        setPendingInvoices(pendingInvoices);
        setRejectedInvoices(rejectedInvoices);
        
      }
      
      // Do something with the data
    } catch (error) {
      console.error(error)
    }
    dispatch(updateLoading(false));
  }
  const handleCellClick = (row) => {
    setIsShowInvoiceTable(!!row)
    setName(row.name);
    fetchData(row.id);
  };

 
 
  return (
    <React.Fragment>
      {location.pathname === `/invoice` ? (
        <LayoutDefault>
        <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          
          {/* <div className="btn-toolbar mb-2 mb-md-0">
            <Button
              variant="primary"
              size="sm"
              className="d-flex align-items-center"
              onClick={() => {
                navigate("/user/create");
              }}
            >
              <BiPlus size="20" color="white" />
              <span className="ms-1">Tạo tài khoản mới</span>
            </Button>
          </div> */}
        </div>
        {/* <div className="table-settings mb-4">
          <Row className="justify-content-between align-items-center">
            <Col lg={3} className="d-flex">
              <InputGroup
                className="me-2 me-lg-3"
                onChange={(e) => setFilteredEmail(e.target.value)}
              >
                <Form.Control
                  value={filteredEmail}
                  type="text"
                  placeholder="Email"
                />
              </InputGroup>
            </Col>
            <Col lg={5} className="d-flex">
              <Form.Select
                value={filteredRole}
                className="me-2 me-lg-3"
                onChange={(e) => setFilteredRole(e.target.value)}
              >
                <option value="" defaultChecked>
                  Nhóm quyền
                </option>
                {roleList.map((item) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Select value={filteredStatus} onChange={(e) => setFilteredStatus(e.target.value)}>
                <option defaultChecked value=''>
                  Trang thái
                </option>
                <option value="1">Đang hoạt động</option>
                <option value="0">Ngừng hoạt động</option>
              </Form.Select>
            </Col>
            <Col lg={4} className="d-flex justify-content-end">
              <div className="btn-toolbar me-2 me-lg-3 ">
                <Button
                  variant="primary"
                  size="m"
                  className="d-flex "
                  onClick={handleFilter}
                >
                  <span className="ms-1">Tìm kiếm</span>
                </Button>
              </div>
              <div className="btn-toolbar me-2 me-lg-3 ">
                <Button
                  variant="secondary"
                  size="m"
                  className="d-flex "
                  onClick={handleReset}
                >
                  <span className="ms-1">Thiết lập lại</span>
                </Button>
              </div>
            </Col>
          </Row>
        </div> */}
        
          <div className="me-3">
            <h4>Danh sách cửa hàng</h4>
            <ShortStoreTable handleCellClick={handleCellClick} />
          </div>
       <div>
       {name && (
         <p>Danh sách hóa đơn tại cửa hàng: {name}</p>
       )}
       {isShowInvoiceTable && (
         <Tabs
         defaultActiveKey="pending"
         id="uncontrolled-tab-example"
         className="mb-3"
         >
           <Tab eventKey="pending" title="Đang chờ duyệt">
             <InprogressTable filteredData={pendingInvoices}  ></InprogressTable>
           </Tab>
           <Tab eventKey="approved" title="Hợp lệ">
             <CompeletedTable filteredData={approvedInvoices}  ></CompeletedTable>
           </Tab>
           <Tab eventKey="rejected" title="Bị từ chối">
             <CompeletedTable filteredData={rejectedInvoices}  ></CompeletedTable>
           </Tab>
         </Tabs> 
       )}
       </div>
       
       
        
      </LayoutDefault>
      ): (
        <Outlet />
      )}
    </React.Fragment>
  );
}

export default Index;
