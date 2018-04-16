var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("Update object", function() {
  it("does not mutate the original array", function() {
    let arr = [
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ];
    let newArr = _i.updateByProp(arr, 'prop', 2, {name: 'Slaphost', type: 'nickname'});

    expect(arr).to.deep.equal([
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ]);
  });

  it("updates the object in a new array", function() {
    let arr = [
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ];
    let newArr = _i.updateByProp(arr, 'prop', 2, {name: 'Slaphost', type: 'nickname'});

    expect(newArr).to.deep.equal([
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Slaphost', type: 'nickname'},
      {prop: 3, name: 'Jason'}
    ]);
  });
});
