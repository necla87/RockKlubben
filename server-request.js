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
  // Simüle edilen asenkron işlem için setTimeout kullanıyoruz.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(database[collection]);
    }, 500);
  });
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
  // Simüle edilen asenkron işlem için setTimeout kullanıyoruz.
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItem = { id: database[collection].length + 1, ...data };
      database[collection].push(newItem);
      resolve(newItem);
    }, 500);
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
