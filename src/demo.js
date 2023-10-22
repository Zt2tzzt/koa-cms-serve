const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('过了1s~')
    resolve('1s')
  }, 1000);
})

p.then(res => {
  console.log('p res:', res)
  setTimeout(() => {
    console.log('过了3s~')
  }, 3000);
  console.log('哈哈哈哈')
  return res
}).then(res => {
  console.log('p2 res:', res)
})