/**
 * @typedef {string|HTMLElement|DOM|DOMCompatible[]} DOMCompatible
 */


/**
 * Wraps or creates HTMLElement in a DOM object
 * @param {HTMLElement|string}el
 * @return {Object}
 */
export default function DOM(el) {
  if (typeof el === 'string') {
    el = document.createElement(el);
  }
  /**
   * @class DOM
   */
  const r = {
    /**
     * Change styles on element
     * @param {CSSStyleDeclaration}o
     * @return {DOM}
     */
    css(o) {
      Object.entries(o).forEach(e => el.style[e[0]] = addPx(e));
      return r;
    },
    /**
     * Set attributes on element
     * @param {object<string>}attributes
     * @return {DOM}
     */
    attr(attributes) {
      Object.entries(attributes).forEach(attribute => attribute[1] != null
        ? el.setAttribute(attribute[0], attribute[1])
        : el.removeAttribute(attribute[0]));
      return r;
    },
    /**
     * Add event to element
     * @param {string} evt
     * @param {EventListenerOrEventListenerObject} fn
     * @param {boolean}add_direct_event
     * @return {DOM}
     */
    on(evt, fn, add_direct_event = false) {
      add_direct_event ? el['on' + evt] = fn : el.addEventListener(evt, fn, false);
      return r;
    },
    /**
     * Remove event to element
     * @param {string} evt
     * @param {EventListenerOrEventListenerObject} fn
     * @return {DOM}
     */
    off(evt, fn) {
      el.removeEventListener(evt, fn, false);
      return r;
    },
    /**
     * Add a class to element
     * @param {string} cls
     * @return {DOM}
     */
    addClass(cls) {
      return r.toggleClass(cls, true);
    },
    /**
     * Remove a class to element
     * @param {string} cls
     * @return {DOM}
     */
    removeClass(cls) {
      return r.toggleClass(cls, false);
    },
    /**
     * Toggle a class to element
     * @param {string} cls
     * @param {boolean} force
     * @return {DOM}
     */
    toggleClass(cls, force) {
      el.classList.toggle(cls.replace('.', ' ').trim(), force);
      return r;
    },
    /**
     * Add a class to element
     * @param {string} cls
     * @return {boolean}
     */
    hasClass(cls) {
      return el.classList.contains(cls);
    },

    /**
     * Get the raw dom node of the element
     * @return {HTMLElement}
     */
    el: () => el,

    /**
     * Appends children to element
     * @param {Array<HTMLElement|DOM>}children
     * @return {DOM}
     */
    add(...children) {
      add(el, children);
      return r;
    },

    /**
     * Set/get html content of element
     * @return {DOM}
     */
    html(html) {
      if (html == null) return el.innerHTML;
      el.innerHTML = html;
      return r;
    },

    /**
     * Set/get text content of element
     * @return {DOM}
     */
    text(text) {
      if (text == null) return el.textContent;
      el.textContent = text;
      return r;
    },

    /**
     * Clears content of element
     * @return {DOM}
     */
    clear() {
      let a;
      while ((a = el.firstChild)) el.removeChild(a);
      return r;
    },

    /**
     * Appends element to parent
     * @param {DOM|HTMLElement}parent
     * @return {DOM}
     */
    appendTo(parent) {
      parent = parent instanceof HTMLElement ? DOM(parent) : parent;
      parent.add(r);
      return r;
    },

    /**
     * Removes element from DOM
     * @return {DOM}
     */
    remove() {
      const parent = el.parentNode;
      if (parent) parent.removeChild(el);
      return r;
    },
  };

  return r;
}

const igonore = ['opacity', 'zIndex'];

/**
 * Add px to 'clean' number if key not in ignore list ({left: 1, opacity: 0.3} => {left: "1px", opacity: "0.3"})
 * @param {string} key
 * @param {string} val
 * @return {string}
 */
function addPx([key, val]) {
  return (val && igonore.indexOf(toCode(key)) === -1 && /^-?\d*(.\d+)?$/.test(val)) ? val + 'px' : val;
}

/**
 * Convert dashcase to camelCase ('z-index' to 'zIndex')
 * @param {string} str
 * @return {string}
 */
function toCode(str) {
  return str.replace(/^([A-Z])|-(\w)/g, (m, a, b) => (b || a).toUpperCase());
}

/**
 *
 * @param el
 * @param {DOMCompatible[]} list
 */
function add(el, list) {
  list.forEach(child => {
    if (child == null) return;
    if (typeof child === "string") return el.appendChild(document.createTextNode(child));
    if (child.nodeType != null) return el.appendChild(child);

    //to support of DOM objects
    if (child.el instanceof Function) return el.appendChild(child.el());
    if (Array.isArray(child)) return add(el, child);
    console.error("Unsupported child node: ", child, child.el, (child.el instanceof Function));
    throw new RangeError("Unsupported child node: " + child);
  });
}
