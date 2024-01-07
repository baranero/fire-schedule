import { Link } from "react-router-dom"

const Header = () => {
    return <header className="bg-red-300/70 shadow-md">
        <div className="max-w-6xl mx-auto p-3 flex justify-between items-center">
            <Link to='/'>
                <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                    Fire Schedule
                </h1>
            </Link>
            <ul className="flex gap-4">
            <Link to='/'>
                <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">Home</li>
            </Link>
            <Link to="/sign-in">
                <li className="text-slate-700 hover:underline cursor-pointer">Sign in</li>
            </Link>
        </ul>
        </div>
    </header>
}

export default Header