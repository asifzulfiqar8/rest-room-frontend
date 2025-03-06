import DashboardIcon from "../../../assets/images/aside/DashboardIcon";
import BuildingIcon from "../../../assets/images/aside/BuildingIcon";
import SensorIcon from "../../../assets/images/aside/SensorIcon";
import SettingIcon from "../../../assets/images/aside/SettingIcon";
import PlanIcon from "../../../assets/images/aside/PlanIcon";
import ReportIcon from "../../../assets/images/aside/ReportIcon";

export const pages = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/dashboard",
  },
  {
    title: "Buildings",
    link: "/buildings",
    icon: <BuildingIcon />,
  },

  {
    title: "Sensors",
    link: "/sensor",
    icon: <SensorIcon />,
  },

  {
    title: "Reports",
    link: "/reports",
    icon: <ReportIcon />,
  },
  {
    title: "Plans",
    link: "/plan",
    icon: <PlanIcon />,
  },

  {
    title: "Settings",
    icon: <SettingIcon />,
    subPages: [
      {
        title: "Profile",
        link: "/setting",
      },
      {
        title: "Subscriptions",
        link: "/subscription",
      },

      {
        title: "Change Password",
        link: "/change-password",
      },
      {
        title: "Configuration",
        link: "/configuration",
      },
    ],
  },
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
