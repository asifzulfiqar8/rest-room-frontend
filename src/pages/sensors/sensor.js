import icon1 from "../../assets/images/sensor/icon1.svg";
import timeIcon from "../../assets/images/sensor/time.svg";
import odorSensor from "../../assets/images/sensor/a.svg";
import odorSensor2 from "../../assets/images/sensor/odorSensor2.svg";
import odorDetected from "../../assets/images/sensor/a-b.svg";
import odorDetected2 from "../../assets/images/sensor/odorDetected2.svg";
import icon2 from "../../assets/images/sensor/icon2.svg";
// import icon3 from "../../assets/images/sensor/icon3.svg";
// import icon4 from "../../assets/images/sensor/icon4.svg";
// import icon5 from "../../assets/images/sensor/icon5.svg";

export const sensorData = [
  {
    id: 1,
    name: "Restroom 1",
    restRoom: "R001",
    status: "active",
    time: "5 minutes ago",
    icon: icon1,
    timeIcon: timeIcon,
    odorSensor: odorSensor,
    odorDetected: odorDetected,
    buttonText: "Resolved",
  },

  {
    id: 2,
    name: "Restroom 2",
    restRoom: "R002",
    status: "Inactive",
    time: "3 minutes ago",
    icon: icon2,
    timeIcon: timeIcon,
    odorSensor: odorSensor2,
    odorDetected: odorDetected2,
    buttonText: "Pending",
  },
  {
    id: 3,
    name: "Restroom 3",
    restRoom: "R001",
    status: "active",
    time: "5 minutes ago",
    icon: icon1,
    timeIcon: timeIcon,
    odorSensor: odorSensor,
    odorDetected: odorDetected,
    buttonText: "Resolved",
  },

  {
    id: 4,
    name: "Restroom 4",
    restRoom: "R002",
    status: "Inactive",
    time: "3 minutes ago",
    icon: icon2,
    timeIcon: timeIcon,
    odorSensor: odorSensor2,
    odorDetected: odorDetected2,
    buttonText: "Pending",
  },
];
