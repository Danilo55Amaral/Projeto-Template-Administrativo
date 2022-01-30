import useAppData from "../../data/hook/useAppData";
import ButtonAlterTheme from "./ButtonAlterTheme";
import Title from "./Title";

interface HeaderProps {
    title: string
    subtile: string
};

export default function Header(props: HeaderProps) {
    const { theme, alterTheme } = useAppData();

    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtile} />
            <div className={`flex flex-grow justify-end`}>
                <ButtonAlterTheme theme={theme} alterTheme={alterTheme} />
            </div>
        </div>
    )
};