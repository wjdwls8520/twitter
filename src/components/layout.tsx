import { Outlet } from "react-router-dom"
import Home from "../routes/home"

export default function Layout() {
    return (
        <>
            <Outlet />
            <Home />
        </>
    )
}