import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
function render(c) {
    return c;
}
const ProtectedRoute = (Component, route) => {

    const [isLoading, setIsLoading] = useState(true);
    let config

    useEffect(() => {
        setTimeout(async () => {
            if (config.Permissions && config.Permissions.length > 0) {
                setIsLoading(false);
            }
            else {
                await config.loadConfigData();
                setIsLoading(false);
            }
        }, 2000);
    }, [config]);

    if (config.Error === true) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100 text-center">
                < div className="text-center text-danger mx-3 my-3">Unable to load the data. Try to refresh again.</div>
            </div>)
    }
    if (isLoading) {
        return <span className="indicator-progress" style={{ display: "block" }}>
            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
    }
    const hasPermission = Array.isArray(route)
        ? route.some((r) => config.Permissions && config.Permissions.includes(r))
        : config.Permissions && config.Permissions.includes(route);

    return hasPermission ? render(Component) : <Navigate to="/access-denied" />;
};