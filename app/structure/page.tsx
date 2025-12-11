"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Timer, ListTodo, Trophy } from "lucide-react"
import Link from "next/link"
import PomodoroTimer from "@/components/structure/pomodoro-timer"
import TaskBreaker from "@/components/structure/task-breaker"
import SmallWins from "@/components/structure/small-wins"
import BottomNav from "@/components/bottom-nav"

type StructureTool = "menu" | "pomodoro" | "task-breaker" | "small-wins"

export default function StructurePage() {
  const [activeTool, setActiveTool] = useState<StructureTool>("menu")

  if (activeTool === "pomodoro") {
    return <PomodoroTimer onBack={() => setActiveTool("menu")} />
  }

  if (activeTool === "task-breaker") {
    return <TaskBreaker onBack={() => setActiveTool("menu")} />
  }

  if (activeTool === "small-wins") {
    return <SmallWins onBack={() => setActiveTool("menu")} />
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
            <h1 className="text-xl font-semibold text-foreground">Структура</h1>
            <p className="text-xs text-muted-foreground">Организация и продуктивность</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20">
          <h2 className="font-semibold text-lg mb-2 text-foreground">Победи прокрастинацию</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Большие задачи кажутся невыполнимыми. Разбей их на шаги, работай фокусированно и отмечай прогресс.
          </p>
        </Card>

        {/* Structure Tools Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("pomodoro")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                <Timer className="w-7 h-7 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Таймер Помодоро</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  25 минут фокусной работы + 5 минут отдыха. Работает в фоновом режиме с уведомлениями.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full">Настраивается</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Для фокуса</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("task-breaker")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <ListTodo className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Дробилка Задач</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Опиши большую задачу, и инструмент автоматически разобьет её на конкретные маленькие шаги.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">AI-помощник</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Против паралича</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("small-wins")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <Trophy className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Система Малых Побед</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Отслеживай выполненные задачи и наблюдай прогресс. Каждый шаг важен.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">Визуализация</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Мотивация</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="p-6 mt-6 bg-muted/30 border-border">
          <h3 className="font-semibold mb-3 text-foreground text-sm">Как побороть прокрастинацию:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">•</span>
              <span className="leading-relaxed">
                Начни с самого маленького шага (открыть книгу, а не "подготовиться к экзамену")
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">•</span>
              <span className="leading-relaxed">Работай короткими сессиями с перерывами</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">•</span>
              <span className="leading-relaxed">Отмечай каждое выполненное действие, даже если оно кажется мелким</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary mt-0.5">•</span>
              <span className="leading-relaxed">Прогресс важнее совершенства</span>
            </li>
          </ul>
        </Card>
      </main>

      {/* BottomNav Component */}
      <BottomNav />
    </div>
  )
}
