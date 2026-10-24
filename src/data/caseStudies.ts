export type CodeDecision = {
  title: string
  explanation: string
  codeSnippet?: string
  language?: string
}

export type CaseStudy = {
  id: string
  index: string
  name: string
  subtitle: string
  overview: string
  problem: string
  approach: string
  technologies: string[]
  codeDecisions: CodeDecision[]
  testingAndValidation: string
  challengesAndSolutions: string
  learningOutcomes: string[]
  repositoryUrl?: string
  liveUrl?: string
  limitations?: string
}

export const caseStudies: Record<string, CaseStudy> = {
  'python-programs-collection': {
    id: 'python-programs-collection',
    index: '01',
    name: 'Python Programs Collection',
    subtitle: 'Algorithmic exercises & structured data conversion in Python',
    overview:
      'A structured collection of Python programming exercises created to practice core algorithmic logic, recursive vs. iterative implementation patterns, and object serialization.',
    problem:
      'Implementing classic computational routines—including factorial calculation, Fibonacci sequence generation, and converting structured objects/tuples into dictionary formats—accompanied by clean documentation.',
    approach:
      'Wrote modular Python functions demonstrating both recursive and iterative pathways in Jupyter Notebooks. Focused on edge-case parameter checks (e.g. zero, negative integers) and clear mathematical explanations in markdown cells.',
    technologies: ['Python', 'Jupyter Notebook'],
    codeDecisions: [
      {
        title: 'Recursive vs. Iterative Dual Implementations',
        explanation:
          'Provided parallel iterative and recursive versions of factorial and Fibonacci algorithms to compare call-stack overhead and termination conditions.',
        codeSnippet: `# Factorial comparison:
def factorial_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def factorial_recursive(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    if n in (0, 1):
        return 1
    return n * factorial_recursive(n - 1)`,
        language: 'python',
      },
      {
        title: 'Struct-to-Dictionary Conversion',
        explanation:
          'Utilized Python dictionary comprehensions and attribute mapping to transform structured records into JSON-serializable dictionaries for interoperability.',
        codeSnippet: `def record_to_dict(record) -> dict:
    """Converts attributes or named tuples into key-value dictionaries."""
    if hasattr(record, "_asdict"):
        return record._asdict()
    if hasattr(record, "__dict__"):
        return vars(record)
    raise TypeError(f"Cannot serialize object of type {type(record)}")`,
        language: 'python',
      },
    ],
    testingAndValidation:
      'Validated through direct execution in Jupyter Notebook kernels, testing edge values (0, 1, large integers) and verifying mathematical accuracy against known series tables.',
    challengesAndSolutions:
      'Handling recursive call limits and negative input values. Resolved by adding guard clauses and strict input validation at the top of functions before recursive dispatch.',
    learningOutcomes: [
      'Mastery of recursion base cases and prevention of infinite recursion.',
      'Understanding execution differences between iterative loops and call-stack recursion.',
      'Experience authoring literate programming documentation using Jupyter Notebook markdown.',
    ],
    repositoryUrl: 'https://github.com/TusharMital/python-programs-collection',
    limitations:
      'External repository contents were verified through project metadata; exercises were created for learning fundamentals rather than production deployment.',
  },

  'python-debugging': {
    id: 'python-debugging',
    index: '02',
    name: 'Messy Python Code Improvement',
    subtitle: 'Systematic debugging and test-driven refactoring with unittest',
    overview:
      'Coursework dedicated to identifying, reproducing and fixing logic errors in messy Python utilities using unit tests and the red–fix–green workflow.',
    problem:
      'A set of student grading utilities contained logic bugs causing incorrect average calculations, erroneous pass-mark evaluations, and improper letter grade assignments.',
    approach:
      'Adopted test-driven debugging: first authored isolated unit tests that reproduced each failing scenario in unittest, diagnosed the exact root causes, refactored the functions to correct the logic, and confirmed all tests passed green.',
    technologies: ['Python', 'unittest'],
    codeDecisions: [
      {
        title: 'Red–Fix–Green Test Suites',
        explanation:
          'Created automated test cases extending unittest.TestCase to verify boundary values, empty inputs, and threshold pass marks.',
        codeSnippet: `import unittest

class TestGradeUtilities(unittest.TestCase):
    def test_average_valid_scores(self):
        self.assertEqual(calculate_average([80, 90, 100]), 90.0)

    def test_average_empty_list(self):
        with self.assertRaises(ValueError):
            calculate_average([])

    def test_pass_mark_boundary(self):
        # Pass mark is 50 inclusive
        self.assertTrue(is_pass(50))
        self.assertFalse(is_pass(49.9))`,
        language: 'python',
      },
      {
        title: 'Safe Division & Boundary Condition Guards',
        explanation:
          'Replaced unvalidated division with explicit length checks to prevent ZeroDivisionError and corrected comparison operators from strict (>) to inclusive (>=) where thresholds required it.',
        codeSnippet: `def calculate_average(scores: list[float]) -> float:
    if not scores:
        raise ValueError("Cannot calculate average of an empty list")
    return sum(scores) / len(scores)

def is_pass(score: float, pass_threshold: float = 50.0) -> bool:
    return score >= pass_threshold`,
        language: 'python',
      },
    ],
    testingAndValidation:
      'Verified via automated execution of the Python unittest test runner. All test fixtures validated specific bug regressions and boundary assertions.',
    challengesAndSolutions:
      'Isolating coupled grading functions where one calculation depended on an unvalidated average. Resolved by testing and fixing bottom-level functions first before verifying compound grade assignment functions.',
    learningOutcomes: [
      'Practical mastery of the red–fix–green debugging workflow using standard unittest.',
      'Identification of off-by-one errors and operator mismatch in grading threshold logic.',
      'Appreciation for automated regression testing over ad-hoc manual print debugging.',
    ],
    repositoryUrl: 'https://github.com/TusharMital/lecture-8-python-debugging',
    limitations:
      'Coursework repository focused on unit testing and bug fixing rather than standalone consumer software.',
  },

  'cursor-bug-fix': {
    id: 'cursor-bug-fix',
    index: '03',
    name: 'Bug Fixing Using Cursor AI',
    subtitle: 'Accumulator pattern analysis and prompt-assisted code inspection',
    overview:
      'A debugging case study examining how an accumulator loop in Python failed to compute the sum of an array due to an assignment operator error, and how AI-assisted code inspection guided the diagnosis and fix.',
    problem:
      'Given an array of numbers [10, 20, 30, 40, 50], the loop was expected to return 150. However, executing the code returned 50 instead of the expected total.',
    approach:
      'Inspected the loop step-by-step using prompt-assisted queries in Cursor AI and manual state tracing across all five iterations to uncover the variable mutation flaw.',
    technologies: ['Python'],
    codeDecisions: [
      {
        title: 'Assignment vs. Accumulation Operator Flaw',
        explanation:
          'In the flawed code, the loop executed `total = numbers[i]`. Because the single equals sign (=) is an assignment operator, it overwrites the variable `total` on every iteration, completely discarding any previous sums. To accumulate values, the addition assignment operator (+=) must be used: `total += numbers[i]` (which is equivalent to `total = total + numbers[i]`).',
        codeSnippet: `# INCORRECT (destructive assignment):
total = 0
numbers = [10, 20, 30, 40, 50]
for i in range(len(numbers)):
    total = numbers[i]     # Overwrites total on each iteration!
# Final total is 50 (just numbers[-1]), instead of 150.

# CORRECT (additive accumulation):
total = 0
numbers = [10, 20, 30, 40, 50]
for i in range(len(numbers)):
    total += numbers[i]    # Accumulates: total = total + numbers[i]
# Final total is 150.`,
        language: 'python',
      },
      {
        title: 'Execution Trace Analysis',
        explanation:
          'Tracing the variable state across iterations highlights exactly why assignment failed:\n' +
          '• Iteration 0: numbers[0]=10 → Incorrect total=10 | Correct total=0+10=10\n' +
          '• Iteration 1: numbers[1]=20 → Incorrect total=20 (10 lost) | Correct total=10+20=30\n' +
          '• Iteration 2: numbers[2]=30 → Incorrect total=30 (30 lost) | Correct total=30+30=60\n' +
          '• Iteration 3: numbers[3]=40 → Incorrect total=40 (60 lost) | Correct total=60+40=100\n' +
          '• Iteration 4: numbers[4]=50 → Incorrect total=50 (100 lost) | Correct total=100+50=150',
        codeSnippet: `# Pythonic idiomatic alternative:
numbers = [10, 20, 30, 40, 50]
total = sum(numbers)  # Built-in accumulation avoiding index loops`,
        language: 'python',
      },
    ],
    testingAndValidation:
      'Verified with the supplied test input array [10, 20, 30, 40, 50], confirming that the corrected loop accumulates to exactly 150 across all iterations.',
    challengesAndSolutions:
      'Because `total = numbers[i]` is valid Python syntax, linters and parsers do not throw syntax errors. The bug was purely semantic. Solved by writing a prompt asking Cursor AI to trace the intermediate value of `total` after each iteration.',
    learningOutcomes: [
      'Clear conceptual understanding of assignment (=) versus compound accumulation (+=).',
      'Ability to trace variable states across iterative execution loops.',
      'Experience formulating targeted AI prompts focused on semantic logic checks rather than generic code generation.',
    ],
    limitations:
      'No verified public repository or live demo is available for this study. It was evaluated as a focused standalone debugging analysis.',
  },

  'interactive-quiz': {
    id: 'interactive-quiz',
    index: '04',
    name: 'Interactive Quiz Application',
    subtitle: 'Responsive multiple-choice quiz with scoring and dynamic DOM updates',
    overview:
      'A responsive web-based quiz application that presents multiple-choice questions sequentially, evaluates user responses in real time, tracks progress, and allows restarting.',
    problem:
      'Creating an engaging, mobile-friendly quiz without using heavy frontend frameworks, relying on standard browser APIs for clean event handling and state management.',
    approach:
      'Constructed with semantic HTML5, modern vanilla CSS using custom properties for theme styling, and vanilla JavaScript for state handling, scoring, question progression, and DOM rendering.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    codeDecisions: [
      {
        title: 'Single-Question State Engine',
        explanation:
          'Structured question data as an array of objects. An index pointer manages current question display, allowing instant DOM updates without page reloads.',
        codeSnippet: `const questions = [
  {
    question: "Which keyword defines a constant in JavaScript?",
    answers: ["var", "let", "const", "def"],
    correctIndex: 2
  }
];

let currentIndex = 0;
let score = 0;

function renderQuestion() {
  const current = questions[currentIndex];
  questionEl.textContent = current.question;
  // Render options and attach selection listeners
}`,
        language: 'javascript',
      },
      {
        title: 'Preventing Repeated Answer Submissions',
        explanation:
          'Once a player chooses an option, answer buttons are immediately disabled to prevent multiple score increments on the same question before moving to the next.',
        codeSnippet: `function selectAnswer(selectedIndex) {
  const correct = questions[currentIndex].correctIndex;
  // Disable options immediately
  optionButtons.forEach(btn => btn.disabled = true);
  if (selectedIndex === correct) {
    score++;
  }
  showFeedback(selectedIndex === correct);
}`,
        language: 'javascript',
      },
    ],
    testingAndValidation:
      'Tested across desktop and mobile viewports. Verified complete game loop from question 1 to end screen, verifying that score calculations are accurate and restart resets score to 0.',
    challengesAndSolutions:
      'Maintaining state transitions cleanly when users restart the quiz. Solved by encapsulating all game state in a single reset function that reinitializes index, score, and UI elements.',
    learningOutcomes: [
      'DOM event delegation and dynamic element creation in vanilla JavaScript.',
      'Designing stateful interactive components without framework abstractions.',
      'Responsive interface design with accessible touch targets for mobile screens.',
    ],
    repositoryUrl: 'https://github.com/TusharMital/interactive-quiz-app',
    liveUrl: 'https://interactive-quiz-app-rosy.vercel.app/',
    limitations:
      'Production app hosted on Vercel; verified using local configuration, repository specifications, and live deployment inspection.',
  },

  'reading-list': {
    id: 'reading-list',
    index: '05',
    name: 'Book Reading List Application',
    subtitle: 'Type-safe single-page reading tracker with browser persistence',
    overview:
      'A client-side single-page application built to help users manage personal reading collections, categorize books by reading status, and filter their library.',
    problem:
      'Providing an intuitive, responsive reading list with seamless state updates and persistent client-side storage so books are not lost when closing or refreshing the browser tab.',
    approach:
      'Developed with React 19, TypeScript, and Vite. Designed a modular component hierarchy with explicit TypeScript interfaces, custom React hooks, and localStorage synchronization.',
    technologies: ['React', 'TypeScript', 'Vite'],
    codeDecisions: [
      {
        title: 'Strict Status Typing and Model Definitions',
        explanation:
          'Defined union types for book statuses ("Want to Read" | "Reading" | "Finished") to ensure type safety across form submissions and filter queries.',
        codeSnippet: `export type ReadingStatus = 'Want to Read' | 'Reading' | 'Finished';

export type Book = {
  id: string;
  title: string;
  author: string;
  status: ReadingStatus;
  dateAdded: string;
};`,
        language: 'typescript',
      },
      {
        title: 'Safe localStorage Synchronization',
        explanation:
          'Synchronized React state with browser localStorage with try/catch error handling to safeguard against private mode storage restrictions and corrupt JSON.',
        codeSnippet: `const STORAGE_KEY = 'reading_list_books';

export function loadStoredBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Could not read from localStorage", error);
    return [];
  }
}`,
        language: 'typescript',
      },
    ],
    testingAndValidation:
      'Verified via Vite dev server and production builds. Tested adding, removing, and updating book status, as well as filtering by status. Confirmed persistence by refreshing browser sessions.',
    challengesAndSolutions:
      'Preventing state desynchronization between user form inputs, filtered views, and localStorage. Solved by deriving filtered views dynamically from master state rather than maintaining secondary duplicate arrays.',
    learningOutcomes: [
      'Typed React component state management and form handling.',
      'Robust client-side persistence strategies and error handling.',
      'Effective component decomposition in Vite + TypeScript projects.',
    ],
    repositoryUrl: 'https://github.com/TusharMital/reading-list-app',
    liveUrl: 'https://reading-list-app-one.vercel.app/',
    limitations:
      'Application operates client-side with browser localStorage; there is no remote cloud database synchronization.',
  },
}
