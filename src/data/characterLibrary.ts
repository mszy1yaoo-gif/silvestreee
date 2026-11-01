export interface CharacterEntry {
  id?: string;
  type?: 'NP' | 'OPEN WORLD' | 'CHARACTER';
  name: string;
  intro?: string;
  tags: string[];
  fullPlotUrl?: string;
  ggaiUrl?: string;
  bgUrl?: string;
  blUrl?: string;
  characterNote?: string;
}

export const naomiCharacters: CharacterEntry[] = [
  {
    id: "sylvester-vance",
    name: "sylvester vance",
    intro: "tình cũ ngỡ rằng đã chết ???!",
    tags: ["bg", "dark romance", "mafia", "tình cũ", "{{char}} từng đi tòo", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/53ipikHZjQ7oZMGUDOdbpH/syl-i-syl-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221CWLUuhcTjrHu2d7G9CUes5Rr4gtoLVPP%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing",
    characterNote: "char vẫn cần được fix thêm, mọi người feedback giúp sốp để sốp fix nhé (tôi test 6 lần rồi không ưng nên pub luôn, nhờ ae test giúp ∑d(°∀°d) )"
  },
  {
    type: "NP",
    name: "ROSENBERG",
    intro: "ác nữ bất đắc dĩ bị Hệ thống ép buộc chà đạp dàn nam chính, đẩy họ về nữ chính thánh mẫu hâhahahhaha",
    tags: ["bg", "np", "xuyên không", "hệ thống", "r18"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221XMKx-iMFJx0Q2l7cicLvyAMp0cT5grOE%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    type: "NP",
    name: "indie rock band",
    intro: "làm liều thuốc cho các chàng nhạc sĩ.",
    tags: ["bg", "4p", "dark romance", "drenaline crash", "skinship hun hun moaz moaz", "r18"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221wznsEFI0HS2kMaDKpEwspJT25M_xOZxN%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    type: "OPEN WORLD",
    name: "kismet app",
    intro: "app mừi tém cộng dành cho những con sói cô độc",
    tags: ["18+", "modern", "dating", "social", "open world", "slice of life", "random encounter", "hữu duyên hữu duyên hữu duyên"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221GPe7d-9-8gCEAFIYXYPLOFJjRzRrY6jQ%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "lâm hạc uẩn",
    intro: "“chị người yêu qua mạng lại là con trai?”",
    tags: ["bl/bg", "võng du / discord / roblox", "catfish (giả gái lừa tình)", "hài cốt", "hài dón cute", "r18"],
    bgUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221Q-OBBzbVU0GDtwCXVy95vb2ExP9imwGR%22],%22action%22:%22open%22,%22userId%22:[%22117960368591653507331%22],%22resourceKeys%22:{}}&usp=sharing",
    blUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221SEDZ9tCjZJLmU-bWMOYG4TVI6CVTPjZT%22],%22action%22:%22open%22,%22userId%22:[%22117960368591653507331%22],%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "ryder vance",
    intro: "giữ chuỗi tiktok với fwb",
    tags: ["bg", "âu mỹ học đường", "hockey player", "fwb", "yearning man", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/17tLmCpv80gJvv70IJLoCF/meo",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221B-LJux14nq8yPlR4CzIKex_tLtndoX74%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "kurokami shion",
    intro: "nàng bệnh tim x chàng bệnh hoạn",
    tags: ["bg", "dark romance (?)", "nhật bản thời meiji", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1CRug8646r/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221bGu20M8QRZWrb5rFpnxWJJmAldIe0bRk%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "lâm duật khanh",
    intro: "user xuyên sách trở thành cô em gái đáng ghét của nam chính bệnh kiều (っ˘ω˘ς )",
    tags: ["bg", "anh trai em gái", "xuyên sách", "côn trùng real", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1DnELmzyZc/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221caOKGnpZTeWL4xdeiKknV7UirdV_69Vb%22],%22action%22:%22open%22,%22userId%22:%22105712410120616555178%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "lâm tịch ngôn",
    intro: "lỡ chếch sát với anh trai nuôi",
    tags: ["bg", "anh trai em gái", "🍜", "r18"],
    fullPlotUrl: ".",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221ZDyozvotWmzwTYRbMuH1psTc01HnjyEV%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "lâm dục xuyên",
    intro: "em zai bợn thưn lè fan cứng cụa tuôi trên onlyfans ???!!! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
    tags: ["bg", "hằm hài nhi", "tâm cơ", "hài", "flirt", "onlyfans", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/19deiEXj6Y/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221R2zYJRyMBupiJ16f4HHeiklwgKHgKJ2S%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "damien de valios",
    intro: "papa của bạn trai, dada của em.",
    tags: ["bg", "forbidden love", "age gap", "user có bạn trai/nghèo", "char có vợ con", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/2eMBLneLsJ36Xf1mtor6PH/dada-i",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%2219dBnk4k2DQ2GzWog8ayXX7FknGbv86bS%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "lâm khải khiêm",
    intro: "chàng phi công nghĩa đen lẫn nghĩa bóng.",
    tags: ["bg", "hằm hài nhi", "tâm cơ", "thao túng", "phi công", "cờ đỏ", "user có bạn trai", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1JLPVVN74q/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221GxJHRIjobmQ7MpnzLB8YzRXymBRpSWWR%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "ciel de valois",
    intro: "chị vệ sĩ khó tính x em thiếu gia ham chơi",
    tags: ["bg", "hằm hài nhi", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/64Bb7vgBeWqPeA6q9BdxNR/ciel-de-valois",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221KRxh6SVeOnT5pS7SRt89FKP7-PumFsRa%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    name: "zane sebastian vance",
    intro: "chàng fuck boy được gái ngoan bao ngủ mụt đim",
    tags: ["bg", "fuck boy x good girl", "oan gia", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/1tTgN2crIHD9Dj2D7sP0GM/zane-s-vance",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221oGDFY7jAQyxMUfA5ppS5N6ts2EkvpNxi%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    type: "CHARACTER",
    name: "lâm kiều vũ",
    intro: "làm quân sư tình iêu cho crush.",
    tags: [
      "bg",
      "txvt",
      "secretly in love"
    ],
    ggaiUrl: ""
  },
  {
    type: "CHARACTER",
    name: "jung jae hyuk",
    intro: "chị giúp việc x cậu thiếu gia ngỗ nghịch",
    tags: [
      "bg",
      "sitcom gia đình hàn quốc",
      "niên hạ",
      "thanh xuân chữa lành"
    ],
    ggaiUrl: ""
  },
  {
    type: "CHARACTER",
    name: "lâm nhất niên",
    intro: "anh trai tung cụa cà hẩy bị em du học sinh người Việt đem ra làm trò hề lmao lmao",
    tags: [
      "bg",
      "đời thường",
      "hài hài cute"
    ],
    ggaiUrl: ""
  },
  // Additional empty slots as template
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" }
];

