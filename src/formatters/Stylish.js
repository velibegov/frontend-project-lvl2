const BASE_INDENT = ' ';
const BIG_INDENT = 'bigIndent';
const SMALL_INDENT = 'smallIndent';

const toString = (value) => {
  if (value === null) {
    return 'null';
  }
  return (JSON.stringify(value)).replace(/"/g, '');
};

const getIndent = (depth, indentModifier = SMALL_INDENT) => {
  switch (indentModifier) {
    case BIG_INDENT:
      return BASE_INDENT.repeat(depth * 4);
    case SMALL_INDENT:
      return BASE_INDENT.repeat(depth * 4 - 2);
    default:
      return `Unsupported indent modifier ${indentModifier}`;
  }
};

const stringifyValue = (value, depth) => {
  if (
    typeof value !== 'object'
        || value === null
  ) {
    return toString(value);
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const stringifiedValue = stringifyValue(value[key], depth + 1);
    return `${getIndent(depth + 1, BIG_INDENT)}${key}: ${stringifiedValue}`;
  });
  return `{\n${result.join('\n')}\n${getIndent(depth, BIG_INDENT)}}`;
};

const getStylish = (differenceTree, depth = 1) => {
  const lines = differenceTree.map((value) => {
    switch (value.type) {
      case 'parent':
        return `${getIndent(depth) + BASE_INDENT.repeat(2)
        }${value.key}: ${getStylish(value.children, depth + 1)}`;
      case 'modified':
        return `${getIndent(depth)}- ${value.key}: ${stringifyValue(value.old, depth)}\n${getIndent(depth)}+ ${value.key}: ${stringifyValue(value.new, depth)}`;
      case 'unmodified':
        return `${getIndent(depth, BIG_INDENT)}${value.key}: ${stringifyValue(value.value, depth)}`;
      case 'added':
        return `${getIndent(depth)}+ ${value.key}: ${stringifyValue(value.value, depth)}`;
      case 'removed':
        return `${getIndent(depth)}- ${value.key}: ${stringifyValue(value.value, depth)}`;
      default:
        return `Unsupported value type ${value.type}`;
    }
  });
  const result = lines.join('\n');
  return `{\n${result}\n${getIndent(depth - 1, BIG_INDENT)}}`;
};

export default getStylish;
