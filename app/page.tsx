"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Waves, Brain, Timer, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"
import BottomNav from "@/components/bottom-nav"

export default function HomePage() {
  const [stressLevel, setStressLevel] = useState<number | null>(null)

  const stressEmojis = ["😊", "🙂", "😐", "😟", "😰"]
  const stressLabels = ["Спокоен", "Немного напряжен", "Тревожен", "Очень напряжен", "Паника"]

  const motivationalQuotes = [
    "Прогресс, а не совершенство. Каждый маленький шаг имеет значение.",
    "Ты делаешь больше, чем тебе кажется. Продолжай двигаться вперед.",
    "Отдых — это не лень. Это забота о себе.",
    "Твои усилия уже приносят результат, даже если его еще не видно.",
    "Ошибки — это часть обучения, а не повод для стыда.",
  ]

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Тихая Гавань</h1>
          </div>
          <p className="text-sm text-muted-foreground hidden sm:block">Твое убежище от стресса</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Stress Meter Card */}
        <Card className="p-6 mb-6 bg-card border-border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Как ты себя чувствуешь сейчас?</h2>

          <div className="flex gap-3 mb-4 justify-center flex-wrap">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => setStressLevel(level)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  stressLevel === level
                    ? "bg-primary text-primary-foreground scale-105 shadow-md"
                    : "bg-muted/50 hover:bg-muted text-foreground"
                }`}
              >
                <span className="text-3xl">{stressEmojis[level - 1]}</span>
                <span className="text-xs font-medium text-center leading-tight w-20">{stressLabels[level - 1]}</span>
              </button>
            ))}
          </div>

          {stressLevel && stressLevel >= 3 && (
            <div className="mt-4 p-4 bg-accent/20 rounded-lg border border-accent/30">
              <p className="text-sm text-foreground mb-3">Давай снизим напряжение вместе</p>
              <Link href="/reset">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Начать упражнение для снятия тревоги
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Motivational Quote */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
            <p className="text-base leading-relaxed text-foreground font-medium text-balance">{randomQuote}</p>
          </div>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link href="/reset">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Waves className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Сброс</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Мгновенная помощь: дыхание, заземление, арт-терапия
              </p>
            </Card>
          </Link>

          <Link href="/structure">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Timer className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-foreground">Структура</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Помодоро, дробление задач, система малых побед
              </p>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">Ресурсы</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">Дневник мыслей (КПТ) и база знаний</p>
            </Card>
          </Link>

          <Card className="p-6 border-border bg-muted/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Прогресс дня</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">Отслеживай выполненные задачи</p>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="p-6 bg-card border-border">
          <h3 className="font-semibold mb-3 text-foreground">О приложении</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Тихая Гавань создана специально для студентов, которые сталкиваются с учебной тревожностью, стрессом перед
            экзаменами и прокрастинацией. Здесь ты найдешь научно обоснованные техники для управления стрессом и
            организации учебы.
          </p>
          <div className="flex gap-2 text-xs text-muted-foreground flex-wrap">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">КПТ</span>
            <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full">Осознанность</span>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">Без социальных сетей</span>
          </div>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
