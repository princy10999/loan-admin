// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Lead',
    icon: getIcon('fa6-solid:clipboard-list'),
    children: [
      { 
      title: 'Add Lead',
      path:'/dashboard/add-lead',
      icon: getIcon('eva:people-fill'),
    },
    {
      title:'View All Lead',
      path:'/dashboard/lead',
      icon: getIcon('eva:people-fill'),

    }
    ]
  },
  {
    title: 'Reminder',
    path: '/dashboard/reminder',
    icon: getIcon('clarity:list-solid-badged'),
  },
  {
    title: 'User',
    icon: getIcon('eva:file-text-fill'),
    children: [
      { 
      title: 'Add User',
      path:'/dashboard/add-user',
      icon: getIcon('eva:people-fill'),
    },
    {
      title:'View All User',
      path:'/dashboard/user',
      icon: getIcon('eva:people-fill'),

    }
    ]
  },
 
];

export default navConfig;
