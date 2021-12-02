import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as IoI5cons  from "react-icons/io5";


export const SidebarData = [
  {
    title: 'Sales',
    path: '/order',
    icon: <AiIcons.AiFillAccountBook />,
    cName: 'nav-text'
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: <IoIcons.IoIosContacts />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoIosSettings />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Account',
        path: '/settings/settings1',
        icon: <IoIcons.IoIosContact />,
        cName: 'sub-nav'
      },
      {
        title: 'Reset Password',
        path: '/settings/settings2',
        icon: <IoIcons.IoMdKey />,
        cName: 'sub-nav'
      },
      {
        title: 'Covering Type',
        path: '/settings/settings3',
        icon: <IoI5cons.IoNewspaperSharp />,
        cName: 'sub-nav'
      },
      {
        title: 'Location',
        path: '/settings/settings4',
        icon: <IoI5cons.IoLocationSharp />,
        cName: 'sub-nav'
      },
      {
        title: 'Status',
        path: '/settings/settings5',
        icon: <IoI5cons.IoShieldCheckmark />,
        cName: 'sub-nav'
      },
      {
        title: 'Measured By',
        path: '/settings/settings6',
        icon: <IoI5cons.IoSpeedometerSharp/>,
        cName: 'sub-nav'
      },
    ]
  },
];
