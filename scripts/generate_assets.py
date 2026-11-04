import os

def create_retailmind_svg():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 260" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="rmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#d97706" stop-opacity="0.04" />
    </linearGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#f59e0b" fill-opacity="0.7"/>
    </marker>
  </defs>

  <!-- Connectors -->
  <path d="M 148 120 L 180 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />
  <path d="M 308 120 L 340 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />
  <path d="M 468 120 L 500 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />
  <path d="M 628 120 L 660 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />
  <path d="M 788 120 L 820 120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#arrow)" />

  <!-- Node 1 -->
  <g transform="translate(20, 60)">
    <rect width="128" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.2" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">01</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Query Parse</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Intent extraction</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#f59e0b">User Constraints</text>
  </g>

  <!-- Node 2 -->
  <g transform="translate(180, 60)">
    <rect width="128" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.2" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">02</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">RAG Retrieval</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">BGE-M3 Dense Vec</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#f59e0b">ChromaDB Store</text>
  </g>

  <!-- Node 3 -->
  <g transform="translate(340, 60)">
    <rect width="128" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.2" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">03</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Context Memory</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Multi-turn tracking</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#f59e0b">LangGraph State</text>
  </g>

  <!-- Node 4 -->
  <g transform="translate(500, 60)">
    <rect width="128" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.2" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">04</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Aspect Sentiment</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Durability & Value</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#f59e0b">Review Corpus</text>
  </g>

  <!-- Node 5 -->
  <g transform="translate(660, 60)">
    <rect width="128" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.2" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">05</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Multi-Ranking</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Weighted balancing</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#f59e0b">Pareto Optimal</text>
  </g>

  <!-- Node 6 -->
  <g transform="translate(820, 60)">
    <rect width="120" height="120" rx="12" fill="url(#rmGrad)" stroke="#f59e0b" stroke-opacity="0.5" stroke-width="1.8" />
    <circle cx="28" cy="30" r="14" fill="#f59e0b" fill-opacity="0.3" />
    <text x="28" y="35" text-anchor="middle" font-family="monospace" font-size="12" font-weight="bold" fill="#f59e0b">06</text>
    <text x="20" y="66" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Explainable Out</text>
    <text x="20" y="84" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Audited Rationale</text>
    <text x="20" y="98" font-family="monospace" font-size="8.5" fill="#10b981">Verified Decision</text>
  </g>
</svg>'''
    for path in ['src/assets/generated/retailmind-architecture.svg', 'public/retailmind-architecture.svg']:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)

def create_medsafe_svg():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 220" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="medGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.04" />
    </linearGradient>
    <marker id="medArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" fill-opacity="0.8"/>
    </marker>
  </defs>

  <path d="M 148 110 L 180 110" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#medArrow)" />
  <path d="M 308 110 L 340 110" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#medArrow)" />
  <path d="M 468 110 L 500 110" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#medArrow)" />
  <path d="M 628 110 L 660 110" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#medArrow)" />

  <g transform="translate(20, 50)">
    <rect width="128" height="110" rx="10" fill="url(#medGrad)" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="20" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8">01. INGESTION</text>
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Prescription Text</text>
    <text x="20" y="76" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Unstructured input</text>
    <text x="20" y="92" font-family="monospace" font-size="8.5" fill="#38bdf8">Raw Clinical Data</text>
  </g>

  <g transform="translate(180, 50)">
    <rect width="128" height="110" rx="10" fill="url(#medGrad)" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="20" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8">02. EXTRACTION</text>
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Document NER</text>
    <text x="20" y="76" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Drug names & dose</text>
    <text x="20" y="92" font-family="monospace" font-size="8.5" fill="#38bdf8">FastAPI Backend</text>
  </g>

  <g transform="translate(340, 50)">
    <rect width="128" height="110" rx="10" fill="url(#medGrad)" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="20" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8">03. SCHEMA</text>
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">JSON Normalize</text>
    <text x="20" y="76" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Canonical mapping</text>
    <text x="20" y="92" font-family="monospace" font-size="8.5" fill="#38bdf8">RxNorm IDs</text>
  </g>

  <g transform="translate(500, 50)">
    <rect width="128" height="110" rx="10" fill="url(#medGrad)" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="20" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8">04. CONFLICT</text>
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Rules Engine</text>
    <text x="20" y="76" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Adverse interactions</text>
    <text x="20" y="92" font-family="monospace" font-size="8.5" fill="#ef4444">Risk Matrix</text>
  </g>

  <g transform="translate(660, 50)">
    <rect width="140" height="110" rx="10" fill="url(#medGrad)" stroke="#38bdf8" stroke-opacity="0.5" stroke-width="1.8" />
    <text x="20" y="32" font-family="monospace" font-size="11" font-weight="bold" fill="#38bdf8">05. DASHBOARD</text>
    <text x="20" y="58" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="currentColor">Clinical Alerts</text>
    <text x="20" y="76" font-family="system-ui, sans-serif" font-size="9.5" fill="currentColor" opacity="0.7">Severity rankings</text>
    <text x="20" y="92" font-family="monospace" font-size="8.5" fill="#10b981">React UI View</text>
  </g>
</svg>'''
    for path in ['src/assets/generated/medsafe-workflow.svg', 'public/medsafe-workflow.svg']:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)

def create_noise_svg():
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.8"/>
</svg>'''
    for path in ['src/assets/generated/subtle-noise.svg', 'public/subtle-noise.svg']:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(svg)

if __name__ == '__main__':
    create_retailmind_svg()
    create_medsafe_svg()
    create_noise_svg()
    print("Creative SVG assets generated in src/assets/generated and public/ successfully!")
