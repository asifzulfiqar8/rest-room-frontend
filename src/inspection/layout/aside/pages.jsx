import BuildingIcon from "../../../assets/images/aside/DashboardIcon";
import PlanIcon from "../../../assets/images/aside/PlanIcon";
import ReportIcon from "../../../assets/images/aside/ReportIcon";
import SettingIcon from "../../../assets/images/aside/SettingIcon";

export const pages = [
  {
    title: "Dashboard",
    icon: <BuildingIcon />,

    link: "/inspection",
  },
  {
    title: "History",
    link: "/inspection/history",
    icon: <ReportIcon />,
  },
  {
    title: "Inspection",
    link: "/inspection/all-inspections",
    icon: <PlanIcon />,
  },

  {
    title: "Settings",
    icon: <SettingIcon />,
    subPages: [
      {
        title: "Profile",
        link: "/inspection/profile",
      },
      {
        title: "Change Password",
        link: "/inspection/change-password",
      },
    ],
  },

  // {
  //   title: "Settings",
  //   icon: <SettingIcon />,
  //   subPages: [
  //     {
  //       title: "Profile",
  //       link: "/home/setting",
  //     },
  //     {
  //       title: "Configuration",
  //       link: "/home/configuration",
  //     },
  //   ],
  // },
];

//  const pages = [
//    {
//      name: "Dashboard",
//      link: "/home/dashboard",
//      icon: <DashboardIcon activeLink={url === "/home/dashboard"} />,
//    },
//    {
//      name: "Buildings",
//      link: "/home/building",
//      icon: <BuildingIcon activeLink={url === "/home/building"} />,
//    },
//    {
//      name: "Sensors",
//      link: "/home/sensor",
//      icon: <SensorIcon activeLink={url === "/home/sensor"} />,
//    },
//    {
//      name: "Reporting",
//      link: "/home/reporting",
//      icon: <ReportIcon activeLink={url === "/home/reporting"} />,
//    },
//    {
//      name: "Plans",
//      link: "/home/plan",
//      icon: <PlanIcon activeLink={url === "/home/plan"} />,
//    },
//    {
//      name: "Settings",
//      icon: <SettingIcon />,
//      subPages: [
//        { title: "Profile", link: "/home/setting", icon: <SettingIcon /> },
//        {
//          title: "Configuration",
//          link: "/home/configuration",
//          icon: <SettingIcon />,
//        },
//      ],
//    },
//  ];
