'use strict';

// MODULES //

var getKeys = require( 'object-keys' );
var copy = require( 'utils-copy' );
var isString = require( 'validate.io-string-primitive' );
var isNumber = require( 'validate.io-number-primitive' );
var validate = require( 'opentsdb-validate-time' );


// DATUM //

/**
* FUNCTION: Datum()
*	OpenTSDB datum contructor.
*
* @constructor
* @returns {Datum} Datum instance
*/
function Datum() {
	if ( !( this instanceof Datum ) ) {
		return new Datum();
	}
	// Metric (required):
	this._metric = null;

	// Timestamp (required):
	this._timestamp = null;

	// Value (required):
	this._value = null;

	// Tags (optional):
	this._tags = {};

	return this;
} // end FUNCTION Datum()

/**
* METHOD: metric( [value] )
*	Metric name setter and getter. If a metric is supplied, sets the metric name. If no metric is supplied, returns the metric name.
*
* @param {String} [value] - metric name; e.g., 'cpu.utilization'
* @returns {Datum|String} Datum instance or metric name
*/
Datum.prototype.metric = function metric( value ) {
	if ( !arguments.length ) {
		return this._metric;
	}
	if ( !isString( value ) ) {
		throw new TypeError( 'invalid input argument. Metric name must be a string primitive. Value: `' + value + '`.' );
	}
	this._metric = value;
	return this;
}; // end METHOD metric()

/**
* METHOD: timestamp( [value] )
*	Timestamp setter and getter. If a value is provided, sets the timestamp. If no value is provided, returns the timestamp.
*
* @param {String|Number} [value] - timestamp; may be either an absolute time string or a UNIX timestamp
* @returns {Datum|Number} Datum instance or timestamp
*/
Datum.prototype.timestamp = function timestamp( value ) {
	if ( !arguments.length ) {
		return this._timestamp;
	}
	if ( !isString( value ) && !isNumber( value ) ) {
		throw new TypeError( 'invalid input argument. Timestamp must be either a string or numeric. Value: `' + value + '`.' );
	}
	if ( !validate.format( value ) ) {
		throw new TypeError( 'invalid input argument. Timestamp must be a valid time. Value: `' + value + '`.' );
	}
	this._timestamp = value;
	return this;
}; // end METHOD timestamp()

/**
* METHOD: value( [value] )
*	Value setter and getter. If a value is supplied, sets the datum value. If no value is supplied, returns the datum value.
*
* @param {Number} [value] - datum value
* @returns {Datum|Number} Datum instance or value
*/
Datum.prototype.value = function value( v ) {
	if ( !arguments.length ) {
		return this._value;
	}
	if ( !isNumber( v ) ) {
		throw new TypeError( 'invalid input argument. Value must be a number primitive. Value: `' + v + '`.' );
	}
	this._value = v;
	return this;
}; // end METHOD value()

/**
* METHOD: tags( [tag[, value]] )
*	Tag value setter and getter. If a value is supplied, sets the tag value. If no value is supplied, gets the tag value. If the tag name has not been set, getting the tag value returns `undefined`. If no tag name-value pair is provided, returns all tags. Note that the returned object for all tags does not correspond to the internal object. Accordingly, the internal object should be treated as immutable.
*
* @param {String} [tag] - tag name
* @param {String} [value] - tag value
* @returns {Datum|Object|String|Void} Datum instance, all tags, or tag value
*/
Datum.prototype.tags = function tags( tag, value ) {
	if ( arguments.length === 0 ) {
		return copy( this._tags );
	}
	if ( !isString( tag ) ) {
		throw new TypeError( 'invalid input argument. Tag name must be a string primitive. Value: `' + tag + '`.' );
	}
	if ( arguments.length === 1 ) {
		return this._tags[ tag ];
	}
	if ( !isString( value ) ) {
		throw new TypeError( 'invalid input argument. Tag value must be a string primitive. Value: `' + value + '`.' );
	}
	this._tags[ tag ] = value;
	return this;
}; // end METHOD tags()

/**
* METHOD: dtag( tag )
*	Removes a tag.
*
* @param {String} tag - tag name
* @returns {Datum} Datum instance
*/
Datum.prototype.dtag = function( tag ) {
	if ( !isString( tag ) ) {
		throw new TypeError( 'invalid input argument. Tag name must be a string primitive. Value: `' + tag + '`.' );
	}
	delete this._tags[ tag ];
	return this;
}; // end METHOD tag()

/**
* METHOD: toString()
*	Custom `toString()` method which serializes a datum. Format:
*
*    "metric timestamp value tagk1=tagv1 tagk2=tagkN ... tagkN=tagvN"
*
* @returns {String} serialized datum
*/
Datum.prototype.toString = function() {
	var buffer;
	var ntags;
	var keys;
	var key;
	var i;
	if ( !this._metric ) {
		throw new Error( 'invalid datum. Datum must be assigned a `metric` name.' );
	}
	if ( !this._timestamp && this._timestamp !== 0) {
		throw new Error( 'invalid datum. Datum must be assigned a `timestamp`.' );
	}
	if ( !this._value && this._value !== 0 ) {
		throw new Error( 'invalid datum. Datum must be assigned a `value`.' );
	}
	// Count the tags:
	keys = getKeys( this._tags );
	ntags = keys.length;
	if ( ntags < 1 ) {
		throw new Error( 'invalid datum. Datum must have at least one `tag`.' );
	}
	// Create a new array buffer:
	buffer = new Array( 3+ntags );
	buffer[ 0 ] = this._metric;
	buffer[ 1 ] = this._timestamp;
	buffer[ 2 ] = this._value;

	// Serialize all tags...
	for ( i = 0; i < ntags; i++ ) {
		key = keys[ i ];
		buffer[ i+3 ] = key + '=' + this._tags[ key ];
	}
	return buffer.join( ' ' );
}; // end METHOD toString()


// EXPORTS //

module.exports = Datum;
