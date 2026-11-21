export type ColorId = 'asfalto' | 'concreto' | 'sinal' | 'mata'

export const colors: { id: ColorId; name: string; note: string; bike: string; bike2: string; field: string; fieldInk: string; hl: string }[] = [
  { id: 'asfalto', name: 'Asfalto', note: 'Grafite fosco, o tom de quem não quer ser notado.', bike: '#34444d', bike2: '#1d282e', field: '#ece6da', fieldInk: '#050f16', hl: '#ff7a1f' },
  { id: 'concreto', name: 'Concreto', note: 'Cinza claro de calçada recém-lavada.', bike: '#cdc8bc', bike2: '#a29d90', field: '#16262f', fieldInk: '#f4efe6', hl: '#ff7a1f' },
  { id: 'sinal', name: 'Sinal', note: 'Laranja de cone de obra: ninguém diz que não viu.', bike: '#ff7a1f', bike2: '#cf5a0a', field: '#050f16', fieldInk: '#f4efe6', hl: '#ffffff' },
  { id: 'mata', name: 'Mata', note: 'Verde fechado, de praça com sombra boa.', bike: '#2f6b4f', bike2: '#1b402e', field: '#dfe8d9', fieldInk: '#050f16', hl: '#ff7a1f' },
]

export type Focus = 'frame' | 'motor' | 'battery' | 'belt'

export const chapters: {
  id: string
  focus: Focus
  value: number
  dec: number
  unit: string
  title: string
  text: string
  img: string
  alt: string
  caption: string
  callout: { label: string; x: number; y: number; side: 'l' | 'r' }
}[] = [
  {
    id: 'leve',
    focus: 'frame',
    value: 9.4,
    dec: 1,
    unit: 'kg',
    title: 'Nove quilos de bicicleta.',
    text: 'O quadro é de alumínio hidroformado, com a solda lixada à mão, e a bateria mora dentro do tubo inferior. Sem cabo solto, sem peso à toa. Quem mora no terceiro andar sem elevador já entendeu.',
    img: 'escada-rampa.jpg',
    alt: 'Escadaria de granito com uma canaleta de metal ao centro para rolar a bicicleta degrau abaixo',
    caption: 'Escadaria com canaleta para rolar a bicicleta.',
    callout: { label: 'Quadro · 9,4 kg', x: 54, y: 33, side: 'r' },
  },
  {
    id: 'motor',
    focus: 'motor',
    value: 45,
    dec: 0,
    unit: 'N·m',
    title: 'Um motor que não se anuncia.',
    text: 'Motor de 250 W no cubo traseiro e sensor de torque no pedivela. A ajuda chega na proporção da sua pedalada, sem tranco e sem zumbido: 48 dB, menos que uma conversa na calçada.',
    img: 'faixa-amarela.jpg',
    alt: 'Duas faixas amarelas pintadas lado a lado sobre asfalto cinza',
    caption: 'Faixa dupla no asfalto.',
    callout: { label: 'Motor · 250 W', x: 22.2, y: 65.4, side: 'r' },
  },
  {
    id: 'bateria',
    focus: 'battery',
    value: 90,
    dec: 0,
    unit: 'km',
    title: 'Uma semana de trajeto numa carga.',
    text: 'A bateria de 360 Wh sai do quadro com um giro de chave e carrega na tomada da cozinha em 2 h 40. São 9 km na ida e 9 na volta: cinco dias úteis, e ainda sobra bateria para o sábado.',
    img: 'orla-ponte.jpg',
    alt: 'Ciclista segue por uma passarela à beira do rio, com uma ponte estaiada ao fundo',
    caption: 'Passarela de beira de rio, com ponte ao fundo.',
    callout: { label: 'Bateria · 360 Wh', x: 58.9, y: 56.7, side: 'r' },
  },
  {
    id: 'correia',
    focus: 'belt',
    value: 30000,
    dec: 0,
    unit: 'km',
    title: 'Sem corrente, sem graxa na calça.',
    text: 'A correia de carbono dura até 30 mil km, não pede óleo e não faz barulho. A barra da calça chega limpa ao trabalho e continua limpa no bar.',
    img: 'ciclovia.jpg',
    alt: 'Ciclista pedala por uma ciclovia entre um gramado e uma árvore florida, com prédios ao fundo',
    caption: 'Ciclovia entre gramado e árvore florida.',
    callout: { label: 'Correia · 30 mil km', x: 45.6, y: 70.8, side: 'l' },
  },
]

export const specs: [string, string][] = [
  ['9,4 kg', 'Peso completo, com bateria, no tamanho M.'],
  ['250 W', 'Motor no cubo traseiro, 45 N·m de torque, sensor no pedivela.'],
  ['360 Wh', 'Bateria removível. Carga completa na tomada em 2 h 40.'],
  ['90 km', 'Autonomia estimada em modo eco, piloto de 75 kg, terreno plano.'],
  ['32 km/h', 'A ajuda do motor para aqui, dentro do teto previsto para bicicletas elétricas no Brasil.'],
  ['IP65', 'Chuva e mangueira não assustam o motor nem a bateria.'],
]

export type ModelId = 'nove' | 'longo' | 'dobra'

export const models: {
  id: ModelId; name: string; role: string; price: number; weight: string; range: number
  motor: string; battery: string; charge: string; fits: string; colors: string
}[] = [
  { id: 'nove', name: 'Nove', role: 'O de todo dia', price: 11900, weight: '9,4 kg', range: 90, motor: '250 W', battery: '360 Wh', charge: '2 h 40', fits: 'Elevador e escada', colors: '4 cores' },
  { id: 'longo', name: 'Nove Longo', role: 'Para quem mora longe', price: 13900, weight: '10,8 kg', range: 160, motor: '350 W', battery: '640 Wh', charge: '4 h 10', fits: 'Elevador e escada', colors: '3 cores' },
  { id: 'dobra', name: 'Nove Dobra', role: 'Para o porta-malas', price: 10400, weight: '12,1 kg', range: 60, motor: '250 W', battery: '250 Wh', charge: '1 h 50', fits: 'Porta-malas e sob a mesa', colors: '2 cores' },
]

export const brl = (n: number) => 'R$ ' + n.toLocaleString('pt-BR')

export const points = ['São Paulo · Pinheiros', 'Curitiba · Batel', 'Belo Horizonte · Savassi']

export const credits: { title: string; by: string; lic: string; url: string }[] = [
  { title: 'Evening Cyclist', by: 'Nick Page Photos', lic: 'CC BY 2.0', url: 'https://www.flickr.com/photos/27506472@N04/8106152459' },
  { title: 'Rama VIII Bridge & the Chao Phraya River, Bangkok Bicycle Tour', by: 'David McKelvey', lic: 'CC BY 2.0', url: 'https://commons.wikimedia.org/w/index.php?curid=112989780' },
  { title: 'Bike rail, public stairs', by: 'La Citta Vita', lic: 'CC BY-SA 2.0', url: 'https://www.flickr.com/photos/49539505@N04/4764105631' },
  { title: 'Yellow Lines', by: 'Tim Sullivan', lic: 'CC0', url: 'https://stocksnap.io/photo/yellow-lines-OJYARI0WOY' },
  { title: 'Cyclist Super Highway', by: 'Kurayba', lic: 'CC BY-SA 2.0', url: 'https://www.flickr.com/photos/48503330@N08/52141470529' },
]
