export interface CreatorTerritoryLore {
  creator: string;
  territory: string;
  sentence: string;
}

export const FOREST_TERRITORY_LORE: CreatorTerritoryLore[] = [
  {
    creator: 'Si Ying',
    territory: 'tòa soạn',
    sentence: 'ở đâu đó giữa những tán cây cổ thụ, có một tòa soạn vẫn miệt mài in những câu chuyện kỳ lạ',
  },
  {
    creator: 'Naomi',
    territory: 'khu rừng mộng',
    sentence: 'sâu trong khu rừng, có một nơi những giấc mơ mọc thành cây và những con đường chỉ xuất hiện khi màn đêm buông xuống',
  },
  {
    creator: 'Jun',
    territory: 'vườn mộng mơ',
    sentence: 'phía bên kia rừng cây, một khu vườn chỉ nở hoa khi có người bước vào cùng một giấc mơ mây bay',
  },
  {
    creator: 'Chấm',
    territory: 'nghĩa địa cổ tích',
    sentence: 'ở nơi ánh trăng không bao giờ chạm tới, một nghĩa địa cổ tích nằm im dưới những bụi gai già',
  },
  {
    creator: 'Tiff',
    territory: 'khu rừng nhỏ',
    sentence: 'tận cùng con đường nhỏ, một căn nhà bé xíu vẫn sáng đèn, chờ ai đó lạc đường tìm thấy.',
  },
];

let lastSelectedIndex = -1;

export function getRandomTerritoryLore(): CreatorTerritoryLore {
  const availableIndices = FOREST_TERRITORY_LORE
    .map((_, i) => i)
    .filter((i) => i !== lastSelectedIndex || FOREST_TERRITORY_LORE.length <= 1);

  const nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  lastSelectedIndex = nextIndex;
  return FOREST_TERRITORY_LORE[nextIndex];
}
