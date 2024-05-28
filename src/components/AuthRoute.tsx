import React, { useEffect, useState, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

// Create a context to store the user's ID
const AuthContext = createContext(null);

export interface IAuthRouteProps {
    children: React.ReactNode;
}

export const auth = getAuth();

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null); // State to store user's ID

    useEffect(() => {
        const unsubscribe = AuthCheck();

        return () => {
            unsubscribe();
        };
    }, []);

    const AuthCheck = () => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                setUserId(user.uid); // Set the user's ID in the state
            } else {
                setLoading(false);
                console.log("User is not logged in. Redirecting to login page.");
                history.replace("/login");
            }
        }, (error) => {
            setLoading(false);
            console.error("Error checking authentication:", error);
            history.replace("/login");
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={userId}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthRoute;

// Custom hook to access the user's ID
export const useUserId = () => useContext(AuthContext);
