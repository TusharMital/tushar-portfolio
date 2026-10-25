import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUp, RotateCcw, Terminal, X } from 'lucide-react'
import { Reveal, SectionLabel } from './Reveal'
import './Chatbot.css'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isError?: boolean
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-msg',
  role: 'assistant',
  content:
    "Hello! I am Tushar's portfolio assistant. I can answer questions about his Computer Science coursework at JECRC University, his five projects, his systems and networking learning topics, or his prompt engineering workflow. How can I help you?",
}

const SUGGESTIONS = [
  "Tell me about Tushar's projects.",
  'What systems topics is he learning?',
  'Explain the Cursor AI debugging example.',
  'What is his quantum computing coursework?',
]

function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/[^\s)]+[^\s).,;:!?])/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noreferrer"
        className="chat__link"
      >
        {part.replace(/^https?:\/\/(www\.)?/, '')}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

type ChatbotProps = {
  isOpenFloating?: boolean
  onToggleFloating?: (open: boolean) => void
}

function Chatbot({ isOpenFloating, onToggleFloating }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)
  const [floatingOpen, setFloatingOpen] = useState(false)

  // Sync external floating control if passed
  const isDrawerOpen = isOpenFloating !== undefined ? isOpenFloating : floatingOpen
  const setDrawerOpen = onToggleFloating || setFloatingOpen

  const messageCounter = useRef(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const drawerEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const drawerInputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    drawerEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isDrawerOpen) {
      setTimeout(() => drawerInputRef.current?.focus(), 80)
    }
  }, [isDrawerOpen])

  useEffect(() => {
    if (!isDrawerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen, setDrawerOpen])

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim()
    if (!trimmed || isLoading) return

    messageCounter.current += 1
    const userMessage: ChatMessage = {
      id: `user-msg-${messageCounter.current}`,
      role: 'user',
      content: trimmed,
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setLastFailedMessage(null)

    // Build history for backend API (filter out any error messages)
    const historyPayload = updatedMessages
      .filter((m) => !m.isError)
      .map((m) => ({
        role: m.role,
        content: m.content,
      }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyPayload }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        let errText =
          data?.error ||
          `Service returned status ${response.status}. Please try again.`
        if (data?.code === 'API_KEY_MISSING') {
          errText =
            'The chatbot service is not configured with a Groq API key yet. To enable AI answers, configure GROQ_API_KEY in your Vercel deployment settings or your local .env file.'
        }
        setLastFailedMessage(trimmed)
        messageCounter.current += 1
        setMessages((prev) => [
          ...prev,
          {
            id: `err-msg-${messageCounter.current}`,
            role: 'assistant',
            content: errText,
            isError: true,
          },
        ])
        return
      }

      const botReply = data?.message
      if (!botReply) {
        throw new Error('Received empty response from assistant.')
      }

      messageCounter.current += 1
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-msg-${messageCounter.current}`,
          role: 'assistant',
          content: botReply,
        },
      ])
    } catch (err: any) {
      setLastFailedMessage(trimmed)
      messageCounter.current += 1
      setMessages((prev) => [
        ...prev,
        {
          id: `err-msg-${messageCounter.current}`,
          role: 'assistant',
          content:
            err?.message ||
            'Unable to reach the assistant service. Please check your network connection and try again.',
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleRetry = () => {
    if (lastFailedMessage) {
      sendMessage(lastFailedMessage)
    }
  }

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE])
    setLastFailedMessage(null)
    setInput('')
    inputRef.current?.focus()
  }

  return (
    <>
      {/* In-Page Assistant Section */}
      <section id="assistant" className="chat-section" aria-labelledby="assistant-heading">
        <div className="chat-section__container">
          <Reveal>
            <SectionLabel n="06">AI Assistant</SectionLabel>
          </Reveal>

          <Reveal as="h2" id="assistant-heading" className="display chat-section__title">
            Ask my portfolio<span className="chat-section__title-dot">.</span>
          </Reveal>

          <Reveal delay={100} className="chat-section__intro">
            Have questions about Tushar&apos;s coursework, projects, systems
            studies or debugging methods? Ask the interactive assistant below—powered
            by GroqCloud and strictly grounded in the verified information
            documented across this portfolio.
          </Reveal>

          <div className="chat-card">
            {/* Topbar */}
            <div className="chat-card__topbar">
              <div className="chat-card__status">
                <span className="chat-card__status-dot" aria-hidden="true" />
                <span className="label-mono chat-card__status-text">
                  Grounded Assistant · GroqCloud
                </span>
              </div>
              <button
                type="button"
                className="label-mono chat-card__clear-btn"
                onClick={handleClearChat}
                disabled={messages.length <= 1 && !isLoading}
                aria-label="Clear chat conversation"
              >
                <RotateCcw className="chat-card__clear-icon" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            {/* Suggestions */}
            <div className="chat-card__suggestions" role="group" aria-label="Suggested questions">
              <span className="label-mono chat-card__suggestions-label">
                Suggestions:
              </span>
              <div className="chat-card__suggestions-list">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="chat-card__suggestion-chip"
                    onClick={() => sendMessage(s)}
                    disabled={isLoading}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Stream */}
            <div
              className="chat-card__messages"
              role="log"
              aria-live="polite"
              aria-label="Conversation with Portfolio Assistant"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user'
                return (
                  <div
                    key={msg.id}
                    className={`chat-card__row ${
                      isUser
                        ? 'is-user'
                        : msg.isError
                        ? 'is-error'
                        : 'is-assistant'
                    }`}
                  >
                    <div className="chat-card__bubble-author label-mono">
                      {isUser ? 'You' : 'Assistant'}
                    </div>
                    <div className="chat-card__bubble">
                      <div className="chat-card__bubble-text">
                        {linkify(msg.content)}
                      </div>
                    </div>
                  </div>
                )
              })}

              {isLoading && (
                <div className="chat-card__row is-assistant is-loading">
                  <div className="chat-card__bubble-author label-mono">Assistant</div>
                  <div className="chat-card__bubble">
                    <span className="label-mono chat-card__thinking">
                      <span className="caret">▍</span> thinking…
                    </span>
                  </div>
                </div>
              )}

              {lastFailedMessage && !isLoading && (
                <div className="chat-card__retry-banner">
                  <span>Your last query could not be processed.</span>
                  <button
                    type="button"
                    className="label-mono chat-card__retry-btn"
                    onClick={handleRetry}
                  >
                    <RotateCcw className="chat-card__retry-icon" aria-hidden="true" />
                    <span>Retry query</span>
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form className="chat-card__form" onSubmit={handleSubmit}>
              <label htmlFor="chat-user-input" className="visually-hidden">
                Ask a question about Tushar&apos;s portfolio
              </label>
              <input
                id="chat-user-input"
                ref={inputRef}
                type="text"
                className="chat-card__input"
                placeholder="Ask about Tushar's projects, coursework, or systems learning…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                maxLength={600}
                autoComplete="off"
              />
              <button
                type="submit"
                className="chat-card__send-btn"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <ArrowUp className="chat-card__send-icon" aria-hidden="true" />
              </button>
            </form>

            <p className="label-mono chat-card__disclaimer">
              Note: Responses are generated using GroqCloud and strictly limited
              to verified portfolio facts. The assistant will not invent experience,
              metrics or features.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Action Button (Lovable Reference) */}
      <button
        type="button"
        onClick={() => setDrawerOpen(!isDrawerOpen)}
        aria-label={isDrawerOpen ? 'Close portfolio assistant' : 'Open Ask Tushar’s Portfolio'}
        className="chat-floating-btn"
      >
        {isDrawerOpen ? (
          <X className="chat-floating-btn__icon" aria-hidden="true" />
        ) : (
          <Terminal className="chat-floating-btn__icon" aria-hidden="true" />
        )}
        <span className="label-mono">
          {isDrawerOpen ? 'Close' : 'Ask my portfolio'}
        </span>
      </button>

      {/* Floating Dialog Drawer (Lovable Reference) */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask Tushar’s Portfolio"
          className="chat-drawer fade-in"
        >
          {/* Drawer Header */}
          <div className="chat-drawer__header">
            <div className="chat-drawer__header-left">
              <span className="chat-drawer__avatar">TM</span>
              <div>
                <div className="chat-drawer__title">Ask Tushar’s Portfolio</div>
                <div className="label-mono chat-drawer__subtitle">
                  GroqCloud · grounded in portfolio facts
                </div>
              </div>
            </div>
            <div className="chat-drawer__header-actions">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  aria-label="Start a new conversation"
                  className="chat-drawer__icon-btn"
                  title="Reset conversation"
                >
                  <RotateCcw className="chat-drawer__btn-icon" aria-hidden="true" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close assistant"
                className="chat-drawer__icon-btn"
              >
                <X className="chat-drawer__btn-icon" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Drawer Message Stream */}
          <div ref={drawerEndRef} className="chat-drawer__messages" aria-live="polite">
            {messages.length <= 1 && (
              <div className="chat-drawer__welcome">
                <p className="display chat-drawer__welcome-heading">
                  Hi — ask me anything about Tushar’s work.
                </p>
                <div className="chat-drawer__quick-list">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="chat-drawer__quick-btn"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === 'user' ? (
                <div key={m.id || i} className="chat-drawer__user-bubble">
                  {m.content}
                </div>
              ) : (
                <div key={m.id || i} className="chat-drawer__assistant-bubble">
                  {linkify(m.content)}
                </div>
              )
            )}

            {isLoading && (
              <div className="label-mono chat-drawer__thinking">
                <span className="caret">▍</span> thinking…
              </div>
            )}

            {lastFailedMessage && !isLoading && (
              <div className="chat-drawer__error">
                <p>Could not reach the assistant service.</p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="label-mono chat-drawer__retry-btn"
                >
                  <RotateCcw className="chat-drawer__btn-icon" aria-hidden="true" />
                  <span>Retry</span>
                </button>
              </div>
            )}
          </div>

          {/* Drawer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="chat-drawer__form"
          >
            <label htmlFor="drawer-chat-input" className="visually-hidden">
              Ask about projects, skills…
            </label>
            <textarea
              id="drawer-chat-input"
              ref={drawerInputRef}
              rows={1}
              value={input}
              maxLength={600}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
              placeholder="Ask about projects, coursework, systems…"
              className="chat-drawer__input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="chat-drawer__send-btn"
            >
              <ArrowUp className="chat-drawer__send-icon" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
