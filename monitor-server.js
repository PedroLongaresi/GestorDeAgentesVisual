/**
 * HERMES VIRTUAL OFFICE — Standalone Agent Squad Monitor Server
 * Observa os arquivos reais do PROJETO POLIGON sem integrar ou alterar o produto.
 * Porta padrão: 4100 (http://localhost:4100)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.MONITOR_PORT || 4100;
const MONITOR_DIR = __dirname;
const TARGET_PATH_ARG = process.argv[2] || process.env.PROJECT_PATH;
const DEFAULT_POLIGON_PATH = path.resolve(__dirname, '..', 'PROJETO POLIGON');
const PROJECT_ROOT = TARGET_PATH_ARG
  ? path.resolve(TARGET_PATH_ARG)
  : (fs.existsSync(DEFAULT_POLIGON_PATH) ? DEFAULT_POLIGON_PATH : __dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png'
};

// Mapeamento oficial de responsabilidade de cada Agente de Desenvolvimento do PROJETO POLIGON
const AGENT_FILE_OWNERSHIP = [
  {
    agentId: 'hermes',
    files: ['agents/00_POLIGON_TEAM_MANIFEST.md']
  },
  {
    agentId: 'agent_1',
    files: [
      'js/pricing-engine.js',
      'docs/BUSINESS_AND_PRICING_MODEL.md',
      'agents/01_PRODUCT_BUSINESS_AGENT.md'
    ]
  },
  {
    agentId: 'agent_2',
    files: [
      'index.html',
      'css/styles.css',
      'docs/UX_UI_DESIGN_SYSTEM.md',
      'agents/02_UX_UI_DESIGN_AGENT.md'
    ]
  },
  {
    agentId: 'agent_3',
    files: [
      'js/studio3d.js',
      'js/ai-generator.js',
      'js/stl-exporter.js',
      'docs/TECHNICAL_ARCHITECTURE_3D_AND_AI.md',
      'agents/03_3D_AI_ARCHITECT_AGENT.md'
    ]
  },
  {
    agentId: 'agent_4',
    files: [
      'js/app.js',
      'server.js',
      'package.json',
      'agents/04_FULLSTACK_MANUFACTURING_AGENT.md'
    ]
  },
  {
    agentId: 'agent_5',
    files: [
      'docs/QA_VALIDATION_REPORT.md',
      'agents/05_QA_DEVOPS_PRINTABILITY_AGENT.md'
    ]
  }
];

const recentFileEvents = [];

function collectProjectTelemetry() {
  const now = Date.now();
  const agentFiles = {};
  let totalFiles = 0;
  let totalBytes = 0;
  let totalLines = 0;

  for (const group of AGENT_FILE_OWNERSHIP) {
    agentFiles[group.agentId] = [];
    for (const relPath of group.files) {
      const fullPath = path.join(PROJECT_ROOT, relPath);
      try {
        if (fs.existsSync(fullPath)) {
          const stat = fs.statSync(fullPath);
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split(/\r?\n/).length;
          const ageSeconds = Math.max(0, Math.round((now - stat.mtimeMs) / 1000));

          totalFiles += 1;
          totalBytes += stat.size;
          totalLines += lines;

          agentFiles[group.agentId].push({
            path: relPath,
            sizeKb: Number((stat.size / 1024).toFixed(1)),
            lines,
            mtimeMs: stat.mtimeMs,
            lastModifiedIso: new Date(stat.mtimeMs).toISOString(),
            ageSeconds
          });
        }
      } catch (_err) {
        // Ignora erro de leitura transitório
      }
    }
  }

  return {
    timestamp: now,
    projectRoot: PROJECT_ROOT,
    summary: {
      totalFiles,
      totalKb: Number((totalBytes / 1024).toFixed(1)),
      totalLines
    },
    agentFiles,
    recentFileEvents: recentFileEvents.slice(0, 15)
  };
}

// Observa modificações reais em disco nas pastas do projeto
const watchedDirs = ['', 'js', 'css', 'docs', 'agents'];
for (const subDir of watchedDirs) {
  const dirPath = path.join(PROJECT_ROOT, subDir);
  if (fs.existsSync(dirPath)) {
    try {
      fs.watch(dirPath, (eventType, filename) => {
        if (!filename || filename.startsWith('.') || filename.includes('hermes-office-monitor')) return;
        const relPath = subDir ? `${subDir}/${filename}` : filename;
        const owner = AGENT_FILE_OWNERSHIP.find((g) => g.files.includes(relPath));
        recentFileEvents.unshift({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          timestamp: Date.now(),
          eventType,
          file: relPath,
          agentId: owner ? owner.agentId : 'agent_4'
        });
        if (recentFileEvents.length > 30) recentFileEvents.length = 30;
      });
    } catch (_e) {
      // Fallback silencioso caso o SO limite watchers
    }
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const cleanUrl = req.url.split('?')[0];

  if (cleanUrl === '/api/telemetry') {
    const data = collectProjectTelemetry();
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
    return;
  }

  let filePath = path.join(MONITOR_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);
  if (!filePath.startsWith(MONITOR_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Arquivo não encontrado no Monitor Hermes.');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('===================================================================');
  console.log(' 🪽 HERMES VIRTUAL OFFICE — MONITOR DE AGENTES (STANDALONE)       ');
  console.log(` 🌐 Acesse o Escritório Virtual: http://localhost:${PORT}          `);
  console.log(` 📂 Monitorando implementação em: ${PROJECT_ROOT}`);
  console.log('===================================================================');
});
