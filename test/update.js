var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("Update object", function() {
  it("does not mutate the original array", function() {
    let arr = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.update(arr, 2, {name: 'Slaphost', type: 'nickname'});

    expect(arr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ]);
  });

  it("updates the object in a new array", function() {
    let arr = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.update(arr, 2, {name: 'Slaphost', type: 'nickname'});

    expect(newArr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Slaphost', type: 'nickname'},
      {id: 3, name: 'Jason'}
    ]);
  });

  it("create the object if it does not exist", function() {
    let arr = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.update(arr, 4, {id: 4, name: 'Slaphost', type: 'nickname'});

    expect(newArr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'},
      {id: 4, name: 'Slaphost', type: 'nickname'}
    ]);
  });
});
