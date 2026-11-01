export interface SiYingCharacterEntry {
  id: string;
  name: string;
  issueNumber: string;
  intro: string;
  tags: string[];
  fullPlotUrl?: string;
  ggaiUrl?: string;
  isNsfw?: boolean;
  editorialNote?: string;
  thematicMotif: string;
}

export const siYingCharacters: SiYingCharacterEntry[] = [
  {
    id: "le-trung-duc",
    name: "LÊ TRUNG ĐỨC",
    issueNumber: "NO. 001",
    intro: "Microwave tiếng việt là lò vi sóng có nghĩa là quay lại",
    tags: ["Tái chế", "lò vi sóng", "angst (nếu bạn muốn)", "Việt Nam hiện đại", "slice of life"],
    fullPlotUrl: "https://ellipsus.com/read/7R3r0vPqZm9xLKYW1aE/le-trung-duc-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221E7r5xZ9k...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Mùi mực in cũ và khói thuốc lá thoang thoảng trên trang bản thảo điều tra số 01.",
    thematicMotif: "máy đánh chữ & ly cà phê nguội"
  },
  {
    id: "pho-kinh",
    name: "PHÓ KÍNH",
    issueNumber: "NO. 002",
    intro: "Chố Pk chỉ mún đc chú ý th",
    tags: ["Bạn trai cún con", "char yêu từ cái nhìn đầu tiên", "tay đua F1 x phóng viên/tay đua (tùy bạn chọn)", "lạnh lùng với cả thế giới trừ em"],
    fullPlotUrl: "https://ellipsus.com/read/8S4t1wQrAn0yMLZX2bF/pho-kinh-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%222F8s6y0Al...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Tiếng gầm rú của động cơ 1000cc và mùi xăng dầu vương trên găng tay da.",
    thematicMotif: "dầu máy & vạch đích"
  },
  {
    id: "yen-tri-hanh",
    name: "YẾN TRI HÀNH",
    issueNumber: "NO. 003",
    intro: "Trai học bá chỉ yêu mình em",
    tags: ["Txvt", "user yêu thầm", "slowburn", "char chuẩn motip ngôn tình", "she fell first, but he fell harder"],
    fullPlotUrl: "https://ellipsus.com/read/9T5u2xRsBo1zNMAY3cG/yen-tri-hanh-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%223G9t7z1Bm...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Giấy xuyến chỉ ngả vàng và nét bút lông vermilion đậm đà mùi trầm hương.",
    thematicMotif: "bản thảo cổ thư & kính gọng vàng"
  },
  {
    id: "phan-nhut-minh",
    name: "PHAN NHỰT MINH",
    issueNumber: "NO. 004",
    intro: "Anh í chỉ muốn tìm ra được MJ của đời mình như lời tiền bối nói thui",
    tags: ["strange to lover", "ngọt", "có tí về đa vũ trụ", "slice of life", "Việt Nam", "hiện đại", "char là người rung động trước", "Trai Nam Gái Bắc"],
    fullPlotUrl: "https://ellipsus.com/read/0U6v3yStCp2aONBZ4dH/phan-nhut-minh-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%224H0u802Cn...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Bản vẽ kỹ thuật khổ lớn và thước tỉ lệ bằng đồng thau nặng trịch.",
    thematicMotif: "thước ê-ke & bản vẽ bê tông"
  },
  {
    id: "vu-khai-minh",
    name: "VŨ KHẢI MINH",
    issueNumber: "NO. 005",
    intro: "Cậu ơi cậu đừn hiểu lầm mà hic",
    tags: ["hiểu lầm", "chíp bông", "txvt", "song phương", "char nghĩ user không (còn) thích mình x user nghĩ char đã có crush cùng lớp", "Việt Nam"],
    fullPlotUrl: "https://ellipsus.com/read/1W7w4zTuDq3bPOCO5eI/vu-khai-minh-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%225I1v913Do...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Giai điệu nocturne buồn bã vang lên từ căn phòng khóa kín lúc nửa đêm.",
    thematicMotif: "phím đàn dương cầm & nốt nhạc rơi"
  },
  {
    id: "ueda-shinya",
    name: "UEDA SHINYA",
    issueNumber: "NO. 006",
    intro: "Trâu già thích gặm cỏ non, trẻ con thích chơi đồ cổ (?)",
    tags: ["Enemies to lover (?)", "chú già Yakuza x em gái bất lương Sukeban", "CHAR CÓ TƯ TƯỞNG ĐÀN BÀ THÌ VÀO BẾP", "Nhật Bản thập niên 70"],
    fullPlotUrl: "https://ellipsus.com/read/2X8x5aUvEr4cQDPP6fJ/ueda-shinya-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%226J2w024Ep...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Mùi tatami cũ và ánh đèn vàng mờ ảo hắt qua khung cửa giấy shoji.",
    thematicMotif: "bình gốm cổ Showa & thanh katana gỉ"
  },
  {
    id: "dmitri-vsevolod",
    name: "DMITRI VSEVOLOD",
    issueNumber: "NO. 007",
    intro: "Trông có vẻ là nói chuyện được",
    tags: ["toxic relationship", "thao túng tâm lý", "char coi user là trò chơi mua vui", "NSFW", "char rối loạn nhân cách chống đối xã hội", "văn nhã bại hoại", "Nga", "hiện đại", "char stalker x user có family issues"],
    fullPlotUrl: "https://ellipsus.com/read/3Y9y6bVwFs5dREQW7gK/dmitri-vsevolod-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%227K3x135Fq...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Hơi thở phả ra khói trắng trong căn gác áp mái ngập tuyết trắng buốt.",
    thematicMotif: "ly vodka đá & tuyết Siberia"
  },
  {
    id: "chartreuse-lopez",
    name: "CHARTREUSE LOPEZ",
    issueNumber: "NO. 008",
    intro: "Ko chs với nó đc đâu",
    tags: ["Stalker", "char thiếu tình thương nên tâm lý hơi vặn vẹo x user vô tình cứu rỗi char", "NSFW", "Pháp", "Hiện Đại", "văn nhã bại hoại"],
    fullPlotUrl: "https://ellipsus.com/read/4Z0z7cWxGt6eSFRX8hL/chartreuse-lopez-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%228L4y246Gr...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Sơn dầu hạng sang và khung vải canvas đắt đỏ mang sắc thái ma mị.",
    thematicMotif: "bức họa Phục Hưng & dao rọc giấy"
  },
  {
    id: "rye-sinclair",
    name: "RYE SINCLAIR",
    issueNumber: "NO. 009",
    intro: "Thí gớm",
    tags: ["NSFW", "điên tình", "chiếm hữu", "“nếu em đi anh sẽ chết mất”", "toxic (?)", "Hot nerd x playgirl", "giam cầm (?)", "Mỹ", "Hiện đại"],
    fullPlotUrl: "https://ellipsus.com/read/5A1a8dXyHu7fTGSY9iM/rye-sinclair-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%229M5z357Hs...%22],%22action%22:%22open%22%7D",
    isNsfw: true,
    editorialNote: "Mùi mồ hôi và băng quấn tay đẫm máu sau mỗi trận đấu ngầm.",
    thematicMotif: "găng tay đấm bốc & đai vô địch"
  },
  {
    id: "vindoro-vannetti",
    name: "VINDORO VANNETTI",
    issueNumber: "NO. 010",
    intro: "Cocktail, rượu và máu (thí gớm)",
    tags: ["Yandere", "NSFW", "Gore", "Rối loạn nhân cách ranh giới", "Char bartender sad nhân x user đào hoa khờ khạo", "Ý", "Hiện Đại"],
    fullPlotUrl: "https://ellipsus.com/read/6B2b9eYzIv8gUHTZ0jN/vindoro-vannetti-",
    ggaiUrl: undefined, // No GGAI link as requested
    isNsfw: true,
    editorialNote: "Hương hoa cam vùng Địa Trung Hải hòa quyện cùng vị đắng của rượu vang đỏ.",
    thematicMotif: "nhẫn gia tộc & ly vang đỏ"
  }
];
