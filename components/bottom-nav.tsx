"use client"

import { Sparkles, Waves, Timer, BookOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">Главная</span>
            </Button>
          </Link>
          <Link href="/reset">
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                pathname.startsWith("/reset") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Waves className="w-5 h-5" />
              <span className="text-xs">Сброс</span>
            </Button>
          </Link>
          <Link href="/structure">
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                pathname.startsWith("/structure") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Timer className="w-5 h-5" />
              <span className="text-xs">Структура</span>
            </Button>
          </Link>
          <Link href="/resources">
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 ${
                pathname.startsWith("/resources") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Ресурсы</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
