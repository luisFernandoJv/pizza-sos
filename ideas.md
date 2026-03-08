# Brainstorming de Design - Pizza (Canal de Denúncia Discreto)

## Contexto
Site que funciona como canal discreto de denúncia contra violência doméstica, disfarçado de um serviço de delivery de pizza. O design deve ser:
- **Discreto e seguro**: Aparência comum de um app de delivery
- **Funcional e rápido**: Interface intuitiva para situações de emergência
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **Acessível**: Fácil de usar sob estresse

---

<response>
<probability>0.08</probability>
<text>

## Abordagem 1: Minimalismo Nórdico com Urgência Discreta

**Design Movement**: Escandinavo moderno com toques de design de emergência

**Core Principles**:
- Simplicidade radical: apenas elementos essenciais visíveis
- Hierarquia clara com espaçamento generoso
- Cores neutras com um ponto focal de alerta
- Velocidade percebida através de transições suaves

**Color Philosophy**:
- Fundo branco puro (segurança, clareza)
- Cinza escuro para texto (legibilidade máxima)
- Vermelho discreto (#DC2626) apenas para o botão de pizza (alerta sem pânico)
- Cinza claro para separadores (estrutura sem ruído visual)

**Layout Paradigm**:
- Grid assimétrico: produtos em coluna única no mobile, expandindo para 2-3 colunas no desktop
- Botão de pizza "flutuante" fixo na parte inferior do mobile
- Navegação minimalista: apenas o necessário visível

**Signature Elements**:
- Ícone de pizza simplificado (geométrico)
- Cartões de produto com sombra suave
- Indicador visual de localização (ícone de mapa discreto)

**Interaction Philosophy**:
- Cliques rápidos sem confirmações desnecessárias
- Feedback visual imediato (toast notifications)
- Transições de 200ms para sensação de responsividade

**Animation**:
- Fade-in suave ao carregar produtos
- Pulse sutil no botão de pizza (sem ser alarmante)
- Slide-up do teclado sem delay

**Typography System**:
- Headings: Poppins Bold (peso 700) para impacto
- Body: Inter Regular (peso 400) para clareza
- Tamanhos: 16px mobile, 18px desktop para legibilidade

</text>
</response>

<response>
<probability>0.07</probability>
<text>

## Abordagem 2: Design Warm & Approachable (Falsa Normalidade)

**Design Movement**: Estilo de app moderno e acessível, com toques humanizados

**Core Principles**:
- Aparência de app de delivery comum (Ifood-like)
- Cores quentes e acessíveis
- Componentes arredondados para sensação de segurança
- Ícones ilustrativos e amigáveis

**Color Philosophy**:
- Fundo creme suave (#FFFBF5)
- Laranja quente (#FF6B35) para CTAs normais (delivery típico)
- Rosa profundo (#C1121F) para o botão de pizza (alerta integrado)
- Cinza morno para texto secundário

**Layout Paradigm**:
- Card-based layout com produtos em grid 2x2 mobile, 3x3 desktop
- Header com logo "Pizza Delivery" discreto
- Barra inferior fixa com ícones de navegação
- Botão de pizza como card destacado no topo

**Signature Elements**:
- Ilustrações de pizza em estilo flat design
- Ícones customizados para cada categoria
- Badges de "novo" ou "destaque" em produtos

**Interaction Philosophy**:
- Hover effects suaves em desktop
- Animações de entrada para cada card
- Feedback tátil visual em mobile (ripple effect)

**Animation**:
- Bounce suave ao clicar em cards
- Rotate leve do ícone de pizza no botão
- Expand animation ao abrir detalhes do produto

**Typography System**:
- Headings: Playfair Display (peso 700) para elegância
- Body: Lato (peso 400) para warmth
- Tamanhos: 14px mobile, 16px desktop

</text>
</response>

<response>
<probability>0.09</probability>
<text>

## Abordagem 3: Dark Mode Seguro & Discreto

**Design Movement**: Interface escura moderna com foco em privacidade visual

**Core Principles**:
- Dark mode como padrão (menos visível em ambientes com pouca luz)
- Alto contraste para legibilidade mesmo em situações de estresse
- Minimalismo com toques de sofisticação
- Sensação de privacidade através da paleta escura

**Color Philosophy**:
- Fundo muito escuro (#0F172A - quase preto)
- Texto branco puro para máximo contraste
- Azul profundo (#1E40AF) para elementos secundários
- Vermelho vibrante (#EF4444) para botão de pizza (destaque claro)

**Layout Paradigm**:
- Layout em coluna única com cards stacked
- Botão de pizza como elemento flutuante fixo
- Navegação minimalista com ícones apenas
- Produtos em carrossel horizontal mobile, grid desktop

**Signature Elements**:
- Ícone de pizza com glow effect sutil
- Cards com borda tênue (não filled)
- Indicador de localização com ícone de mapa

**Interaction Philosophy**:
- Cliques diretos sem modais
- Feedback através de toasts discretos
- Transições suaves entre estados

**Animation**:
- Glow pulsante no botão de pizza
- Fade-in dos cards ao carregar
- Slide-in do toast de confirmação

**Typography System**:
- Headings: IBM Plex Sans Bold (peso 700)
- Body: IBM Plex Sans Regular (peso 400)
- Tamanhos: 15px mobile, 16px desktop

</text>
</response>

---

## Decisão

Após análise das três abordagens, a **Abordagem 1 (Minimalismo Nórdico com Urgência Discreta)** foi selecionada porque:

1. **Segurança Visual**: Aparência extremamente discreta e comum, não chama atenção
2. **Funcionalidade**: Hierarquia clara permite ação rápida em situações de emergência
3. **Acessibilidade**: Simplicidade radical reduz cognitivo load sob estresse
4. **Responsividade**: Layout assimétrico funciona perfeitamente em qualquer tamanho
5. **Confiança**: Cores neutras com alerta discreto não parecem "suspeitas" a terceiros

**Paleta Final**:
- Branco puro (#FFFFFF)
- Cinza escuro (#1F2937)
- Cinza claro (#F3F4F6)
- Vermelho alerta (#DC2626)

**Tipografia**:
- Headings: Poppins Bold
- Body: Inter Regular

**Princípio Guia**: "Invisível à primeira vista, poderosa quando necessário"
