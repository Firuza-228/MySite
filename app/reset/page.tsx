"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Wind, Anchor, Palette } from "lucide-react"
import Link from "next/link"
import AntiPanic from "@/components/reset/anti-panic"
import BreathingExercise from "@/components/reset/breathing-exercise"
import PixelArtTherapy from "@/components/reset/pixel-art-therapy"
import BottomNav from "@/components/bottom-nav"

type ResetTool = "menu" | "anti-panic" | "breathing" | "pixel-art"

export default function ResetPage() {
  const [activeTool, setActiveTool] = useState<ResetTool>("menu")

  if (activeTool === "anti-panic") {
    return <AntiPanic onBack={() => setActiveTool("menu")} />
  }

  if (activeTool === "breathing") {
    return <BreathingExercise onBack={() => setActiveTool("menu")} />
  }

  if (activeTool === "pixel-art") {
    return <PixelArtTherapy onBack={() => setActiveTool("menu")} />
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Сброс</h1>
            <p className="text-xs text-muted-foreground">Мгновенная помощь при тревоге</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="font-semibold text-lg mb-2 text-foreground">Сейчас ты в безопасности</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Выбери упражнение, которое поможет тебе прямо сейчас. Все техники основаны на научных исследованиях и
            проверены практикой.
          </p>
        </Card>

        {/* Reset Tools Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("anti-panic")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Anchor className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Анти-Паника 5-4-3-2-1</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Техника заземления для быстрого снижения острой тревоги. Помогает вернуться в настоящий момент.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">3-5 минут</span>
                  <span className="px-2 py-1 bg-muted rounded-full">При панике</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("breathing")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <Wind className="w-7 h-7 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Дыхательный Тренажер</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Управляемое дыхание с визуальной поддержкой. Замедляет сердцебиение и успокаивает нервную систему.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">2-10 минут</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Универсально</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("pixel-art")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Palette className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Пиксельная Арт-Терапия</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Успокаивающая раскраска по номерам. Помогает переключить внимание и снизить напряжение.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">5-10 минут</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Для отвлечения</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="p-6 mt-6 bg-muted/30 border-border">
          <h3 className="font-semibold mb-3 text-foreground text-sm">Когда использовать эти техники:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">Перед экзаменом или важной презентацией</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">Когда чувствуешь, что не можешь сосредоточиться</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">При первых признаках паники или сильной тревоги</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">В любой момент, когда нужна пауза и восстановление</span>
            </li>
          </ul>
        </Card>
      </main>

      {/* BottomNav Component */}
      <BottomNav />
    </div>
  )
}
