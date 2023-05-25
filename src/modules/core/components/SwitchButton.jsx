import Form from 'react-bootstrap/Form';

function Switch() {
  return (
    <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
      />
    </Form>
  );
}

export default Switch;