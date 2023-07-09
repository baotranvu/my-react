


import Table from '@modules/core/components/AppTable';
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { getListBrand } from "../api";

import { AiFillTool, AiOutlineDelete } from "react-icons/ai";
import Badge from "react-bootstrap/esm/Badge";
import AppModal from "@modules/core/components/AppModal";
export default function BrandTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListBrand();
        if(response.isSuccess){
          const { items, totalRecord, pageSize } = response.data;
          setData(items)
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  const columns = [
        {
            Header : "Tên",
            accessor : "name"
        },
        {
            Header : "Địa Chỉ",
            accessor : "address"
        },
        {
          Header : "Thao tác",
          accessor : "id",
          Cell: ({ cell: { value,row } }) => {
            return (
              <div className="d-flex justify-content-center align-items-center flex-column">
                <button  className="d-flex justify-content-center align-items-center  mb-2 border-0 bg-transparent"   onClick={() => {
                       
                        
                      }}>
                  <Badge pill bg="primary">
                      <span className='me-1'>Cập nhật</span>
                      <AiFillTool />
                  </Badge>
                  
                </button>
                <button  className="d-flex justify-content-center align-items-center mb-2 border-0 bg-transparent"   onClick={() => {
                        
                        
                      }}>
                 <Badge  pill bg="danger">
                      <span className='me-1'>Xóa cột</span>
                      <AiOutlineDelete />
                  </Badge>
                </button>
              </div>
            )
          }
          
        }
  ]
  return (
    
    <Table columns={columns} data={data}></Table>
           
     
  );
}
