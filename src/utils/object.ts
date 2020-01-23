export interface ItemMap<T> {
  [id: string]: T;
}

const addItem = <T>(map: ItemMap<T>, id: string, item: T): ItemMap<T> => {
  return {
    ...map,
    [id]: item,
  };
};

const removeItem = <T>(map: ItemMap<T>, id: string): ItemMap<T> => {
  const newMap = {
    ...map,
  };

  Reflect.deleteProperty(newMap, id);
  return newMap;
};

const isLastItem = (map: object) => Object.keys(map).length === 1;

export { addItem, removeItem, isLastItem };
