import { Link, useLocation } from 'react-router-dom'

function MainNavigation() {
    const path = useLocation().pathname

    const routes = [
        {
            name: 'Übersicht',
            url: '/',
        },
        {
            name: 'Öffentliche API',
            url: '/public-api',
        },
        {
            name: 'Express API',
            url: '/express-api',
        },
        {
            name: 'Firebase API',
            url: '/firebase-api',
        },
    ]

    return (
        <header className="bg-dark text-white sticky-top">
            <div className="container py-2 d-flex align-items-center">
                <span className="h4 me-4 my-0">React API Beispiel</span>
                <ul className="nav nav-pills">
                    {routes.map((route) => (
                        <li className="nav-item" key={route.url}>
                            <Link
                                className={`nav-link text-white  ${
                                    route.url === path ? 'active' : ''
                                }`}
                                to={route.url}
                            >
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default MainNavigation
