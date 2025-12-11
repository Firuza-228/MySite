"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

interface PixelArtTherapyProps {
  onBack: () => void
}

// Simple pixel art templates (lighthouse, clouds, boat)
const templates = {
  lighthouse: {
    name: "Маяк",
    grid: [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 2, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    palette: {
      0: { color: "transparent", name: "Фон" },
      1: { color: "#6B9080", name: "Зеленый" },
      2: { color: "#A4C3B2", name: "Светлый" },
    },
  },
  cloud: {
    name: "Облако",
    grid: [
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 2, 2, 2, 1, 0],
      [1, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 1],
      [0, 1, 1, 1, 1, 1, 0],
    ],
    palette: {
      0: { color: "transparent", name: "Фон" },
      1: { color: "#A4C3B2", name: "Контур" },
      2: { color: "#EAF4F4", name: "Белый" },
    },
  },
  boat: {
    name: "Кораблик",
    grid: [
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0],
      [0, 1, 2, 1, 0, 0, 0],
      [1, 2, 2, 2, 1, 0, 0],
      [1, 1, 1, 1, 1, 0, 0],
    ],
    palette: {
      0: { color: "transparent", name: "Фон" },
      1: { color: "#6B9080", name: "Корпус" },
      2: { color: "#A4C3B2", name: "Парус" },
    },
  },
}

type TemplateKey = keyof typeof templates

export default function PixelArtTherapy({ onBack }: PixelArtTherapyProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("lighthouse")
  const [started, setStarted] = useState(false)
  const [coloredPixels, setColoredPixels] = useState<Set<string>>(new Set())

  const template = templates[selectedTemplate]
  const totalPixels = template.grid.flat().filter((v) => v !== 0).length
  const progress = Math.round((coloredPixels.size / totalPixels) * 100)

  const handlePixelClick = (row: number, col: number, value: number) => {
    if (value === 0) return
    const key = `${row}-${col}`
    setColoredPixels((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handleStart = () => {
    setStarted(true)
    setColoredPixels(new Set())
  }

  const handleReset = () => {
    setColoredPixels(new Set())
  }

  const isComplete = coloredPixels.size === totalPixels

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Пиксельная Арт-Терапия</h1>
            <p className="text-xs text-muted-foreground">Раскраска по номерам</p>
          </div>
          {started && (
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">{progress}%</p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {!started ? (
          <>
            {/* Template Selection */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
              <h2 className="text-lg font-semibold mb-2 text-foreground">Выбери рисунок</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Нажимай на клетки, чтобы раскрасить их. Это поможет переключить внимание и успокоиться.
              </p>
            </Card>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {Object.entries(templates).map(([key, tmpl]) => (
                <Card
                  key={key}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedTemplate === key ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                  }`}
                  onClick={() => setSelectedTemplate(key as TemplateKey)}
                >
                  <p className="text-sm font-medium text-center text-foreground">{tmpl.name}</p>
                </Card>
              ))}
            </div>

            <Button onClick={handleStart} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6">
              Начать раскрашивать
            </Button>
          </>
        ) : (
          <>
            {/* Pixel Grid */}
            <Card className="p-6 mb-6 bg-card border-border">
              <div className="flex justify-center mb-4">
                <div className="inline-block">
                  {template.grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                      {row.map((value, colIndex) => {
                        const key = `${rowIndex}-${colIndex}`
                        const isColored = coloredPixels.has(key)
                        const color = template.palette[value as keyof typeof template.palette]

                        return (
                          <button
                            key={colIndex}
                            onClick={() => handlePixelClick(rowIndex, colIndex, value)}
                            className="w-10 h-10 sm:w-12 sm:h-12 border border-border transition-all hover:scale-105"
                            style={{
                              backgroundColor: isColored ? color.color : value === 0 ? "transparent" : "#f0f0f0",
                            }}
                          >
                            {!isColored && value !== 0 && (
                              <span className="text-xs text-muted-foreground">{value}</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Legend */}
              <div className="flex justify-center gap-4 pt-4 border-t border-border">
                {Object.entries(template.palette)
                  .filter(([key]) => key !== "0")
                  .map(([key, { color, name }]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded border border-border" style={{ backgroundColor: color }} />
                      <span className="text-xs text-muted-foreground">
                        {key}. {name}
                      </span>
                    </div>
                  ))}
              </div>
            </Card>

            {isComplete && (
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">Готово!</h3>
                <p className="text-sm text-muted-foreground">Отличная работа. Ты завершил рисунок!</p>
              </Card>
            )}

            <div className="flex gap-3">
              <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                Очистить
              </Button>
              <Button onClick={() => setStarted(false)} variant="outline" className="flex-1">
                Выбрать другой
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
