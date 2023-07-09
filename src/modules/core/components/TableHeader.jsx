
function TableHead(props) {
  const { header } = props;

  return (
    
      <tr>
        {header.map((item, index) => (
          <th key={index}>{item}</th>
        ))}
      </tr>
    
  );
}

export default TableHead;
