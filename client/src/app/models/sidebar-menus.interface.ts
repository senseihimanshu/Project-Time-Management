export interface ISidebarMenus {
  title: String;
  icon: String;
  active: Boolean;
  type: String;

  submenus: {
    title: String;
    route: String;
  }[];
}
