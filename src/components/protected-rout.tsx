import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRout( {
    children,
}: {
    children: React.ReactNode;
} ) {

    const user = auth.currentUser;
    console.log(user);
    if(user === null) {
        return <Navigate to="/create-account" />;
    }
    return children
}