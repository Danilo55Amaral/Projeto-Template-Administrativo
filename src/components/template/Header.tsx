import useAppData from "../../data/hook/useAppData";
import ButtonAlterTheme from "./ButtonAlterTheme";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
    title: string
    subtile: string
};

export default function Header(props: HeaderProps) {
    const { theme, alterTheme } = useAppData();

    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtile} />
            <div className={`flex flex-grow justify-end items-center`}>
                <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
                <UserAvatar className="ml-3" />
            </div>
        </div>
    )
};