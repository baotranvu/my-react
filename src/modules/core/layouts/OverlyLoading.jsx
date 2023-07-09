
import Spinner from 'react-bootstrap/Spinner';
import '../assets/css/overlayLoading.css';

const OverlayLoading = () => {
  return (
    <div className='overlay-loading'>
      <Spinner animation='border' role='status'>
      </Spinner>
    </div>
  );
};

export default OverlayLoading;
