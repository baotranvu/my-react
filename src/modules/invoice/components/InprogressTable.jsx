import { useState, useEffect } from "react";
import React from "react";
import { updateInvoiceStatus } from "../api";
import Table from "@modules/core/components/AppTable";

import { FcCheckmark, FcCancel } from "react-icons/fc";

import { updateLoading } from "@modules/core/redux/loading";
import { updateModal, updateModalConfig, updateNotiModal, updateNotiModalConfig } from "@modules/core/redux/modal";
import { useDispatch  } from "react-redux";
import AppModal from "@modules/core/components/AppModal";
import NotiModal from "@modules/core/components/NotiModal";
import Badge from 'react-bootstrap/Badge';

const InprogressTable = ({filteredData}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(filteredData);
  })
  
  const REJECTED_STATUS = 3;
  const APPROVED_STATUS = 2;
  const columns = [
    {
      Header : "Loại hóa đơn",
      accessor : "type",
      Cell: ({ cell: { value } }) => {
        return (
          <span>{value == 1? "Ngắn hạn" : "Dài hạn"}</span>
        )
      }  
    },
    {
          Header : "Ngày tạo",
          accessor : "createdDate",
          Cell: ({ cell: { value } }) => {
            return (
              <span>{toDate(value)}</span>
            )
          }  
    },
    {
      Header : "Thao tác",
      accessor : "id",
      Cell: ({ cell: { value,row } }) => {
        return (
          <div className="d-flex justify-content-center align-items-center flex-column">
            <button  className="d-flex justify-content-center align-items-center  mb-2 border-0 bg-transparent"   onClick={() => {
                    handleUpdateStatus(value, APPROVED_STATUS);
                    
                  }}>
              <Badge pill bg="success">
                  Duyệt
              </Badge>
              
            </button>
            <button  className="d-flex justify-content-center align-items-center mb-2 border-0 bg-transparent"   onClick={() => {
                    handleUpdateStatus(value, REJECTED_STATUS);
                    
                  }}>
             <Badge pill bg="danger">
                  Từ chối
              </Badge>
            </button>
          </div>
        )
      }
      
    }
  ]
  let modalConfig = {
    title: "Duyệt hóa đơn",
    body: "Cập nhật trạng thái tài khoản ?",
    btnSaveText: "Đồng ý",
    btnCloseText: "Huỷ",
    isHiddenCloseButton: false
  }
  let notiModalConfig = {
      title: "Thông báo",
      body: "Cập nhật trạng thái thành công",
      btnCloseText: "Đồng ý",
      isHiddenCloseButton: true
  }
  
  function onClose() {
    window.location.reload();
  }
 
  async function handleSave() {
    
    dispatch(updateLoading(true));
    dispatch(updateModal(false));
    
    const response = await updateInvoiceStatus(invoice.id, invoice.status);
    if(response.isSuccess){
      notiModalConfig = {
        ...notiModalConfig,
        body: "Cập nhật trạng thái thành công"
      }
      dispatch(updateNotiModalConfig(notiModalConfig));
      dispatch(updateNotiModal(true));
      dispatch(updateLoading(false));
      
    }else{
      notiModalConfig = {
        ...notiModalConfig,
        body: "Cập nhật trạng thái thất bại"
      }
      dispatch(updateNotiModalConfig(notiModalConfig));
      dispatch(updateNotiModal(true));
      dispatch(updateLoading(false));
    }
  }

  async function handleClose() {
    
    dispatch(updateModal(false));
  }
  const [index, setIndex] = useState(0);
  const [invoice, setInvoice] = useState({
    id: 0,
    status: 0
  });
  function handleUpdateStatus(value, status) {
    setInvoice({
      id: value,
      status: status
    })
    modalConfig = {
      ...modalConfig,
      body: status == APPROVED_STATUS ? "Chấp nhận hóa đơn này ? " : "Từ chối hóa đơn này",
    }
    dispatch(updateModalConfig(modalConfig));
    dispatch(updateModal(true));
    
  }
  

 
  
  
  const toDate = (dateStr) => {
    const jsDate = new Date(dateStr);
    const day = jsDate.getDate().toString().padStart(2, "0");
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jsDate.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const toMonth = (monthStr) => {
    const jsDate = new Date(monthStr);
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jsDate.getFullYear().toString();
    const formattedMonth = `${month}/${year}`;
    return formattedMonth;
  }
  
  
  return (
    <React.Fragment >
      <Table  columns={columns} data={data} /> 
      <AppModal
       handleClose={handleClose}
       handleSave={handleSave}
       />
       <NotiModal onClose={onClose} />
    </React.Fragment>
  );
};

export default InprogressTable;