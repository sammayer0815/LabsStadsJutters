import React, { useEffect, useState, createContext, useContext } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

// To store User ID
const AuthContext = createContext(null);

export interface IAuthRouteProps {
    children: React.ReactNode;
}

export const auth = getAuth();

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null); 

    useEffect(() => {
        const unsubscribe = AuthCheck();

        return () => {
            unsubscribe();
        };
    }, []);

    // Function to check if user is authenticated
    const AuthCheck = () => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                // Sets user ID
                setUserId(user.uid);
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

    // Loading screen display while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    // Return User ID
    return (
        <AuthContext.Provider value={userId}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthRoute;

// Variable to get user ID on other pages
export const useUserId = () => useContext(AuthContext);
