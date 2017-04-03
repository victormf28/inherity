// 'use strict';

var fs              = require('fs')
var pathNode        = require("path")
var glob            = require("glob")

var cleanComments   = require("./cleanComment") 
var util            = require("./util")
var configLanguage  = require("./configLanguage")
var dependencies    = require("./dependencies")




let inherity = function(mainConfig){

  for (index in mainConfig){

    configLanguage[index]       = Object.assign({},configLanguage[index], mainConfig[index]);
    configLanguage[index].paths =  util.getPathsFromGlobs(configLanguage[index].src);
    configLanguage[index]       = dependencies.createDependencies(configLanguage[index])
  }
  
  let getListDependencies = (opts)=>{

    if(! opts.chunk.type=="deleted"){
      configLanguage[opts.language].dependencies = {}
      configLanguage[opts.language] = dependencies.createDependencies(configLanguage[opts.language])
    }

    let lisView = dependencies.listDependencies(opts.chunk.path, configLanguage[opts.language]);
    return lisView

  }
  return {
    getListDependencies : getListDependencies
  }
}
module.exports =  inherity