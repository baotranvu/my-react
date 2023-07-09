import  { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FIRE_BASE_CONFIG } from '../../../config/constant';
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'

initializeApp(FIRE_BASE_CONFIG);

function UploadImageButton() {
  const [image, setImage] = useState(null);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          console.log('url',url);
        });
      }
    );
  };

  return (
    <>
      <Form.Label>Chọn hình ảnh thương hiệu</Form.Label>
      <Form.Control className='mb-2' type="file" accept=".jpg,.jpeg,.png" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload Image</Button>
    </>
  );
}

export default UploadImageButton