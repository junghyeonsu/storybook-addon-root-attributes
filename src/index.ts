export interface State {
  name: string;
  value: string;
}

export interface RootAttribute {
  root: string;
  attribute: string;
  defaultState: State;
  states: State[];
}
