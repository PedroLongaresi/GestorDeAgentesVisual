# Manifesto Geral do Time de Agentes da POLIGON (`00_POLIGON_TEAM_MANIFEST`)

> **Visão da POLIGON:** Democratizar a manufatura aditiva no Brasil e no mundo por meio de uma plataforma web integrada onde qualquer pessoa ou empresa pode **desenhar em 3D no navegador**, **gerar modelos 3D com Inteligência Artificial**, **fazer upload de arquivos técnicos (STL/OBJ)**, receber **orçamento industrial instantâneo baseado na geometria exata** e **receber a peça física impressa em casa ou na empresa**.

---

## 1. Organograma da Squad Multi-Agente POLIGON

O ecossistema de engenharia e produto da POLIGON é operado por **5 Agentes Especialistas** altamente coesos, cobrindo de ponta a ponta desde a estratégia de negócios até a validação geométrica para o chão de fábrica:

```mermaid
flowchart TD
    subgraph Diretoria_Estrategia["Camada de Negócios & Produto"]
        A01["01_BUSINESS_STRATEGY_AGENT<br/>Chief Business & Product Strategist<br/>(Unit Economics, Pricing, GTM, B2C/B2B)"]
        A02["02_UX_PRODUCT_DESIGNER_AGENT<br/>Principal UX/UI & 3D Interaction Designer<br/>(Design System, Ergonomia CAD Web, Conversão)"]
    end

    subgraph Engenharia_Core["Camada de Engenharia 3D, IA & Manufatura"]
        A03["03_3D_AI_ARCHITECT_AGENT<br/>Principal 3D Graphics & AI Architect<br/>(WebGL/Three.js, CSG, Cálculo de Volume, Text-to-3D)"]
        A04["04_FULLSTACK_MANUFACTURING_AGENT<br/>Principal Full-Stack & Manufacturing Engineer<br/>(Instant Quoting Engine, Checkout PIX, Print Farm API)"]
    end

    subgraph Qualidade_Fabrica["Camada de Qualidade Industrial & DFM"]
        A05["05_QA_DEVOPS_PRINTABILITY_AGENT<br/>Principal QA, DevOps & Printability Validator<br/>(Análise DFM, Overhangs, Manifold Check, E2E Tests)"]
    end

    A01 -->|"Regras de Margem, Materiais e Personas"| A02
    A01 -->|"Fórmulas de Custo Hora-Máquina e Insumos"| A04
    A02 -->|"Especificações do Studio 3D e Fluxo de Compra"| A03
    A02 -->|"Jornada de Orçamento e Checkout sem Fricção"| A04
    A03 -->|"Volume Exato (cm³), Área (cm²), AABB (mm) e Binário STL"| A04
    A03 -->|"Topologia da Malha, Normais e Geometria CSG/IA"| A05
    A04 -->|"Payload de Produção e Orçamento Calculado"| A05
    A05 -->|"Score de Imprimibilidade DFM e Feedback Visual"| A02
    A05 -->|"Aprovação de G-Code / Fila da Fábrica"| A04
```

---

## 2. Catálogo dos 5 Agentes Especialistas

