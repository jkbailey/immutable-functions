var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("Destroy object by prop", function() {
  it("does not mutate the original array", function() {
    let arr = [
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ];
    let newArr = _i.destroyByProp(arr, 'prop', 2);

    expect(arr).to.deep.equal([
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ]);
  });

  it("destroys the object in a new array", function() {
    let arr = [
      {prop: 1, name: 'Jerry'},
      {prop: 2, name: 'Jeremy'},
      {prop: 3, name: 'Jason'}
    ];
    let newArr = _i.destroyByProp(arr, 'prop', 2);

    expect(newArr).to.deep.equal([
      {prop: 1, name: 'Jerry'},
      {prop: 3, name: 'Jason'}
    ]);
  });
});
