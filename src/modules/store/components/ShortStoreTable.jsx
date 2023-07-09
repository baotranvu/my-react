import { useState, useEffect } from "react";
import { getListStore } from "../api";
import Table from "@modules/core/components/AppTable";
import { useNavigate } from "react-router-dom";
export default function ShortStoreTable({handleCellClick}) {
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
    ]

    const [data, setData] = useState([]);
    function cellClick(row) {
       handleCellClick && handleCellClick(row);
    }
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
    <Table data={data} columns={columns} onCellClick={cellClick} />
  );
}