"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Pause } from "lucide-react"

interface BreathingExerciseProps {
  onBack: () => void
}

type Phase = "inhale" | "hold" | "exhale" | "rest"

const breathingPatterns = {
  "4-7-8": {
    name: "4-7-8 (Глубокое расслабление)",
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 0,
  },
  square: {
    name: "Квадратное дыхание (Баланс)",
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4,
  },
  simple: {
    name: "Простое (4-4)",
    inhale: 4,
    hold: 0,
    exhale: 4,
    rest: 0,
  },
}

export default function BreathingExercise({ onBack }: BreathingExerciseProps) {
  const [pattern, setPattern] = useState<keyof typeof breathingPatterns>("4-7-8")
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<Phase>("inhale")
  const [secondsLeft, setSecondsLeft] = useState(breathingPatterns[pattern].inhale)
  const [cycleCount, setCycleCount] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1

        // Move to next phase
        const currentPattern = breathingPatterns[pattern]
        switch (phase) {
          case "inhale":
            if (currentPattern.hold > 0) {
              setPhase("hold")
              return currentPattern.hold
            }
            setPhase("exhale")
            return currentPattern.exhale
          case "hold":
            setPhase("exhale")
            return currentPattern.exhale
          case "exhale":
            if (currentPattern.rest > 0) {
              setPhase("rest")
              return currentPattern.rest
            }
            setCycleCount((c) => c + 1)
            setPhase("inhale")
            return currentPattern.inhale
          case "rest":
            setCycleCount((c) => c + 1)
            setPhase("inhale")
            return currentPattern.inhale
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase, pattern])

  const handleStart = () => {
    setIsActive(true)
    setPhase("inhale")
    setSecondsLeft(breathingPatterns[pattern].inhale)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setSecondsLeft(breathingPatterns[pattern].inhale)
    setCycleCount(0)
  }

  const phaseText = {
    inhale: "Вдох",
    hold: "Задержи",
    exhale: "Выдох",
    rest: "Пауза",
  }

  const phaseColor = {
    inhale: "from-secondary/30 to-primary/30",
    hold: "from-accent/30 to-accent/30",
    exhale: "from-primary/30 to-secondary/30",
    rest: "from-muted/30 to-muted/30",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Дыхательный Тренажер</h1>
            <p className="text-xs text-muted-foreground">Управляемое дыхание</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Pattern Selection */}
        {!isActive && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold mb-3 text-foreground">Выбери технику:</h2>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(breathingPatterns).map(([key, value]) => (
                <Card
                  key={key}
                  className={`p-4 cursor-pointer transition-all ${
                    pattern === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setPattern(key as keyof typeof breathingPatterns)}
                >
                  <p className="font-medium text-foreground">{value.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Вдох {value.inhale}с {value.hold > 0 && `• Задержка ${value.hold}с`} • Выдох {value.exhale}с
                    {value.rest > 0 && ` • Пауза ${value.rest}с`}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Breathing Circle */}
        <Card
          className={`p-12 mb-6 bg-gradient-to-br ${phaseColor[phase]} border-primary/20 transition-all duration-1000`}
        >
          <div className="flex flex-col items-center justify-center">
            <div
              className={`w-48 h-48 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center transition-transform duration-1000 ${
                phase === "inhale" ? "scale-125" : phase === "exhale" ? "scale-75" : "scale-100"
              }`}
            >
              <div className="text-center">
                <p className="text-3xl font-bold text-primary mb-2">{secondsLeft}</p>
                <p className="text-lg font-medium text-foreground">{phaseText[phase]}</p>
              </div>
            </div>

            <p className="mt-8 text-muted-foreground text-sm">Циклов завершено: {cycleCount}</p>
          </div>
        </Card>

        {/* Instructions */}
        {!isActive && (
          <Card className="p-4 mb-6 bg-muted/30 border-border">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Найди удобное место, сядь ровно. Дыши через нос, следуя визуальным подсказкам. Круг будет увеличиваться
              при вдохе и уменьшаться при выдохе.
            </p>
          </Card>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {!isActive ? (
            <Button
              onClick={handleStart}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              Начать
            </Button>
          ) : (
            <>
              <Button onClick={handlePause} variant="outline" className="flex-1 py-6 bg-transparent">
                <Pause className="w-5 h-5 mr-2" />
                Пауза
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1 py-6 bg-transparent">
                Сбросить
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
