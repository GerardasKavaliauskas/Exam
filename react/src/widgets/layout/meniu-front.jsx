import React, { useContext, useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "@/UserContext";
 
const empty = obj => {
  if (!obj) return true;
  if (Boolean(obj) === false) return true;
  return Object.keys(obj).length === 0;
};

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
 
export function MeniuFront() {
  const [openNav, setOpenNav] = useState(false);

  // const [user, setUser] = useState({});

  const navigate = useNavigate();

  const [user, setUser, token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser({});
    setToken("");
    navigate("/");
  }
  
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const NavListGuest = () => {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        <Link to="/">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
          </Typography>
        </Link>
        <Link to="/auth/login">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Login
            </ListItem>
          </Typography>
        </Link>
        <Link to="/auth/register">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">
              Register
            </ListItem>
          </Typography>
        </Link>
      </List>
    );
  }
   

  const NavListAuth = () => {
    return (
      <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
        <Link to="/">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Home</ListItem>
          </Typography>
        </Link>
        <Link to="/profile">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Profile</ListItem>
          </Typography>
        </Link>
        <Link to="/events">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Skelbimai</ListItem>
          </Typography>
        </Link>
        <Link to="/admin">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="font-medium"
          >
            <ListItem className="flex items-center gap-2 py-2 pr-4">Admin</ListItem>
          </Typography>
        </Link>
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4" onClick={handleLogout}>
            Log Out
          </ListItem>
        </Typography>
      </List>
    );
  }
  const NavList = () => {
    if (!empty(user)) {
      return <NavListGuest />;
    } else {
      return <NavListAuth />;
    }
  } 

  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Egzamino užduotis
          </Typography>
        </Link>
        <div className="hidden lg:block">
          {empty(user) ? <NavListGuest /> : <NavListAuth />}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {empty(user) ? <NavListGuest /> : <NavListAuth />}
      </Collapse>
    </Navbar>
  );
}

export default MeniuFront;