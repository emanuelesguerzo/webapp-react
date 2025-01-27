import { Outlet } from "react-router-dom"
import AppHeader from "../components/AppHeader"
import AppFooter from "../components/AppFooter"

const AppLayout = () => {

    return (

        <>
            <div className="wrapper">
                <AppHeader />
                <main>{<Outlet />}</main>
                <AppFooter />
            </div>
        </>

    )

}

export default AppLayout;