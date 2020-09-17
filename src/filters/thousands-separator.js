
export default function (val) {
  // toString undefined 會報錯誤
  const res = (val + '').split('.')
  res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return res.join('.')
}

//   Vue.filter('thousands-separator', val => {
//     //toString undefined 會報錯誤
//     let res = (val + '').split('.');
//     res[0] = res[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return res.join('.');
// });
