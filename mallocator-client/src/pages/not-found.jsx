import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-slate-200">
            <h1 className="text-9xl font-extrabold text-slate-400">404</h1>
            <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-slate-300">
                Sorry, the page you're looking for cannot be found.
            </p>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-500">
                It might have been removed, or you may have mistyped the address.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-slate-700 text-slate-100 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-slate-600"
            >
                Go Back to Home
            </Link>
        </div>
    );
}

export default NotFound;
