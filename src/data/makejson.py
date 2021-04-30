import json
filename = "biomedata.tsv"
end_filename = "biomes.json"

# This exects a tab-delineated file which will be used to initalize the database
biomes = []
with open(filename) as f:
    line = f.readline()
    while line:
        parsed = line.split('\t')
        # print(parsed)

        # Organize the data from the spreadsheet.
        biome_entry_name = parsed[0].rstrip()
        biome_short_name = parsed[1].rstrip()
        image_name = parsed[2].rstrip()
        description = parsed[3].rstrip()
        link_to_wiki = parsed[4].rstrip()
        #print(biome_short_name + " " + description)
        #print("url: ===" + link_to_wiki + "===")
        biome_data = {
            'biome_entry_name': biome_entry_name,
            'biome_short_name': biome_short_name,
            'image_name': image_name,
            'description': description,
            'link_to_wiki': link_to_wiki,
            'ratings': [],
        }
        biomes.append(biome_data)

        # Get new line to sustain while loop
        line = f.readline()

# Test out this object....
result = json.dumps(biomes)
f = open(end_filename, "a")
f.write(result)
f.close()
