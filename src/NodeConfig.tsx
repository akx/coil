export default interface NodeConfig {
  id: string;
  module: string;
  config: any;
  children: Array<NodeConfig>;
};
