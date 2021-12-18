import MainNavigation from './MainNavigation'

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className="container my-5">{props.children}</main>
        </div>
    )
}

export default Layout
