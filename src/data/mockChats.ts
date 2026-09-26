import type { ChatSession } from '../types';

export const INITIAL_MOCK_CHATS: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'React 19 Server Components Architecture',
    category: 'Coding',
    isPinned: true,
    isSplitView: true,
    primaryModelId: 'claude-3-5-sonnet',
    secondaryModelId: 'gpt-4o',
    createdAt: '2026-09-25T14:30:00Z',
    updatedAt: '2026-09-25T14:35:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'user',
        content: 'Explain how to structure state management when combining React Server Components (RSC) with optimistic UI updates in Tailwind CSS. Compare Claude vs GPT perspective.',
        timestamp: '14:30 PM',
      },
      {
        id: 'm2',
        sender: 'ai',
        modelId: 'claude-3-5-sonnet',
        content: `### Architectural Recommendation for React 19 RSC + Optimistic UI

When building high-performance modern web apps with React Server Components (RSC) and Tailwind CSS, the golden rule is **Separation of Interactive State from Server Data Fetching**.

#### 1. The \`useOptimistic\` Hook Pattern
React 19 provides the native \`useOptimistic\` hook to instantly update UI state before the server mutation completes.

\`\`\`tsx
"use client";
import { useOptimistic, useTransition } from "react";
import { updateTaskAction } from "@/actions/tasks";

export function TaskToggle({ task }: { task: Task }) {
  const [isPending, startTransition] = useTransition();
  
  // Instant local UI state with automatic fallback if action fails
  const [optimisticTask, setOptimisticTask] = useOptimistic(
    task,
    (current, updatedStatus: boolean) => ({
      ...current,
      completed: updatedStatus,
    })
  );

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticTask(!optimisticTask.completed);
      await updateTaskAction(task.id, !optimisticTask.completed);
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={\`px-4 py-2 rounded-lg font-medium transition-all duration-200 \${
        optimisticTask.completed 
          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }\`}
    >
      {optimisticTask.completed ? "✓ Completed" : "Mark Complete"}
    </button>
  );
}
\`\`\`

#### Key Takeaway
- **Claude 3.5 Sonnet:** Best for clean TypeScript architecture, crisp UI code, and resilient edge-case handling.`,
        timestamp: '14:31 PM',
        tokens: 342,
      },
      {
        id: 'm3',
        sender: 'ai',
        modelId: 'gpt-4o',
        content: `### OpenAI GPT-4o Perspective & Edge Runtime Strategy

In addition to \`useOptimistic\`, GPT-4o emphasizes **Cache Revalidation Strategies** using \`revalidateTag\` or \`revalidatePath\` alongside Server Actions.

#### Key Highlights:
1. **Server Actions with Graceful Rollbacks:** Always wrap server actions in \`try...catch\` so optimistic states revert smoothly without disrupting user input flow.
2. **Tailwind Glassmorphism Styling:** Use dynamic transitions (\`transition-all duration-300 ease-out\`) to make optimistic state swaps feel fluid.
3. **Multi-Model EchoGPT Edge Proxy:** With EchoGPT's extension & web platform, you can stream both Claude and GPT outputs side-by-side to cross-check React architecture!`,
        timestamp: '14:31 PM',
        tokens: 285,
      }
    ]
  },
  {
    id: 'chat-2',
    title: 'DeepSeek R1 Math & Logic Reasoning',
    category: 'Analysis',
    isPinned: true,
    isSplitView: false,
    primaryModelId: 'deepseek-v3',
    createdAt: '2026-09-24T18:10:00Z',
    updatedAt: '2026-09-24T18:20:00Z',
    messages: [
      {
        id: 'm2-1',
        sender: 'user',
        content: 'Solve step-by-step: If a quantum algorithm achieves quadratic speedup over classical brute force search of N items, how many queries does it need for N = 1,000,000?',
        timestamp: '18:10 PM',
      },
      {
        id: 'm2-2',
        sender: 'ai',
        modelId: 'deepseek-v3',
        content: `### DeepSeek Step-by-Step Reasoning (Grover's Algorithm)

**Step 1: Identify the algorithm**
A quantum algorithm offering quadratic speedup over classical unstructured search is **Grover's Search Algorithm**.

**Step 2: Compare Complexity Limits**
* Classical Unstructured Search: \\( O(N) \\) operations. For \\( N = 1,000,000 \\), average queries = \\( \\frac{N}{2} = 500,000 \\).
* Grover's Quantum Search: \\( O(\\sqrt{N}) \\) operations.

**Step 3: Calculate Exact Grover Queries**
The precise formula for optimal iterations in Grover's algorithm is:
\\[ R \\approx \\frac{\\pi}{4} \\sqrt{N} \\]

Substituting \\( N = 1,000,000 \\):
\\[ \\sqrt{1,000,000} = 1,000 \\]
\\[ R \\approx \\frac{\\pi}{4} \\times 1,000 \\approx 0.785398 \\times 1,000 = 785.4 \\]

**Conclusion:**
Grover's algorithm requires approximately **785 queries**, compared to **500,000 queries** classically. That is a **636x speedup** for 1 million items!`,
        timestamp: '18:11 PM',
        tokens: 310,
      }
    ]
  },
  {
    id: 'chat-3',
    title: 'Perplexity Live Market Research - AI Chrome Extensions 2026',
    category: 'Productivity',
    isPinned: false,
    isSplitView: false,
    primaryModelId: 'perplexity-sonar',
    createdAt: '2026-09-23T10:00:00Z',
    updatedAt: '2026-09-23T10:15:00Z',
    messages: [
      {
        id: 'm3-1',
        sender: 'user',
        content: 'What are the top key features users look for in multi-AI Chrome extensions today?',
        timestamp: '10:00 AM',
      },
      {
        id: 'm3-2',
        sender: 'ai',
        modelId: 'perplexity-sonar',
        content: `### Perplexity Real-Time Web Analysis

Based on user reviews, product forums, and Chrome Web Store analytics, top user requirements for multi-AI Chrome extensions include:

1. **Instant Model Switcher:** Switching between GPT-4o, Claude 3.5, and DeepSeek without switching tabs or context.
2. **Page Context Reader & Overlay:** Hovering over any web page paragraph or code block to instantly request "Explain", "Summarize", or "Translate".
3. **Side-by-Side Model Benchmarking:** Running the exact same prompt through 2 models simultaneously to compare answers.
4. **Side Panel Integration:** Docking the extension into Chrome SidePanel so it stays open beside any web workflow.
5. **Privacy & API Key Flexibility:** Support for custom user API keys or unified EchoGPT cloud subscription.`,
        timestamp: '10:01 AM',
        tokens: 240,
      }
    ]
  }
];
