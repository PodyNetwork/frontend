import { _wcl } from './common.js';

const defaults = {
  winwidth: 0,
  winheight: 0,
  preferinitialwindowplacement: false,
  disallowreturntoopener: false,
  dismisswhenbacktoopener: false
};

const booleanAttrs = ['disallowreturntoopener', 'preferinitialwindowplacement', 'dismisswhenbacktoopener']; // booleanAttrs default should be false
const objectAttrs = [];
const custumEvents = {
  piping: 'msc-any-pip-piping',
  pipingEnd: 'msc-any-pip-pip-end'
};

const template = document.createElement('template'); template.innerHTML = `
<div class="main" ontouchstart="" tabindex="0">
  <button class="btn-pip" type="button" title="Picture in Picture" aria-label="Picture in Picture" style="visibility:hidden; display: none;">pip</button>
</div>
`
;

if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-any-pip-piping-font-size',
      syntax: '<length>',
      inherits: true,
      initialValue: '16px'
    });

    CSS.registerProperty({
      name: '--msc-any-pip-piping-color',
      syntax: '<color>',
      inherits: true,
      initialValue: '#39e75f'
    });

    CSS.registerProperty({
      name: '--msc-any-pip-button-z-index',
      syntax: '<number>',
      inherits: true,
      initialValue: '1'
    });
  } catch(err) {
    console.warn(`msc-any-pip: ${err.message}`);
  }
}


export class MscAnyPip extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      trigger: this.shadowRoot.querySelector('.btn-pip')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscAnyPip(config)
    };

    // evts
    this._onClick = this._onClick.bind(this);
  }

  async connectedCallback() {
    const { config, error } = await _wcl.getWCConfig(this);
    const { main, trigger } = this.#nodes;

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // remove script[type=application/json]
    Array.from(this.querySelectorAll(':scope > script[type="application/json"]')).forEach((script) => script.remove());

    // not suppout
    if (!window?.documentPictureInPicture) {
      main.classList.add('main--active--not-support');
    }

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    trigger.addEventListener('click', this._onClick, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'winwidth':
        case 'winheight':
          this.#config[attrName] = _wcl.isNumeric(newValue) ? parseFloat(newValue) : defaults[attrName];
          break;

        case 'disallowreturntoopener':
        case 'preferinitialwindowplacement':
        case 'dismisswhenbacktoopener':
          this.#config[attrName] = true;
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscAnyPip.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      default:
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscAnyPip.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscAnyPip.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set winwidth(value) {
    if (value) {
      this.setAttribute('winwidth', value);
    } else {
      this.removeAttribute('winwidth');
    }
  }

  get winwidth() {
    const { width } = this.getBoundingClientRect();
    return this.#config.winwidth !== 0 ? this.#config.winwidth : width;
  }

  set winheight(value) {
    if (value) {
      this.setAttribute('winheight', value);
    } else {
      this.removeAttribute('winheight');
    }
  }

  get winheight() {
    const { height } = this.getBoundingClientRect();
    return this.#config.winheight !== 0 ? this.#config.winheight : height;
  }

  set preferinitialwindowplacement(value) {
    this.toggleAttribute('preferinitialwindowplacement', Boolean(value));
  }

  get preferinitialwindowplacement() {
    return this.#config.preferinitialwindowplacement;
  }

  set disallowreturntoopener(value) {
    this.toggleAttribute('disallowreturntoopener', Boolean(value));
  }

  get disallowreturntoopener() {
    return this.#config.disallowreturntoopener;
  }

  set dismisswhenbacktoopener(value) {
    this.toggleAttribute('dismisswhenbacktoopener', Boolean(value));
  }

  get dismisswhenbacktoopener() {
    return this.#config.dismisswhenbacktoopener;
  }
  
  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  async _onClick() {
    const children = [...this.children];

    if (!children.length || !window.documentPictureInPicture) {
      return;
    }

    const clones = children.map(
      (element) => {
        const clone = element.cloneNode(true);

        clone.classList.add('msc-any-pip-cloned');
        return clone;
      }
    );

    // pip
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: this.winwidth,
      height: this.winheight,
      disallowReturnToOpener: this.disallowreturntoopener,
      preferInitialWindowPlacement: this.preferinitialwindowplacement
    });
    _wcl.cloneStyleSheetsToDocument(pipWindow.document);
    children.forEach((child) => pipWindow.document.body.append(child));
    clones.forEach((child) => this.append(child));

    pipWindow.document.body.style.backgroundColor = '#333'; 
    pipWindow.document.body.style.color = '#fff';
    pipWindow.document.body.style.padding = '0px';
    pipWindow.document.body.style.margin = '0px';

    this.#nodes.main.classList.toggle('main--active', true);
    this.#fireEvent(custumEvents.piping);

    // event
    pipWindow.addEventListener('pagehide',
      () => {
        clones.forEach((child) => child.remove());
        children.forEach((child) => this.append(child));

        this.#nodes.main.classList.toggle('main--active', false);
        this.#fireEvent(custumEvents.pipingEnd);
      },
      { once:true }
    );
  }

  requestPictureInPicture() {
    this.#nodes.trigger.click();
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscAnyPip');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscAnyPip'), MscAnyPip);
}

// close pipWin which opened by msc-any-pip
window.customElements.whenDefined('msc-any-pip').then(
  () => {
    document.addEventListener('visibilitychange',
      () => {
        if (document.hidden) {
          return;
        }

        const active = document.querySelector('msc-any-pip[dismisswhenbacktoopener] .msc-any-pip-cloned');
        if (active && window.documentPictureInPicture?.window) {
          window.documentPictureInPicture.window.close();
        }
      }
    );
  }
);