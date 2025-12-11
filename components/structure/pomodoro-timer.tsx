"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"

interface PomodoroTimerProps {
  onBack: () => void
}

type TimerMode = "work" | "break" | "longBreak"

export default function PomodoroTimer({ onBack }: PomodoroTimerProps) {
  const [workMinutes, setWorkMinutes] = useState(25)
  const [breakMinutes, setBreakMinutes] = useState(5)
  const [longBreakMinutes, setLongBreakMinutes] = useState(15)
  const [currentMode, setCurrentMode] = useState<TimerMode>("work")
  const [isRunning, setIsRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=",
      )
    }
  }, [])

  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 0) return prev - 1

        // Timer completed
        if (audioRef.current) {
          audioRef.current.play().catch(() => {})
        }

        if (currentMode === "work") {
          setCompletedPomodoros((c) => c + 1)
          const nextMode = (completedPomodoros + 1) % 4 === 0 ? "longBreak" : "break"
          setCurrentMode(nextMode)
          return (nextMode === "longBreak" ? longBreakMinutes : breakMinutes) * 60
        } else {
          setCurrentMode("work")
          return workMinutes * 60
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, currentMode, workMinutes, breakMinutes, longBreakMinutes, completedPomodoros])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setCurrentMode("work")
    setSecondsLeft(workMinutes * 60)
  }

  const modeConfig = {
    work: { label: "Работа", color: "secondary", bg: "from-secondary/20 to-secondary/10" },
    break: { label: "Перерыв", color: "primary", bg: "from-primary/20 to-primary/10" },
    longBreak: { label: "Длинный перерыв", color: "accent", bg: "from-accent/20 to-accent/10" },
  }

  const config = modeConfig[currentMode]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Таймер Помодоро</h1>
            <p className="text-xs text-muted-foreground">Фокус и продуктивность</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Timer Display */}
        <Card className={`p-8 mb-6 bg-gradient-to-br ${config.bg} border-${config.color}/20`}>
          <div className="text-center">
            <p className={`text-sm font-medium text-${config.color} mb-4`}>{config.label}</p>
            <div className="text-7xl font-bold text-foreground mb-8 font-mono">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              {!isRunning ? (
                <Button
                  onClick={handleStart}
                  size="lg"
                  className={`bg-${config.color} hover:bg-${config.color}/90 text-${config.color}-foreground px-8`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Начать
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline" className="px-8 bg-transparent">
                  <Pause className="w-5 h-5 mr-2" />
                  Пауза
                </Button>
              )}
              <Button onClick={handleReset} size="lg" variant="outline" className="bg-transparent">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress */}
        <Card className="p-6 mb-6 bg-card border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Завершено помодоро</h3>
            <span className="text-2xl font-bold text-secondary">{completedPomodoros}</span>
          </div>
          <div className="flex gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < completedPomodoros ? "bg-secondary" : "bg-muted"
                } transition-colors`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {completedPomodoros % 4 === 0 && completedPomodoros > 0
              ? "Время для длинного перерыва!"
              : `До длинного перерыва: ${4 - (completedPomodoros % 4)} помодоро`}
          </p>
        </Card>

        {/* Settings */}
        <Card className="p-6 bg-muted/30 border-border">
          <h3 className="font-semibold mb-4 text-foreground text-sm">Настройки</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Работа (мин)</label>
                <Input
                  type="number"
                  value={workMinutes}
                  onChange={(e) => {
                    const val = Number.parseInt(e.target.value) || 25
                    setWorkMinutes(val)
                    if (currentMode === "work" && !isRunning) {
                      setSecondsLeft(val * 60)
                    }
                  }}
                  className="text-center"
                  min={1}
                  max={60}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Перерыв (мин)</label>
                <Input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(Number.parseInt(e.target.value) || 5)}
                  className="text-center"
                  min={1}
                  max={30}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Длинный (мин)</label>
                <Input
                  type="number"
                  value={longBreakMinutes}
                  onChange={(e) => setLongBreakMinutes(Number.parseInt(e.target.value) || 15)}
                  className="text-center"
                  min={1}
                  max={60}
                />
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
