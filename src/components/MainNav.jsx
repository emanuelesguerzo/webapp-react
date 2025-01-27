import { NavLink } from "react-router-dom"

const MainNav = () => {

    const navLinks = [

        {
            path: "/",
            title: "Home",
        },
        {
            path: "/movies",
            title: "Film",
        }

    ]

    return(

        <>
            <ul className="nav">
                {navLinks.map((curLink, index) => (
                    <li key={index}>
                        <NavLink to={curLink.path}>
                            {curLink.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>

    )
    
}

export default MainNav;