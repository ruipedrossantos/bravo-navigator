# BRAVO Navigator

Live: https://ruipedrossantos.github.io/bravo-navigator/

Progressive Web App que mostra a minha posição GPS em tempo real sobre o mapa de um resort, com as zonas de patrulha desenhadas como polígonos e a identificação automática da zona onde estou.

## Porque existe

Construí isto para mim enquanto trabalhava como operador de resposta rápida num resort de luxo do Algarve. O terreno é grande e, como operador novo, precisava de interiorizar depressa as fronteiras das zonas de patrulha (as "BRAVOS") e de saber, a qualquer momento, em qual estava. Em vez de decorar um mapa em papel, quis uma ferramenta que respondesse a isso sozinha, no telemóvel, durante o turno.

## Como está construído

Escolhi **Vanilla JS, sem framework e sem build step**: o âmbito é pequeno, o alojamento no GitHub Pages fica trivial, e o requisito de funcionar offline não justificava a complexidade de um bundler. Também tinha valor de aprendizagem — quis perceber as peças em vez de as esconder.

Uso **Leaflet** para o mapa (maduro, gratuito, à vontade em contexto PWA) com camadas de satélite e mapa. A deteção da zona atual é feita por um **algoritmo de ray casting escrito à mão**, sem biblioteca de point-in-polygon. Com **Leaflet-draw** (`L.Edit.Poly`) posso arrastar os cantos dos polígonos no próprio terreno e afinar as fronteiras — o app foi sendo refinado enquanto o usava. As zonas guardam-se em `localStorage` e há exportação de backup.

Além da navegação, um **Ponto 0** resolve o resto do fluxo: marca o ponto de encontro da equipa e calcula distância (haversine) e rumo (bússola) a partir da minha posição, com passagem direta para o Google Maps.

É uma **PWA** completa: `manifest.json` para instalação e um service worker que mantém o shell da aplicação a funcionar offline. As imagens de satélite, essas, precisam de rede — são demasiados tiles, demasiado pesados, para cachear indiscriminadamente; guardo em cache apenas o essencial.

## Limitações e âmbito

- Só existem 4 zonas e, por convenção operacional, são numeradas de 2 a 5 (não há BRAVO 1).
- Os dados vivem apenas no dispositivo (`localStorage`), sem sincronização nem multiutilizador.
- As coordenadas são aproximadas e afinam-se no terreno.
- É uma ferramenta pessoal, não um produto de equipa.

## Nota sobre privacidade

Não incluo imagens: o mapa mostra as zonas de patrulha reais de um empregador. Publicá-las seria uma quebra de privacidade e de confidencialidade, por isso, por respeito profissional, não o faço nem nomeio o resort.

## Autor

O BRAVO Navigator foi um dos primeiros projectos a resolver um problema real do meu quotidiano — não um exercício de tutorial. Sou autodidata; o meu percurso técnico está no site e no FairwayDesk.

- Site pessoal — https://ruisantos.work
- FairwayDesk (full-stack Nuxt 3) — https://github.com/ruipedrossantos/fairwaydesk
