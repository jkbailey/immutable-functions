var expect    = require("chai").expect;
var _i = require("../index");

describe("Create object", function() {
  it("does not mutate the original array", function() {
    let arr1 = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.merge(arr1, arr2);

    expect(arr1).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ]);
  });

  it("merges the 2nd array on top of the 1st array", function() {
    let arr1 = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.merge(arr1, arr2);

    expect(newArr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ]);
  });
});
