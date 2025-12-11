"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

interface AntiPanicProps {
  onBack: () => void
}

const steps = [
  {
    number: 5,
    sense: "зрения",
    question: "Назови 5 вещей, которые ты видишь вокруг себя",
    examples: ["стол", "окно", "телефон", "лампа", "книга"],
  },
  {
    number: 4,
    sense: "осязания",
    question: "Назови 4 вещи, которые ты можешь потрогать",
    examples: ["одежда на теле", "поверхность стола", "волосы", "пол под ногами"],
  },
  {
    number: 3,
    sense: "слуха",
    question: "Назови 3 звука, которые ты слышишь",
    examples: ["свое дыхание", "шум за окном", "гудение техники"],
  },
  {
    number: 2,
    sense: "обоняния",
    question: "Назови 2 запаха, которые ты чувствуешь",
    examples: ["запах воздуха", "аромат кофе или чая"],
  },
  {
    number: 1,
    sense: "вкуса",
    question: "Назови 1 вкус, который ты ощущаешь сейчас",
    examples: ["вкус во рту", "можешь выпить воды"],
  },
]

export default function AntiPanic({ onBack }: AntiPanicProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setCompleted(false)
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
            <h1 className="text-xl font-semibold text-foreground">Анти-Паника 5-4-3-2-1</h1>
            <p className="text-xs text-muted-foreground">Техника заземления</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {!completed ? (
          <>
            {/* Progress Indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? "w-8 bg-primary"
                      : index < currentStep
                        ? "w-2 bg-primary/50"
                        : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Current Step Card */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-3xl font-bold mb-4">
                  {steps[currentStep].number}
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-foreground">{steps[currentStep].question}</h2>
                <p className="text-muted-foreground">Чувство {steps[currentStep].sense}</p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground text-center mb-4">Например:</p>
                {steps[currentStep].examples.map((example, idx) => (
                  <div key={idx} className="p-3 bg-card rounded-lg text-center text-sm text-foreground">
                    {example}
                  </div>
                ))}
              </div>
            </Card>

            {/* Instruction Card */}
            <Card className="p-4 mb-6 bg-muted/30 border-border">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Не торопись. Внимательно посмотри вокруг и назови (вслух или про себя) то, что замечаешь.
              </p>
            </Card>

            <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">
              {currentStep < steps.length - 1 ? "Далее" : "Завершить упражнение"}
            </Button>
          </>
        ) : (
          <>
            {/* Completion Card */}
            <Card className="p-8 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-foreground">Отличная работа!</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ты прошел все шаги упражнения 5-4-3-2-1. Надеемся, тебе стало легче.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Это упражнение помогает вернуть фокус в настоящий момент и снизить влияние тревожных мыслей.
              </p>
            </Card>

            <div className="space-y-3">
              <Button
                onClick={handleRestart}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                Повторить упражнение
              </Button>
              <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
                Вернуться к выбору
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
