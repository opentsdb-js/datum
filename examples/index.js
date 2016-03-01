'use strict';

var createDatum = require( './../lib' );

// Create a new datum instance:
var datum = createDatum();

// Configure the datum:
datum
	.metric( 'cpu.utilization' )
	.tags( 'beep', 'boop' )
	.tags( 'foo', 'bar' );

// Give the datum a timestamp and value:
datum
	.timestamp( Date.now() )
	.value( Math.random() );

// Serialize the datum:
console.log( datum.toString() );
/* returns
	"cpu.utilization <timestamp> <value> beep=boop foo=bar"
*/

// One can use a datum as a serialized datum factory...
var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	datum
		.timestamp( Date.now() )
		.value( Math.random() );

	data[ i ] = datum.toString();
}

// Convert the data to a newline delimited string:
data = data.join( '\n' );

console.log( data );
/* returns
	"cpu.utilization <timestamp> <value> beep=boop foo=bar"
	"cpu.utilization <timestamp> <value> beep=boop foo=bar"
	"cpu.utilization <timestamp> <value> beep=boop foo=bar"
	...
	"cpu.utilization <timestamp> <value> beep=boop foo=bar"
*/
