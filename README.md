# Stride

**Goal**: E-commerce store analyzer with user-defined personas, multi-agent journey simulation, prioritized CRO report, and **beautiful React Flow canvas** showing personas working in real-time.

**Tech Highlights**:

- Turborepo monorepo
- Bun as package manager + runtime
- Next.js 15 + React Flow for visual canvas
- Focused on e-com stores

- [x] Configure Bun in all packages
- [x] Set up `apps/web`, `packages/shared`, `packages/scraper`
- [x] Install core deps with Bun: Tailwind, React Flow, Zod, cheerio, etc.

- [ ] Build hero landing page for e-com audience
- [ ] Dynamic persona input form
- [ ] Basic results page skeleton

- [ ] E-com focused scraper (`packages/scraper`)
- [ ] Main analyze API route
- [ ] Connect form to backend

- [ ] Dynamic prompt generation for user personas
- [ ] Parallel LLM calls
- [ ] Progress tracking per persona

- [ ] Implement React Flow canvas showing personas as nodes
- [ ] Animate nodes during analysis (thinking, researching, completed)
- [ ] Build aggregated report with prioritized fixes

- [ ] Connect canvas to real analysis flow
- [ ] Beautiful styling for nodes and edges
- [ ] Loading animations, error handling, rate limiting

- [ ] Deploy to Vercel
- [ ] Test with multiple e-com stores
- [ ] Record demo (canvas in action)
