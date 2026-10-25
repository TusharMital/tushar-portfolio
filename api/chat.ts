import type { IncomingMessage, ServerResponse } from 'http'

// System instructions containing strictly verified portfolio facts and boundaries
const PORTFOLIO_SYSTEM_PROMPT = `You are the AI portfolio assistant for Tushar Mittal.
Your job is to answer questions about Tushar's background, coursework, projects, learning areas, and technical skills based strictly on the verified portfolio data below.

VERIFIED FACTS ABOUT TUSHAR MITTAL:
- Name: Tushar Mittal
- Background: Second-year Computer Science undergraduate student at JECRC University.
- Contact: Email (tushar.mitt6@gmail.com), GitHub (https://github.com/TusharMital), LinkedIn (https://www.linkedin.com/in/tushar-mittal-179761364/).
- Core Learning Areas:
  1. Programming & DSA: C, C++, Python, Data Structures & Algorithms (following Striver's A2Z DSA sheet, practicing on LeetCode and Codeforces).
  2. Systems & Low-Level: Operating Systems, Computer Architecture, Linux / Ubuntu using WSL2.
  3. Computer Networks: Studying "Computer Networking: A Top-Down Approach" by Kurose & Ross, and Stanford CS144 networking course materials.
  4. AI & Prompt Engineering: Prompt design, AI-assisted development, generated-code review, testing, debugging, and iterative refinement.
  5. Emerging Technologies: Foundations of Quantum Computing.
- Certification / Coursework:
  - Completed the 40-hour MeitY-funded course "QT-00 & 01 Foundations of Quantum Computing & Applications", hosted by the Consortium of EICT Academy, MNIT Jaipur, receiving a grade rating of "Excellent".
- Five Portfolio Projects:
  1. Python Programs Collection (Repo: https://github.com/TusharMital/python-programs-collection)
     - Implements core algorithmic exercises (factorial, Fibonacci, struct-to-dictionary conversion) with Jupyter Notebook documentation.
  2. Messy Python Code Improvement (Repo: https://github.com/TusharMital/lecture-8-python-debugging)
     - Test-driven debugging of messy student grading utilities using Python's unittest library and a red-fix-green workflow to correct average, pass-mark, and grade bracket logic.
  3. Bug Fixing Using Cursor AI
     - Standalone debugging case study. There is NO public repository or live demo available.
     - Examines a loop designed to calculate the sum of [10, 20, 30, 40, 50] (expected sum: 150).
     - Flawed code: \`total = numbers[i]\` — Assignment overwrote total on every iteration, leaving only the last element (50).
     - Corrected code: \`total += numbers[i]\` — Addition assignment accumulates values across iterations to reach 150.
  4. Interactive Quiz Application (Repo: https://github.com/TusharMital/interactive-quiz-app, Demo: https://interactive-quiz-app-rosy.vercel.app/)
     - Responsive multiple-choice quiz in vanilla HTML, CSS, and JavaScript. Features score tracking, light/dark themes, and quiz reset.
  5. Book Reading List Application (Repo: https://github.com/TusharMital/reading-list-app, Demo: https://reading-list-app-one.vercel.app/)
     - Single-page reading tracker built with React 19, TypeScript, and Vite. Supports status categorization (Want to Read, Reading, Finished), status filtering, and browser localStorage persistence.
- Prompt Engineering 5-Stage Workflow:
  1. UNDERSTAND: Identify task, requirements, constraints, and intended user.
  2. DEFINE: Specify expected behaviour, acceptance criteria, and edge cases.
  3. PROMPT: Write clear, structured prompts with context and boundaries.
  4. INSPECT & TEST: Review generated code, execute tests, inspect results, and investigate failures.
  5. REFINE & DOCUMENT: Improve the prompt or implementation, validate results, and document findings.

STRICT BEHAVIOURAL RULES:
1. Ground every answer strictly in the facts above.
2. If asked about employment history, professional work experience, unlisted projects, or speculative skills, state clearly and honestly that Tushar is currently a student and that specific information is not in his portfolio.
3. Do NOT invent achievements, companies, salaries, unverified repository links, or proficiencies.
4. Keep answers friendly, humble, concise, and focused on his actual learning journey.
5. If a user asks non-portfolio coding questions, briefly connect your answer to Tushar's study areas or politely redirect back to his portfolio.`

const GROQ_CHAT_COMPLETIONS_URL = 'https://api.groq.com/openai/v1/chat/completions'
const DEFAULT_GROQ_MODEL = 'openai/gpt-oss-120b'
const REQUEST_TIMEOUT_MS = 15000

type IncomingMessagePayload = {
  role: 'user' | 'assistant'
  content: string
}

// Helper to safely read request body across Vercel and Node connect environments
async function parseRequestBody(req: IncomingMessage & { body?: unknown }): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }

  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      // Safety limit: max 32KB payload
      if (raw.length > 32768) {
        reject(new Error('Payload too large'))
      }
    })
    req.on('end', () => {
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', (err) => reject(err))
  })
}

