import {
  Settings,
  Bookmark,
  LayoutGrid,
  LucideIcon,
  WalletCards,
  ArrowLeftRight,
  FileSpreadsheet,
  Calendar,
  Palette,
  MessageSquare,
  MessagesSquare,
/*   CreditCard, */
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Panel",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contenido",
      menus: [
        {
          href: "/transacciones",
          label: "Transacciones",
          active: pathname.includes("/transacciones"),
          icon: ArrowLeftRight,
          submenus: [
            /* {
              href: "/posts",
              label: "Agregar ingreso",
              active: pathname === "/posts"
            },
            {
              href: "/posts/new",
              label: "Agregar Egreso",
              active: pathname === "/posts/new"
            } */
          ],
        },
        {
          href: "/categorias",
          label: "Categorias",
          active: pathname.includes("/categorias"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/cuentas",
          label: "Cuentas",
          active: pathname.includes("/cuentas"),
          icon: WalletCards,
          submenus: [],
        },

        {
          href: "/presupuestos",
          label: "Presupuestos",
          active: pathname.includes("/presupuestos"),
          icon: FileSpreadsheet,
          submenus: [],
        },
        {
          href: "/recordatorios",
          label: "Recordatorios",
          active: pathname.includes("/recordatorios"),
          icon: Calendar,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Configuración",
      menus: [
        /* {
          href: "/membresia",
          label: "Membresia",
          active: pathname.includes("/membresia"),
          icon: CreditCard,
          submenus: [],
        }, */
        {
          href: "/cuenta",
          label: "Cuenta",
          active: pathname.endsWith("/cuenta") || pathname.endsWith("/cuenta/security") ,
          icon: Settings,
          submenus: [
            {
              href: "/cuenta",
              label: "Perfil",
              active: pathname === "/cuenta",
            },
            {
              href: "/cuenta/security",
              label: "Seguridad",
              active: pathname === "/cuenta/security",
            },
          ],
        },
        /* {
          href: "/membresia",
          label: "Membresia",
          active: pathname.includes("/membresia"),
          icon: CreditCard,
          submenus: [],
        },  */
        {
          href: "/temas",
          label: "Temas",
          active: pathname.includes("/temas"),
          icon: Palette,
          submenus: [],
        }, 
        {
          href: "/cuentanos",
          label: "Cuéntanos",
          active: pathname.includes("/cuentanos"),
          icon: MessagesSquare,
          submenus: [],
        }, 

      ],
    },
  ];
}
