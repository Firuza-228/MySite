"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, ChevronDown, ChevronUp, Trash2 } from "lucide-react"

interface ThoughtDiaryProps {
  onBack: () => void
}

interface ThoughtEntry {
  id: string
  date: string
  situation: string
  emotion: string
  automaticThought: string
  evidenceFor: string
  evidenceAgainst: string
  rationalResponse: string
}

const emotionOptions = [
  "Тревога",
  "Страх",
  "Паника",
  "Грусть",
  "Стыд",
  "Вина",
  "Злость",
  "Разочарование",
  "Беспомощность",
]

export default function ThoughtDiary({ onBack }: ThoughtDiaryProps) {
  const [entries, setEntries] = useState<ThoughtEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [currentEntry, setCurrentEntry] = useState<Partial<ThoughtEntry>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("quiet-harbor-thoughts")
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("quiet-harbor-thoughts", JSON.stringify(entries))
    }
  }, [entries])

  const handleSaveEntry = () => {
    if (
      !currentEntry.situation ||
      !currentEntry.emotion ||
      !currentEntry.automaticThought ||
      !currentEntry.evidenceFor ||
      !currentEntry.evidenceAgainst ||
      !currentEntry.rationalResponse
    ) {
      alert("Пожалуйста, заполни все поля")
      return
    }

    const entry: ThoughtEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("ru-RU"),
      situation: currentEntry.situation,
      emotion: currentEntry.emotion,
      automaticThought: currentEntry.automaticThought,
      evidenceFor: currentEntry.evidenceFor,
      evidenceAgainst: currentEntry.evidenceAgainst,
      rationalResponse: currentEntry.rationalResponse,
    }

    setEntries([entry, ...entries])
    setCurrentEntry({})
    setShowForm(false)
  }

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground">Дневник Мыслей</h1>
            <p className="text-xs text-muted-foreground">КПТ-техника анализа мыслей</p>
          </div>
          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Plus className="w-4 h-4 mr-1" />
              Новая запись
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {showForm ? (
          <Card className="p-6 mb-6 bg-card border-border">
            <h2 className="font-semibold text-lg mb-4 text-foreground">Новая запись</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">1. Ситуация</label>
                <p className="text-xs text-muted-foreground mb-2">Что произошло? Где? Когда? С кем?</p>
                <Textarea
                  value={currentEntry.situation || ""}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, situation: e.target.value })}
                  placeholder="Например: Получил низкую оценку за контрольную работу по математике сегодня утром"
                  className="resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">2. Эмоция</label>
                <p className="text-xs text-muted-foreground mb-2">Что ты почувствовал?</p>
                <div className="flex flex-wrap gap-2">
                  {emotionOptions.map((emotion) => (
                    <button
                      key={emotion}
                      onClick={() => setCurrentEntry({ ...currentEntry, emotion })}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        currentEntry.emotion === emotion
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">3. Автоматическая мысль</label>
                <p className="text-xs text-muted-foreground mb-2">Что пришло в голову в этот момент?</p>
                <Textarea
                  value={currentEntry.automaticThought || ""}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, automaticThought: e.target.value })}
                  placeholder="Например: Я глупый, я никогда не сдам экзамен"
                  className="resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  4. Доказательства "за" эту мысль
                </label>
                <p className="text-xs text-muted-foreground mb-2">Что подтверждает эту мысль?</p>
                <Textarea
                  value={currentEntry.evidenceFor || ""}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, evidenceFor: e.target.value })}
                  placeholder="Например: Я получил низкую оценку. Мне трудно дается эта тема."
                  className="resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  5. Доказательства "против" этой мысли
                </label>
                <p className="text-xs text-muted-foreground mb-2">Что опровергает эту мысль?</p>
                <Textarea
                  value={currentEntry.evidenceAgainst || ""}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, evidenceAgainst: e.target.value })}
                  placeholder="Например: Я хорошо справился с другими предметами. Одна оценка не определяет меня. Я могу попросить помощи."
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">6. Рациональный ответ</label>
                <p className="text-xs text-muted-foreground mb-2">
                  Более сбалансированный взгляд на ситуацию, учитывая все доказательства
                </p>
                <Textarea
                  value={currentEntry.rationalResponse || ""}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, rationalResponse: e.target.value })}
                  placeholder="Например: Эта контрольная была сложной, но это не значит, что я глупый. Я могу подготовиться лучше к следующей."
                  className="resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveEntry}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Сохранить запись
                </Button>
                <Button
                  onClick={() => {
                    setShowForm(false)
                    setCurrentEntry({})
                  }}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {entries.length === 0 ? (
              <Card className="p-8 text-center bg-muted/30 border-border">
                <h3 className="font-semibold mb-2 text-foreground">Начни анализировать свои мысли</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto mb-4">
                  Дневник мыслей помогает увидеть связь между ситуациями, мыслями и эмоциями. Это первый шаг к их
                  изменению.
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Создать первую запись
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {entries.map((entry) => (
                  <Card key={entry.id} className="bg-card border-border overflow-hidden">
                    <div
                      className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                              {entry.emotion}
                            </span>
                            <span className="text-xs text-muted-foreground">{entry.date}</span>
                          </div>
                          <p className="text-sm text-foreground line-clamp-2">{entry.situation}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {expandedId === entry.id ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>

                    {expandedId === entry.id && (
                      <div className="p-4 pt-0 space-y-4 border-t border-border">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Автоматическая мысль:</p>
                          <p className="text-sm text-foreground leading-relaxed">{entry.automaticThought}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Доказательства "за":</p>
                          <p className="text-sm text-foreground leading-relaxed">{entry.evidenceFor}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Доказательства "против":</p>
                          <p className="text-sm text-foreground leading-relaxed">{entry.evidenceAgainst}</p>
                        </div>
                        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                          <p className="text-xs font-medium text-primary mb-1">Рациональный ответ:</p>
                          <p className="text-sm text-foreground leading-relaxed">{entry.rationalResponse}</p>
                        </div>
                        <Button
                          onClick={() => handleDeleteEntry(entry.id)}
                          variant="ghost"
                          size="sm"
                          className="w-full text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Удалить запись
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {!showForm && entries.length > 0 && (
          <Card className="p-6 mt-6 bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20">
            <h3 className="font-semibold mb-2 text-foreground">Совет</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Попробуй заполнять дневник регулярно, особенно когда испытываешь сильные эмоции. Со временем ты научишься
              замечать паттерны в своих мыслях и менять их.
            </p>
          </Card>
        )}
      </main>
    </div>
  )
}
