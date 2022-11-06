export const adminMenu = [
  {
    //quan ly ng dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        name: "Quản lý lịch khám",
        link: "/dentist/manage-schedule",
      },
    ],
  },
  {
    //quan ly ng dung
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quan ly ng dung
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quan ly ng dung
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/manage-handbook",
      },
    ],
  },
];
export const dentistMenu = [
  {
    //quan ly ng dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "Quản lý lịch khám",
        link: "/dentist/manage-schedule",
      },
    ],
  },
];
