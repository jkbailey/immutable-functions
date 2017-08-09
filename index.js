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

const _existsByProp = (state, prop, id) =>
  state && state.filter(x => x[prop] === id).length > 0;

const _findByProp = (state, prop, id) =>
  _existsByProp(state, prop, id) && state.filter(x => x[prop] === id)[0];

module.exports = {
  find: _find,
  index: _index,
  create: _create,
  update: _update,
  destroy: _destroy,
  existsByProp: _existsByProp,
  findByProp: _findByProp
};
