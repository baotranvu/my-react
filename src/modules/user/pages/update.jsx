import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { storeLocal, formatDate } from "@modules/core/utils";
import { getRoleList } from "@modules/core/api";
import { getUserInfo, updateUser } from "../api";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
function Update() {
    const state = useLocation();
    const { id } = state.state;
    console.log("state", state);
    const [data, setData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        roleId: '',
        gender:'Male',
    });
   
    const [roleList, setRoleList] = useState([]);
    useEffect(() => {
       
        const fetchRole = async () => {
          try {
            const role = await getRoleList();
            if(role.isSuccess){
              const roleList  = role.data;
             
              setRoleList(roleList)
              storeLocal('roleList', roleList);
              
    
            }
            // Do something with the data
          } catch (error) {
            console.log(error);
          }
        };

        const fetchInfo = async () => {
            try {
              console.log(id)
              const response = await getUserInfo(id);
              if(response.isSuccess){
                const info  = response.data;
               
                setData(info);
              }
              // Do something with the data
            } catch (error) {
              console.log(error);
            }
          };
      
        // if(!getLocal('roleList')){
        //   fetchData();
        // }
        fetchRole();
        fetchInfo();
    }, []);
    async function handleCreate() { 
        const createResponse = await createUser(data);
        if(createResponse.isSuccess){
            alert('Cập nhật thành công')
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
             Cập nhật
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Cập nhật tài khoản</h4>
        </div>
        </div>
        <Card className="d-flex justify-content-center container">
            <div className="m-2">
            <Form>
                <Form.Group className="mb-3 d-flex justify-content-start " >
                    <Form.Group className=" w-25 me-3" controlId="lastname">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control type="text" defaultValue={data.lastname} onChange={(e) => setData({ ...data, lastname: e.target.value })}  />
                    </Form.Group>
                    <Form.Group className=" w-25" controlId="firstname">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control type="text" defaultValue={data.firstname} onChange={(e) => setData({ ...data, firstname: e.target.value })} />
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3 d-flex " >
                    <Form.Group className="w-50 me-3" controlId="email">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control defaultValue={data.email} type="email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="w-25" controlId="birthday">
                    <Form.Label>Ngày sinh</Form.Label>
                    <Form.Control type="date" defaultValue={formatDate(data.dateOfBirth)} onChange={(e) => setData({ ...data, dateOfBirth: new Date(e.target.value) })} />
                    </Form.Group>
                </Form.Group>
                
                
                <Form.Group className="mb-3 d-flex " >
                    <Form.Group className="w-25 me-3" controlId="phone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control type="text" defaultValue={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}  />
                    </Form.Group>
                    <Form.Group className="mb-3 me-3  w-25" >
                    <Form.Label>Quyền user</Form.Label>
                    <Form.Select value={data.roleId} onChange={(e) => setData({ ...data, roleId: e.target.value })}>
                    <option value='' defaultChecked>Nhóm quyền</option>
                        {roleList.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </Form.Select>
                    
                </Form.Group>
                <Form.Group className="mb-3 ">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Select value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}>
                    <option value="Male" defaultChecked>Nam</option>
                    <option value="Female">Nữ</option>
                    </Form.Select>
                </Form.Group>
                </Form.Group>
                <Form.Group className="w-75 mb-3" controlId="address">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control defaultValue={data.address} type="text" onChange={(e) => setData({ ...data, address: e.target.value })} />
                </Form.Group>
                <Form.Group className="w-25" controlId="address">
                <Button variant="primary" size="m" className="d-flex " onClick={() => handleCreate()}>
                    <span className="ms-1">Tạo mới</span>
                </Button>
                </Form.Group>
            </Form>
            </div>
        </Card>
    </LayoutDefault>
  );
}

export default Update;
