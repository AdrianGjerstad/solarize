
const Solarize = (function(a, b, c) {
  function Solarize(callback, options={}) {
    // TODO: Setup

    // Start
    callback.call(c);
  }

  class TextMetrics {
    constructor(width, height) {
      this.w = width;
      this.h = height;
    }

    copy() {
      return new TextMetrics(this.w, this.h);
    }
  }

  function textMetrics(text, font='serif', size=16, weight='normal') {
    let elt = a.createElement('div');

    elt.innerText = text;

    elt.style.fontFamily = font;
    elt.style.fontSize = size + 'px';
    elt.style.fontWeight = weight;

    let width = (elt.clientWidth+1);
    let height = (elt.clientHeight+1);

    return new TextMetrics(width, height);
  }

  class Component {
    constructor(x=0, y=0, w=100, h=100) {
      this.content = a.createElement('div');
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;

      this.content.style.position = 'absolute';
      this.content.style.left = this.x.toString() + 'px';
      this.content.style.top = this.y.toString() + 'px';
      this.content.style.width = this.w.toString() + 'px';
      this.content.style.height = this.h.toString() + 'px';

      this.children = [];

      b.appendChild(this.content);
    }

    locate(x=0, y=0) {
      this.x = x;
      this.y = y;

      this.content.style.left = this.x.toString() + 'px';
      this.content.style.top = this.y.toString() + 'px';
    }

    resize(w=100, h=100) {
      this.w = w;
      this.h = h;

      this.content.style.width = this.w.toString() + 'px';
      this.content.style.height = this.h.toString() + 'px';
    }

    data(data='') {
      this.content.innerHTML += data;
    }

    text(text='') {
      this.content.innerHTML += text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '&bsol;').replace(/\//g, '&sol;');
    }

    insert(other=null) {
      if(other===null) return;
      if(!(other instanceof Component)) {
        throw TypeError('Can only insert components into others.');
      }


      this.content.appendChild(other.content);
      this.children.push(other);
    }

    resetData() {
      for(let i = 0; i < this.children.length; ++i) {
        this.content.removeChild(this.children[i].content);
      }

      this.innerHTML = "";
    }

    render() {
      return this.content;
    }
  }
  c.Component = Component;
  delete Component;

  class Label extends c.Component {
    constructor(text='', font='Arial, sans-serif', size=16, weight='normal') {
      let size = textMetrics(text, font, size, weight);
      super(0, 0, size.w, size.h);
      this.text(text);
    }

    resize() {}

    data(data='') {
      this.content.innerHTML = data;
    }

    text(text='') {
      this.content.innerHTML = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '&bsol;').replace(/\//g, '&sol;');
    }

    insert() {}

    resetData() {
      this.content.innerHTML = '';
    }
  }
  c.Label = Label;
  delete Label;

  return Solarize;
})(document, document.documentElement, {});
