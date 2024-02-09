
const database = {
  admin: [
    { id: 1, logIn: 1 },
    // Diğer admin verileri eklenebilir
  ],
  events: [
    // Etkinlik verileri buraya eklenir
  ],
};

export async function getAll(collection) {

  try {
    console.log({ collection })
    // Fetch events data from json-server
    const response = await fetch(`http://localhost:3000/${collection}`);
    const data = await response.json();
  } catch (error) {
    console.error('Error reading events data:', error);
  }

  return data;
}

export async function getOne(collection, id) {
  // Simüle edilen asenkron işlem için setTimeout kullanıyoruz.
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = database[collection].find((item) => item.id === id);
      resolve(result);
    }, 500);
  });
}

export async function create(collection, data) {
  const response = await fetch(`http://localhost:3000/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function update(collection, id, key, value) {
  // Simüle edilen asenkron işlem için setTimeout kullanıyoruz.
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = database[collection].find((item) => item.id === id);
      if (item) {
        item[key] = value;
      }
      resolve(item);
    }, 500);
  });
}

export async function remove(collection, id) {
  // Simüle edilen asenkron işlem için setTimeout kullanıyoruz.
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = database[collection].findIndex((item) => item.id === id);
      if (index !== -1) {
        database[collection].splice(index, 1);
      }
      resolve(true);
    }, 500);
  });
}
