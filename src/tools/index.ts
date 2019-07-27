import { Tools, Tool } from './types';
import * as pen from './pen';

const tools: Tools = {};

const getTool = (toolName: string): Tool => tools[toolName];
const addTool = (toolName: string, tool: Tool) => {
  tools[toolName] = tool;
};

[pen].forEach(({ name, addEventListener }) => addTool(name, addEventListener));

export * from './types';
export { getTool, addTool };
