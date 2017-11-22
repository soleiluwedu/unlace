/**
 * unlace
 * Copyright(c) 2017 Thai-Duong Nguyen
 * MIT Licensed
 */

/**
 * JavaScript stringifier.
 * @module unlace
 */

/**
 * Stringify JavaScript expressions while facilitating deep inspection of JavaScript objects.
 * @param {*} data - JavaScript expression to be stringified.
 * @param {string} - mode - Medium of screen render. Accepted: 'string', console', and 'DOM'
 * @return {string} - Stringified JavaScript expression.
 */

function unlace(data, mode = 'string', spaces = '', seen = []) {
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';

  let newline;
  let spacer;
  let padding;
  switch (mode) {
    case 'console':
      newline = '\n';
      spacer = '  ';
      padding = '';
      break;
    case 'DOM':
      newline = '<br>';
      spacer = '&nbsp&nbsp';
      padding = '';
      break;
    case 'string':
      newline = '';
      spacer = '';
      padding = ' ';
      break;
    default:
      throw new Error("2nd argument must be either 'string', 'console', or 'DOM'");
  }

  if (typeof data === 'string') return `'${data}'`;

  if (typeof data === 'object') {
    if (seen.includes(data)) return '[circular reference]';
    const newSeen = [...seen, data];
    if (Array.isArray(data)) return `[${newline}${data.map(e => `${spaces + spacer}${unlace(e, mode, spaces + spacer, newSeen)}`).join(`, ${newline}`) + newline + spaces}]`;
    return `{${padding}${newline}${Object.keys(data).map(key => `${spaces + spacer}${key}: ${unlace(data[key], mode, spaces + spacer, newSeen)}`).join(`, ${newline}`)}${newline + spaces + padding}}`;
  }

  return data.toString();
}

/**
 * Module exports.
 * @public
 */

module.exports = unlace;
