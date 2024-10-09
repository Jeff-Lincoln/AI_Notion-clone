
'use client'

import { SignedIn } from "@clerk/clerk-react";
import { SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import BreadCrumbs from "./BreadCrumbs";



function Header() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1
        className="2xl">{user?.firstName}
        {`'s`} Space</h1>
      )}

      {/**BreadCrumbs */}
      <BreadCrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default Header