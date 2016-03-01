'use strict';

// MODULES //

var tape = require( 'tape' );
var Datum = require( './../lib/datum.js' );
var createDatum = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof createDatum, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `Datum` instances', function test( t ) {
	var datum = createDatum();
	t.ok( datum instanceof Datum, 'returns Datum instance' );
	t.end();
});
