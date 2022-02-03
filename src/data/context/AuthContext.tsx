import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import User from "../../model/User";
import route from "next/router";
import Cookies from "js-cookie";

interface AuthContextProps {
    user?: User
    loading?: boolean
    register?: (email, senha: string) => Promise<void>
    login?: (email, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
};

const AuthContext = createContext<AuthContextProps>({});

async function userNormalized(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken();

    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
};

function administrationCookie(logged: boolean) {
    if (logged) {
        Cookies.set('admin-teplate-project-auth', logged, {
            expires: 7 // dias , days
        })
    } else {
        Cookies.remove('admin-teplate-project-auth')
    }
};

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>(null);

    async function configUserSection(userFirebase) {
        if (userFirebase?.email) {
            const user = await userNormalized(userFirebase)
            setUser(user)
            administrationCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            administrationCookie(false)
            setLoading(false)
            return false
        }
    };

    async function login(email, senha) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .signInWithEmailAndPassword(email, senha)

            await configUserSection(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    };

    async function register(email, senha) {
        try {
            setLoading(true)
            const resp = await firebase.auth()
                .createUserWithEmailAndPassword(email, senha)

            await configUserSection(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    };

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configUserSection(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    };

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await configUserSection(null)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (Cookies.get('admin-teplate-project-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(configUserSection)
            return () => cancel()
        } else {
            setLoading(false)
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext