var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("MergeByProp object", function() {
  it("does not mutate the original array", function() {
    let arr1 = [
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {loanId: 2, name: 'Jeremy'},
      {loanId: 3, name: 'Jason'}
    ];
    let newArr = _i.mergeByProp(arr1, arr2, 'loanId');

    expect(arr1).to.deep.equal([
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Jeremy'}
    ]);
  });

  it("merges the 2nd array on top of the 1st array", function() {
    let arr1 = [
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {loanId: 2, name: 'Jeremy'},
      {loanId: 3, name: 'Jason'}
    ];
    let newArr = _i.mergeByProp(arr1, arr2, 'loanId');

    expect(newArr).to.deep.equal([
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Jeremy'},
      {loanId: 3, name: 'Jason'}
    ]);
  });

  it("existing object is updated with any new data", function() {
    let arr1 = [
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {loanId: 2, name: 'Slaphost'},
      {loanId: 3, name: 'Jason'}
    ];
    let newArr = _i.mergeByProp(arr1, arr2, 'loanId');

    expect(newArr).to.deep.equal([
      {loanId: 1, name: 'Jerry'},
      {loanId: 2, name: 'Slaphost'},
      {loanId: 3, name: 'Jason'}
    ]);
  });

  it("object with nested array updates correctly", function() {
    let obj1 = {
      loading: false,
      products: [
        {loanId: 1, name: 'Jerry'},
        {loanId: 2, name: 'Jeremy'}
      ]
    };
    let obj2 = {
      loading: true,
      products: [
        {loanId: 2, name: 'Slaphost'},
        {loanId: 3, name: 'Jason'}
      ]
    };
    let newObj = _i.mergeByProp(obj1, obj2, 'loanId');

    expect(newObj).to.deep.equal({
      loading: true,
      products: [
        {loanId: 1, name: 'Jerry'},
        {loanId: 2, name: 'Slaphost'},
        {loanId: 3, name: 'Jason'}
      ]
    });
  });

  it("object with nested object deep updates correctly", function() {
    let obj1 = {
      loading: false,
      user: {
        loanId: 1,
        name: 'Jerry'
      }
    };
    let obj2 = {
      loading: true,
      user: {
        loanId: 1,
        name: 'Jerry Bailey',
        state: 'California'
      }
    };
    let newObj = _i.mergeByProp(obj1, obj2, 'loanId');

    expect(newObj).to.deep.equal({
      loading: true,
      user: {
        loanId: 1,
        name: 'Jerry Bailey',
        state: 'California'
      }
    });
  });
});
