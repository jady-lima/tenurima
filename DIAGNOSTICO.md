# Diagnóstico

**Etapa 1 — Diagnóstico**

- Página avaliada: https://biogutex.com/

- Larguras testadas: 360px, 768px e 1440px.

- Metodologia: inspeção visual/funcional das larguras + inspeção do código-fonte e teste de todos os links de destino (contato, shipping, botões de compra, etc).

---

## Erro 1 - Baixo contraste de texto na seção "Why Alpha Rock"

**1. O que está errado?**

Na seção "Why Alpha Rock" a cor do texto fica muito próxima da cor do fundo. O usuário precisa forçar a leitura ou selecionar o texto para conseguir ler.

**2. Onde está?**

Seção `WHY ALPHA ROCK` / "Built for Men Who Demand More From Themselves", no bloco de parágrafo sobre o fundo escuro com as imagens decorativas.

**3. Por que acontece?**

Acredito que a cor do texto foi definida como uma cor fixa pensando em um fundo claro, mas essa seção usa um fundo escuro/imagem, o que oculta sua visualização. Um possivel motivo pode ser reaporveitamento de CSS de uma classe genérica sem uma sobreposição com cores adequadas para a imagem.

**4. Como corrigiria?**

Definir uma cor de texto específica para essa seção garantindo contraste contra o fundo real daquele bloco, realizando testes para diferentes resoluções de tela para evitar problemas em que em algum ponto da imagem a cor não se adapte.

**5. Gravidade: Médio**

Não impede a compra, mas essa seção existe justamente para convencer o usuário do valor do produto — se ele não consegue ler, a mensagem se perde e a taxa de conversão sofre. Não é "Crítico" mas dificulta a compreensão do usuário acerca do produto.

---

## Erro 2 — Itens do FAQ não expandem ao clicar

**1. O que está errado?**

Ao clicar em uma pergunta do FAQ, o conteúdo da resposta não aparece - o accordion não expande como o usuário espera visualmente, o item parece clicável, tem ícone de seta para expandir, mas nada acontece.

**2. Onde está?**

Seção "Frequently Asked Questions", em todos os itens do accordion.

**3. Por que acontece?**

Há alguns motivos que o erro pode acontecer, mas acredito que nesse caso, como não foi encontrado nenhum erro no console que referencie erro no JavaScript, é devido a falta da implementação da ação, ou seja, foi apenas uma implementação com HTML e CSS sem ação nos elementos.

**4. Como corrigiria?**

Seria necessário implementar uma função JS para que a cada clique o accordion ative/abra e desative/feche considerando a escolha do usuário.

**5. Gravidade: Crítico**

Não é um erro estético, considerando que o FAQ é onde ficam informações essenciais para a tomada de decisão do usuário durante o processo de compra ou pós.

---

## Erro 3 — Links de compra e de contato quebrados (404)

**1. O que está errado?**

- O link "to your contact page", dentro do bloco de garantia de satisfação, e os botões "Add To Cart" dos planos **2 Bottles** e **3 Bottles**  levam a uma página de erro "not found".

**2. Onde está?**

- Bloco "100% Satisfaction Guaranteed"
- Cards de oferta (seção de preços, `#kits`): botões apontando para promoção `Basic` e `Standard`.

**3. Por que acontece?**

- O link de contato tem um erro de digitação na extensão do arquivo: `contact.hmtl` em vez de `contact.html`. A página `contact.html` existe e funciona normalmente, usado no footer da página.
- Os links `/linkoffer` e `/linkoffer3` retornam 404 diretamente - o que pode indicar  que essas rotas não foram publicadas ou foram removidas.

**4. Como corrigiria?**

- Corrigir o link de `contact.hmtl` para `contact.html`. 
- Para os botões de compra, confirmar o real motivo das páginas não exitirem e se houver a necessidade, implementar uma nova página de compra.

**5. Gravidade: Crítico**

