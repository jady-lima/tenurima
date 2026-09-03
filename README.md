# Tenurima - Desafio Técnico

Implementação em HTML, CSS e JavaScript da landing page **Tenurima**, a partir do layout fornecido no Figma para o desafio técnico. O objetivo era reproduzir a página com fidelidade ao design, sem uso de frameworks ou bibliotecas de UI.

## Sumário

- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Decisões tomadas onde o Figma era omisso](#decisões-tomadas-onde-o-figma-era-omisso)
- [Acessibilidade](#acessibilidade)
- [Diagnóstico da página original](#diagnóstico-da-página-original)
- [O que eu faria diferente com mais tempo](#o-que-eu-faria-diferente-com-mais-tempo)
- [Licença](#licença)

## Stack

- **HTML5** semântico (`header`, `main`, `section`, `article`, `nav`, `footer`, `details/summary`)
- **CSS3** puro, organizado com variáveis e sem pré-processador
- **JavaScript** (sem jQuery, sem libs de animação)

Nenhuma dependência externa, build step ou gerenciador de pacotes é necessário.

## Como rodar

Não há instalação nem build. Basta abrir `index.html` diretamente no navegador, ou servir a pasta com um servidor estático (recomendado, para o `loading="lazy"` e caminhos relativos funcionarem exatamente como em produção):

```bash
npx serve .
# ou
python -m http.server 8080
```

Depois acesse `http://localhost:8080` (ou a porta indicada pelo terminal).

## Estrutura do projeto

```
├── index.html              # marcação semântica de todas as seções da página
├── README.md
├── DIAGNOSTICO.md           # auditoria da página original (Etapa 1 do desafio)
│
├── css/
│   ├── reset.css            # normalizações básicas entre navegadores
│   ├── variables.css        # design tokens: cores, tipografia, espaçamento, raios
│   └── base.css              # estilos de layout e componentes de cada seção
│
├── js/
│   └── main.js               # carrossel de depoimentos, ticker de selos e FAQ
│
└── assets/
    ├── fonts/                 # Montserrat e Inter em .woff2
    ├── icons/                 # ícones de interface (svg)
    └── images/                # imagens por seção (hero, about, ingredients, ...)
```

## Decisões tomadas onde o Figma era omisso

O Figma trazia o visual estático das seções, mas não especificava o comportamento de várias interações. Documentando as decisões tomadas:

- **FAQ (accordion).** O Figma mostrava apenas o primeiro item aberto. Implementei com `<details>/<summary>` nativos, usando o atributo `name="faq"` para que abrir um item feche os demais automaticamente (comportamento exclusivo nativo dos browsers modernos). Para navegadores sem suporte a `details` exclusivos, `js/main.js` faz a checagem de suporte (`supportsExclusiveDetails`) e aplica um fallback via JS que fecha os outros itens no evento `toggle`. Isso corrige também o erro 2 do `DIAGNOSTICO.md` (itens que não abriam ao clicar).

- **Carrossel de depoimentos.** O Figma não especificava como a navegação funcionaria além dos botões de seta. Implementei:
  - Navegação por clique nos botões (anterior/próximo), com `disabled` automático nas pontas.
  - Arraste (drag) via Pointer Events no desktop e touch/mouse, permitindo deslizar o carrossel manualmente.
  - Um `click` durante o arraste é suprimido (`preventDefault`/`stopPropagation`) para não disparar links acidentalmente ao soltar o drag.

- **Faixa de selos infinita ("60 DAY GUARANTEE • NATURAL FORMULA...").** O Figma mostrava um texto corrido decorativo sem indicar se seria estático ou animado. Optei por duplicar o conteúdo via JS (`.info-footer-track`) até preencher a largura do container e permitir um loop visual contínuo via CSS, mantendo o texto real em `.sr-only` para leitores de tela (evitando repetição audível do texto duplicado).

- **Links sem destino real (`Buy Now`, `Contact Page`, links do footer).** Como não há back-end nem páginas de destino reais no escopo deste desafio, mantive esses links como âncoras (`href="#"` ou `href="#pricing"`) em vez de apontar para URLs inexistentes, evitando reproduzir o erro "not found" da página auditada.

- **Consistência visual entre seções.** Todas as seções internas (incluindo o que seria o link de "Shipping" no rodapé) seguem o mesmo sistema de tokens do `variables.css`, evitando o design divergente relatado no erro 6 do diagnóstico.

### Acessibilidade

- Uso de tags semânticas (`header`, `nav`, `main`, `section`, `article`, `footer`) e headings em ordem hierárquica.
- `alt` descritivo em imagens de conteúdo (produto, depoimentos, ingredientes); imagens puramente decorativas usam `alt=""` com `aria-hidden="true"` para não poluir a leitura por leitor de tela.
- `aria-label` em links/botões apenas com ícone (ex.: setas do carrossel, link de "rolar para a próxima seção").
- Foco visível mantido nos elementos interativos nativos (`summary` do FAQ), nenhum `outline` foi removido sem substituto.

## O que eu faria diferente com mais tempo

- Revisar `js/main.js` para extrair o carrossel como um pequeno componente reutilizável, isolando estado e reduzindo a quantidade de listeners globais.
- Aumentar/melhorar as transições e estados de hover, deixando as interações mais fluidas e perceptíveis.
- Redistribuir as propriedades do CSS, removendo o máximo de redundâncias entre seções e componentes semelhantes.
- Adaptação para dark mode.
- Seção de contato com um formulário, permitindo uma comunicação mais direta com o usuário.

## Licença

Distribuído sob os termos do arquivo [`LICENSE`](./LICENSE).
