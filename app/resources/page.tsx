"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookText, Library, Brain } from "lucide-react"
import Link from "next/link"
import ThoughtDiary from "@/components/resources/thought-diary"
import KnowledgeBase from "@/components/resources/knowledge-base"
import BottomNav from "@/components/bottom-nav"

type ResourceTool = "menu" | "thought-diary" | "knowledge-base"

export default function ResourcesPage() {
  const [activeTool, setActiveTool] = useState<ResourceTool>("menu")

  if (activeTool === "thought-diary") {
    return <ThoughtDiary onBack={() => setActiveTool("menu")} />
  }

  if (activeTool === "knowledge-base") {
    return <KnowledgeBase onBack={() => setActiveTool("menu")} />
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
            <h1 className="text-xl font-semibold text-foreground">Ресурсы</h1>
            <p className="text-xs text-muted-foreground">КПТ и база знаний</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Intro Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
          <h2 className="font-semibold text-lg mb-2 text-foreground">Понимание и работа с тревогой</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Научные инструменты для анализа своих мыслей и знания о механизмах стресса помогают лучше управлять
            эмоциями.
          </p>
        </Card>

        {/* Resource Tools Grid */}
        <div className="grid grid-cols-1 gap-4">
          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("thought-diary")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <BookText className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">Дневник Мыслей (КПТ)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Инструмент когнитивно-поведенческой терапии для анализа автоматических мыслей и поиска более
                  рациональных альтернатив.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-accent/10 text-accent rounded-full">КПТ-техника</span>
                  <span className="px-2 py-1 bg-muted rounded-full">Для рефлексии</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="p-6 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
            onClick={() => setActiveTool("knowledge-base")}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Library className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 text-foreground">База Знаний</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Краткие научно обоснованные статьи о механизмах тревоги, перфекционизме и прокрастинации.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">Образование</span>
                  <span className="px-2 py-1 bg-muted rounded-full">5-7 минут чтения</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="p-6 mt-6 bg-muted/30 border-border">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2 text-foreground text-sm">Почему это важно</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Когнитивно-поведенческая терапия (КПТ) — один из самых эффективных методов работы с тревогой и
                депрессией, доказанный множеством исследований.
              </p>
            </div>
          </div>
          <div className="pl-8">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="leading-relaxed">Понимание механизмов тревоги снижает её интенсивность</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="leading-relaxed">Анализ мыслей помогает находить более реалистичные взгляды</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-0.5">•</span>
                <span className="leading-relaxed">Регулярная практика улучшает эмоциональную регуляцию</span>
              </li>
            </ul>
          </div>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
