class TabRegistry {
  static tabTypes = {}

  static create = (type) => {
    TabRegistry.tabTypes[type.typeName] = type;

    return type;
  }

  static get = (name) => {
    return TabRegistry.tabTypes[name];
  }
}

export default TabRegistry;
