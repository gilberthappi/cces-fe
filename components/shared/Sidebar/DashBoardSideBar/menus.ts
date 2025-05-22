import type { IRole } from "@/constants/roles";
import {
	Cog8ToothIcon,
	RectangleStackIcon,
	Squares2X2Icon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { HiDesktopComputer } from "react-icons/hi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { VscFeedback } from "react-icons/vsc";

type MenuItemWithIcon = {
	name: string;
	href: string;
	icon: any;
	isCollapsible: boolean;
	roles?: IRole[];
};

export interface ExpandableMenu
	extends Omit<MenuItemWithIcon, "isCollapsible"> {
	items: MenuItemNoIcon[];
}

export interface SubMenus extends Omit<MenuItemWithIcon, "isCollapsible"> {
	parent: string;
}

type MenuItemNoIcon = Omit<
	Pick<
		MenuItemWithIcon,
		Exclude<keyof MenuItemWithIcon, "icon" | "isCollapsible">
	>,
	"isCollapsible"
>;

export const mainMenu: MenuItemWithIcon[] = [
	// {
	// 	name: "Home",
	// 	href: "/backhome",
	// 	icon: HomeIcon,
	// 	isCollapsible: false,
	// },
	{
		name: "Welcome",
		href: "/welcome",
		icon: HiDesktopComputer,
		isCollapsible: false,
	},
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["ADMIN"],
	},
	{
		name: "Statistic",
		href: "/statistic",
		icon: Squares2X2Icon,
		isCollapsible: false,
		roles: ["ORGANIZATION"],
	},
	{
		name: "Users",
		href: "/users",
		icon: UsersIcon,
		isCollapsible: false,
		roles: ["ADMIN"],
	},
	{
		name: "Complaints",
		href: "/complaints",
		icon: VscFeedback,
		isCollapsible: false,
		roles: ["ADMIN", "ORGANIZATION"],
	},
	
];

export const secondaryMenu: MenuItemNoIcon[] = [];

export const bottomMenu: MenuItemWithIcon[] = [
	{
		name: "settings",
		href: "/settings",
		icon: Cog8ToothIcon,
		isCollapsible: false,
	},
	{
		name: "logout",
		href: "/logout",
		icon: RiLogoutCircleLine,
		isCollapsible: false,
	},
];

export const subMenus: SubMenus[] = [
	{
		name: "expandable1",
		href: "#",
		icon: RectangleStackIcon,
		parent: "expandable",
	},
	{
		name: "expandable2",
		href: "#",
		icon: RectangleStackIcon,
		parent: "expandable2",
	},
];
