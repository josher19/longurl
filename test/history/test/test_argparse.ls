argparse = require '../argparse'
{expect,should} = require 'chai'

getHistory = -> ["history_default_value"]

describe 'argparse', (a) ->
    
    it 'should take two arguments', ->
        expect(argparse.length).equal 2

    it 'second argument should by an argument list or array', ->
        {a,b}=argparse([{"a^":"string"}, {"b^":"string"}], ["hello", "world"])
        
        expect a .equal "hello"
        expect b .equal "world"
        
    it 'first argument should give type of argument expected', ->
        {hi, there} = argparse([{"hi^" : "string"}, {"there^":"string"}], ["hello", "world"])
        expect hi .equal "hello"
        expect there .equal "world"

    # just use ? for optional, ! for required, ^ for type requirement        
    it 'should be able to give default arguments', ->
        {file,enc,num,hist,cb} = res = argparse(
            [{'file':{'otype':"string", "defaultV":"history.txt"}}, 
            {'enc^':"string"}, 
            {'num^':"number"}, 
            "hist":{"otype":"array", "defaultV":getHistory}], {} )
        #console.log "\n"
        #console.log "Results", res
        expect typeof enc .equal "undefined"
        expect typeof num .equal "undefined"
        expect typeof file .equal "object"
        expect typeof hist .equal "object"


    it 'should be able to give types', ->
        {file,enc,num,hist,cb} = res = argparse [
            { "!file^": "string"},
            { "?enc^" : "string"},
            { "?num^" : "number"},
            { "hist^": "undefined" },
            { "cb^"  : "function" }
            ], {0: "history.txt", 1: "UTF-8", 2: 0, 3: undefined, 4: getHistory}
            
        #console.log "Results", res
        
        expect(typeof file).equal("string")
        expect(file).equal("history.txt")
        
        expect(typeof enc).equal("string")
        expect(enc).not.equal("GBK")

        expect(typeof num).equal("number")
        expect(num).equal 0
        
        expect(typeof hist).equal("undefined")
        expect hist .eql undefined
        
        expect(typeof cb).equal("function")
        expect cb .equal getHistory
       
    it 'should be able to give object hash', ->
 #       {file,enc,num,hist} = res = argparse {
 #           "string" : ["file", "enc"],
 #           "number" : "num",
 #           "array" : "hist"
 #           }, {0: "rhistory.txt", 1: "GBK", 2: 10, 3: [1,2,3]}
            
        {file,enc,num,hist,cb} = res = argparse {
            0: file:"history.txt", 
            1: enc:"UTF-8", 
            2: num:0, 
            3: "hist": getHistory!,
            4: "cb": getHistory
            } , {0: "rhistory.txt", 1: "GBK", 2: 10, 3: [1,2,3], 4: null}
        #console.log "Results", res
        
        expect(typeof file).equal("string");
        expect(file).equal("rhistory.txt");
        
        expect(typeof enc).equal("string");
        expect(enc).equal("GBK");
        
        expect(typeof num).equal("number");
        expect(num).equal 10
        
        expect(typeof hist).equal("object");
        expect hist .eql [1,2,3]
        
        expect(typeof cb).equal("function");
        expect cb .equal getHistory
        
    it 'should be able to give default and infer type', ->
        {file,enc,num,hist,cb} = res = argparse [
            {file:"history.txt"}, 
            {enc:"UTF-8"}, 
            {num:0}, 
            {"hist": getHistory!},
            {"cb": getHistory}
            ], {0: "rhistory.txt", 1: "GBK", 2: 10, 3: [1,2,3], 4: undefined}
        #console.log "Results", res
        
        expect(typeof file).equal("string");
        expect(file).equal("rhistory.txt");
        
        expect(typeof enc).equal("string");
        expect(enc).equal("GBK");
        
        expect(typeof num).equal("number");
        expect(num).equal 10
        
        expect(typeof hist).equal("object");
        expect hist .eql [1,2,3]
        
        expect(typeof cb).equal("function");
        expect cb .equal getHistory
        
    it 'should work with arrays', ->
        {file,enc,num,hist,cb} = res = argparse [
            {file:"history.txt"}, 
            {enc:"UTF-8"}, 
            {num:0}, 
            {"hist": getHistory!},
            {"cb": getHistory}
            ], ["rhistory.txt", "GBK", 10, [1,2,3], undefined]
        #console.log "Results", res 
        
        expect(typeof file).equal("string");
        expect(file).equal("rhistory.txt");
        
        expect(typeof enc).equal("string");
        expect(enc).equal("GBK");
        
        expect(typeof num).equal("number");
        expect(num).equal 10
        
        expect(typeof hist).equal("object");
        expect hist .eql [1,2,3]
        
        expect(typeof cb).equal("function");
        expect cb .equal getHistory
        
    it 'should work with function arguments', ->
    
        getArgs = -> arguments
        
        {file,enc,num,hist,cb} = res = argparse [
            {file:"history.txt"}, 
            {enc:"UTF-8"}, 
            {num:0}, 
            {"hist": getHistory!},
            {"cb": getHistory}
            ], getArgs("rhistory.txt", "", undefined, [1,2,3], getArgs)
        #console.log "Results", res 
        
        expect(typeof file).equal("string");
        expect(file).equal("rhistory.txt");
        
        expect(typeof enc).equal("string");
        expect(enc).not.equal("UTF-8");
        expect(enc).equal("");
        
        expect(typeof num).equal("number");
        expect(num).equal 0
        
        expect(typeof hist).equal("object");
        expect hist .eql [1,2,3]
        
        expect(typeof cb).equal("function");
        expect cb .equal getArgs

    it 'should skip ?optional arguments, require !important ones', ->
        {file,enc,num,hist,cb} = res = argparse [
            {"?file":"history.txt"}, 
            {"?enc":"UTF-8"}, 
            {"!num":0}, 
            {"?hist": [1,2,3]},
            {"!cb^": "function"}
            ], [8, "GBK", getHistory, [3,2,1].reverse() ]
            
        #console.log "Results", res 
        
        expect(typeof file).equal("string");
        expect(file).equal("history.txt");
        
        expect(typeof enc).equal("string");
        expect(enc).equal("GBK");
        
        expect(typeof num).equal("number");
        expect(num).equal 8
        
        expect(typeof hist).equal("object");
        expect hist .eql [1,2,3]
        
        expect(typeof cb).equal("function");
        expect cb .equal getHistory
    
    it 'should be able to mix defaults and types (^)', ->
        {file,encoding,cb} = res = argparse([{'file^':'string'},{'encoding':'UTF-8'},{'!cb^':'function'}], {0:"history.txt", 1:"GBK"})
        
        expect typeof file .equal 'string' 
        expect 'history.txt' .equal file
        
        expect 'string' .equal typeof encoding
        expect encoding .equal 'GBK'
        
        expect 'undefined' .equal typeof cb
    
    it 'should work for falsey values', ->
        {bool,str,num} = res = argparse([{'bool^':'boolean'},{'?str^':'string'},{'!num^':'number'}],[false,0,''])
        
        console.log res
        
        expect typeof bool .equal 'boolean'
        expect false .equal bool
        
        # expect typeof str .equal 'string'
        # expect '' .equal str
        
        expect typeof num .equal 'number'
        expect 0 .equal num
        
    it 'should be able to group arguments', ->
        res = argparse.group [false,0,'',getHistory,undefined,{found:true},[1,2,3,"four"],null]

        console.log res
        
        expect res['boolean'] .exists

        expect res['boolean'].length .equal 1
        
        expect res['boolean'][0] .not.equal null
        
        expect false .equal res['boolean'][0]
        
        expect 0 .equal res['number'][0]
        
        expect '' .equal res['string'][0]

        expect getHistory .equal res['function'][0]
        
        expect 4 .equal res['undefined'][0]
        
        expect res['boolean'].length .greaterThan 0
        expect true .equal res['object'][0].found
        expect 4 .equal res['object'][1].length

        expect 7 .equal res['null'][0]
        
        expectedRes = { 
            boolean: [ false ],
            number: [ 0 ],
            string: [ '' ],
            function: [ getHistory ],
            undefined: [ 4 ],
            object: [ { found: true }, [ 1, 2, 3, 'four' ] ],
            null: [ 7 ] 
        }
        expect res .eql expectedRes
