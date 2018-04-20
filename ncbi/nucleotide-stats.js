const rp = require( 'request-promise' );
const cheerio = require( 'cheerio' );

// assemble the esearch URL:
const base = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`;
var db = `nucleotide`;
var retmode = `json`;
var term = `chimpanzee[orgn]+AND+biomol+mrna[prop]`;
var usehistory = `y`;
//var url = base + `esearch.fcgi?db=` + db + `&retmode=` + retmode + `&term=` + term + `&usehistory=` + usehistory;
var url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/einfo.fcgi?retmode=json&db=nucleotide`;

const options = {
	uri: url,
	transform: function ( body ) {
		return cheerio.load( body );
	}
};

rp( options )
	.then( ( htmlString ) => {
		console.log( 'request succeeded' );
		var jsonData = JSON.parse( htmlString( 'body' ).text() );
		console.log( '\njsonData:' );
		console.log( jsonData );
		console.log( '\njsonData.einforesult.dbinfo.fieldlist[ 0 ]:' );
		console.log( jsonData.einforesult.dbinfo.fieldlist[ 0 ] );
	})
	.catch( ( error ) => {
		console.log( 'request failed' );
	});