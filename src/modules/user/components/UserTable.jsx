import { useState, useEffect } from "react";
import React from "react";
import {updateUserStatus } from "../api";
import Table from "@modules/core/components/AppTable";
import Form from "react-bootstrap/Form";
import { BiPen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { updateLoading } from "@modules/core/redux/loading";
import { updateModal, updateModalConfig, updateNotiModal, updateNotiModalConfig } from "@modules/core/redux/modal";
import { useDispatch  } from "react-redux";
import AppModal from "@modules/core/components/AppModal";
import NotiModal from "@modules/core/components/NotiModal";


const UserTable = ({filteredData, onChangeStatus}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(filteredData);
  })
  
  const modalConfig = {
    title: "Thay đổi trạng thái",
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
  

  async function handleSave() {
    console.log("handleSave", index);
    dispatch(updateLoading(true));
    dispatch(updateModal(false));
    const response = await updateUserStatus(userId, status);
    if(response.isSuccess){
      notiModalConfig = {
        ...notiModalConfig,
        body: "Cập nhật trạng thái thành công"
      }
      dispatch(updateNotiModalConfig(notiModalConfig));
      dispatch(updateNotiModal(true));
      dispatch(updateLoading(false));
      onChangeStatus(index)
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
  const [status, setStatus] = useState(0);
  const [userId, setUserId] = useState("");
  const [index, setIndex] = useState(0);
  const handleUpdateStatus = (e,row) => {
    e.preventDefault();
    setUserId(JSON.stringify(row.original.userId));
    
    dispatch(updateModalConfig(modalConfig));
    dispatch(updateModal(true));
    
    
    
  }
  const navigate = useNavigate();
    const columns = [
        {
            Header : "Tên",
            accessor : "lastname"
        },
        {
            Header : "Email",
            accessor : "email"
        },
        {
            Header : "Nhóm Quyền",
            accessor : "role"
        },
        {
            Header : "Trạng Thái",
            accessor : "status",
            Cell: ({ cell: { row, value } }) => {
              return (
                <Form.Switch
                  id="custom-switch"
                  defaultChecked={value}
                  onClick={(e) => {
                    setStatus(!value ? 1 : 0);
                    handleUpdateStatus(e,row);
                    setIndex(row.index);
                  }}
                 
                />
              );
            }
              
        },
       


    ]

    
    


  return (
    <React.Fragment >
      <Table  columns={columns} data={data} /> 
      <AppModal
       handleClose={handleClose}
       handleSave={handleSave}
       />
       <NotiModal />
    </React.Fragment>
  );
};

export default UserTable;