# Fakebazaar

A Fake Marketplace built by combining various concepts of Frontend Development as well as Backend as Firebase.

Site is live at [Fakebazaar](https://athi223.github.io/fakebazaar/)

<hr />

## Motivation

This is a project to learn and combine concepts like React Context API, React Router, Firebase, etc. Also to make use of Firebase Authentication, and subsequent conditional rendering and protected routes. It uses Google OAuth for authentication, which also requires setup of Authorized Domains in Firebase for hosting.

<hr />

## Features

<ol>
	<li>**Home**: To highlight products with highest discounts, ratings.</li>
	<li>**Categories**: To view products based on category.</li>
	<li>**Search**: To search for products based on name.</li>
	<li>**Cart**: To view products in cart and checkout.</li>
	<li>**Orders**: To view past orders.</li>
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
	<li>Run `npm i` to install all dependencies</li>
	<li>Run `npm start` to start the server</li>
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
