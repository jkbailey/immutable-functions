"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var _exists = function _exists(state, id) {
  return (
    state.filter(function(x) {
      return x.id === id;
    }).length > 0
  );
};

var _index = function _index(state, id) {
  return _exists(state, id) && state.indexOf(_find(state, id));
};

var _find = function _find(state, id) {
  return (
    _exists(state, id) &&
    state.filter(function(x) {
      return x.id === id;
    })[0]
  );
};

var _create = function _create(state, data) {
  return (
    !_exists(state, data.id) && [].concat(_toConsumableArray(state), [data])
  );
};

var _update = function _update(state, id, data) {
  if (_exists(state, id)) {
    var _state = [].concat(_toConsumableArray(state));
    var i = _index(_state, id);
    _state[i] = Object.assign({}, _state[i], data);
    return _state;
  } else {
    return state;
  }
};

var _destroy = function _destroy(state, id) {
  return state.filter(function(group) {
    return group.id !== id;
  });
};

var _merge = function _merge(state, newState) {
  var deep =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!newState) return state;

  if (state instanceof Array) {
    return _arrayMerge(state, newState, deep);
  } else if (
    (typeof state === "undefined" ? "undefined" : _typeof(state)) === "object"
  ) {
    return _objectMerge(state, newState, deep);
  }
};

var _objectMerge = function _objectMerge(state, obj, deep) {
  var n = Object.assign({}, state);
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (obj[k] && _typeof(obj[k]) === "object" && deep) {
      n[k] = _objectMerge(n[k], obj[k], deep);
    } else if (obj[k] && obj[k] instanceof Array) {
      n[k] = _arrayMerge(n[k], obj[k]);
    } else {
      n[k] = obj[k];
    }
  }

  return n;
};

var _arrayMerge = function _arrayMerge(state, array) {
  if (!array) return state;
  var _state = [].concat(_toConsumableArray(state));
  array.forEach(function(item) {
    if (_exists(_state, item.id)) {
      _state = _update(_state, item.id, item);
    } else {
      _state = _create(_state, item);
    }
  });
  return _state;
};

var _existsByProp = function _existsByProp(state, prop, id) {
  return (
    state &&
    state.filter(function(x) {
      return x[prop] === id;
    }).length > 0
  );
};

var _findByProp = function _findByProp(state, prop, id) {
  return (
    _existsByProp(state, prop, id) &&
    state.filter(function(x) {
      return x[prop] === id;
    })[0]
  );
};

var _promiseDispatch = function _promiseDispatch(obj) {
  return function(dispatch) {
    return new Promise(function(res, rej) {
      dispatch(obj);
      res();
    });
  };
};

var _whatChanged = function _whatChanged(props, newProps) {
  var label =
    arguments.length > 2 && arguments[2] !== undefined
      ? arguments[2]
      : "Props changed";

  console.group(label);
  for (var key in newProps) {
    if (props[key] !== newProps[key]) {
      console.log(key, "old val: ", props[key], " new val: ", newProps[key]);
    }
  }
  console.groupEnd();
};

module.exports = {
  find: _find,
  index: _index,
  create: _create,
  update: _update,
  destroy: _destroy,
  merge: _merge,
  existsByProp: _existsByProp,
  findByProp: _findByProp,
  promiseDispatch: _promiseDispatch,
  whatChanged: _whatChanged
};
