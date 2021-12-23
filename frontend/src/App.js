import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import ExpressApi from './pages/ExpressApi'
import PublicApi from './pages/PublicApi'

function App() {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate replace to="/public-api" />}
                />
                <Route path="/public-api" element={<PublicApi />} />
                <Route path="/express-api" element={<ExpressApi />} />
            </Routes>
        </Layout>
    )
}

export default App
