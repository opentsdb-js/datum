Datum
=====
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> [OpenTSDB][opentsdb] datapoint model.

This library implements the [OpenTSDB][opentsdb] data [model][opentsdb-data-model], where the model represents a single timeseries datapoint (datum).


## Installation

``` bash
$ npm install opentsdb-datum
```


## Usage

``` javascript
var createDatum = require( 'opentsdb-datum' );
```

### Data Model

To create an [OpenTSDB][opentsdb] datum,

``` javascript
var datum = createDatum();
```

A `datum` is configurable and has the following methods...


#### datum.metric( [name] )

This method is a setter/getter. If no metric `name` is provided, the method returns the metric `name` assigned to a datum. A metric `name` is __required__ to properly describe a `datum`. To set a metric `name`,

``` javascript
datum.metric( 'cpu.utilization' );
```

#### datum.timestamp( [timestamp] )

This method is a setter/getter. If no `timestamp` is provided, the method returns the `timestamp` assigned to a datum. A `timestamp` is __required__ to properly describe a `datum`. To set a `timestamp`,

``` javascript
datum.timestamp( Date.now() );
```

A `timestamp` may either be a date `string` or a UNIX timestamp. For further details, see the [time validation utility][opentsdb-validate-time].


#### datum.value( [value] )

This method is a setter/getter. If no `value` is provided, the method returns the datum `value`. A `value` is __required__ to properly describe a `datum`. To set a datum `value`,

``` javascript
datum.value( Math.random() );
```


#### datum.tags( [tag, [value]] )

This method is a setter/getter. If no arguments are provided, the method returns all tag names and their values. If a `tag` name is specified, the method returns the value for that `tag`. Otherwise, the method sets a `tag` to the specified `value`. At least one `tag` is __required__ to properly describe a `datum`. To set a `tag`,

``` javascript
datum.tags( 'beep', 'boop' );
```

A `tag` is an additional piece of information which describes a `datum`. For example, a `cpu.user` timeseries `datum` may originate from a particular host; e.g., `host=webserver1`. To later be able to query [OpenTSDB][opentsdb] for only those `cpu.user` timeseries originating from `webserver1` while optimizing for aggregations across multiple web servers, [OpenTSDB][opentsdb] allows data tagging. In this case,

``` javascript
datum.tags( 'host', 'webserver1' );
```

The decision to tag a `datum` or include additional information in the metric `name` depends on your [naming schema][opentsdb-naming-schema]. Be careful to consider your query needs before deciding one way or the other.


#### datum.dtag( tag )

Deletes a datum `tag`.

``` javascript
// Add a tag:
datum.tags( 'beep', 'boop' );

// Delete the tag:
datum.dtag( 'beep' );
```


#### datum.toString()

Serializes the `datum`. A `datum` must have a `metric name`, `timestamp`, `value`, and at least __one__ `tag` to be serializable. To serialize a `datum`,

``` javascript
datum.toString();
```


---
## Notes

* When used as setters, all setter/getter methods are chainable. For example,

	``` javascript
	var datum = createDatum();

	datum
		.metric( 'cpu.utilization' )
		.timestamp( Date.now() )
		.value( Math.random() )
		.tags( 'beep', 'boop' )
		.tags( 'foo', 'bar' )
		.toString();
	```

*  Because a `datum` is configurable, a `datum` serves as a factory for serializing similar data.

	``` javascript
	var datum = createDatum();

	var data = new Array( 100 );

	// Configure a datum:
	datum
		.metric( 'cpu.utilization' )
		.tags( 'beep', 'boop' )
		.tags( 'foo', 'bar' );

	for ( var i = 0; i < data.length; i++ ) {
		// Assign values to the datum:
		datum
			.timestamp( Date.now() )
			.value( Math.random() );

		// Serialize and store:
		data[ i ] = datum.toString();
	}

	// Convert to a newline delimited string:
	data = data.join( '\n' );

	console.log( data );
	```


---
## Examples

``` javascript
var createDatum = require( 'opentsdb-datum' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2016. The [OpenTSDB.js][opentsdb-js] Authors.


[npm-image]: http://img.shields.io/npm/v/opentsdb-datum.svg
[npm-url]: https://npmjs.org/package/opentsdb-datum

[build-image]: http://img.shields.io/travis/opentsdb-js/datum/master.svg
[build-url]: https://travis-ci.org/opentsdb-js/datum

[coverage-image]: https://img.shields.io/codecov/c/github/opentsdb-js/datum/master.svg
[coverage-url]: https://codecov.io/github/opentsdb-js/datum.svg?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/datum.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/datum

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/datum.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/datum

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/datum.svg
[github-issues-url]: https://github.com/opentsdb-js/datum/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[opentsdb-js]: https://github.com/opentsdb-js

[opentsdb]: http://opentsdb.net
[opentsdb-data-model]: http://opentsdb.net/docs/build/html/user_guide/writing.html#data-specification
[opentsdb-validate-time]: https://github.com/opentsdb-js/opentsdb-validate-time
[opentsdb-naming-schema]: http://opentsdb.net/docs/build/html/user_guide/writing.html#naming-schema
