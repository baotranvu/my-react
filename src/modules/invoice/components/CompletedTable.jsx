
import React, { useState, useEffect} from "react";
import Table from "@modules/core/components/AppTable";
import Badge from 'react-bootstrap/Badge';

const CompletedTable = ({filteredData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(filteredData);
  })
  
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
      Header : "Trạng thái",
      accessor : "status",
      Cell: ({ cell: { value } }) => {
        return (
          <div className="d-flex justify-content-center align-items-center ">
            { value == APPROVED_STATUS ? (
              <Badge pill bg="success">
                Hợp lệ
                
              </Badge>
            ): (
              <Badge pill bg="danger">
                Bị từ chối 
                
              </Badge>
            )}
          
          </div>
        )
      }
      
    }
  ]
  
  
 
 
 
  
  
  

 
  
  
  const toDate = (dateStr) => {
    const jsDate = new Date(dateStr);
    const day = jsDate.getDate().toString().padStart(2, "0");
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const year = jsDate.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  
  
  return (
    <React.Fragment >
      <Table  columns={columns} data={data} /> 
    </React.Fragment>
  );
};

export default CompletedTable;