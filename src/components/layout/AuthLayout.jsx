import { Outlet } from 'react-router-dom'
import maskGroupImage from '@/assets/Mask-Group.webp'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div 
        className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 lg:py-12 bg-primary relative"
        style={{
          backgroundImage: `url(${maskGroupImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center z-10">
          <div className="w-16 h-16 bg-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-primary font-bold text-2xl">SL</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to SkillLink
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Connect. Learn. Grow.
          </p>
          <div className="space-y-4 text-white/80">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white/70 rounded-full"></div>
              <span>Discover professionals with complementary skills</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white/70 rounded-full"></div>
              <span>Build meaningful professional connections</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white/70 rounded-full"></div>
              <span>Find opportunities that match your expertise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-lg">SL</span>
            </div>
            <h1 className="text-2xl font-bold">SkillLink</h1>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout