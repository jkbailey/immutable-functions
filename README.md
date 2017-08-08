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

```
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
#### `_i.create(state, data)`
Creates an object if it does not already exist (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **data** *(object)* The object you are adding to the array.
- returns
    - *(array)* A new array with the new object added to the end

#### `_i.update(state, id, data)`
Updates an object if it exists (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are updating.
    - **data** *(object)* The delta of the object you are updating.
- returns
    - *(array)* A new array with the object updated

#### `_i.destroy(state, id)`
Destroys an object if it exists (by `id`) in the array.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are destroying.
- returns
    - *(array)* A new array with the object removed

#### `_i.find(state, id)`
Find an object if it exists (by `id`) in the array. Useful in components when accessing the data.
  - arguments
    - **state** *(array)* The current array of objects.
    - **id** *(integer)* The id of the object you are finding.
- returns
    - *(array)* A single (first) object with the given id
