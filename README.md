[![Build Status](https://travis-ci.org/jkbailey/immutable-functions.svg?branch=master)](https://travis-ci.org/jkbailey/immutable-functions)

# Immutable Functions
A simple, easy, straight forward approach to update immutable data.

# Installation
```sh
$ yarn add immutable-functions
```
or
```sh
$ npm install -s immutable-functions
```

# Usage
```js
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

```js
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import _i from 'immutable-functions';

class YourComponent extends PureComponent {
  render() {
    // Get the item with id === 5
    const item = _i.find(this.props.data, 5)

    // item
    // {
    //   id: 5,
    //   name: Jerry,
    //   email: jerry@gmail.com
    // }

    return (
      <View>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
      </View>
    );
  }
}

// Here are the properties of the store this component uses
const mapStoreToProps = store => ({
  data: store.yourReducer
});

// This is how we connect the store to our component
export default connect(mapStoreToProps)(YourComponent);
```

## Functions
```js
_i.create(state, data)
```
Creates an object if it does not already exist (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **data** *(object)* The object you are adding to the array.
- returns
    - *(array)* A new array with the new object added to the end

```js
_i.update(state, id, data)
```
Updates an object if it exists (by `id`) in the array, if it does not exist, it will create it.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are updating.
    - **data** *(object)* The delta of the object you are updating.
- returns
    - *(array)* A new array with the object updated

```js
_i.destroy(state, id)
```
Destroys an object if it exists (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are destroying.
- returns
    - *(array)* A new array with the object removed

```js
_i.merge(state, array[, deep])
```
Merges an object or array of objects (unique by `id`) with the current state.
  - arguments
    - **state** *(array/object)* The current object or array of objects.
    - **array** *(array/object)* new object or array of objects being merged.
    - **deep** *(boolean)* will do a deep merge of an object
- returns
    - *(array/object)* A new object or array with all the objects unique by `id`

```js
_i.find(state, id)
```
Find an object if it exists (by `id`) in the array. Useful in components when accessing the data.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are finding.
- returns
    - *(array)* A single (first) object with the given id

```js
_i.findByProp(state, prop, id)
```
Find an object if it exists by a property provided in the array. Useful in components when accessing the data.
  - arguments
    - **state** *(array)* The current array of objects.
    - **prop** *(string)* The identifier property on the objects in the array.
    - **id** *(integer)* The id of the object you are finding.
- returns
    - *(array)* A single (first) object with the given identifier property
- example
    - `_i.findByProp(state, 'LoanId', '1234456');`

```js
_i.updateByProp(state, prop, id, data)
```
Updates an object if it exists by an identifier property provided in the array, if it does not exist, it will create it.
  - arguments
    - **state** *(array)* The current array of objects.
    - **prop** *(string)* The identifier property on the objects in the array.
    - **id** *(integer)* The id of the object you are updating.
    - **data** *(object)* The delta of the object you are updating.
- returns
    - *(array)* A new array with the object updated
- example
    - `_i.updateByProp(state, 'LoanId', action.obj.LoanId, action.obj); `


```js
_i.destroyByProp(state, prop, id)
```
Destroy an object if it exists by an identifier property provided in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **prop** *(string)* The identifier property on the objects in the array.
    - **id** *(integer)* The id of the object you are updating.
- returns
    - *(array)* A new array with the object removed
- example
    - `_i.destroyByProp(state, 'LoanId', action.obj.LoanId); `
