import { useSelector } from "react-redux";
import OverlayLoading from "./OverlyLoading";
import '../assets/css/overlayLoading.css';
const LoadingLayout = ({ children }) => {
  const loading = useSelector((state) => state.loading.loading);
  return (
    <div>
    {loading && <OverlayLoading />}
    {children}
  </div>
  );
};

export default LoadingLayout;
