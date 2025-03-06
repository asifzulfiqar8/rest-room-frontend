import { useCallback, useEffect, useMemo, useState } from "react";
import DashboardIcon from "../../../assets/images/aside/BuildingIcon";
import BuildingIcon from "../../../assets/images/aside/DashboardIcon";
import SensorIcon from "../../../assets/images/aside/SensorIcon";
import SettingIcon from "../../../assets/images/aside/SettingIcon";
import PlanIcon from "../../../assets/images/aside/PlanIcon";
import ReportIcon from "../../../assets/images/aside/ReportIcon";

const usePageRoutes = (initialIsActive, initialUser) => {
  const [isActivePage, setIsActivePage] = useState(initialIsActive);
  const [user, setUser] = useState(initialUser);
  const [routes, setRoutes] = useState([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const userRoutes = useMemo(() => {
    return [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard",
      },
      {
        title: "Buildings",
        link: "/building",
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
  }, [isActivePage]);

  const inspectionRoutes = useMemo(() => {
    return [
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
    ];
  }, [isActivePage]);

  const refetch = useCallback(
    (newIsActive, newUser) => {
      if (user?.role) setUser(newUser);
      setIsActivePage(newIsActive);
      setRefetchTrigger((prev) => !prev);
    },
    [user.role]
  );
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "user":
          setRoutes(userRoutes);
          break;
        case "inspection":
          setRoutes(inspectionRoutes);
          break;

        default:
          setRoutes([]);
      }
    }
  }, [user, isActivePage, refetchTrigger, userRoutes, inspectionRoutes]);
  return [routes, refetch];
};

export default usePageRoutes;
