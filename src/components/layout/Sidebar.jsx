import { Link } from "react-router-dom";

export const Sidebar = ({ headerLinks = [], footerLinks = [], logo }) => {
  return (
    <div className="sidebarWrap">
      <nav className="wrapper">
        <div className="navHeader">
          {logo && <img src={logo} alt="Logo" />}

          <div className="linkWrapper">
            {headerLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link key={index} to={item.path} className="link flex items-center gap-2">
                  {Icon && <Icon size={18} />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="navFooter">
          {footerLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link key={index} to={item.path} className="link flex items-center gap-2">
                {Icon && <Icon size={18} />}
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};