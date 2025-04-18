import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full"
      >
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
        </motion.div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
} 