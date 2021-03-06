import json
filename = "biomedata.tsv"
end_filename = "biomes.json"

# This exects a tab-delineated file which will be used to initalize the database from a tsv file.
biomes = []
with open(filename) as f:
    line = f.readline()
    while line:
        parsed = line.split('\t')

        # Organize the data from the spreadsheet.
        biome_entry_name = parsed[0].rstrip()
        biome_short_name = parsed[1].rstrip()
        image_name = parsed[2].rstrip()
        description = parsed[3].rstrip()
        link_to_wiki = parsed[4].rstrip()
        biome_type = parsed[5].rstrip()

        biome_data = {
            'biome_entry_name': biome_entry_name,
            'biome_short_name': biome_short_name,
            'image_name': image_name,
            'description': description,
            'link_to_wiki': link_to_wiki,
            'type': biome_type
        }
        biomes.append(biome_data)

        # Get new line to sustain while loop
        line = f.readline()

# Need to wrap this into another object to match what's expected in the app/db
db_object = {"biomes": biomes}
result = json.dumps(db_object)
f = open(end_filename, "w")
f.write(result)
f.close()
