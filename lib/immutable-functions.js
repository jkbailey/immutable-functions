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
    return _create(state, data);
  }
};

const _destroy = (state, id) =>
  state.filter(group => group.id !== id);

const _merge = (state, newState, deep = false) => {
  if (!newState) return state;

  if (state instanceof Array) {
    return _arrayMerge(state, newState, 'id', deep);
  } else if (typeof state === "object") {
    return _objectMerge(state, newState, 'id', deep);
  }
};

const _objectMerge = (state, obj, prop = 'id', deep) => {
  let n = Object.assign({}, state);
  let keys = Object.keys(obj);

  for(let i = 0; i < keys.length; i++) {
    let k = keys[i];
    if (obj[k] && typeof obj[k] === "object" && !(obj[k] instanceof Array) && deep) {
      n[k] = _objectMerge(n[k], obj[k], prop, deep);
    } else if (obj[k] && obj[k] instanceof Array) {
      n[k] = _arrayMerge(n[k], obj[k], prop, deep);
    } else {
      n[k] = obj[k];
    }
  }

  return n;
}

const _arrayMerge = (state = [], array, prop = 'id', deep) => {
  if (!array) return state;
  let _state = [...state];
  array.forEach(item => {
    if (_existsByProp(_state, prop, item[prop])) {
      let _stateItem = _findByProp(_state, prop, item[prop]);
      let _mergedItem = _mergeByProp(_findByProp(_state, prop, item[prop]), item, prop, deep);
      _state = _updateByProp(_state, prop, item[prop], _mergedItem);
    } else {
      _state = _createByProp(_state, prop, item);
    }
  });
  return _state;
};

const _existsByProp = (state, prop, id) =>
  state && state.filter(x => x[prop] === id).length > 0;

const _indexByProp = (state, prop, id) =>
  _existsByProp(state, prop, id) && state.indexOf(_findByProp(state, prop, id));

const _findByProp = (state, prop, id) =>
  _existsByProp(state, prop, id) && state.filter(x => x[prop] === id)[0];

const _createByProp = (state, prop, data) =>
  !_existsByProp(state, prop, data[prop]) && [...state, data];

const _updateByProp = (state, prop, id, data) => {
  if (_existsByProp(state, prop, id)) {
    let _state = [...state];
    let i = _indexByProp(_state, prop, id);
    _state[i] = Object.assign({}, _state[i], data);
    return _state;
  } else {
    return _createByProp(state, prop, data);
  }
};

const _destroyByProp = (state, prop, id) =>
  state.filter(group => group[prop] !== id);

const _mergeByProp = (state, newState, prop, deep = false) => {
  if (!newState) return state;

  if (state instanceof Array) {
    return _arrayMerge(state, newState, prop, deep);
  } else if (typeof state === "object") {
    return _objectMerge(state, newState, prop, deep);
  }
};

const _promiseDispatch = obj => dispatch =>
  new Promise((res, rej) => {
    dispatch(obj);
    res();
  });

const _whatChanged = (props, newProps, label = "Props changed") => {
  console.group(label);
  for (let key in newProps) {
    if (props[key] !== newProps[key]) {
      console.log(
        key,
        'old val: ',
        props[key],
        ' new val: ',
        newProps[key]
      );
    }
  }
  console.groupEnd();
}

module.exports = {
  find: _find,
  index: _index,
  create: _create,
  update: _update,
  destroy: _destroy,
  merge: _merge,
  existsByProp: _existsByProp,
  indexByProp: _indexByProp,
  findByProp: _findByProp,
  createByProp: _createByProp,
  updateByProp: _updateByProp,
  destroyByProp: _destroyByProp,
  mergeByProp: _mergeByProp,
  promiseDispatch: _promiseDispatch,
  whatChanged: _whatChanged
};