// Helper to send JSON responses consistently
function sendJson(
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any },
  statusCode: number,
  data: Record<string, unknown>,
) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    res.status(statusCode).json(data)
    return
  }

  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default async function handler(
  req: IncomingMessage & { body?: unknown; method?: string },
  res: ServerResponse & { status?: (code: number) => any; json?: (data: any) => any },
) {
  // Enforce POST method
  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed. Use POST.' })
    return
  }

  // Check for server-side GroqCloud API key
  const apiKey = process.env.GROQ_API_KEY?.trim()
  if (!apiKey) {
    sendJson(res, 503, {
      error:
        'Chatbot service is not configured with an API key yet. Please set GROQ_API_KEY in your server environment.',
      code: 'API_KEY_MISSING',
    })
    return
  }

  // Parse and validate incoming payload
  let payload: { messages?: IncomingMessagePayload[] }
  try {
    payload = await parseRequestBody(req)
  } catch (err: any) {
    sendJson(res, 400, { error: err.message || 'Malformed request body' })
    return
  }

  const { messages } = payload
  if (!Array.isArray(messages) || messages.length === 0) {
    sendJson(res, 400, {
      error: 'Invalid request: "messages" must be a non-empty array of message objects.',
    })
    return
  }

  // Validate message structure and enforce limits
  const sanitizedMessages: Array<{ role: 'user' | 'assistant'; content: string }> = []
  // Take only the last 6 messages to stay within reasonable context bounds
  const recentMessages = messages.slice(-6)

  for (const msg of recentMessages) {
    if (!msg || typeof msg !== 'object') continue
    if (msg.role !== 'user' && msg.role !== 'assistant') continue
    if (typeof msg.content !== 'string') continue

    const trimmed = msg.content.trim()
    if (!trimmed) continue

    // Enforce individual message length limit (600 characters)
    const truncated = trimmed.length > 600 ? trimmed.slice(0, 600) + '…' : trimmed
    sanitizedMessages.push({
      role: msg.role,
      content: truncated,
    })
  }

  if (sanitizedMessages.length === 0) {
    sendJson(res, 400, {
      error: 'No valid user or assistant message found in request.',
    })
    return
  }

  // Validate that there is at least one user message and the conversation ends with a user query
  const firstUserIdx = sanitizedMessages.findIndex((m) => m.role === 'user')
  if (firstUserIdx === -1) {
    sendJson(res, 400, {
      error: 'No valid user message found in request.',
    })
    return
  }

  const validSequence = sanitizedMessages.slice(firstUserIdx)
  if (validSequence[validSequence.length - 1].role !== 'user') {
    sendJson(res, 400, {
      error: 'The last message in the conversation must be from the user.',
    })
    return
  }

  const modelName = process.env.GROQ_MODEL?.trim() || DEFAULT_GROQ_MODEL

  // Format messages array according to OpenAI chat completions specification
  const groqMessages = [
    { role: 'system', content: PORTFOLIO_SYSTEM_PROMPT },
    ...validSequence,
  ]

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  if (typeof (timeoutId as any)?.unref === 'function') {
    (timeoutId as any).unref()
  }

  try {
    const upstreamResponse = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: groqMessages,
        max_tokens: 600,
        temperature: 0.2,
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!upstreamResponse.ok) {
      const errorBody: any = await upstreamResponse.json().catch(() => ({}))
      const status = upstreamResponse.status

      if (status === 401 || status === 403) {
        sendJson(res, 502, {
          error: 'Authentication failed with the AI provider. Please verify GROQ_API_KEY.',
        })
        return
      }

      if (status === 429) {
        sendJson(res, 429, {
          error: 'AI service rate limit reached. Please try again in a few moments.',
        })
        return
      }

      if (status === 400) {
        sendJson(res, 400, {
          error: 'The AI provider rejected the request payload format.',
        })
        return
      }

      // Log upstream message safely without leaking keys
      console.error(
        `Groq API responded with status ${status}:`,
        errorBody?.error?.message || 'Upstream error',
      )
      sendJson(res, 502, {
        error: 'The AI provider encountered an error processing your query. Please try again.',
      })
      return
    }

    const data: any = await upstreamResponse.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      sendJson(res, 502, {
        error: 'Empty response received from AI provider.',
      })
      return
    }

    sendJson(res, 200, {
      message: reply,
    })
  } catch (error: any) {
    clearTimeout(timeoutId)

    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      sendJson(res, 504, {
        error: 'AI request timed out. Please try asking again.',
      })
      return
    }

    console.error('Error connecting to Groq API:', error.message || 'Unknown network error')
    sendJson(res, 502, {
      error: 'The AI provider encountered an error processing your query. Please try again.',
    })
  }
}
