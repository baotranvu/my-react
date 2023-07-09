//import component
import AppHeader from "../components/AppHeader";
import SideBar from "../components/SideBar";
import LoadingLayout from "./LoadingLayout";
//import material
import { Container, Box } from "@mui/material";

import { useSelector } from "react-redux";
const drawerWidth = 240;

function LayoutDefault({children}) {
  const isOpen = useSelector(state => state.sidebar.isOpen);
  return (
    <LoadingLayout>
      <Container fixed>
        <AppHeader/>
          <Box>
            <SideBar open={isOpen} drawerWidth={drawerWidth} children={children} />
          </Box>
      </Container>
    </LoadingLayout>
  );
}

export default LayoutDefault;
