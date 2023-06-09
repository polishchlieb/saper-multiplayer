export default function parseJSX(type, attributes, ...children) {
  attributes = attributes || {};

  if (typeof type === 'function') {
    attributes.children = children;
    return type(attributes);
  }

  const element = document.createElement(type);

  for (const key in attributes) {
    if (key === 'style')
      Object.assign(element.style, attributes[key]);
    else if (key === 'ref')
      attributes[key].current = element;
    else
      element.setAttribute(key, attributes[key]);
  }

  for (const child of children) {
    if (typeof child === 'string' || typeof child === 'number')
      element.appendChild(
        document.createTextNode(child)
      );
    else if (Array.isArray(child))
      element.append(...child);
    else if (child)
      element.appendChild(child);
  }

  return element;
}