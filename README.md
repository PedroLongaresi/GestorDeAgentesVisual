# 🪽 HERMES Virtual Office — Multi-Agent Squad Monitor

> **2D Cyberpunk & Industrial Top-Down Virtual Office para Observabilidade, Orquestração e Gestão de Estados de Squads de Agentes Autônomos de IA.**

---

## 💡 O Problema que este Projeto Resolve

Trabalhar com múltiplos agentes de IA no desenvolvimento de software gera desafios críticos:
1. **Caixa-Preta de Execução:** Em terminais com logs simultâneos de 5 ou mais agentes, é quase impossível saber visualmente quem está trabalhando, quem está ocioso esperando prompt ou quem terminou sua entrega.
2. **Poluição do Código de Produção:** Integrar telas ou scripts de monitoramento dentro da aplicação alvo gera acoplamento nocivo. O **HERMES Virtual Office é 100% externo e desacoplado**, observando o sistema de arquivos via `fs.watch`.
3. **Supervisão Humana (Human-in-the-Loop):** Facilita inspecionar o terminal individual de cada agente, verificar quais arquivos ele é dono, seu nível de energia/carga de trabalho e alterar o estado dele com 1 clique.

---

## 🏢 Zonas do Escritório Virtual (Planta 2D Interativa)

| Zona | Descrição | Comportamento do Agente |
|---|---|---|
| 💻 **Baias de Engenharia (#01 a #05)** | Mesas individuais com monitores duplos e mechanical keyboard | Ativo quando o agente está codando ou editando arquivos em disco (`🟢 TRABALHANDO`). |
| 🛋️ **Lounge & Sofá Chill Out** | Área com sofás confortáveis e puffs | Agentes que concluíram seus entregáveis tiram uma soneca (`🟣 DESCANSANDO / Zzz`) para resfriar contexto e recarregar energia. |
| 🕹️ **Fliperama & Descompressão** | Máquinas de arcade e mesas de ping-pong | Agentes com energia cheia que não têm tarefas pendentes ficam em standby (`🟡 OCIOSO / AGUARDANDO PROMPT`). |
| ☕ **Copa & Espresso Bar** | Balcão com máquina de café e vapor | Pausa rápida para recarga de energia (`🔵 NO CAFÉ`). |
| 🪽 **Mesa Central HERMES** | Mesa circular com glass board | Alinhamento e handoff técnico (`🟠 EM REUNIÃO / DAILY`). |

---

## 🤖 A Squad Monitorada

1. **🪽 HERMES Orchestrator:** Tech Lead & Scrum Master dos agentes (`agents/00_POLIGON_TEAM_MANIFEST.md`).
2. **📈 Agente #01 — Product & Business:** Precificação dinâmica e Unit Economics (`js/pricing-engine.js`).
3. **🎨 Agente #02 — UX/UI Design:** Design System industrial e ergonomia da interface (`index.html`, `css/styles.css`).
4. **🧊 Agente #03 — 3D & AI Architect:** Three.js WebGL, CSG e exportação Binary STL (`js/studio3d.js`, `js/ai-generator.js`, `js/stl-exporter.js`).
5. **⚙️ Agente #04 — Full-Stack & Mfg:** Controlador da aplicação, servidor e backoffice OMS (`js/app.js`, `server.js`).
6. **🛡️ Agente #05 — QA & DevOps:** Auditoria de integridade DOM e printability (`docs/QA_VALIDATION_REPORT.md`).

---

## 🚀 Como Executar

### Pré-requisitos
* [Node.js](https://nodejs.org/) v18 ou superior instalado.
* Zero dependências externas (usa apenas módulos nativos `http`, `fs` e `path`).

### Passo a Passo

```bash
# Clone ou acesse o repositório
cd hermes-virtual-office

# Inicie o monitor (porta padrão 4100)
npm start
# ou: node monitor-server.js
```

Abra no seu navegador:
👉 **`http://localhost:4100`**

### Monitorando outro projeto específico
Por padrão, o servidor monitora a pasta irmã `../PROJETO POLIGON`. Para apontar para qualquer outro projeto:

```bash
node monitor-server.js "C:/caminho/do/seu/projeto"
```

Ou usando variável de ambiente:
```bash
PROJECT_PATH="C:/caminho/do/seu/projeto" npm start
```

---

## 🛠️ Tecnologias Utilizadas
* **HTML5 Canvas 2D (60 FPS):** Renderização vetorial fluida, partículas animadas (`Zzz`) e interpolação de caminho (lerp).
* **Node.js Nativo:** Servidor HTTP leve com `fs.watch` em tempo real para detectar arquivos modificados em disco.
* **Modern Web Guidance:** Suporte nativo a `prefers-reduced-motion` e botão de pausa para controle do usuário.
* **Design Industrial & Cyberpunk:** Paleta com tons escuros (Obsidian/Slate), tipografia monoespaciada (`JetBrains Mono` e `Space Grotesk`) e iluminação neon.

---

## 📄 Licença
Distribuído sob a licença [MIT](LICENSE).
