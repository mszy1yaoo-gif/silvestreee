export interface CharacterEntry {
  id?: string;
  type?: 'NP' | 'OPEN WORLD' | 'CHARACTER';
  name: string;
  title?: string;
  quote?: string;
  intro?: string;
  tags: string[];
  fullPlotUrl?: string;
  ggaiUrl?: string;
  bgUrl?: string;
  blUrl?: string;
  characterNote?: string;
  imageUrl?: string;
  buttonText?: string;
}

export function getCharacterId(char: { id?: string; name: string }): string {
  if (char.id && char.id.trim() !== '') {
    return char.id.trim().toLowerCase();
  }
  return char.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const naomiCharacters: CharacterEntry[] = [
  {
    id: "sylvester-vance",
    name: "sylvester vance",
    intro: "tình cũ ngỡ đã đi vào dĩ vãn.",
    quote: "Sự bình yên không đáng có này của em, đến lúc phải thuộc lại về anh rồi, bunnи.",
    tags: ["BG", "dark romance", "mafia", "văn nhã bại hoại", "tình cũ", "{{char}} từng đi tòo", "R18/NSFW"],
    fullPlotUrl: "https://ellipsus.com/read/53ipikHZjQ7oZMGUDOdbpH/syl-i-syl-",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221CWLUuhcTjrHu2d7G9CUes5Rr4gtoLVPP%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing",
    characterNote: `Syl từng là người thừa kế duy nhất của gia tộc Vance, hậu sinh khả úy đồ đó.

Tưởng rằng người chỉ lớn lên trong quyền lực, mạch cảm xúc dường như không có thì đùng một cái lại fall in love với {{user}}.

Đáng yêu như chú thỏ nhỏ vậy. Yeah, bunnи à.

Nhưng người đời thường nói mà, đã là người đứng đầu chuỗi thức ăn thì đừng nên để lộ sơ hở nào. Đúng không? Và sơ hở của hắn chính là bé thỏ hắn cưng như trứng kia.

Hắn phát hiện chính em là người đã ăn cắp bí mật gia tộc, những tờ đơn kiện tụng đã được soạn trước dưới danh nghĩa là {{user}}, tất cả chỉ nhằm đá hắn ra khỏi chiếc ghế quyền lực ấy.

Giận quá. Cũng yêu quá. Tất cả phá vỡ mọi lớp ngoài đạo mạo của hắn.

Hắn giam giữ em, quyết không để chú thỏ nhỏ này thoát khỏi tầm mắt hắn nữa.

Đáng tiếc thay, bằng chứng đã gửi cho cảnh sát. Syl chính thức bị bắt.

Nhưng trước ngày diễn ra phiên tòa kết án, trại giam số 06 đã bốc cháy. Người ta tìm thấy một cái xác cháy đen, trên tay là chiếc nhẫn gia huy của gia tộc. Còn ai ngoài đây, chính là Sylvester Vance.

5 năm sau, ngỡ rằng em đã bình yên có cuộc sống mới, thì mùi hương, giọng điệu ấy lại đang đứng che ô cho em.`,
    imageUrl: "/assets/aistudio/image_b45a0196.png"
  },
  {
    id: "rosenberg",
    type: "NP",
    name: "ROSENBERG",
    title: "ác nữ bất đắc dĩ bị hệ thống ép buộc chà đạp dàn nam chính",
    intro: "ác nữ bất đắc dĩ bị hệ thống ép buộc chà đạp dàn nam chính",
    tags: ["BG", "NP", "xuyên không", "học đường", "toxic love", "R18/NSFW"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221XMKx-iMFJx0Q2l7cicLvyAMp0cT5grOE%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing",
    characterNote: `{{user}} một hôm trời quang mây tạnh hay không thì không biết, nhưng biết là đùng một phát xuyên không vào một thế giới, nơi xoay quanh học viện 𝐑𝐎𝐒𝐄𝐍𝐁𝐄𝐑𝐆 – hay cụ thể hơn đây là nơi sinh tồn bằng quyền lực, địa vị, phân chia giai cấp, bè phái thì thôi nhé.

{{user}} trong thân phận mới là một đại tiểu thư tài phiệt, nhưng số phận trớ trêu thì em lại bị gán thân phận là nữ phụ độc ác !!! (＃＞＜)

Bây giờ đã là một tháng trôi qua kể từ ngày em bị hệ thống bủn xỉn trong đầu đưa ra những tình huống oái oăm nhằm để em là mồi lửa giúp tăng tương tác giữa các nam chính và nữ chính để nhanh chóng hoàn thành cốt truyện (?).

Nhưng khi nào xong thì hệ thống chả nói, em lại không biết mình sẽ kẹt ở đây bao lâu, và quan trọng hơn là phải làm mồi độc hãm hại người khác đến bao giờ o(TヘTo)`,
    imageUrl: "/assets/aistudio/image_cd9528bd.png"
  },
  {
    id: "indie-rock-band",
    type: "NP",
    name: "indie rock band",
    intro: "đậm ù ù hoặc không (?)",
    title: "làm liều thuốc cho các chàng nhạc sĩ.",
    tags: ["BG", "4P", "dark romance", "adrenaline crash", "skinship hun hun moaz moaz", "R18/NSFW"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221wznsEFI0HS2kMaDKpEwspJT25M_xOZxN%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing",
    characterNote: `Từ cái đêm định mệnh bị lôi vào hậu trường quán bar ngầm, {{user}} từ một kẻ đứng ngoài lề bỗng nghiễm nhiên trở thành chiếc phao cứu sinh bất đắc dĩ cho ba gã khét tiếng nhất giới Indie Rock đại học, giúp họ giải tỏa trạng thái adrenaline crash (sụp đổ adrenaline).

Và band của chúng ta có:

𝐊𝐢𝐞𝐫𝐚𝐧 𝐑𝐡𝐲𝐬: chàng vocalist lả lơi, mỏ dẻo, luôn biết cách khiến người khác chú ý.

𝐁𝐫𝐚𝐦 𝐅𝐚ｌ𝐜𝐨𝐧𝐞: em drummer to xác, cún bự nũng nịu thích kẹo mút („• ֊ •„)

𝐒𝐢𝐥𝐚𝐬 𝐕𝐚𝐧𝐜𝐞: gã lead guitar mang phong cách quý tộc lạnh lùng ヽ(\`д´*)ノ`,
    imageUrl: "/assets/aistudio/image_97fa621e.png"
  },
  {
    id: "kismet-app",
    type: "OPEN WORLD",
    name: "kismet app",
    intro: "app mừ tém cộng dành cho những con sói cô độc.",
    title: "đơn giản là matching, dating, sờ ếch app.",
    tags: ["18+", "modern", "dating", "social", "open world", "slice of life", "random encounter", "hữu duyên hữu duyên hữu duyên"],
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221GPe7d-9-8gCEAFIYXYPLOFJjRzRrY6jQ%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing",
    characterNote: `——٩ ʕ•ᴥ•ʔ——

được rồi, tôi biết bạn đang chán. thiếu người ôm, thiếu người nói chuyện, thiếu một ai đó bulululu giúp bạn giải tỏa cơn nắng mặc dù đang 12 giờ đêm.

hoặc đơn giản hơn—bạn muốn xem trai, tìm các hì hài nhông, các chú trâu giờm và da, người đủ chiều dồng và rại để lắp đầy khoảng trống bên trong bạn,...

không sao mà, tôi hiểu.

nhưng mà tôi có giải quyết được đâu =)))) hjhjhj

nên KISMET sẽ thay tôi làm việc đó.

📱 𝑲𝑰𝑺𝑴𝑬𝑻 CÓ GÌ?

♡ DISCOVER — lướt người dùng, xem profile, thích thì like, không thích thì quẹt. rất văn minh.

♡ RANDOM MATCH — muốn giao lưu với một người hoàn toàn ngẫu nhiên? bấm đi. và tất nhiên là tự do kết nối.

♡ FATE MATCH — hệ thống chọn một người theo cái gọi là hữu duyên. còn duyên kiểu gì thì chịu.

♡ NEARBY — xem quanh bạn đang có ai để tiện gạ meomeo.

♡ TRENDING / ACTIVE NOW / NEW USERS — người nổi tiếng, người đang online, người vừa đăng ký. Đơn giản là xem thiên hạ sống thế nào.

♡ FEED & STORIES — đăng ảnh, status, check-in, chia sẻ linh tinh. vâng, một mạng xã hội nữa. vì một cái chưa đủ.

♡ COMMUNITIES — dating, relationship, confession, nightlife, fashion, cosplay, lifestyle,..

♡ ADULT SPACE — khu vực nội dung dành cho người trưởng thành.

♡ Và vài tính năng thú zị khác để thỏa mãn bạn khi bạn tự trải nghiệm ~~`,
    buttonText: "find ur soulmate.",
    imageUrl: "/assets/aistudio/image_fe2f3b8f.png"
  },
  {
    id: "lam-hac-uan",
    name: "lâm hạc uẩn",
    intro: "“chị người yêu qua mạng lại là con trai?”",
    tags: ["bl/bg", "võng du / discord / roblox", "catfish (giả gái lừa tình)", "hài cốt", "hài dón cute", "r18"],
    bgUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221Q-OBBzbVU0GDtwCXVy95vb2ExP9imwGR%22],%22action%22:%22open%22,%22userId%22:[%22117960368591653507331%22],%22resourceKeys%22:{}}&usp=sharing",
    blUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221SEDZ9tCjZJLmU-bWMOYG4TVI6CVTPjZT%22],%22action%22:%22open%22,%22userId%22:[%22117960368591653507331%22],%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "ryder-vance",
    name: "ryder vance",
    intro: "giữ chuỗi tiktok với fwb",
    tags: ["bg", "âu mỹ học đường", "hockey player", "fwb", "yearning man", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/17tLmCpv80gJvv70IJLoCF/meo",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221B-LJux14nq8yPlR4CzIKex_tLtndoX74%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "kurokami-shion",
    name: "kurokami shion",
    intro: "nàng bệnh tim x chàng bệnh hoạn",
    tags: ["bg", "dark romance (?)", "nhật bản thời meiji", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1CRug8646r/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221bGu20M8QRZWrb5rFpnxWJJmAldIe0bRk%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "lam-duat-khanh",
    name: "lâm duật khanh",
    intro: "user xuyên sách trở thành cô em gái đáng ghét của nam chính bệnh kiều (っ˘ω˘ς )",
    tags: ["bg", "anh trai em gái", "xuyên sách", "côn trùng real", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1DnELmzyZc/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221caOKGnpZTeWL4xdeiKknV7UirdV_69Vb%22],%22action%22:%22open%22,%22userId%22:%22105712410120616555178%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "lam-tich-ngon",
    name: "lâm tịch ngôn",
    intro: "lỡ chếch sát với anh trai nuôi",
    tags: ["bg", "anh trai em gái", "🍜", "r18"],
    fullPlotUrl: ".",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221ZDyozvotWmzwTYRbMuH1psTc01HnjyEV%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "lam-duc-xuyen",
    name: "lâm dục xuyên",
    intro: "em zai bợn thưn lè fan cứng cụa tuôi trên onlyfans ???!!! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
    tags: ["bg", "hằm hài nhi", "tâm cơ", "hài", "flirt", "onlyfans", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/19deiEXj6Y/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221R2zYJRyMBupiJ16f4HHeiklwgKHgKJ2S%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "damien-de-valios",
    name: "damien de valios",
    intro: "papa của bạn trai, dada của em.",
    tags: ["bg", "forbidden love", "age gap", "user có bạn trai/nghèo", "char có vợ con", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/2eMBLneLsJ36Xf1mtor6PH/dada-i",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%2219dBnk4k2DQ2GzWog8ayXX7FknGbv86bS%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "lam-khai-khiem",
    name: "lâm khải khiêm",
    intro: "chàng phi công nghĩa đen lẫn nghĩa bóng.",
    tags: ["bg", "hằm hài nhi", "tâm cơ", "thao túng", "phi công", "cờ đỏ", "user có bạn trai", "r18"],
    fullPlotUrl: "https://www.facebook.com/share/p/1JLPVVN74q/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221GxJHRIjobmQ7MpnzLB8YzRXymBRpSWWR%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "ciel-de-valois",
    name: "ciel de valois",
    intro: "chị vệ sĩ khó tính x em thiếu gia ham chơi",
    tags: ["bg", "hằm hài nhi", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/64Bb7vgBeWqPeA6q9BdxNR/ciel-de-valois",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221KRxh6SVeOnT5pS7SRt89FKP7-PumFsRa%22],%22action%22:%22open%22,%22userId%22:%22102164308973649112065%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "zane-sebastian-vance",
    name: "zane sebastian vance",
    intro: "chàng fuck boy được gái ngoan bao ngủ mụt đim",
    tags: ["bg", "fuck boy x good girl", "oan gia", "r18"],
    fullPlotUrl: "https://ellipsus.com/read/1tTgN2crIHD9Dj2D7sP0GM/zane-s-vance",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221oGDFY7jAQyxMUfA5ppS5N6ts2EkvpNxi%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  {
    id: "lam-nhat-nien",
    type: "CHARACTER",
    name: "[nhất niên hỉ hoan] trai douyin.",
    intro: "anh trai tung cụa cà hẩy bị em du học sinh người Việt đem ra làm trò hề lmao lmao",
    tags: ["bg", "đời thường", "hài hài cute"],
    fullPlotUrl: "",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221_lU2x_c0z1_v_9Q_x1_u_c0z1_v_9Q_x1%22],%22action%22:%22open%22%7D",
    characterNote: "đơn giản là dạo này trên TikTok đang hot những clip lấy từ bên Douyin, đa phần là những anh trai mặc áo phanh cúc hở ngực lắc hông cà hẩy trên những điệu nhạc và bị anh em bốn phương đem ra joke vì quá cringe (?) =))))))\n\n{{user}} tất nhiên với cương vị thuộc cộng đồng giới trẻ Việt Nam thì không thể bỏ qua mấy vụ nài =)))))))))",
    imageUrl: "/assets/aistudio/image_66983c6e.png"
  },
  {
    id: "lam-kieu-vu",
    type: "CHARACTER",
    name: "[kiều vũ vô ngôn] cậu ấy thích bạn thân tớ.",
    intro: "cậu dốc hết lòng bộc lộ lời yêu,\ntớ dốc hết sức làm quân sư tình. for u",
    tags: ["bg/bl", "txvt", "secretly in love"],
    fullPlotUrl: "",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221_k_v_9Q_x1_u_c0z1_v_9Q_x1_u_c0%22],%22action%22:%22open%22%7D",
    characterNote: "đơn giản là dạo này Lâm Kiều Vũ — bạn cùng bàn từ đầu cấp ba của {{user}} bỗng nhiên biết thầm thích người ta. Mà trớ trêu thay, người hắn thích lại chính là bạn thân của em. ･ﾟ･(｡>ω<｡)･ﾟ･\n\nbiết em là bạn thân nhất của crush, Kiều Vũ liên tục tiếp cận em để moi thông tin nhằm từ từ chinh phục cô bạn ấy. Và tất nhiên với cương vị là kẻ ôm mối tình đơn phương giấu kín gần hai năm qua với hắn thì làm sao em từ chối được cái ánh mắt khẩn cầu xin giúp đỡ ấy cơ chứ",
    imageUrl: "/assets/aistudio/image_ce059e8c.png"
  },
  {
    id: "jung-jae-hyuk",
    type: "CHARACTER",
    name: "𝑗𝑢𝑛𝑔 𝑗𝑎𝑒 ℎ𝑦𝑢𝑘",
    intro: "chị giúp việc x cậu thiếu gia ngỗ nghịch",
    tags: ["bg", "sitcom gia đình Hàn Quốc", "niên hạ", "thanh xuân chữa lành", "{{char}} con ngựa bất kham khối 11 mở mồm là \"ê ê ê\" nhưng tay tự giác bê chậu đồ giặt hộ chị", "{{user}} một nách dắt em gái chạy trốn chủ nợ vô tình lọt vào cái nhà ồn ào như chợ vỡ"],
    fullPlotUrl: "",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221_j_jh_x1_u_c0z1_v_9Q_x1_u_c0%22],%22action%22:%22open%22%7D",
    characterNote: "Credit / Inspired by: Lấy cảm hứng từ bối cảnh phim High Kick 2 (Gia đình là số 1 phần 2) và {{char}} Jung Jae Hyuk được lấy từ nhân vật Jung Joon Hyuk.\n\ncảm ơn nàng ‘2105’ đã share comm cho cả nhà mình cùng chơi nheee.\n\nđơn giản là {{user}} nhà ta là chị gái quê dẫn theo em gái lên phố theo lời căn dặn của cha sau khi bị đám đòi nợ xiết nhà, trải qua 7749 kiếp nạn thì được một gia đình khá giả ở Seoul nhận vào làm giúp việc, có cơ hội gặp gỡ các thành viên trong gia đình, đặc biệt là con trai lớn của cô chủ nhà °˖✧◝(⁰▿⁰)◜✧˖°",
    imageUrl: "/assets/aistudio/image_66983c6e.png"
  },
  // Additional empty slots as template
  {
    id: "lam-mac-kieu",
    name: "lâm mặc kiêu",
    tags: ["bg", "hài hài cute chít bông", "nghiện vợ (nma đ nhận ok?)", "r18/nsfw"],
    fullPlotUrl: "https://www.facebook.com/share/p/1JxDywNYih/",
    ggaiUrl: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:[%221NlMs7st7CTQ37TtKV5D0fOzo-dhhnUBB%22],%22action%22:%22open%22,%22userId%22:%22117960368591653507331%22,%22resourceKeys%22:{}}&usp=sharing"
  },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" },
  { name: "", intro: "", tags: [], fullPlotUrl: "", ggaiUrl: "" }
];

