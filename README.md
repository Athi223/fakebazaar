# Fakebazaar

A Fake Marketplace built by combining various concepts of Frontend Development as well as Backend as Firebase.

Site is live at [Fakebazaar](https://athi223.github.io/fakebazaar/)

<hr />

## Motivation

This is a project to learn and combine concepts like React Context API, React Router, Firebase, etc. Also to make use of Firebase Authentication, and subsequent conditional rendering and protected routes. It uses Google OAuth for authentication, which also requires setup of Authorized Domains in Firebase for hosting.

<hr />

## Features

<ol>
	<li><b>Home</b>: To highlight products with highest discounts, ratings.</li>
	<li><b>Categories</b>: To view products based on category.</li>
	<li><b>Search</b>: To search for products based on name.</li>
	<li><b>Cart</b>: To view products in cart and checkout.</li>
	<li><b>Orders</b>: To view past orders.</li>
</ol>

<hr />

## Dataset

You can find the dataset & script to populate it in `populate_firebase/` directory.

> To populate the dataset, follow the instructions in `populate_firebase/README.md`.

Credits: [BigBasket Products Dataset](https://www.kaggle.com/datasets/hetulmehta/bigbasket-products-dataset)

<hr />

## Instructions

Use the following steps to run the project locally:

<ol>
	<li>Clone this repo</li>
	<li>Run <code>npm i</code> to install all dependencies</li>
	<li>Run <code>npm start</code> to start the server</li>
</ol>

<hr />

## Technologies and Frameworks used:

<ol>
	<li>React JS
		<ul>
			<li>Context API</li>
			<li>Hooks
				<ul>
					<li>useState</li>
					<li>useEffect</li>
					<li>useContext</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>React Router v6
		<ul>
			<li>HashRouter</li>
			<li>Outlet</li>
			<li>Navigate</li>
			<li>Hooks
				<ul>
					<li>useNavigate</li>
					<li>useParams</li>
					<li>useLocation</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>Firebase
		<ul>
			<li>Authentication</li>
			<li>Database</li>
		</ul>
	</li>
	<li>Bootstrap</li>
	<li>React-feather</li>
</ol>
