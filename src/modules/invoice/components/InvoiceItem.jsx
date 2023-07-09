
import { Button, Card, Form, CloseButton  } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
function InvoiceItem({item, children, parentId, onRemoveItem, onRemoveSubitem, addSubitem}) {
    const [data, setData] = useState(item);
    function handleRemoveItem() {
        onRemoveItem(item.id)
    }
    function handleRemoveSubItem() {
        onRemoveSubitem({id:item.id, parentId})
    }
    function handleAddSubItem() {
       
        addSubitem(parentId)
    }
    return (
        <Card className="mb-2">
            <Card.Body>
            
                <Form.Group className="mb-3 d-flex justify-content-end">
                    <CloseButton onClick={item.isSubItem ? handleRemoveSubItem : handleRemoveItem}/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex flex-column justify-content-start "> 
                    <Form.Label>{item.isSubItem ? "Subitem Content" : "Item Content"}</Form.Label>
                    <Form.Control
                        
                        className="border-0"
                        type="text"
                        placeholder="Item Content"
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                    />
                </Form.Group>
                {
                    !children || item.isSubItem ? <Form.Group className="mb-3 flex-column  d-flex justify-content-start  "> 
                    <Form.Label>{item.isSubItem ? "Subitem Amount" : "Item Amount"}</Form.Label>
                    <Form.Control
                        className="border-0"
                        type="text"
                        placeholder="0"
                        onChange={(e) => setData({ ...data, amount: e.target.value })}
                    />
                </Form.Group> : null
                }
                <Form.Group className="ms-3">
                    {children ? children : null}
                </Form.Group>
               {!item.isSubItem ? <Form.Group className=" d-flex justify-content-center " controlId="address">
                    <Button
                        size="m"
                        className="d-flex align-items-center  justify-content-center bg-transparent mt-3"
                        onClick={handleAddSubItem}
                    >
                        <span className="ms-1 text-primary">Add Subitem</span>
                    </Button>
                </Form.Group> : null}
            
        </Card.Body>
        </Card>
    );
}
export default InvoiceItem;