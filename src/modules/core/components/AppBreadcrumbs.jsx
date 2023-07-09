import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs } from '@mui/material';
import Card from '@mui/material/Card';
export default function AppBreadCrumbs(){
  const location = useLocation();
  const capitalizeFirstLetters = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

  return (
    <Card bgcolor={'background.paper'}  sx={{ p: 1, borderRadius: 2, paddingLeft: 2, paddingRight: 2  }}>
      <Breadcrumbs>
      {pathSegments.map((segment, index) => (
        <Link key={index} to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
          {capitalizeFirstLetters(segment)}
        </Link>
      ))}
    </Breadcrumbs>
    </Card>
  );
};