| ID | Arquivo de Perfil | Papel Principal | Entregáveis Chave |
| :---: | :--- | :--- | :--- |
| **01** | [`01_PRODUCT_BUSINESS_AGENT.md`](file:///c:/Users/Longaresi/Documents/PROJETO%20POLIGON/agents/01_PRODUCT_BUSINESS_AGENT.md) | **Estratégia, Negócios & Precificação** | Modelo de negócios, Unit Economics (CAC/LTV), tabelas de margem por material (PLA, PETG, ABS, Resina 8K, Nylon SLS), estratégia Go-To-Market. |
| **02** | [`02_UX_UI_DESIGN_AGENT.md`](file:///c:/Users/Longaresi/Documents/PROJETO%20POLIGON/agents/02_UX_UI_DESIGN_AGENT.md) | **UX/UI Design & Experiência 3D** | Design System Industrial Dark/Light, interface do Studio 3D acessível para leigos e precisa para engenheiros, jornada de cotação em 1 clique. |
| **03** | [`03_3D_AI_ARCHITECT_AGENT.md`](file:///c:/Users/Longaresi/Documents/PROJETO%20POLIGON/agents/03_3D_AI_ARCHITECT_AGENT.md) | **Arquitetura 3D WebGL & IA Generativa** | Viewport Three.js/R3F, modelador CSG booleano, cálculo matemático de volume via tetraedros assinados ($\text{cm}^3$), pipeline Text/Image-to-3D, exportador `.STL`. |
| **04** | [`04_FULLSTACK_MANUFACTURING_AGENT.md`](file:///c:/Users/Longaresi/Documents/PROJETO%20POLIGON/agents/04_FULLSTACK_MANUFACTURING_AGENT.md) | **Engenharia Full-Stack & Fábrica** | Motor de cotação instantânea, carrinho multi-peças, checkout PIX/Cartão, geração de Ordem de Manufatura e integração com Print Farm. |
| **05** | [`05_QA_DEVOPS_PRINTABILITY_AGENT.md`](file:///c:/Users/Longaresi/Documents/PROJETO%20POLIGON/agents/05_QA_DEVOPS_PRINTABILITY_AGENT.md) | **QA, DevOps & Validador DFM** | Análise de imprimibilidade 3D (malha fechada, overhangs $>45^\circ$, paredes finas, volume de impressão), suíte de testes matemáticos e CI/CD. |

---

## 3. Fluxo de Trabalho Ágil e Colaboração Contínua (End-to-End Workflow)

```mermaid
sequenceDiagram
    autonumber
    actor User as Usuário / Cliente
    participant UX as 02_UX_Designer (Interface)
    participant Arch3D as 03_3D_AI_Architect (Motor 3D & IA)
    participant QA_DFM as 05_QA_Printability (Validador DFM)
    participant FullStack as 04_FullStack_Mfg (Orçamento & Fábrica)
    participant Biz as 01_Business_Strategy (Regras & Margem)

    User->>UX: Descreve ideia via Prompt IA, modela com primitivas CSG ou faz upload de .STL
    UX->>Arch3D: Aciona geração/atualização do grafo de cena 3D (escala em mm)
    Arch3D->>Arch3D: Executa operações CSG e calcula Volume Exato (Signed Tetrahedrons) + Área + AABB
    Arch3D-->>QA_DFM: Envia BufferGeometry para inspeção topológica
    QA_DFM->>QA_DFM: Verifica Manifold, Overhangs (>45°), Paredes Finas e Envelope da Impressora
    QA_DFM-->>UX: Retorna Score DFM (0-100%) e alertas preventivos (ex.: "Suportes Ativados")
    Arch3D-->>FullStack: Envia { volumeCm3, areaCm2, bboxMm } + recomendações DFM
    Biz-->>FullStack: Fornece tabelas de densidade (g/cm³), custo/hora e margem alvo
    FullStack->>FullStack: Calcula Peso (g), Tempo de Impressão (min) e Preço Final (R$) em <16ms
    FullStack-->>UX: Atualiza painel de Orçamento Instantâneo em tempo real
    User->>FullStack: Seleciona Material/Cor/Infill, exporta ou confirma compra via PIX
    FullStack->>Arch3D: Solicita serialização binária IEEE 754 do arquivo .STL final
    Arch3D-->>FullStack: Retorna Blob .STL validado
    FullStack->>QA_DFM: Registra Ordem de Produção na fila da Fazenda de Impressoras 3D
```

---

## 4. Como Acionar Cada Agente (Guia de Prompts e Comandos)

Para evoluir qualquer módulo da plataforma POLIGON, utilize o perfil correspondente como contexto principal:

### 4.1. Para evoluir a Precificação, Catálogo de Materiais ou Estratégia Comercial
- **Agente:** `01_BUSINESS_STRATEGY_AGENT`
- **Exemplo de Acionamento:**
  > *"Atue como o `01_BUSINESS_STRATEGY_AGENT`. Recalibre a curva de descontos B2B para pedidos acima de 100 unidades em Nylon PA12 SLS considerando redução de 40% no custo de setup."*

### 4.2. Para criar novas telas, melhorar a usabilidade do Editor 3D ou aumentar conversão
- **Agente:** `02_UX_PRODUCT_DESIGNER_AGENT`
- **Exemplo de Acionamento:**
  > *"Atue como o `02_UX_PRODUCT_DESIGNER_AGENT`. Desenhe o componente visual de comparação interativa de acabamento de camada (0.28mm Draft vs 0.12mm Alta Precisão vs 0.05mm Resina 8K)."*

### 4.3. Para novas ferramentas de modelagem 3D, Shaders, CSG ou IA Generativa 3D
- **Agente:** `03_3D_AI_ARCHITECT_AGENT`
- **Exemplo de Acionamento:**
  > *"Atue como o `03_3D_AI_ARCHITECT_AGENT`. Implemente uma ferramenta de chanfro paramétrico e gravação de texto 3D em baixo-relevo (CSG Subtract) sobre qualquer malha STL importada."*

### 4.4. Para APIs de Checkout, Integração com Slicers (PrusaSlicer/OrcaSlicer CLI) e ERP
- **Agente:** `04_FULLSTACK_MANUFACTURING_AGENT`
- **Exemplo de Acionamento:**
  > *"Atue como o `04_FULLSTACK_MANUFACTURING_AGENT`. Crie o endpoint de webhook que recebe a confirmação do PIX, envia o arquivo STL para fatiamento automático via CLI e aloca a impressora Bambu Lab X1C livre."*

### 4.5. Para Regras DFM, Reparo Automático de Malha e Testes Automatizados
- **Agente:** `05_QA_DEVOPS_PRINTABILITY_AGENT`
- **Exemplo de Acionamento:**
  > *"Atue como o `05_QA_DEVOPS_PRINTABILITY_AGENT`. Adicione um algoritmo de orientação automática (Auto-Orientation) que rotaciona a peça no eixo X/Y para minimizar a área de overhangs críticos antes do orçamento."*
