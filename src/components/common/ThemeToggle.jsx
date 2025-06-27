import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full h-10 w-10 hover:bg-muted transition-all duration-300 hover:scale-105"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-muted-foreground transition-all duration-300" />
      ) : (
        <Sun className="h-5 w-5 text-muted-foreground transition-all duration-300" />
      )}
    </Button>
  )
}

export default ThemeToggle