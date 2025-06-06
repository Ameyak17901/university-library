import { Session } from "next-auth"

const Header = ({session}: {session: Session}) => {
  return (
    <header className="admin-header">
        <div>
            <h2 className="text-2xl text-semibold text-dark-400">
                {session?.user?.name}
            </h2>
            <p className="text-slate-500 text-base">
                Monitor all of your books and users here.
            </p>
        </div>
        
    </header>
  )
}

export default Header