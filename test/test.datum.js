'use strict';

// MODULES //

var tape = require( 'tape' );
var Datum = require( './../lib/datum.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof Datum, 'function', 'main export is a function' );
	t.end();
});

tape( 'the export is a constructor which may be called with or without the `new` keyword', function test( t ) {
	var createDatum;
	var datum;

	datum = new Datum();
	t.ok( datum instanceof Datum, 'returns Datum instance' );

	createDatum = Datum;
	datum = createDatum();
	t.ok( datum instanceof Datum, 'returns Datum instance without using `new`' );

	t.end();
});

tape( 'a datum instance has a method to set/get a metric name', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.metric, 'function', 'has a `metric` method' );
	t.end();
});

tape( 'if provided a metric name which is not a string primitive, the `metric` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.metric( value );
		};
	}
});

tape( 'the `metric` method sets a metric name', function test( t ) {
	var datum = new Datum();
	datum.metric( 'cpu.utilization' );
	t.equal( datum.metric(), 'cpu.utilization', 'sets a metric name' );
	t.end();
});

tape( 'a datum instance has a method to set/get a datum timestamp', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.timestamp, 'function', 'has a `timestamp` method' );
	t.end();
});

tape( 'if provided a timestamp which is not valid, the `timestamp` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.timestamp( value );
		};
	}
});

tape( 'the `timestamp` method sets a datum timestamp', function test( t ) {
	var datum;
	var ts;

	datum = new Datum();

	ts = '2014/07/18 09:45';
	datum.timestamp( ts );
	t.equal( datum.timestamp(), ts, 'sets timestamp (string)' );

	ts = Date.now();
	datum.timestamp( ts );
	t.equal( datum.timestamp(), ts, 'sets timestamp (number)' );

	t.end();
});

tape( 'a datum instance has a method to set/get a datum tags', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.tags, 'function', 'has a `tags` method' );
	t.end();
});

tape( 'if provided a tag name which is not a string primitive, the `tags` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.tags( value );
		};
	}
});

tape( 'if provided a tag value which is not a string primitive, the `tags` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.tags( 'beep', value );
		};
	}
});

tape( 'the `tags` method sets a datum tag', function test( t ) {
	var datum;
	var value;
	var tag;

	datum = new Datum();

	tag = 'foo';
	value = 'bar';

	datum.tags( tag, value );
	t.equal( datum.tags( tag ), value, 'sets tag' );

	t.end();
});

tape( 'if not provided an argument, the `tags` method returns all tags', function test( t ) {
	var datum;
	var tags;

	datum = new Datum();

	tags = {
		'tag1': 'value1',
		'tag2': 'value2'
	};

	datum.tags( 'tag1', tags.tag1 )
		.tags( 'tag2', tags.tag2 );

	t.deepEqual( datum.tags(), tags, 'returns all tags' );
	t.end();
});

tape( 'if provided only a tag name, the `tags` method return the tag value', function test( t ) {
	var datum = new Datum();
	datum.tags( 'beep', 'boop' );

	t.deepEqual( datum.tags( 'beep' ), 'boop', 'returns tag value' );
	t.end();
});

tape( 'if provided a non-existent tag name, the `tags` method returns `undefined`', function test( t ) {
	var datum = new Datum();

	t.deepEqual( datum.tags( 'beep' ), undefined, 'returns undefined' );
	t.end();
});

tape( 'a datum instance has a method to delete a tag', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.dtag, 'function', 'has a `dtag` method' );
	t.end();
});

tape( 'if provided a tag name which is not a string primitive, the `dtag` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.dtag( value );
		};
	}
});

tape( 'the `dtag` method deletes a tag', function test( t ) {
	var datum;
	var tags;

	datum = new Datum();

	tags = {
		'tag1': 'value1',
		'tag2': 'value2'
	};

	datum.tags( 'tag1', tags.tag1 )
		.tags( 'tag2', tags.tag2 );

	datum.dtag( 'tag1' );

	delete tags[ 'tag1' ];

	t.deepEqual( datum.tags(), tags, 'deletes a tag' );
	t.end();
});

tape( 'a datum instance has a method to set/get the datum value', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.value, 'function', 'has a `value` method' );
	t.end();
});

tape( 'if provided a value which is not a number primitive, the `value` method throws a type error', function test( t ) {
	var values;
	var datum;
	var i;

	values = [
		'5',
		NaN,
		true,
		null,
		undefined,
		[],
		{},
		function(){}
	];

	datum = new Datum();

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			datum.value( value );
		};
	}
});

tape( 'the `value` method sets the datum value', function test( t ) {
	var datum;
	var value;

	datum = new Datum();
	value = Math.random();

	datum.value( value );
	t.equal( datum.value(), value, 'sets a datum value' );

	t.end();
});

tape( 'a datum instance has a method to serialize a datum', function test( t ) {
	var datum = new Datum();
	t.equal( typeof datum.toString, 'function', 'has a `toString` method' );
	t.end();
});

tape( 'if a datum does not have a metric name, the `toString` method throws an error', function test( t ) {
	var datum = new Datum();

	datum.timestamp( Date.now() )
		.value( Math.random() )
		.tags( 'beep', 'boop' );

	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		datum.toString();
	}
});

tape( 'if a datum does not have a timestamp, the `toString` method throws an error', function test( t ) {
	var datum = new Datum();

	datum.metric( 'cpu.utilization' )
		.value( Math.random() )
		.tags( 'beep', 'boop' );

	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		datum.toString();
	}
});

tape( 'if a datum does not have a value, the `toString` method throws an error', function test( t ) {
	var datum = new Datum();

	datum.metric( 'cpu.utilization' )
		.timestamp( Date.now() )
		.tags( 'beep', 'boop' );

	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		datum.toString();
	}
});

tape( 'if a datum does not have at least one tag, the `toString` method throws an error', function test( t ) {
	var datum = new Datum();

	datum.metric( 'cpu.utilization' )
		.timestamp( Date.now() )
		.value( Math.random() );

	t.throws( foo, Error, 'throws an error' );
	t.end();

	function foo() {
		datum.toString();
	}
});

tape( 'the `toString` method serializes a datum', function test( t ) {
	var expected;
	var metric;
	var datum;
	var value;
	var tagk1;
	var tagv1;
	var tagk2;
	var tagv2;
	var ts;

	datum = new Datum();

	metric = 'cpu.utilization';
	ts = Date.now();
	value = Math.random();
	tagk1 = 'beep';
	tagv1 = 'boop';
	tagk2 = 'foo';
	tagv2 = 'bar';

	expected = metric+' '+ts+' '+value+' '+tagk1+'='+tagv1+' '+tagk2+'='+tagv2;

	datum
		.metric( metric )
		.timestamp( ts )
		.value( value )
		.tags( tagk1, tagv1 )
		.tags( tagk2, tagv2 );

	t.equal( datum.toString(), expected );
	t.end();
});
