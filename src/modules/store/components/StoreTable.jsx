import { useState, useEffect } from "react";
import { getListStore } from "../api";
import Table from "@modules/core/components/AppTable";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import { BiPen } from "react-icons/bi";
export default function StoreTable(){
  const navigate = useNavigate();
    const columns = [
        {
            Header : "Tên",
            accessor : "name"
        },
        {
            Header : "Địa chỉ",
            accessor : "address"
        },
        {
          Header : "Thương hiệu",
          accessor : "brandName"
      },
      {
            Header : "Trạng Thái",
            accessor : "status",
            Cell: ({ cell: { value } }) => {
                return (
                    <Form.Switch
                        id="custom-switch"
                        defaultChecked={value}
                    
                    />
                );
              }
      },
     
        
      


    ]

    const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListStore();
        if(response.isSuccess){
          const { items, totalRecord, pageSize } = response.data;
          setData(items);
        }
        // Do something with the data
      } catch (error) {
        console.log(error);
      }
    };
    
  
    fetchData();
    
    
  }, []);

  return (
    <Table data={data} columns={columns} />
  );
}