Isso quebra a função principal do site que seria vender. Dois dos três planos de compra não funcionam, e o canal de suporte (contato) também está inacessível no ponto que provavelmente ele seria mais solicitado, na garantia.

---

## Erro 4 — Seção de oferta ("Order Your Alpha Rock") quebra em telas pequenas

**1. O que está errado?**

Nas larguras de 360px e 768px, os cards de plano e seus textos não se adaptam para caber na tela. Os elementos mantêm um tamanho fixo, "estourando" a largura da tela o que força rolagem horizontal/scroll extra o que dificulta a leitura dos preços e clicar nos botões corretos.

**2. Onde está?**

Seção de preços (`#kits` / "Order Your Alpha Rock"), nas três colunas de oferta.

**3. Por que acontece?**

Os elementos dessa seção (cards, imagens de botão, textos) provavelmente estão com dimensões fixas em pixels em vez de unidades relativas (%, rem, `fr`, `minmax()`), e não há ajustes abaixo de um certo breakpoint. Um motivo pode ser o grid/flexbox ajustado pensando só em desktop sem testes na versão responsiva.

**4. Como corrigiria?**

Trocar dimensões fixas por relativas, e adicionar breakpoints específicos para 360–768px testando o conteúdo.

**5. Gravidade: Crítico**

Essa é exatamente a seção onde o usuário toma a decisão de compra e clica para comprar e a maioria costuma ser mobile. Se a seção quebra em 360px e 768px, uma grande quantidade dos visitantes não consegue ver os preços ou comprar.

---

## Erro 5 — Título da aba do navegador não é o nome do produto

**1. O que está errado?**

A aba do navegador mostra "SteelPower" em vez de "AlphaRock", o nome real do produto vendido na página.

**2. Onde está?**

Tag `<title>` do `<head>` do HTML.

**3. Por que acontece?**

Tudo indica que essa página foi construída a partir de um template/projeto anterior chamado "SteelPower" e foi replicada para AlphaRock trocando o conteúdo visível, mas sem atualizar o `<head>`.

**4. Como corrigiria?**

Atualizar `<title>`, `meta description` para refletir a marca AlphaRock e usar imagens/domínio próprios.

**5. Gravidade: Médio**

Não impede a compra, mas prejudica a credibilidade da marca, usuário pode notar e desconfiar do site.

---

## Erro 6 — Página de Shipping com layout inconsistente

**1. O que está errado?**

Ao acessar o link "Shipping" no rodapé, a página abre com um visual completamente diferente do resto do site.

**2. Onde está?**

Na página acessada ao clicar em `shipping` .

**3. Por que acontece?**

Confirmado: essas páginas realmente não usam o mesmo template, ele não segue o padrão nem da home e nem das demais páginas referenciadas no rodapé.

**4. Como corrigiria?**

Envolver essas páginas institucionais no mesmo layout/template já usado, garantindo consistência visual e permitindo que o usuário sempre consiga voltar/navegar pelo site a partir delas.

**5. Gravidade: Baixo**

É um problema de consistência, mas não impede o usuário de ler a informação ou de voltar.

---

## Erro 7 - Botão de "Buy now" do plano "Mais Popular" sem ação.

**1. O que está errado?**

Diferente dos outros dois botões que têm link, mesmo que quebrado (Erro 3), o botão do plano principal aparece no código apenas como uma imagem, sem um `href` associado visível.

**2. Onde está?**

Seção de preços (`#kits` / "Order Your Alpha Rock"), a coluna de oferta principal.


**3. Por que acontece?**

Acredito que a intenção era adicionar uma ação ao clicar na imagem, no entanto, ela não aparece implementado o link que indica para onde o usuário seria encaminhado.

**4. Como corrigiria?**

Adicionaria o `href` a tag `a` que engloba a imagem, adicionando o link ao local de efetivação da compra.

**5. Gravidade: Crítico**

O problema afeta diretamente a efetuação da compra do usuário, além de efetar de maneira significativa a experiência, visto que há uma animação já sobre o botão que pode também confundir o usuário com o próprio cursor.

---