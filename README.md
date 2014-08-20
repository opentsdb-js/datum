Datum
=====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

[OpenTSDB](http://opentsdb.net) datapoint model.


### Install

For use in Node.js,

``` bash
$ npm install opentsdb-datum
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


### Data Model

OpenTSDB specifies a data [model](http://opentsdb.net/docs/build/html/user_guide/writing.html#data-specification) for every timeseries datapoint. To create an OpenTSDB datum,

``` javascript
var dataFactory = require( 'opentsdb-datum' );

var datum = dataFactory();
```

A datum is configurable and has the following methods...


#### datum.metric( [name] )

This method is a setter/getter. If no `metric name` is provided, returns the `metric name` assigned to a datum. A `metric name` is __required__ to properly describe a datum. To set a `metric name`,

``` javascript
datum.metric( 'cpu.utilization' );
```

#### datum.timestamp( [timestamp] )

This method is a setter/getter. If no `timestamp` is provided, returns the `timestamp` assigned to a datum. A `timestamp` is __required__ to properly describe a datum. To set a `timestamp`,

``` javascript
datum.timestamp( Date.now() );
```

A `timestamp` may either be a date string or a UNIX timestamp.


#### datum.value( [value] )

This method is a setter/getter. If no `value` is provided, returns the datum `value`. A `value` is __required__ to properly describe a datum. To set a datum `value`,

``` javascript
datum.value( Math.random() );
```


#### datum.tags( [tag, [value]] )

This method is a setter/getter. If no arguments are provided, returns all tag names and their values. If a `tag` name is specified, returns the value for that tag. Otherwise, sets a `tag` to the specified `value`.

``` javascript
datum.tags( 'beep', 'boop' );
```

A `tag` is an additional piece of information which describes a `datum`. For example, a `cpu.user` timeseries `datum` may originate from a particular host; e.g., `host=webserver1`. To later be able to query OpenTSDB for only those `cpu.user` timeseries originating from `webserver1` while optimizing for aggregations across multiple web servers, OpenTSDB allows data tagging. In this case,

``` javascript
datum.tags( 'host', 'webserver1' );
```

The decision to tag a `datum` or include additional information in the `metric name` depends on your [naming schema](http://opentsdb.net/docs/build/html/user_guide/writing.html#naming-schema). Be careful to consider your query needs before deciding one way or the other.


#### datum.dtag( tag )

This method deletes a datum `tag`.

``` javascript
// Add a tag:
datum.tags( 'beep', 'boop' );

// Delete the tag:
datum.dtag( 'beep' );
```


#### datum.toString()

This method serializes the datum. The datum must have a `metric name`, `timestamp`, and `value` to be serializable. To serialize a datum,

``` javascript
datum.toString();
```

Because a `datum` is configurable, a `datum` serves as a factory for serializing similar data.

``` javascript
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
## Notes

When used as setters, all setter/getter methods are chainable. For example,

``` javascript
var dataFactory = require( 'opentsdb-datum' ),
	datum = dataFactory();

datum
	.metric( 'cpu.utilization' )
	.timestamp( Date.now() )
	.value( Math.random() )
	.tags( 'beep', 'boop' )
	.tags( 'foo', 'bar' )
	.toString();
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/opentsdb-datum.svg
[npm-url]: https://npmjs.org/package/opentsdb-datum

[travis-image]: http://img.shields.io/travis/opentsdb-js/opentsdb-datum/master.svg
[travis-url]: https://travis-ci.org/opentsdb-js/opentsdb-datum

[coveralls-image]: https://img.shields.io/coveralls/opentsdb-js/opentsdb-datum/master.svg
[coveralls-url]: https://coveralls.io/r/opentsdb-js/opentsdb-datum?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/opentsdb-datum.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/opentsdb-datum

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/opentsdb-datum.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/opentsdb-datum

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/opentsdb-datum.svg
[github-issues-url]: https://github.com/opentsdb-js/opentsdb-datum/issues