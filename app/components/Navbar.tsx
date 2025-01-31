import React from 'react'
import { auth, signIn, signOut } from '../auth';

const Navbar = async () => {
    const session = await auth();
  return (
    <header className='px-5 py-3 bg-white shadow-sm text-black'>
        <div>Orbit</div>

        <div className='flex items-center'>
  {session && session?.user ? (
    <form action={async () => {
      "use server";
      await signOut( {redirectTo:'/'} ); // Ensure signOut is called correctly
    }}>
      <button type="submit">Logout</button>
    </form>
  ) : (
    <form action={async () => {
      "use server";
      await signIn(); // Ensure signIn is called correctly
    }}>
      <button type="submit">Login</button>
    </form>
  )}
</div>

        <div className='flex items-center'>
            
        </div>
    </header>
  )
}

export default Navbar