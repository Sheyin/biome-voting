import json
from datetime import datetime

# This is a quick integrity check to see if the votes collected per biome
# (biome.ratings in an array) are lining up with the total count of votes
# saved in the user objects
def start():
	start_filename = "bop-voting-default-rtdb-export.json"
	f = open(start_filename, "r")
	data = f.read()
	y = json.loads(data)

	# datetime object containing current date and time
	now = datetime.now()
	end_filename = "integrity_results.txt"
	output = open(end_filename , "w")

	print("Data integrity script for biome-voting-app")
	date = now.strftime("%m/%d/%Y %H:%M:%S")
	print("Report run at: ", date)	

	biome_data = {}
	# Desired data: biome_key, biome_total_votes, total from users, raw_biome_votes, raw_user_votes

	# Gather the data from biomes
	for biome in y['biomes']:
		key = biome['biome_entry_name']
		biome_data[key] = {}
		biome_data[key]['biome_ratings'] = biome['ratings']
		biome_data[key]['biome_ratings_count'] = len(biome['ratings'])

	# Gather the data from users + sort into dict where biome:[ratings]
	ratings_from_users = get_rating_from_user_for_biome(y['users'], biome_data.keys())
	

	# Add user data to biome data under new header
	for key in ratings_from_users.keys():
		biome_data[key]['user_ratings'] = ratings_from_users[key]
		biome_data[key]['user_ratings_count'] = len(ratings_from_users[key])
		biome_data[key]['data_match'] = (ratings_from_users[key].sort() == biome_data[key]['biome_ratings'].sort())

	#print_dict_nicer(biome_data)
	# Outputting data
	keys = biome_data.keys()
	for key in keys:
		line = f"{key}\t{biome_data[key]['biome_ratings']}\t{biome_data[key]['biome_ratings_count']}\t{biome_data[key]['user_ratings']}\t{biome_data[key]['user_ratings_count']}\t{biome_data[key]['data_match']}\n"
		output.write(line)

	# Just focusing on any false ones now
	check_for_mismatch(biome_data)

	output.close()
	f.close()

# Wants a biome_entry_name as a key
def get_rating_from_user_for_biome(users, names_of_biomes):
	data = {}
	# Initializing data
	for name in names_of_biomes:
		data[name] = []

	# Add to data	
	for user in users:
		userdata = users[user]
		# Break it down by each biome entry
		for biome in userdata['ratings']:
			key = biome['biome_entry_name']
			existing_ratings = data[key]
			existing_ratings.append(biome['my_rating'])
			data[key] = existing_ratings
	return data

def print_dict_nicer(dictionary):
	keys = dictionary.keys()
	for key in keys:
		print(f'{key}:\t\t{dictionary[key]}')

# Helper function to check if any mismatches were found b/w user and biome data.
def check_for_mismatch(biome_data):
	print("Checking for mismatches:\n")
	no_error_found = True
	for key in biome_data.keys():
		if biome_data[key]['data_match'] == False:
			print(f"Mismatch found in {key}:\n{biome_data[key]}")
			no_error_found = False
	if no_error_found:
		print("All clear, no errors found.\n")


if __name__ == "__main__":
	start()