import LayoutDefault from "@modules/core/layouts/DefaultLayout";
import UserTable from "../components/UserTable";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Stack  from "@mui/material/Stack";
import Box from "@mui/material/Box";
import  IconButton  from "@mui/material/IconButton";
import  Button from "@mui/material/Button";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRoleList } from "@modules/core/api";
import { getListUser } from "../api";
import { storeLocal } from "@modules/core/utils";
import { updateUserList } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux";
import React from "react";
function Index() {
  let isAdmin = false;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [filteredEmail, setFilteredEmail] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(null);
  const [filteredRole, setFilteredRole] = useState("");
  const defaultUserList = useSelector((state) => state.user.list);
  
  useEffect(() => {
    isAdmin = store.getState().auth.isAdmin;
    const fetchRoleList = async () => {
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
    fetchRoleList();

    const fetchData = async () => {
      try {
        const response = await getListUser();
        if (response.isSuccess) {
          const { items } = response.data;
          setData(items);
          storeLocal("userList", items);
          dispatch(updateUserList(items));
        }
        // Do something with the data
      } catch (error) {
        console.error(error)
      }
    };
    if(isAdmin){
      fetchData();
    }
  }, []);
  const filters = {
    email: (row) => {
      return row.email.toLowerCase().includes(filteredEmail.toLowerCase());
    },
    status: (row) => {
      return row.status === parseInt(filteredStatus);
    },
    role: (row) => {
      return row.role === filteredRole;
    },
  };
  const handleFilter = () => {
    let filteredData = defaultUserList;
    if (filteredEmail) {
      filteredData = filteredData.filter(filters.email);
    }
    if (filteredStatus) {
      filteredData = filteredData.filter(filters.status);
    }
    if (filteredRole) {
      filteredData = filteredData.filter(filters.role);
    }
   
    setData(filteredData);
  };

 
  function handleReset() {
    setFilteredEmail("");
    setFilteredStatus('');
    setFilteredRole("");
    setData(defaultUserList);
  }
  function handleUpdateStatus(index){
    const updatedUsers = [...data];
    // Create a copy of the user object
    const updatedUser = { ...updatedUsers[index] };
    // Update the status property of the copied object
    updatedUser.status = !updatedUser.status; 
    // Update the user object in the copied array
    updatedUsers[index] = updatedUser;
    setData(updatedUsers);
    dispatch(updateUserList(updatedUsers));
  }
  return (
    <React.Fragment>
      {location.pathname == "/user" ? (
        <LayoutDefault>
        <div className="d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="mb-4 mb-lg-0">
            <h4>Danh sách tài khoản</h4>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
          <Button
              startIcon={<AddCircleIcon fontSize="small" />}
              variant="contained"
              size="small"
              className="d-flex align-items-center"
              onClick={() => {
                navigate("/user/create");
              }}
            >
            <span className="ms-1">Tạo tài khoản mới</span>
          </Button>
          </div>
        </div>
        <Stack spacing={{ xs: 1, sm: 1 }} direction="row" justifyContent={"center"} alignContent={"center"} useFlexGap flexWrap="wrap" className="mb-4">
          <Box
            sx={{
              '& > :not(style)': { m: 1, width: '20ch' },
            }}
         
          >
          <FormControl>
            <TextField 
              id="email"
              label="Email" 
              variant="standard"
              defaultValue={filteredEmail}
              onBlur={(e) => setFilteredEmail(e.target.value)} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="role">Nhóm quyền</InputLabel>
            <Select
              labelId="role"
              id="demo-simple-select"
              value={filteredRole}
              label="Nhóm quyền"
              onChange={(e) => setFilteredRole(e.target.value)}
            >
              {roleList.map((item) => {
                  return (
                    <MenuItem value={item.name} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="status">Trạng thái</InputLabel>
            <Select
              labelId="status"
              id="demo-simple-select"
              value={filteredStatus}
              label="Trạng thái"
              onChange={(e) => setFilteredStatus(e.target.value)}
            >
                <MenuItem value="1">Đang hoạt động</MenuItem>
                <MenuItem value="0">Ngừng hoạt động</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
          <Stack direction="row" alignItems="center" justifyContent={"flex-end"} spacing={1}>
            <IconButton aria-label="delete" size="large" onClick={handleFilter}>
              <SearchIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="large" onClick={handleReset}>
              <RestartAltIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          </FormControl>
        </Box> 
      </Stack>
      
        <UserTable filteredData={data} onChangeStatus={handleUpdateStatus}></UserTable>   
      </LayoutDefault>
      ): (
        <Outlet />
      )}
    </React.Fragment>
  );
}

export default Index;
