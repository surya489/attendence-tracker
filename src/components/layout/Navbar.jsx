
import { Input } from "../common/Input";
import { Zap, UserRoundPlus, Bell, CircleUserRound } from "lucide-react";

export const Navbar = () => {

    return (
        <div className="navbarWrapper">
            <Input type="text" id="search" name="search" placeholder="search" className="searchInput" />
            <div className="iconsWrapper">
                <div className="iconList">
                    <Zap size={22} />
                    <UserRoundPlus size={22} />
                    <Bell size={22} />
                </div>
                <div className="profileIcon">
                    <CircleUserRound size={30} />
                </div>
            </div>
        </div>
    )

}