import MenuItems from "./MenuItems";
import { AdjustmentsIcon, BellIcon, ExitIcon, HomeIcon } from "../icons";
import Logo from "./Logo";

export default function LateralMenu() {
    return (
        <aside className={`
            flex flex-col 
            bg-gray-200 text-gray-700 
            dark:bg-gray-900 
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-800
                h-20 w-20
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItems url="/" text="Ínicio" icon={HomeIcon} />
                <MenuItems url="/adjustments" text="Ajustes" icon={AdjustmentsIcon} />
                <MenuItems url="/notifications" text="Notificações" icon={BellIcon} />
            </ul>
            <ul>
                <MenuItems text="Sair" icon={ExitIcon}
                    onClick={() => console.log('logout')}
                    className={`
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
};