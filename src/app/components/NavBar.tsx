"use client"

import Link from "next/link"
import LoginModal from "./AuthModal"
import { useContext } from "react"
import { AuthenticationContext } from "@/app/context/authContext"
import useAuth from "@/hooks/useAuth"


function NavBar() {
    const { user, loading } = useContext(AuthenticationContext)
    const { signout } = useAuth()

    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="" className="font-bold text-gray-700 text-2xl">
                {" "} OpenTable{" "}
            </Link>
            <div>
                {loading ? null : (
                    <div className="flex">
                        {user ? (<>
                            <button onClick={() => signout()} className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Logout</button>
                        </>
                        ) :
                            <>
                                <LoginModal isSignin={true} />
                                <LoginModal isSignin={!true} />
                            </>
                        }
                    </div>
                )}
            </div>
        </nav>
    )
}

export default NavBar