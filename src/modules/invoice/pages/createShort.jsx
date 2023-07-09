import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { storeLocal } from "@modules/core/utils";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { updateLoading } from "@modules/core/redux/loading";
import { updateNotiModal, updateNotiModalConfig } from "@modules/core/redux/modal";
import { useDispatch  } from "react-redux";
import NotiModal from "@modules/core/components/NotiModal";
import { createInvoice } from "../api/index";
import { handleUpload } from "@modules/core/utils";
import { BiPlus } from "react-icons/bi";
import InvoiceItem from "../components/InvoiceItem";
function CreateShort() {
  const dispatch = useDispatch();
  const [typeList, setTypeList] = useState([]);
  const [image, setImage] = useState(null);
  const [listItem, setListItem] = useState([]);
  const [data, setData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    dateOfBirth: "",
    password: "",
    phoneNumber: "",
    address: "",
    roleId: "",
    gender: "Male",
  });

  let notiModalConfig = {
    title: "Thông báo",
    body: "Cập nhật trạng thái thành công",
    btnCloseText: "Đồng ý",
    isHiddenCloseButton: true
}
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getRoleList();
//         if (response.isSuccess) {
//           const roleList = response.data;

//           setRoleList(roleList);
//           storeLocal("roleList", roleList);
//         }
//         // Do something with the data
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // if(!getLocal('roleList')){
//     //   fetchData();
//     // }
//     fetchData();
//   }, []);
function AddItem() {
    const temp = [...listItem];
    temp.push({
        id: listItem.length + 1,
        title: "Item Content",
        amount: "Item Amount",
        isSubItem: false,
        children: []
    })
    setListItem(temp);
}
function resetId(listItem) {
    listItem.forEach((item,index) => {
        item.id = index + 1
    })
}
function handleRemoveItem(id) {
    let temp = [...listItem];
    temp = temp.filter((item) => item.id !== id);
    resetId(temp);
    setListItem(temp);
    
}
function handleRemoveSubItem({id, parentId}) {
    const temp = [...listItem];
    const item = temp.find((item) => item.id === parentId);
    item.children = item.children.filter(child => child.id !== id)
    console.log(item);
    temp.map((i) => {
        if(i.id === parentId) {
            return {...item};
        }
    })
    setListItem(temp);
}

function handleAddSubItem(parentId) {
    const temp = [...listItem];
    temp.forEach((item) => {
        if(item.id === parentId) {
            item.children.push({
                id: item.children.length + 1,
                content: "",
                amount: 0,
                isSubItem: true,
            })
        }
    })
    setListItem(temp);
    
}

async function uploadImage() {
  const response = await handleUpload(image);
  console.log(response);
}
const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  async function handleCreate() {
    dispatch(updateLoading(true));
    const createResponse = await createInvoice(data);
    if (createResponse.isSuccess) {
      dispatch(updateNotiModalConfig({...notiModalConfig, body: "Tạo tài khoản thành công"}));
      dispatch(updateNotiModal(true));
    }else{
      dispatch(updateNotiModalConfig({...notiModalConfig, body: "Tạo tài khoản thất bại"}));
      dispatch(updateNotiModal(true));
    }
    dispatch(updateLoading(false));
    
  }
  return (
    <LayoutDefault>
      <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="mb-4 mb-lg-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item linkProps={{ to: "/brand"}} linkAs={Link} ><span className="text--grey">Danh sách hóa đơn</span></Breadcrumb.Item>
            <Breadcrumb.Item active >
              Tạo mới
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Loại hóa đơn : ngắn hạn</h4>
        </div>
      </div>
      <Card className="d-flex justify-content-center container">
        <div className="m-2">
          <Form>
          <Form.Group className="mb-3 me-3  w-25">
              </Form.Group>
              <Form.Group className=" mb-3 w-75" controlId="upload">
                <Form.Label>Chọn hình ảnh </Form.Label>
                <Form.Control className='mb-2' type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} />
                <Button onClick={uploadImage}>Upload Image</Button>
              </Form.Group>
            <Form.Group className="mb-3 d-flex justify-content-start ">
              <Form.Group className=" w-100 me-3" controlId="name">
                <Form.Label>Miêu tả</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) =>
                    setData({ ...data, name: e.target.value })
                  } />
              </Form.Group>
            </Form.Group>
          </Form>
        </div>
      </Card>
      <Card className="d-flex justify-content-center container mt-2 mb-2">
        <div className="m-2">
            <Form>
                <Form.Group>
                    <Form.Label>Chi tiết hóa đơn</Form.Label>
                </Form.Group>
                <Form.Group className="w-100 mb-3" controlId="address">
                    {listItem.map((item) => (
                        <InvoiceItem key={item.id} parentId={item.id} item={item} onRemoveItem={handleRemoveItem} addSubitem={handleAddSubItem}>
                            {item.children.length > 0 ? item.children.map((child) => (
                                <InvoiceItem parentId={item.id} key={child.id} item={child} onRemoveSubitem={handleRemoveSubItem}/>
                            )) : null}
                        </InvoiceItem>
                    ))}
                </Form.Group>
                <Form.Group className="w-100 d-flex justify-content-center " controlId="address">
                    <Button
                        variant="primary"
                        size="m"
                        className="d-flex align-items-center  justify-content-center "
                        onClick={AddItem}
                    >
                        <BiPlus size="20" color="white" />
                        <span className="ms-1">Add item</span>
                    </Button>
                </Form.Group>
            </Form>
        </div>
      </Card>
    <Form>
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
    </LayoutDefault>
  );
}

export default CreateShort;
