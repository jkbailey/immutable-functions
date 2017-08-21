const _exists = (state, id) =>
  state.filter(x => x.id === id).length > 0;

const _index = (state, id) =>
  _exists(state, id) && state.indexOf(_find(state, id));

const _find = (state, id) =>
  _exists(state, id) && state.filter(x => x.id === id)[0];

const _create = (state, data) =>
  !_exists(state, data.id) && [...state, data];

const _update = (state, id, data) => {
  if (_exists(state, id)) {
    let _state = [...state];
    let i = _index(_state, id);
    _state[i] = Object.assign({}, _state[i], data);
    return _state;
  } else {
    return state;
  }
};

const _destroy = (state, id) =>
  state.filter(group => group.id !== id);

const _merge = (state, newState, deep = false) => {
  if (!newState) return state;

  if (state instanceof Array) {
    return _arrayMerge(state, newState, deep);
  } else if (typeof state === "object") {
    return _objectMerge(state, newState, deep);
  }
};

const _objectMerge = (state, obj, deep) => {
  let n = Object.assign({}, state);
  let keys = Object.keys(obj);

  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (typeof obj[k] === "object" && deep) {
      n[k] = _objectMerge(n[k], obj[k], deep);
    } else if (obj[k] instanceof Array) {
      n[k] = _arrayMerge(n[k], obj[k]);
    } else {
      n[k] = obj[k];
    }
  }

  return n;
}

const _arrayMerge = (state, array) => {
  if (!array) return state;
  let _state = [...state];
  array.forEach(item => {
    if (_exists(_state, item.id)) {
      _state = _update(_state, item.id, item);
    } else {
      _state = _create(_state, item);
    }
  });
  return _state;
};

const _existsByProp = (state, prop, id) =>
  state && state.filter(x => x[prop] === id).length > 0;

const _findByProp = (state, prop, id) =>
  _existsByProp(state, prop, id) && state.filter(x => x[prop] === id)[0];

const _promiseDispatch = obj => dispatch =>
  new Promise((res, rej) => {
    dispatch(obj);
    res();
  });

module.exports = {
  find: _find,
  index: _index,
  create: _create,
  update: _update,
  destroy: _destroy,
  merge: _merge,
  existsByProp: _existsByProp,
  findByProp: _findByProp,
  promiseDispatch: _promiseDispatch
};
