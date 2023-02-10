import CreateAccountPage from "../../src/components/CreateAccountPage";
import { Route, Routes } from "react-router";
import NewPasswordPage from "../../src/components/NewPasswordPage";

export default function NewPasswordRoute() {
    return (
        <Routes>
            <Route exact path="/enter-new-password">
                <NewPasswordPage />
            </Route>
        </Routes>
    )
} 