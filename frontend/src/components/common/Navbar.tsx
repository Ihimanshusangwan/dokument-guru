import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.ts";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const {isLoggedIn, logout} = useAuth();

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <span className="text-2xl font-bold text-blue-600">Dokument Guru</span>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Services
                        </a>
                        <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Pricing
                        </a>
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/signin"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-2 space-y-2">
                        <a href="#services"
                           className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                            Services
                        </a>
                        <a href="#pricing"
                           className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                            Pricing
                        </a>
                        <a href="#features"
                           className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-3"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsOpen(false);
                                    }}
                                    className="block w-full text-left px-6 py-2 text-gray-700 hover:text-blue-600 transition-colors mx-3"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/signin"
                                onClick={() => setIsOpen(false)}
                                className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-3"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}