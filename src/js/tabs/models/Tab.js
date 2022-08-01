import uuidv4 from 'uuid/v4';
import NoContent from '../components/NoContent';

export default class Tab {
  constructor({
    title,
    uuid = uuidv4(),
    Type = NoContent,
    params = {},
    active = false,
    typeName = null,
  }) {
    this.uuid = uuid;
    this.title = title;
    this.Type = Type;
    this.params = params;
    this.active = active;
    this.typeName = typeName;
  }
}
