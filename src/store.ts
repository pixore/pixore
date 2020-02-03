import { openDB, IDBPDatabase, DBSchema } from 'idb';
import { Sprite } from './state/sprite';

const version = 1;
const name = 'pixore';

interface DB extends DBSchema {
  sprites: {
    key: string;
    value: Sprite;
  };
}

let $db: IDBPDatabase<DB>;

const getDB = async () => {
  if ($db) {
    return $db;
  }
  $db = await openDB<DB>(name, version, {
    upgrade(db) {
      db.createObjectStore('sprites', {
        keyPath: 'spriteId',
      });
    },
  });

  return $db;
};

const storeSprite = async (sprite: Sprite) => {
  const db = await getDB();
  await db.put('sprites', sprite);
};

const updateSpriteId = async (oldId: string, sprite: Sprite) => {
  const db = await getDB();
  await db.delete('sprites', oldId);
  return storeSprite(sprite);
};

export { storeSprite, updateSpriteId };
