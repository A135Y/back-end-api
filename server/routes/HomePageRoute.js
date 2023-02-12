import HomePage from "../../src/components/HomePage";
import { Route, Routes } from "react-router";

export default function HomePageRoute() {
    return (
        <Routes>
            <Route exact path="/home">
                <HomePage />
            </Route>
        </Routes>
    )
} 