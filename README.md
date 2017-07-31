# Immutable Functions
Functions to help with immutability, mainly for use with arrays in redux

# Installation
```sh
$ yarn add -s immutable-functions
```
or
```sh
$ npm install -s immutable-functions
```

# Usage
```
import _i from 'immutable-functions';
import { CREATE, UPDATE, REMOVE } from '../actions/collection';

export default (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return _i.create(state, action.obj);
    case UPDATE:
      return _i.update(state, action.obj.id, action.obj);
    case REMOVE:
      return _i.destroy(state, action.obj.id);
    default:
      return state;
  }
};
```

## Functions
#### `_create(state, data)`
Creates an object if it does not already exist (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **data** *(object)* The object you are adding to the array.
- returns
    - *(array)* A new array with the new object added to the end

#### `_update(state, id, data)`
Updates an object if it exists (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are updating.
    - **data** *(object)* The delta of the object you are updating.
- returns
    - *(array)* A new array with the object updated

#### `_destroy(state, id)`
Destroys an object if it exists (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are destroying.
- returns
    - *(array)* A new array with the object removed
