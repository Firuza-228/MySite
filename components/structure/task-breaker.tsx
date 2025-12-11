"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Sparkles, CheckCircle2, Circle } from "lucide-react"

interface TaskBreakerProps {
  onBack: () => void
}

interface SubTask {
  id: string
  text: string
  completed: boolean
}

export default function TaskBreaker({ onBack }: TaskBreakerProps) {
  const [bigTask, setBigTask] = useState("")
  const [subTasks, setSubTasks] = useState<SubTask[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const breakdownTask = (task: string): string[] => {
    // Simple task breakdown logic (in production, this could use AI)
    const taskLower = task.toLowerCase()

    if (taskLower.includes("экзамен") || taskLower.includes("подготовка")) {
      return [
        "Собрать все материалы и конспекты по теме",
        "Составить список основных тем для изучения",
        "Изучить первую тему из списка (20-30 минут)",
        "Сделать краткий конспект изученного",
        "Решить 2-3 практических задания по теме",
        "Повторить ключевые моменты перед сном",
      ]
    }

    if (taskLower.includes("реферат") || taskLower.includes("эссе") || taskLower.includes("курсовая")) {
      return [
        "Прочитать требования к работе",
        "Выбрать конкретную тему и утвердить её",
        "Найти 3-5 источников литературы",
        "Составить план работы (введение, главы, заключение)",
        "Написать введение (1-2 абзаца)",
        "Написать первую главу по плану",
        "Оформить список литературы",
        "Проверить работу на ошибки",
      ]
    }

    if (taskLower.includes("проект") || taskLower.includes("презентация")) {
      return [
        "Определить цель и тему проекта",
        "Собрать необходимую информацию",
        "Создать структуру презентации (слайды)",
        "Заполнить титульный слайд",
        "Добавить содержание на первые 3 слайда",
        "Найти подходящие изображения или графики",
        "Прорепетировать выступление 1 раз",
      ]
    }

    // Default breakdown
    return [
      "Записать точную формулировку задачи",
      "Определить, что нужно для выполнения",
      "Выделить 15 минут на изучение задачи",
      "Сделать первый маленький шаг",
      "Продолжить работу короткими сессиями",
      "Отметить прогресс после каждого шага",
    ]
  }

  const handleGenerate = () => {
    if (!bigTask.trim()) return

    setIsGenerating(true)

    // Simulate AI generation delay
    setTimeout(() => {
      const breakdown = breakdownTask(bigTask)
      setSubTasks(
        breakdown.map((text, idx) => ({
          id: `task-${idx}`,
          text,
          completed: false,
        })),
      )
      setIsGenerating(false)
    }, 1000)
  }

  const toggleSubTask = (id: string) => {
    setSubTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleReset = () => {
    setBigTask("")
    setSubTasks([])
  }

  const completedCount = subTasks.filter((t) => t.completed).length
  const progress = subTasks.length > 0 ? Math.round((completedCount / subTasks.length) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Дробилка Задач</h1>
            <p className="text-xs text-muted-foreground">От большого к маленькому</p>
          </div>
          {subTasks.length > 0 && (
            <div className="text-right">
              <p className="text-sm font-semibold text-primary">{progress}%</p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {subTasks.length === 0 ? (
          <>
            {/* Input Section */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <h2 className="font-semibold text-lg mb-2 text-foreground">Опиши большую задачу</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Например: "Подготовиться к экзамену по истории" или "Написать курсовую работу"
              </p>
              <Textarea
                value={bigTask}
                onChange={(e) => setBigTask(e.target.value)}
                placeholder="Моя большая задача..."
                className="min-h-32 mb-4 resize-none"
              />
              <Button
                onClick={handleGenerate}
                disabled={!bigTask.trim() || isGenerating}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {isGenerating ? "Разбиваю на шаги..." : "Разбить на маленькие шаги"}
              </Button>
            </Card>

            {/* Info Card */}
            <Card className="p-6 bg-muted/30 border-border">
              <h3 className="font-semibold mb-3 text-foreground text-sm">Почему это помогает:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Большие задачи вызывают паралич — мозг не знает, с чего начать
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="leading-relaxed">Маленькие шаги конкретны и выполнимы прямо сейчас</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="leading-relaxed">Каждый отмеченный шаг даёт чувство прогресса и мотивации</span>
                </li>
              </ul>
            </Card>
          </>
        ) : (
          <>
            {/* Original Task Card */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Большая задача:</h3>
              <p className="text-lg font-semibold text-foreground text-balance">{bigTask}</p>
            </Card>

            {/* Progress */}
            <Card className="p-4 mb-6 bg-card border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Прогресс</span>
                <span className="text-sm font-bold text-primary">
                  {completedCount} / {subTasks.length}
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </Card>

            {/* Sub Tasks List */}
            <div className="space-y-3 mb-6">
              {subTasks.map((task, index) => (
                <Card
                  key={task.id}
                  className={`p-4 cursor-pointer transition-all ${
                    task.completed ? "bg-primary/5 border-primary/30" : "bg-card border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleSubTask(task.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-muted-foreground mt-0.5">#{index + 1}</span>
                        <p
                          className={`text-sm leading-relaxed ${
                            task.completed ? "text-muted-foreground line-through" : "text-foreground"
                          }`}
                        >
                          {task.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Actions */}
            {completedCount === subTasks.length && (
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">Все шаги завершены!</h3>
                <p className="text-sm text-muted-foreground">Отличная работа. Ты справился с большой задачей!</p>
              </Card>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
              Разбить новую задачу
            </Button>
          </>
        )}
      </main>
    </div>
  )
}
