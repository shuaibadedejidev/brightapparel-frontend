import { Navigate, Outlet } from "react-router";
import useUserStore from "../store/useUserStore";

const ProtectRoute = ({ user }) => {
    if (!user.role === 'CUSTOMER' && !user.role === 'ADMIN') {
        return <Navigate to={'/login'} replace />
    } 

    return <Outlet />
}


export default ProtectRoute