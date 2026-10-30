/* Page 2 (galaxy stars) + Page 3 (book spread).
   Our love story, moment by moment. Swap the /photos paths with your own
   (drop files in /source-photos and run `npm run photos`). */

import type { Memory } from '../types'

const PREFIX = '/photos'
// const PREFIX = 'https://tam.sotaychemgio.com'

export const MEMORIES: Memory[] = [
  {
    key: 'm1',
    title: 'Hẹn hò công viên',
    image: `${PREFIX}/IMG_4016.JPG`,
    story: 'Sau giờ học của em, cùng là ngày dài làm việc của anh, mình lại hẹn nhau ở công viên. Chẳng cần điều gì đặc biệt, chỉ cần được đi cạnh nhau, kể nhau nghe những chuyện vụn vặt trong ngày.'
  },
  {
    key: 'm2',
    title: 'Món quà nhỏ',
    image: `${PREFIX}/03-13.jpg`,
    story: 'Tờ vé số anh tặng em ngày lễ, những hộp sữa em dành cho anh sau những ngày dài kiệt sức. Rồi chẳng biết ai nợ ai, chỉ nhớ anh lén hôn em kiểu Vi Tiểu Bảo'
  },
  {
    key: 'm3', title: 'Áo đôi đầu tiên',
    image: `${PREFIX}/IMG_4924.JPG`,
    story: 'Được mặc đồ cặp với 1 cô gái xinh như em khiến anh tự hào lắm. Anh nghĩ mọi người ghen tị với anh vì được sánh bước bên em.'
  },
  {
    key: 'm4',
    title: 'Những ngày xa cách',
    image: `${PREFIX}/IMG_4156.JPG`,
    story: 'Nụ hôn ngày ấy, mình đâu biết sẽ phải xa nhau lâu đến thế. Vừa kịp lưu giữ chút ngọt ngào, ngày sau Covid đã bùng phát. Từ đó, yêu thương chỉ gửi qua màn hình, những lời hỏi han trở thành cách duy nhất để chăm sóc nhau.'
  },
  {
    key: 'm5', title: 'Anh lại đổi công ty',
    image: `${PREFIX}/IMG_6424.JPG`,
    story: 'Năm lần thay đổi công việc, mỗi lần là một chặng đường mới với những lo lắng, thử thách và cả những điều chưa biết trước. Nhưng có một điều vẫn luôn ở đó, chẳng hề thay đổi: em vẫn ở bên anh. ',
  },
  {
    key: 'm6', title: 'Henna hehe',
    image: `${PREFIX}/IMG_2211.JPG`,
    story: 'Anh không ngờ từ những nét vẽ nguệch ngoạc ngày nào, sau này em có thể dựng lên 1 đế chế nhỏ của riêng mình...'
  },
  {
    key: 'm7', title: 'Mừng em tốt nghiệp',
    image: `${PREFIX}/IMG_2538.JPG`,
    story: 'Có lẽ anh đã bỏ lỡ một phần ngày đặc biệt của em, nhưng anh vui vì vẫn được cùng em lưu giữ một kỷ niệm đẹp theo cách riêng của 2 đứa. '
  },
  {
    key: 'm8', title: 'Gần 90kg',
    image: `${PREFIX}/IMG_1679.JPG`,
    story: 'Quãng thời gian yêu em, con số trên bàn cân của anh cứ tăng đều đặn... nhưng đổi lại nụ cười của em cũng mãn nguyện.'
  },
  {
    key: 'm9',
    title: 'Thế giới riêng',
    image: `${PREFIX}/IMG_7189.JPG`,
    story: 'Một thế giới độc quyền của 2 đứa trên trang giấy, Ngưu Vương và Quỷ Nhỏ hiện hữu trước mắt anh. Và cả câu chuyện xuyên không lại năm anh 17 tuổi...'
  },
  {
    key: 'm10',
    title: 'Sở thích riêng của anh',
    image: `${PREFIX}/IMG_5976.JPG`,
    story: 'Cảm ơn em đã cùng anh trải qua niềm vui bóng đá, từ buổi fan meeting đầy háo hức đến lần cùng nhau xem Messi đá tại quán cafe. Thật đặc biệt khi có em bên cạnh để cùng chia sẻ.'
  },
  {
    key: 'm11',
    title: 'Nhìn mặt nhau tới sáng',
    image: `${PREFIX}/f1289760544.png`,
    story: 'Có những đêm, mình cứ thỏ thẻ tâm tình đến tận 2 giờ sáng, kể hết chuyện này đến chuyện khác mà chẳng ai muốn nói lời tạm biệt. Em ngủ quên lúc nào không hay.'
  },
  {
    key: 'm12',
    title: 'Áo anh, người em',
    image: `${PREFIX}/IMG_5379.JPG`,
    story: 'Vừa đánh dấu bản quyền cho thiên hạ biết, vừa được chữ ký cơ thể mang về, ôm em thật chặt...',
  },
  {
    key: 'm13',
    title: 'Lobocos',
    image: `${PREFIX}/IMG_0276.JPG`,
    story: 'Lần đầu anh thấy kỹ năng vẽ của em có thể làm ra tiền, anh cũng thấy em mệt mà vẫn vui tươi đến thế.',
  },
  {
    key: 'm14',
    title: 'Hiệp sĩ mù',
    image: `${PREFIX}/IMG_0323.JPG`,
    story: 'Em bị mù hay sao mà lại yêu anh vậy?',
  },
  {
    key: 'm15',
    title: 'Văn Miếu – Quốc Tử Giám',
    image: `${PREFIX}/IMG_5012.JPG`,
    story: 'Ông bảo là anh phải đối xử tốt với em. Anh vẫn luôn muốn thế.'
  },
  {
    key: 'm16',
    title: 'Bỏ phố về quê',
    image: `${PREFIX}/7ee48f4176d2c68c9fc3.jpg`,
    story: 'Những ngày thức dậy 4h sáng để làm cơm nắm, bán nhanh còn có lãi nữa, anh còn được 650k tiền hoàn vón.'
  },
  {
    key: 'm17',
    title: 'Sasysis',
    image: `${PREFIX}/IMG_4401.JPG`,
    story: 'Em bỏ công sức nhiều, thường xuyên làm khuya, có tiền nhưng kiệt quệ'
  },
  {
    key: 'm18',
    title: 'The Beginning',
    image: `${PREFIX}/beginning.jpg`,
    story: 'Thật vinh dự được tham dự ngày em debut nghệ thuật trước thế giới'
  },
]
