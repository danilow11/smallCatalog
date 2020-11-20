const items = [
  { id: 'water-bottle', name: 'Water Bottle', price: 15 },
  { id: 'helmet', name: 'Helmet', price: 70 },
  { id: 'sealant', name: 'Sealant', price: 28 },
];

export default function loadItem(id) {
  let timer;

  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      const item = items.find((item) => item.id === id);
      if (item) {
        resolve(item);
      } else {
        reject('Item not found');
      }
    }, 1000);
  });

  promise.cancel = () => clearTimeout(timer);
  return promise;
}
