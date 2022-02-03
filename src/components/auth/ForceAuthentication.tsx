import Image from "next/image";
import router from "next/router";
import loading from "../../../public/images/loading.gif";
import useAuth from "../../data/hook/useAuth";

export default function ForceAuthentication(props) {
    const { user, loading } = useAuth();

    function contentRender() {
        return (
            <>
                {props.children}
            </>
        )
    };

    function loadingRender() {
        return (
            <div className={`
                flex justify-center items-center h-screen
             `}>
                {/* corrigir bug */}
                {/* <Image src={loading} /> */}
            </div>
        )
    };

    if (!loading && user?.email) {
        return contentRender()
    } else if (loading) {
        return loadingRender()
    } else {
        router.push('/authentication')
        return null
    }
};