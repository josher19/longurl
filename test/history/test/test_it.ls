{expect,should} = require 'chai'

_it = it

console.log it.toString!
console.log describe.toString!

describe "it gets shadowed", ->
  _it "_it should work", (done) ->
    expect it.toString! .equal _it.toString!
    done!

_it = it
describe 'working features' ->
  _it 'works' ->


_describe = describe
# it = _it

describe_ = (dsc, callback) ->
  _describe dsc, -> callback _it
  
describe_ 'patch describe', ->
  it 'should work with done', (done) ->
     expect String it .equal String _it
     done!

  me = it
  it 'should work w/o done', ->
     expect String me .equal String _it

describe 'Testing with Mocha or Jasmine',(x) ->
    it 'should be possible to run this code',  ->
        expect true .equal true  # test should pass

describe 'Testing with Mocha or Jasmine', ->
    _it 'should be possible to run this code', ->
        expect true .equal true  # test should pass

describe_ 'Testing with Mocha or Jasmine', ->
    it 'should be possible to run this code', ->
        expect true .equal true  # test should pass
