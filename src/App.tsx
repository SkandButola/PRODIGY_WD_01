import { useMemo, useState } from "react";

type Topic = {
  id: string;
  subject: string;
  icon: string;
  title: string;
  description: string;
  content: string;
  color: string;
};

const SUBJECTS = [
  { id: "dsa", title: "DSA", icon: "🧮", color: "purple", description: "Algorithms, data structures & interview prep." },
  { id: "dbms", title: "DBMS", icon: "🗄️", color: "blue", description: "SQL, normalization, transactions & keys." },
  { id: "web", title: "Web Development", icon: "🌐", color: "cyan", description: "HTML, CSS, JavaScript & React basics." },
];

const TOPICS: Topic[] = [
  {id:"dsa-arrays",subject:"DSA",icon:"🧮",title:"Arrays & Linked Lists",description:"Operations, differences and complexity.",color:"purple",content:"Arrays provide O(1) indexed access but insertions in the middle can be O(n). Linked lists use connected nodes; insertion can be O(1) when the position/node is already known. Both are fundamental for interviews."},
  {id:"dsa-stack",subject:"DSA",icon:"🧮",title:"Stacks & Queues",description:"LIFO/FIFO, operations and applications.",color:"purple",content:"A stack follows LIFO: push, pop and peek are normally O(1). A queue follows FIFO: enqueue and dequeue are normally O(1) with a suitable implementation. Stacks are used in recursion and expression evaluation; queues are used in BFS and scheduling."},
  {id:"dsa-trees",subject:"DSA",icon:"🧮",title:"Trees",description:"BSTs, traversals and core terminology.",color:"purple",content:"Trees are hierarchical structures. In a Binary Search Tree, values smaller than a node go left and larger values go right. Traversals are preorder, inorder, postorder and level order. Inorder traversal of a BST gives sorted order."},
  {id:"dsa-graphs",subject:"DSA",icon:"🧮",title:"Graphs",description:"BFS, DFS and shortest path basics.",color:"purple",content:"Graphs contain vertices and edges. BFS uses a queue and explores by distance/levels. DFS uses recursion or a stack. Dijkstra's algorithm finds shortest paths when edge weights are non-negative."},
  {id:"dsa-sorting",subject:"DSA",icon:"🧮",title:"Sorting",description:"Bubble, selection, merge and quick sort.",color:"purple",content:"Bubble and selection sort are O(n²). Merge sort is O(n log n) and stable. Quick sort is O(n log n) on average and O(n²) in the worst case. Know stability, in-place behavior and complexity for exams."},
  {id:"dbms-sql",subject:"DBMS",icon:"🗄️",title:"SQL Fundamentals",description:"SELECT, WHERE, GROUP BY and ORDER BY.",color:"blue",content:"SELECT retrieves data, WHERE filters rows, GROUP BY creates groups, HAVING filters groups, and ORDER BY sorts results. SQL is the foundation of relational database work."},
  {id:"dbms-joins",subject:"DBMS",icon:"🗄️",title:"SQL Joins",description:"INNER, LEFT, RIGHT and FULL joins.",color:"blue",content:"INNER JOIN returns matching rows. LEFT JOIN keeps all rows from the left table. RIGHT JOIN keeps all rows from the right table. FULL OUTER JOIN keeps rows from both sides where supported."},
  {id:"dbms-normalization",subject:"DBMS",icon:"🗄️",title:"Normalization",description:"1NF, 2NF and 3NF made simple.",color:"blue",content:"Normalization reduces redundancy and anomalies. 1NF removes repeating groups, 2NF removes partial dependency on a composite key, and 3NF removes transitive dependency."},
  {id:"dbms-acid",subject:"DBMS",icon:"🗄️",title:"Transactions & ACID",description:"Atomicity, consistency, isolation and durability.",color:"blue",content:"A transaction is a logical unit of work. ACID means Atomicity, Consistency, Isolation and Durability. COMMIT makes changes permanent and ROLLBACK undoes uncommitted changes."},
  {id:"dbms-keys",subject:"DBMS",icon:"🗄️",title:"Keys & Indexing",description:"Primary, foreign, candidate keys and indexes.",color:"blue",content:"A primary key uniquely identifies a row. Foreign keys represent relationships. Candidate keys are minimal unique identifiers. Indexes improve read performance but consume storage and can slow writes."},
  {id:"web-html",subject:"Web Development",icon:"🌐",title:"HTML Basics",description:"Semantic structure and forms.",color:"cyan",content:"HTML defines page structure. Prefer semantic elements such as header, nav, main, section, article and footer. Forms collect user input with controls such as input, select and textarea."},
  {id:"web-css",subject:"Web Development",icon:"🌐",title:"CSS Essentials",description:"Box model, Flexbox, Grid and responsive design.",color:"cyan",content:"CSS controls presentation. Master selectors, the box model, Flexbox, Grid, positioning and responsive media queries. Mobile-first layouts are easier to maintain."},
  {id:"web-js",subject:"Web Development",icon:"🌐",title:"JavaScript Fundamentals",description:"DOM, events, promises and async/await.",color:"cyan",content:"JavaScript adds behavior to webpages. Core topics include variables, functions, arrays, objects, DOM manipulation, events, promises, async/await and modules."},
  {id:"web-react",subject:"Web Development",icon:"🌐",title:"React Basics",description:"Components, props, state and hooks.",color:"cyan",content:"React builds interfaces from reusable components. Props pass data into components; state stores changing data. useState handles state and useEffect handles side effects."},
  {id:"web-security",subject:"Web Development",icon:"🌐",title:"Web Security Basics",description:"XSS, CSRF, input validation and safe auth.",color:"cyan",content:"Use HTTPS, validate input, never expose secrets in frontend code, and understand common risks such as XSS, CSRF and SQL injection. Authentication and authorization are different concerns."},
];

