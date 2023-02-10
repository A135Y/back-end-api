import LoginPage from "../../src/components/LoginPage";
import { Route, Routes } from "react-router";

export default function LoginRoute() {
    return (
        <Routes>
            <Route exact path="/">
                <LoginPage />
            </Route>
        </Routes>
    )
} 