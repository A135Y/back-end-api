import CreateAccountPage from "../../src/components/CreateAccountPage";
import { Route, Routes } from "react-router";
import ProfilePage from "../../src/components/ProfilePage";

export default function ForgotPasswordRoute() {
    return (
        <Routes>
            <Route exact path="/profile-page">
                <ProfilePage />
            </Route>
        </Routes>
    )
} 