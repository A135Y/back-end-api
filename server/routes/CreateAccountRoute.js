import CreateAccountPage from "../../src/components/CreateAccountPage";
import { Route, Routes } from "react-router";

export default function CreateAccountRoute() {
    return (
        <Routes>
            <Route exact path="/register">
                <CreateAccountPage />
            </Route>
        </Routes>
    )
} 