import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <>
            <header>Ciao sono un header</header>
            <main>{<Outlet />}</main>
            <footer>Ciao sono il footer</footer>
        </>
    )
}

export default AppLayout;