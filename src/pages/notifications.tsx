import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Notifications() {
    const { alterTheme } = useAppData();

    return (
        <Layout title="Notificações"
            subtitle="Aqui você irá gerenciar as suas notificações!">
            <button onClick={alterTheme}>Alternar Tema</button>
        </Layout>
    )
};