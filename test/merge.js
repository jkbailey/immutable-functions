var expect    = require("chai").expect;
var _i = require("../lib/immutable-functions.pure");

describe("Merge object", function() {
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

  it("existing object is updated with any new data", function() {
    let arr1 = [
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Jeremy'}
    ];
    let arr2 = [
      {id: 2, name: 'Slaphost'},
      {id: 3, name: 'Jason'}
    ];
    let newArr = _i.merge(arr1, arr2);

    expect(newArr).to.deep.equal([
      {id: 1, name: 'Jerry'},
      {id: 2, name: 'Slaphost'},
      {id: 3, name: 'Jason'}
    ]);
  });

  it("object with nested array updates correctly", function() {
    let obj1 = {
      loading: false,
      products: [
        {id: 1, name: 'Jerry'},
        {id: 2, name: 'Jeremy'}
      ]
    };
    let obj2 = {
      loading: true,
      products: [
        {id: 2, name: 'Slaphost'},
        {id: 3, name: 'Jason'}
      ]
    };
    let newObj = _i.merge(obj1, obj2);

    expect(newObj).to.deep.equal({
      loading: true,
      products: [
        {id: 1, name: 'Jerry'},
        {id: 2, name: 'Slaphost'},
        {id: 3, name: 'Jason'}
      ]
    });
  });

  it("object with nested object deep updates correctly", function() {
    let obj1 = {
      loading: false,
      user: {
        id: 1,
        name: 'Jerry'
      }
    };
    let obj2 = {
      loading: true,
      user: {
        id: 1,
        name: 'Jerry Bailey',
        state: 'California'
      }
    };
    let newObj = _i.merge(obj1, obj2);

    expect(newObj).to.deep.equal({
      loading: true,
      user: {
        id: 1,
        name: 'Jerry Bailey',
        state: 'California'
      }
    });
  });

  it("object with nested object deep merges correctly", function() {
    let obj1 = {
      loading: false,
      users: [{
        id: 1,
        name: 'Jerry',
        games: {
          nodes: [
            {
              id: 'asdf',
              game: 'uno'
            },
            {
              id: 'asdf2',
              game: 'war'
            }
          ]
        }
      }]
    };
    let obj2 = {
      loading: true,
      users: [{
        id: 1,
        state: 'California',
        games: {
          nodes: [
            {
              id: 'asdf2',
              game: 'rummy'
            },
            {
              id: 'asdf3',
              game: 'solitare'
            }
          ]
        }
      }]
    };
    let newObj = _i.merge(obj1, obj2, true);

    expect(newObj).to.deep.equal({
      loading: true,
      users: [{
        id: 1,
        name: 'Jerry',
        state: 'California',
        games: {
          nodes: [
            {
              id: 'asdf',
              game: 'uno'
            },
            {
              id: 'asdf2',
              game: 'rummy'
            },
            {
              id: 'asdf3',
              game: 'solitare'
            }
          ]
        }
      }]
    });
  });

  it("object with nested object deep merges correctly when undefined", function() {
    let obj1 = {
      loading: false,
      users: [{
        id: 1,
        name: 'Jerry',
        games: {}
      }]
    };
    let obj2 = {
      loading: true,
      users: [{
        id: 1,
        state: 'California',
        games: {
          nodes: [
            {
              id: 'asdf2',
              game: 'rummy'
            },
            {
              id: 'asdf3',
              game: 'solitare'
            }
          ]
        }
      }]
    };
    let newObj = _i.merge(obj1, obj2, true);

    expect(newObj).to.deep.equal({
      loading: true,
      users: [{
        id: 1,
        name: 'Jerry',
        state: 'California',
        games: {
          nodes: [
            {
              id: 'asdf2',
              game: 'rummy'
            },
            {
              id: 'asdf3',
              game: 'solitare'
            }
          ]
        }
      }]
    });
  });
});
