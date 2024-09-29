export interface APIInterface {
  name: string;
  path: string;
  method: 'GET' | 'POST';
  parameters?: parameterInterface[];
  params: boolean;
  query: boolean;
}

export interface parameterInterface {
  name: string;
  type: string;
  element: string;
}