const QUIZ = [
  {q:"Which traversal of a BST gives sorted order?",options:["Preorder","Inorder","Postorder","Level order"],a:"Inorder"},
  {q:"Which SQL clause filters groups?",options:["WHERE","ORDER BY","HAVING","SELECT"],a:"HAVING"},
  {q:"Which data structure follows LIFO?",options:["Queue","Stack","Graph","Heap"],a:"Stack"},
  {q:"Which React hook is commonly used for state?",options:["useState","useRoute","useStyle","useData"],a:"useState"},
  {q:"Merge sort has which typical time complexity?",options:["O(n)","O(log n)","O(n log n)","O(n²)"],a:"O(n log n)"},
];

export default function App() {
  const [query,setQuery]=useState("");
  const [subject,setSubject]=useState("All");
  const [selected,setSelected]=useState<Topic|null>(null);
  const [quizOpen,setQuizOpen]=useState(false);
  const [answers,setAnswers]=useState<Record<number,string>>({});
  const [dark,setDark]=useState(true);

  const filtered=useMemo(()=>TOPICS.filter(t=>
    (subject==="All" || t.subject===subject) &&
    `${t.title} ${t.description} ${t.subject}`.toLowerCase().includes(query.toLowerCase())
  ),[query,subject]);

  const score=QUIZ.filter((q,i)=>answers[i]===q.a).length;

  const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <div className={dark?"min-h-screen bg-slate-950 text-slate-100":"min-h-screen bg-slate-50 text-slate-900"}>
      <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={()=>go("home")} className="text-xl font-black text-white">📚 Study<span className="text-purple-400">Mate</span></button>
          <div className="hidden gap-7 md:flex">
            {["home","subjects","notes","quiz"].map(x=><button key={x} onClick={()=>go(x)} className="text-sm text-slate-300 hover:text-white">{x[0].toUpperCase()+x.slice(1)}</button>)}
          </div>
          <button onClick={()=>setDark(!dark)} className="rounded-full border border-slate-700 px-3 py-2 text-sm">{dark?"☀️":"🌙"}</button>
        </nav>
      </header>

      <main>
        <section id="home" className="relative overflow-hidden px-5 py-24 text-center md:py-32">
          <div className="pointer-events-none absolute -left-32 -top-20 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"/>
          <div className="pointer-events-none absolute -bottom-20 -right-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"/>
          <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-purple-300">YOUR PERSONAL STUDY HUB</span>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Study Smart,<br/><span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Not Hard 🚀</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Organised notes, quick revision material, search, topic filtering and a practice quiz — all in one place.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={()=>go("notes")} className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-7 py-3 font-bold shadow-lg shadow-purple-500/20">Explore Study Material</button>
            <button onClick={()=>go("quiz")} className="rounded-full border border-slate-700 px-7 py-3 font-bold hover:bg-slate-900">Take Quiz</button>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"><b className="text-2xl">{SUBJECTS.length}</b><p className="text-xs text-slate-500">Subjects</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"><b className="text-2xl">{TOPICS.length}</b><p className="text-xs text-slate-500">Topics</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"><b className="text-2xl">{QUIZ.length}</b><p className="text-xs text-slate-500">Quiz Qs</p></div>
          </div>
        </section>

        <section id="subjects" className="border-y border-slate-800/70 bg-slate-900/30 px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10"><p className="text-sm font-bold text-purple-400">LEARN BY SUBJECT</p><h2 className="mt-2 text-4xl font-black">Pick your subject</h2></div>
            <div className="grid gap-5 md:grid-cols-3">
              {SUBJECTS.map(s=><button key={s.id} onClick={()=>{setSubject(s.title);go("notes")}} className="group rounded-3xl border border-slate-800 bg-slate-950/70 p-7 text-left transition hover:-translate-y-1 hover:border-purple-500/60">
                <span className="text-4xl">{s.icon}</span><h3 className="mt-5 text-2xl font-bold">{s.title}</h3><p className="mt-2 text-sm text-slate-400">{s.description}</p><span className="mt-6 inline-block text-sm font-semibold text-purple-300">View material →</span>
              </button>)}
            </div>
          </div>
        </section>

        <section id="notes" className="px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div><p className="text-sm font-bold text-blue-400">STUDY MATERIAL</p><h2 className="mt-2 text-4xl font-black">Notes & revision</h2></div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="🔎 Search topics..." className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-purple-500"/>
                <select value={subject} onChange={e=>setSubject(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"><option>All</option>{SUBJECTS.map(s=><option key={s.id}>{s.title}</option>)}</select>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">{filtered.length} study topics found</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(t=><article key={t.id} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
                <div className="flex items-center justify-between"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-300">{t.subject}</span><span>{t.icon}</span></div>
                <h3 className="mt-5 text-xl font-bold">{t.title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{t.description}</p>
                <button onClick={()=>setSelected(t)} className="mt-6 rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-purple-500">Read Quick Notes →</button>
              </article>)}
            </div>
            {filtered.length===0 && <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">No material found. Try another keyword.</div>}
          </div>
        </section>

        <section id="quiz" className="border-y border-slate-800/70 bg-slate-900/30 px-5 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8"><p className="text-sm font-bold text-green-400">PRACTICE</p><h2 className="mt-2 text-4xl font-black">Quick Quiz 🧠</h2><p className="mt-2 text-slate-400">Test yourself after revision.</p></div>
            <div className="space-y-5">
              {QUIZ.map((q,i)=><div key={q.q} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"><p className="font-bold">{i+1}. {q.q}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map(o=><button key={o} onClick={()=>setAnswers({...answers,[i]:o})} className={`rounded-xl border px-4 py-3 text-left text-sm ${answers[i]===o?"border-purple-500 bg-purple-500/15":"border-slate-700 hover:border-slate-500"}`}>{o}</button>)}</div></div>)}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5"><span className="font-bold">Score: {score}/{QUIZ.length}</span><button onClick={()=>setAnswers({})} className="text-sm text-purple-300">Reset quiz</button></div>
          </div>
        </section>
      </main>

      {selected && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm" onClick={()=>setSelected(null)}>
        <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-3xl border border-slate-700 bg-slate-950 p-7 shadow-2xl" onClick={e=>e.stopPropagation()}>
          <div className="flex items-start justify-between gap-5"><div><span className="text-sm text-purple-300">{selected.subject}</span><h2 className="mt-2 text-3xl font-black">{selected.title}</h2></div><button onClick={()=>setSelected(null)} className="rounded-full border border-slate-700 px-3 py-1">✕</button></div>
          <p className="mt-7 leading-8 text-slate-300">{selected.content}</p>
          <div className="mt-7 rounded-2xl bg-slate-900 p-5"><b>Exam Tip 💡</b><p className="mt-2 text-sm text-slate-400">Define the concept, explain how it works, mention complexity/key properties and finish with a small example.</p></div>
        </div>
      </div>}
    </div>
  );
}
