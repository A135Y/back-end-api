import CreateAccountPage from "../../src/components/CreateAccountPage";
import { Route, Routes } from "react-router";
import ForgotPasswordPage from "../../src/components/ForgotPasswordPage";

export default function ForgotPasswordRoute() {
    return (
        <Routes>
            <Route exact path="/forgot-password">
                <ForgotPasswordPage />
            </Route>
        </Routes>
    )
} 