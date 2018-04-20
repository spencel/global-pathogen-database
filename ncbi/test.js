const rp = require( 'request-promise' );
const cheerio = require( 'cheerio' );

// assemble the esearch URL:
const base = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`;
var db = `taxonomy`;
var returnMode = `json`;
var term = `viruses[orgn]`;
var usehistory = `y`;
var url = base + `esearch.fcgi?db=` + db + `&retmode=` + returnMode + `&term=` + term + `&usehistory=` + usehistory;

var options = {
	uri: url,
	transform: function ( body ) {
		return cheerio.load( body );
	}
};


var htmlString = rp( options )


rp( options )
	.then( ( htmlString ) => {

		console.log( 'request succeeded' );
		var jsonData = JSON.parse( htmlString( 'body' ).text() );
		console.log( '\njsonData:' );
		console.log( jsonData );

		return jsonData;

	})
	.then( ( jsonData ) => {

		var webenv = jsonData.esearchresult.webenv;
		console.log( '\nwebenv: ' + webenv );

		var querykey = jsonData.esearchresult.querykey;
		console.log( '\nquerykey: ' + querykey );

		var count = jsonData.esearchresult.count;
		console.log( '\ncount: ' + count );

		var returnQuantity = 1; // chunks of records to return
		//var returnEnd = count; // maximum number of records to return before stopping
		var returnEnd = 10; // for testing purposes

		for ( var returnStart = 0; returnStart < returnEnd; returnStart += returnQuantity ) {
			
			var efetchUrl = base + `efetch.fcgi?db=` + db + `WebEnv=` + webenv
				+ `&query_key=` + querykey + `&retstart=` + returnStart
				+ `&retmax=$` + returnQuantity + `&rettype=fasta&retmode=` + returnMode;
			
			var options = {
				uri: efetchUrl,
				transform: function ( body ) {
					return cheerio.load( body );
				}
			};

		}

	})
	.catch( ( error ) => {
		console.log( 'request failed' );
	});