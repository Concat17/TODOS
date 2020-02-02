// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Model.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TodoModel = function TodoModel() {
  this.notes = [];
  this.currentIndex = 0;
};

TodoModel.prototype.addNote = function addNote() {
  var Note = function Note() {
    this.name = "Note";
    this.creation_data = TodoModel.prototype.getCurrentDate();
    this.todos = [];
  };

  Note.prototype.addTodo = function addTodo() {
    var todo = {
      name: "Todo",
      content: "Hi",
      priority: "Low"
    };
    this.todos.push(todo);
  };

  var note = new Note();
  note.addTodo();
  this.notes.push(note);
};

TodoModel.prototype.getNoteData = function getNoteData(index) {
  return this.notes[index]; // FIXME:
};

TodoModel.prototype.getCurrentDate = function getCurrentDate() {
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1);
  var yyyy = today.getFullYear();
  return dd + "." + mm + "." + yyyy; // (today = mm + "/" + dd + "/" + yyyy);
};

exports.default = TodoModel;
},{}],"src/View.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TodoView = function TodoView(element) {
  this.element = element;
  this.onClickGetTodo = null;
  this.onMouseDown = null;
};

TodoView.prototype.render = function render(todoData) {
  // TODO: Generation todos via css grid
  this.element.innerHTML = "<div id=\"click_button\" class=\"note\" data-index=\"1\">\n  <div class=\"note_name\">" + todoData.name + "</div>\n  <div class=\"note_todos\"><div> \n  </div>"; // "<h3>" +
  // "Todo" +
  // "</h3>" +
  // `<div id="click_button" class="note" >` +
  // todoData.text +
  // "</div>";

  var clickButton = this.element.querySelector("#click_button");
  clickButton.addEventListener("click", this.onClickGetTodo);
  clickButton.addEventListener("mousedown", this.onMouseDown);
  clickButton.style.background = todoData.color;
};

function addNote() {}

TodoView.prototype.MoveNote = function MoveNote(e) {// const note = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  // const shiftX = e.clientX - note.getBoundingClientRect().left;
  // const shiftY = e.clientY - note.getBoundingClientRect().top;
  // note.style.position = "absolute";
  // note.style.zIndex = "1000";
  // // переместим в body, чтобы мяч был точно не внутри position:relative
  // document.body.append(note);
  // // и установим абсолютно спозиционированный мяч под курсор
  // function moveAt(pageX: number, pageY: number) {
  //   note.style.left = `${pageX - shiftX}px`;
  //   note.style.top = `${pageY - shiftY}px`;
  // } // TODO:
  // moveAt(e.pageX, e.pageY);
  // // передвинуть мяч под координаты курсора
  // // и сдвинуть на половину ширины/высоты для центрирования
  // function onMouseMove(event) {
  //   moveAt(event.pageX, event.pageY);
  //   // note.hidden = true;
  //   // const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  //   // note.hidden = false;
  //   // if (!elemBelow) return;
  // }
  // // (3) перемещать по экрану
  // document.addEventListener("mousemove", onMouseMove);
  // // (4) положить мяч, удалить более ненужные обработчики событий
  // note.onmouseup = function onMouseUp() {
  //   document.removeEventListener("mousemove", onMouseMove);
  //   note.onmouseup = null;
  // };
};

exports.default = TodoView;
},{}],"src/Controller.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Model_1 = __importDefault(require("./Model"));

var View_1 = __importDefault(require("./View"));

var TodoController = function TodoController(todoView, todoModel) {
  this.todoView = todoView;
  this.todoModel = todoModel;
};

TodoController.prototype.initialize = function initialize() {
  this.todoView.onClickGetTodo = this.onClickGetTodo.bind(this);
  this.todoView.onMouseDown = this.onMouseDown.bind(this);
  this.todoModel.addNote();
  var note = this.todoModel.getNoteData(0);
  this.showTodo(note); //this.todoModel.getTodoData(this.showTodo.bind(this));
};

TodoController.prototype.onClickGetTodo = function onClickGetTodo(e) {
  var a = e.currentTarget;
  var f = parseInt(a.dataset.index, 10);
  var note = this.todoModel.getNoteData(0);
  this.todoView.render(note); //this.todoModel.getTodoData(this.showTodo.bind(this));
};

TodoController.prototype.onMouseDown = function onMouseDown(e) {
  this.todoView.MoveNote(e);
};

TodoController.prototype.showTodo = function showTodo(todoData) {
  this.todoView.render(todoData);
};

function start() {
  var todoModel = new Model_1.default();
  var targetElement = document.getElementById("listOfPenguins");
  var todoView = new View_1.default(targetElement);
  var controller = new TodoController(todoView, todoModel);
  controller.initialize();
}

exports.start = start;
exports.default = start;
},{"./Model":"src/Model.ts","./View":"src/View.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = require("./src/Controller");

Controller_1.start();
},{"./src/Controller":"src/Controller.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38091" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/TODOS.77de5100.js.map