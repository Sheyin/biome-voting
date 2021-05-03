import json
from datetime import datetime

# datetime object containing current date and time
now = datetime.now()

start_filename = "bop-voting-default-rtdb-export.json"
end_json_filename = "voting_results.json"
end_csv_filename = "voting_results.csv"

# This is to populate a "last updated" on the spreadsheet
dt_string = now.strftime("%m/%d/%Y %H:%M:%S")

f = open(start_filename, "r")
data = f.read()
y = json.loads(data)

print("Parsing database dump... ")
biomes = y['biomes']

# Creating two different types of files b/c I'm not sure of the eventual output.
json_output = open(end_json_filename, "w")
csv_output = open(end_csv_filename , "w")


# Headers for csv file
headertext = f"Biome identifier, Biome name (type), Yes, No, Maybe,Last updated: {dt_string}\n"
csv_output.write(headertext)

json_output.close()
csv_output.close()

# Now we can safely append
json_output = open(end_json_filename, "a")
csv_output = open(end_csv_filename , "a")

# Cycle through biome list and tally the vote types
for biome in y['biomes']:
	yes_count = 0
	no_count = 0
	maybe_count = 0
	biome_entry_name = biome['biome_entry_name']
	biome_short_name = biome['biome_short_name']
	ratings = biome['ratings']
	type = biome['type']
	
	# Categorize each vote
	for x in ratings:
		if x == 0:
			no_count += 1
		elif x == 1:
			maybe_count += 1
		elif x == 2:
			yes_count += 1
	
	# Repackage data into something tidy
	biome_object = {
		"biome_entry_name": biome_entry_name,
		"biome_short_name": biome_short_name,
		"biome_type": type,
		"yes_count": yes_count,
		"no_count": no_count,
		"maybe_count": maybe_count,
	}
	json_output.write(json.dumps(biome_object))
	
	#Attempting to make a csv, or tsv, or something
	datastring = f"{biome_entry_name}, {biome_short_name} ({type}), {yes_count}, {no_count}, {maybe_count}\n"
	csv_output.write(datastring)

f.close()
json_output.close()
csv_output.close()

# End result goal:
#[biome_entry_name]	[ratings-yes] [ratings-no] [ratings-maybe]