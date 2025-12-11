"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react"

interface KnowledgeBaseProps {
  onBack: () => void
}

interface Article {
  id: string
  title: string
  category: string
  readTime: string
  summary: string
  content: string[]
}

const articles: Article[] = [
  {
    id: "anxiety-mechanism",
    title: "Как работает тревога",
    category: "Механизмы",
    readTime: "5 минут",
    summary: "Понимание биологических и психологических основ тревожности",
    content: [
      "Тревога — это естественная реакция организма на потенциальную угрозу. Она активирует симпатическую нервную систему, что приводит к выбросу адреналина и кортизола.",
      "Проблема возникает, когда мозг начинает воспринимать безопасные ситуации (экзамен, презентация) как угрозу жизни. Это называется 'ложной тревогой'.",
      "У студентов тревога часто связана с перфекционизмом и катастрофизацией: 'Если я не сдам этот экзамен, моя жизнь будет разрушена'.",
      "Важно понимать: тревога не опасна сама по себе. Она неприятна, но не может причинить физический вред. Симптомы (учащенное сердцебиение, потливость) — это просто активация защитной системы.",
      "Техники когнитивно-поведенческой терапии (КПТ) помогают 'переобучить' мозг правильно оценивать уровень угрозы.",
    ],
  },
  {
    id: "perfectionism",
    title: "Ловушка перфекционизма",
    category: "Паттерны мышления",
    readTime: "6 минут",
    summary: "Почему стремление к совершенству мешает учиться",
    content: [
      "Перфекционизм — это не стремление делать что-то хорошо. Это страх совершить ошибку и быть осужденным за неё.",
      "Перфекционисты устанавливают нереалистично высокие стандарты, а затем жестоко критикуют себя за невозможность их достичь. Это приводит к прокрастинации: 'Если я не могу сделать идеально, лучше не начинать вообще'.",
      "Исследования показывают, что перфекционизм связан с повышенным уровнем тревоги, депрессии и выгорания у студентов.",
      "Альтернатива перфекционизму — ориентация на процесс, а не на результат. Вопрос не 'Насколько хорошо я это сделал?', а 'Чему я научился?'",
      "Практика: Попробуй осознанно делать вещи 'достаточно хорошо', а не идеально. Отправь черновик работы. Подними руку на паре, даже если не уверен в ответе.",
      "Ошибки — это не признак слабости, а необходимая часть обучения. Мозг учится эффективнее, когда сталкивается с трудностями.",
    ],
  },
  {
    id: "procrastination",
    title: "Прокрастинация: что это на самом деле",
    category: "Продуктивность",
    readTime: "5 минут",
    summary: "Откладывание дел — не лень, а способ избежать негативных эмоций",
    content: [
      "Прокрастинация — это не лень и не плохое управление временем. Это эмоциональная регуляция.",
      "Когда задача вызывает дискомфорт (страх провала, неуверенность, скуку), мозг ищет способ снизить это негативное чувство здесь и сейчас. Проще всего — переключиться на что-то приятное.",
      "Исследование 2013 года показало: прокрастинаторы не плохо планируют время — они избегают негативных эмоций, связанных с задачей.",
      "Решение: не бороться с прокрастинацией силой воли, а работать с эмоциями. Что именно тебя пугает в этой задаче? Страх оценки? Не знаешь, с чего начать?",
      "Техника 'маленького шага': вместо 'написать реферат' (пугающе) попробуй 'открыть документ и написать одно предложение' (выполнимо).",
      "Чем меньше шаг, тем меньше сопротивление. После начала часто оказывается, что продолжать не так страшно.",
    ],
  },
  {
    id: "growth-mindset",
    title: "Образ мышления роста",
    category: "Мотивация",
    readTime: "6 минут",
    summary: "Как твои убеждения о способностях влияют на успех",
    content: [
      "Психолог Кэрол Дуэк выделила два типа мышления: фиксированное и роста.",
      "Фиксированное мышление: 'Я либо умный, либо нет. Способности даны от рождения'. Люди с таким мышлением избегают вызовов, боясь выглядеть глупо.",
      "Мышление роста: 'Способности можно развить через усилия и обучение'. Эти люди видят ошибки как возможность учиться.",
      "Исследования показывают: студенты с мышлением роста показывают лучшие результаты, особенно в сложных ситуациях.",
      "Как развить мышление роста: замечай свой внутренний диалог. Вместо 'Я не могу это понять' говори 'Я пока не понимаю это'. Маленькое слово 'пока' меняет всё.",
      "Хвали себя не за результат ('Я получил пятерку — значит я умный'), а за процесс ('Я хорошо поработал, подготовился систематически').",
    ],
  },
  {
    id: "exam-anxiety",
    title: "Экзаменационная тревога",
    category: "Механизмы",
    readTime: "5 минут",
    summary: "Почему знания 'улетучиваются' на экзамене и что с этим делать",
    content: [
      "Ты выучил материал, но на экзамене всё забыл? Это не случайность — это работа стресса.",
      "Высокий уровень кортизола (гормона стресса) временно нарушает доступ к информации в гиппокампе — области мозга, отвечающей за извлечение воспоминаний.",
      "Парадокс: чем больше ты паникуешь 'Я всё забыл!', тем сильнее стресс и хуже доступ к памяти.",
      "Что помогает: техники снижения стресса перед экзаменом (дыхательные упражнения, заземление 5-4-3-2-1) буквально восстанавливают доступ к информации.",
      "Также эффективна стратегия 'извлечения': во время подготовки не просто перечитывай материал, а активно проверяй себя. Это создает более устойчивые нейронные связи.",
      "Помни: лёгкое волнение перед экзаменом — это нормально и даже полезно. Оно повышает концентрацию. Проблема — в избыточной тревоге.",
    ],
  },
]

export default function KnowledgeBase({ onBack }: KnowledgeBaseProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSelectedArticle(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-muted-foreground">{selectedArticle.readTime}</span>
              </div>
              <h1 className="text-xl font-semibold text-foreground">{selectedArticle.title}</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
          <article className="prose prose-sm max-w-none">
            {selectedArticle.content.map((paragraph, idx) => (
              <Card key={idx} className="p-6 mb-4 bg-card border-border">
                <p className="text-sm text-foreground leading-relaxed">{paragraph}</p>
              </Card>
            ))}
          </article>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="font-semibold mb-2 text-foreground">Применяй знания на практике</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Понимание механизмов — это первый шаг. Используй инструменты из разделов 'Сброс' и 'Структура', чтобы
              применить эти знания в жизни.
            </p>
          </Card>
        </main>
      </div>
    )
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
            <h1 className="text-xl font-semibold text-foreground">База Знаний</h1>
            <p className="text-xs text-muted-foreground">Научные статьи о стрессе и обучении</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        {/* Intro */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <h2 className="font-semibold text-lg mb-2 text-foreground">Знание — это сила</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Когда ты понимаешь, почему возникает тревога или прокрастинация, они перестают быть чем-то непонятным и
            пугающим. Ты можешь работать с ними осознанно.
          </p>
        </Card>

        {/* Articles List */}
        <div className="space-y-3">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="p-5 hover:shadow-md transition-all cursor-pointer border-border bg-card group"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{article.summary}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>

        {/* Info */}
        <Card className="p-6 mt-6 bg-muted/30 border-border">
          <h3 className="font-semibold mb-3 text-foreground text-sm">Научная основа</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Все материалы основаны на принципах когнитивно-поведенческой терапии (КПТ), теории мотивации и нейронауке.
            Это не просто советы — это проверенные методы.
          </p>
        </Card>
      </main>
    </div>
  )
}
