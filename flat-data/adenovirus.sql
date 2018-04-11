USE gpdb;

CREATE TABLE IF NOT EXISTS tb_adenovirus
(
  id	int unsigned NOT NULL auto_increment, # does not need to exist in table to be loaded
  area                                  longtext, #
  virusType	                            longtext, #
  matricesAnalyzed		                longtext, #
  numberOfPositiveSamples	            int, #
  totalNumberOfSamples                  int, #
  percentPositiveSamples                float, #
  quantityOfSampleSites                 int, #
  method                                longtext, # 
  fromConcentrationAverage              longtext, # 
  toConcentrationAverage                longtext, #
  toConcentrationAverageUnitsException  longtext, #
  reference                             longtext,

  PRIMARY KEY     (id)
);

# Load data
LOAD
	DATA 
	LOCAL	# gives error if absent for some reason 
	INFILE 'D:/Projects/global-pathogen-database/flat-data/adenovirus.txt'
INTO TABLE tb_adenovirus
FIELDS TERMINATED BY '\t'	# necessary - tab delimited fields
LINES TERMINATED BY '\r\n' # necessary - newline/carriage return delimited records
( 
    @area,
    @virusType,
    @matricesAnalyzed,
    @numberOfPositiveSamples,
    @totalNumberOfSamples,
    @percentPositiveSamples,
    @quantityOfSampleSites,
    @method,
    @fromConcentrationAverage,
    @toConcentrationAverage,
    @toConcentrationAverageUnitsException,
    @reference

) # map field names in order they appear in the file to be imported
SET
area = NULLIF(@area,''),
virusType = NULLIF(@virusType,''),
matricesAnalyzed = NULLIF(@matricesAnalyzed,''),
numberOfPositiveSamples = NULLIF(@numberOfPositiveSamples,''),
totalNumberOfSamples = NULLIF(@totalNumberOfSamples,''),
percentPositiveSamples = NULLIF(@percentPositiveSamples,''),
quantityOfSampleSites = NULLIF(@quantityOfSampleSites,''),
method = NULLIF(@method,''),
fromConcentrationAverage = NULLIF(@fromConcentrationAverage,''),
toConcentrationAverage = NULLIF(@toConcentrationAverage,''),
toConcentrationAverageUnitsException = NULLIF(@toConcentrationAverageUnitsException,''),
reference = NULLIF(@reference,'');