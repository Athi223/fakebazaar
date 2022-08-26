from firebase import Firebase
import pandas as pd
import threading

# Add Firebase Configuration
config = {
	"apiKey": "<apiKey>",
	"authDomain": "<authDomain>",
	"databaseURL": "<databaseURL>",
	"storageBucket": "<storageBucket>"
}

# Create Firebase & Database objects
firebase = Firebase(config)
db = firebase.database()

# Read the input data
df = pd.read_csv("bigbasket.csv")

# Fill the "NaN" cells with "", else throws error while pushing data to firebase
df = df.fillna("")

# Group data by category, to populate it using threads
groups = df.groupby("category")

# Array to store all threads
threads = []

# Actual data-populating function called by each thread
def threaded(products_group, group_index):
	for index, product in enumerate(products_group):
		db.child("products").child(group_index*100 + index).set(product)

# Threaded data population
for group_index, group in enumerate(groups):
	# Pick 100 random products from each category and convert dataframe to dictionary to populate it
	products_group = group[1].sample(100).to_dict("records")
	thread = threading.Thread(target=threaded, args=(products_group, group_index))
	threads.append(thread)
	thread.start()

# Wait for all threads to complete execution
for thread in threads:
	thread.join()
