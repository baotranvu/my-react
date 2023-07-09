import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { storeLocal } from "@modules/core/utils";
import { getRoleList } from "@modules/core/api";
import { createUser } from "../api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { updateLoading } from "@modules/core/redux/loading";
import { updateNotiModal, updateNotiModalConfig } from "@modules/core/redux/modal";
import { useDispatch  } from "react-redux";
import NotiModal from "@modules/core/components/NotiModal";

function Create() {
  const dispatch = useDispatch();
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
  const [roleList, setRoleList] = useState([]);
  let notiModalConfig = {
    title: "Thông báo",
    body: "Cập nhật trạng thái thành công",
    btnCloseText: "Đồng ý",
    isHiddenCloseButton: true
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRoleList();
        if (response.isSuccess) {
          const roleList = response.data;

          setRoleList(roleList);
          storeLocal("roleList", roleList);
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };

    // if(!getLocal('roleList')){
    //   fetchData();
    // }
    fetchData();
  }, []);
  async function handleCreate() {
    dispatch(updateLoading(true));
    const createResponse = await createUser(data);
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
            <Form.Group className="mb-3 d-flex justify-content-start ">
              <Form.Group className=" w-25 me-3" controlId="lastname">
                <Form.Label>Họ</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, lastname: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className=" w-25" controlId="firstname">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, firstname: e.target.value })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3 d-flex ">
              <Form.Group className="w-50 me-3" controlId="email">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="w-25" controlId="birthday">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setData({ ...data, dateOfBirth: new Date(e.target.value) })
                  }
                />
              </Form.Group>
            </Form.Group>
            <Form.Group className="mb-3 d-flex ">
              <Form.Group className="flex-grow-1 me-3" controlId="password">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="flex-grow-1" controlId="confirmPassword">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </Form.Group>

            <Form.Group className="mb-3 d-flex ">
              <Form.Group className="w-25 me-3" controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3 me-3  w-25">
                <Form.Label>Quyền user</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, roleId: e.target.value })}
                >
                  <option value="" defaultChecked>
                    Nhóm quyền
                  </option>
                  {roleList.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Giới tính</Form.Label>
                <Form.Select
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                >
                  <option value="Male" defaultChecked>
                    Nam
                  </option>
                  <option value="Female">Nữ</option>
                </Form.Select>
              </Form.Group>
            </Form.Group>
            <Form.Group className="w-75 mb-3" controlId="address">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
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
      <NotiModal></NotiModal>
    </LayoutDefault>
  );
}

export default Create;
