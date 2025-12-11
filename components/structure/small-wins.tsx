"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, CheckCircle2, Trash2, Sparkles } from "lucide-react"

interface SmallWinsProps {
  onBack: () => void
}

interface Win {
  id: string
  text: string
  date: string
}

export default function SmallWins({ onBack }: SmallWinsProps) {
  const [wins, setWins] = useState<Win[]>([])
  const [newWin, setNewWin] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("quiet-harbor-wins")
    if (saved) {
      setWins(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Save to localStorage
    if (wins.length > 0) {
      localStorage.setItem("quiet-harbor-wins", JSON.stringify(wins))
    }
  }, [wins])

  const handleAddWin = () => {
    if (!newWin.trim()) return

    const win: Win = {
      id: Date.now().toString(),
      text: newWin.trim(),
      date: new Date().toLocaleDateString("ru-RU"),
    }

    setWins([win, ...wins])
    setNewWin("")
    setShowCelebration(true)
    setTimeout(() => setShowCelebration(false), 2000)
  }

  const handleDeleteWin = (id: string) => {
    setWins(wins.filter((w) => w.id !== id))
  }

  const todayWins = wins.filter((w) => w.date === new Date().toLocaleDateString("ru-RU"))
  const weekWins = wins.filter((w) => {
    const winDate = new Date(w.date.split(".").reverse().join("-"))
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return winDate >= weekAgo
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Система Малых Побед</h1>
            <p className="text-xs text-muted-foreground">Каждый шаг важен</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <p className="text-2xl font-bold text-primary mb-1">{todayWins.length}</p>
            <p className="text-xs text-muted-foreground">Сегодня</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
            <p className="text-2xl font-bold text-secondary mb-1">{weekWins.length}</p>
            <p className="text-xs text-muted-foreground">За неделю</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <p className="text-2xl font-bold text-accent mb-1">{wins.length}</p>
            <p className="text-xs text-muted-foreground">Всего</p>
          </Card>
        </div>

        {/* Add Win */}
        <Card className="p-4 mb-6 bg-card border-border">
          <div className="flex gap-2">
            <Input
              value={newWin}
              onChange={(e) => setNewWin(e.target.value)}
              placeholder="Что ты сегодня сделал? (даже если это мелочь)"
              onKeyDown={(e) => e.key === "Enter" && handleAddWin()}
              className="flex-1"
            />
            <Button onClick={handleAddWin} disabled={!newWin.trim()} className="bg-primary text-primary-foreground">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </Card>

        {/* Celebration */}
        {showCelebration && (
          <Card className="p-6 mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 animate-in fade-in slide-in-from-top-4">
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="font-semibold text-foreground">Отлично! Ещё одна победа!</p>
            </div>
          </Card>
        )}

        {/* Wins List */}
        {wins.length === 0 ? (
          <Card className="p-8 text-center bg-muted/30 border-border">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-semibold mb-2 text-foreground">Начни отмечать победы</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Любое действие, даже самое маленькое, — это прогресс. Записывай каждый шаг.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {wins.map((win) => (
              <Card key={win.id} className="p-4 bg-card border-border hover:border-primary/30 transition-colors group">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{win.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{win.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteWin(win.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Info */}
        {wins.length > 0 && (
          <Card className="p-6 mt-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="font-semibold mb-2 text-foreground">Твой прогресс реален</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ты уже отметил {wins.length} {wins.length === 1 ? "действие" : "действий"}. Это значит, что ты двигаешься
              вперёд, даже если не всегда это замечаешь.
            </p>
          </Card>
        )}
      </main>
    </div>
  )
}
