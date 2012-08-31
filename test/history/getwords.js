exports = {
getwords: function (ta) { return (ta || $$('textarea')[0]).value.split(/\s+/) }
, sentenceCount: function (paragraph) { return paragraph.split(/[\.\!\?]+/g) }
, id: function (it) { return it && (it.trim ? it.trim() : it) }
, sylcheck: function (words) { return words.map( function(it) { return [it].concat(syllables=it.replace(/(\w{3})es?\b/, "$1").match(/[aeiouy]+/ig) || []).concat(syllables.length).join("-") }) }
, syllableCount: function (words) { var sum=0; words.forEach( function(it) { syllables=it.replace(/(\w\w\w)es?\b/, "$1").match(/[aeiouy]+/ig) || []; sum += syllables.length }); return sum; }
, calc: calc
}

function calc(wordCount,sentenceCount,syllableCount,complexCount) {

// Flesch reading ease score
fres = 206.835 - (1.015 * wordCount) / sentenceCount - (84.6 * syllableCount) / wordCount;

// Automated readability index
ari = (4.71 * letterNumberCount) / wordCount + (0.5 * wordCount) / sentenceCount -21.43;

// Flesch-Kincaid grade level
fkgl = (0.39 * wordCount) / sentenceCount + (11.8 * syllableCount) / wordCount - 15.59;

// Coleman-Liau index
cl = (5.89 * letterNumberCount) / wordCount - (30.0 * sentenceCount) / wordCount - 15.8;

// Gunning fog index
fog = 0.4 * ( (double)wordCount / sentenceCount + (100.0 * complexCount) / wordCount );

// SMOG index -- INCORRECT ???
smog = Math.sqrt( complexCount * 30.0 / sentenceCount ) + 3.0;

}
