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
    intro: "nhà báo mảng phóng sự điều tra, luôn ôm một xấp bản thảo mốc meo và cốc cà phê nguội ngắt ở góc phòng tòa soạn. user là nguồn tin bất đắc dĩ bị cuốn vào một vụ án chưa có lời giải.",
    tags: ["hiện đại", "phóng sự", "điều tra", "bg", "truyện lồng truyện", "chậm nhiệt", "sắc bén", "r18"],
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
    intro: "thiếu gia tập đoàn vận tải biển kiêm tay đua xe môtô phân khối lớn ngầm. user là thợ cơ khí vô tình ký hợp đồng bảo dưỡng độc quyền xe đua cho hắn.",
    tags: ["hiện đại", "hào môn", "motorsport", "bình nhiên liệu", "bg", "r18"],
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
    intro: "giáo sư cổ văn học đại học quốc gia, mang vẻ ngoài điềm đạm, kính gọng vàng nhưng thực chất là kẻ chiếm hữu ngầm đáng sợ. user là nghiên cứu sinh vô tình lật giở một bản dịch cổ thư bị phong ấn.",
    tags: ["cổ đại/hiện đại", "học thuật", "chiếm hữu", "bg", "chậm nhiệt", "r18"],
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
    intro: "kiến trúc sư trưởng phong cách brutalism, lạnh lùng, kỹ tính và có thói quen phác thảo bản vẽ trên giấy da bằng mực đen nguyên chất. user là trợ lý thiết kế mới vào nghề.",
    tags: ["hiện đại", "kiến trúc", "công sở", "bg", "lạnh lùng", "r18"],
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
    intro: "nhạc sĩ piano thiên tài mắc chứng mất ngủ mãn tính. user là bác sĩ tâm lý trị liệu ban đêm, người duy nhất có thể xoa dịu những cơn khủng hoảng hoang tưởng của hắn.",
    tags: ["hiện đại", "âm nhạc", "chữa lành", "bg", "mất ngủ", "r18"],
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
    intro: "chủ tiệm đồ cổ Shinjuku thời kỳ Showa, mang đôi mắt đục mờ và quá khứ dính líu đến thế giới ngầm Nhật Bản. user là khách hàng mua nhầm món di vật mang lời nguyền.",
    tags: ["nhật bản", "showa", "đồ cổ", "dark romance", "r18"],
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
    intro: "sĩ quan cảnh sát chìm Saint Petersburg, uống vodka pha tuyết giữa mùa đông Siberia. user là nghi phạm duy nhất được hắn trực tiếp giám sát tại căn hộ áp mái.",
    tags: ["nga", "siberia", "cảnh sát chìm", "dark romance", "r18"],
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
    intro: "tay buôn tác phẩm nghệ thuật xuyên quốc gia, lãng tử, nguy hiểm và thích sưu tầm những bức tranh thiếu nữ mang bi kịch. user là nhà giám định nghệ thuật trẻ tuổi.",
    tags: ["hiện đại", "art dealer", "global", "dark romance", "r18"],
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
    intro: "tay đấm quyền anh hạng nặng underground tại Chicago, bất bại trên sàn đấu nhưng lại dịu dàng một cách điên cuồng trước user.",
    tags: ["hiện đại", "boxing", "underground", "dark romance", "r18"],
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
    intro: "trùm mafia dòng họ Vannetti vùng Sicily, lịch lãm, tàn nhẫn và coi user là báu vật duy nhất thoát khỏi luật lệ gia tộc.",
    tags: ["sicily", "mafia", "italy", "dark romance", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/6B2b9eYzIv8gUHTZ0jN/vindoro-vannetti-",
    ggaiUrl: undefined, // No GGAI link as requested
    isNsfw: true,
    editorialNote: "Hương hoa cam vùng Địa Trung Hải hòa quyện cùng vị đắng của rượu vang đỏ.",
    thematicMotif: "nhẫn gia tộc & ly vang đỏ"
  }
];
