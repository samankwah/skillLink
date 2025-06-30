import { Outlet } from 'react-router-dom'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout