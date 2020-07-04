 interface IMenu{
    title: String;
    icon: String;
    active: Boolean;
    type: String;

    submenus: {
        title: String,
        route?: String
    }[]
}