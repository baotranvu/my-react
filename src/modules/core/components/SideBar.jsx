
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import AppBreadCrumbs from './AppBreadcrumbs';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));



export default function SideBar({open, drawerWidth, children}) {
  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }),
  );
  const location = useLocation();
  const listItem = [
    {
      title:'Tài khoản',
      link:'/user',
      icon:''
    },
    {
      title:'Thương hiệu',
      link:'/brand',
      icon:''
    },
    {
      title:'Hợp đồng',
      link:'/contract',
      icon:''
    },
    {
      title:'Cửa hàng',
      link:'/store',
      icon:''
    },
    {
      title:'Hóa đơn',
      link:'/invoice',
      icon:''
    },
    
  ]
  const isActive = (url) => {
    return location.pathname === url;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            height: '100%',
            position: 'sticky',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          
        </DrawerHeader>
        <Divider />
        <List>
          {listItem.map(({ title, link, icon}, index) => (
            <ListItem key={title} disablePadding>
              <ListItemButton className='mb-3' divider component={Link} to={link} selected={isActive(link)}>
                <ListItemIcon>
                 
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItemButton className='mb-3' divider>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText primary='Báo cáo' />
          </ListItemButton>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader>
          <AppBreadCrumbs />
        </DrawerHeader>
        <Paper sx={{ p: 2 }}>
          {children}
        </Paper>
      </Main>
    </Box>
  );
}