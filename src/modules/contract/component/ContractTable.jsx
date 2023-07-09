import { useState, useEffect } from "react";
import { getListContract } from "../api/index";
import Table from "@modules/core/components/AppTable";
import { useNavigate } from "react-router-dom";
export default function ContractTable(){
  const navigate = useNavigate();
    const columns = [
        {
            Header : "Tên Cửa Hàng",
            accessor : "store"
        },
        {
            Header : "Nhà đầu tư",
            accessor : "investorName"
        },
        {
          Header : "Ngày có hiệu lực",
          accessor : "startDate"
        },
        {
          Header : "Ngày hết hiệu lực",
          accessor : "endDate"
        }, 
      
    ]

    const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListContract();
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