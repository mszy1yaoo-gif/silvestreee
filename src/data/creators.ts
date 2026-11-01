export interface CreatorEntry {
  id: string;
  name: string;
  creatorTag?: string;
  territoryName: string;
  mascot: string; // Emoji/Symbol
  mascotLabel: string;
  pathDescription: string;
  accentColor: string; // Subtle pastel accent
  mediaSrc?: string;
  introduction?: string;
}

export const CREATORS: CreatorEntry[] = [
  {
    id: 'mo-suong-chi-uc-dao',
    name: 'MỘ SƯƠNG CHI ỨC DAO',
    creatorTag: 'creator name: naomi.',
    territoryName: 'rừng mộng',
    mascot: '🐒',
    mascotLabel: 'linh hầu',
    pathDescription: 'con đường hoa dại dẫn lối vào rừng mộng êm đềm',
    accentColor: '#f7d6a4', // Soft warm gold
    mediaSrc: '/assets/aistudio/009baaa4b96631d3d90740aac3b8947a_db939cbc.mp4',
    introduction: "welcome to rừng mộng, nơi sẽ đưa bbi đến các giấc mộng thường đến mộng toàn thấy 'sếch' đấy (๑>◡<๑)",
  },
  {
    id: 'mong-du-ve-may',
    name: 'MỘNG DU VẼ MÂY',
    creatorTag: 'creator name: jun',
    territoryName: 'vườn mộng mơ',
    mascot: '🐑',
    mascotLabel: 'bạch dương',
    pathDescription: 'lối cỏ mềm dẫn vào nơi những giấc mơ mọc thành cây',
    accentColor: '#d6c7f5', // Pale lavender & soft dream pastel
    mediaSrc: '/assets/aistudio/image_d56857e0.png',
    introduction: "Tưới hoa bằng mộng, nuôi tâm hồn bằng thơ.\nLet every word become a flower.",
  },
  {
    id: 'si-ying',
    name: 'Si Ying',
    creatorTag: 'creator name: si ying',
    territoryName: 'tòa soạn cổ thụ',
    mascot: '🦇',
    mascotLabel: 'dạ dực',
    pathDescription: 'nhánh cây rợp bóng che chở tòa soạn ẩn mình giữa rừng già',
    accentColor: '#b0c7c4', // Subtle vintage blue-sage newsprint tint
    mediaSrc: '/assets/aistudio/7d727a282731ddcda200907e962e7917_948b4b48.mp4',
    introduction: 'tao - là bố chúng mày',
  },
  {
    id: 'noi-trien-dong-duom-yen',
    name: 'nơi triền đông đượm yên.',
    creatorTag: 'creator name: chấm',
    territoryName: 'nghĩa địa cổ tích',
    mascot: '🦊',
    mascotLabel: 'xích hồ',
    pathDescription: 'vết chân êm ái trên thảm lá khô hướng về nơi an nghỉ',
    accentColor: '#c7a2b0', // Dusty mauve & faded gothic rose
    mediaSrc: '/assets/aistudio/image_7211c773.png',
    introduction: 'viễn cách trùng dương, gửi đến tiết đông diệu vợi, này đây một tấm chân tình đượm yên.',
  },
  {
    id: 'tiff-be-xiu',
    name: 'Tiff bé xíu',
    creatorTag: 'creator name: tiff.',
    territoryName: 'khu rừng nhỏ',
    mascot: '🦌',
    mascotLabel: 'hoẵng hoa',
    pathDescription: 'bóng gạc hươu hiền hòa bên khung cửa sổ sáng đèn',
    accentColor: '#c8dfbe', // Pale sage
  },
];
