var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("Create object", function() {
  it("does not mutate the original array", function() {
    let arr = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ];
    let newArr = _i.create(arr, {id: 3, name: 'Jason'});

    expect(arr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ]);
  });

  it("adds a new object to the original array", function() {
    let arr = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ];
    let newArr = _i.create(arr, {id: 3, name: 'Jason'});

    expect(newArr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'},
      {id: 3, name: 'Jason'}
    ]);
  });
});
