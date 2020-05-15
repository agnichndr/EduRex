# EduRex
 A Digital Education System with cutting edge  analytics tools

# Steps to run the app on localhost : 
	Clone the Entire Edurex Repository

	Open the both client and server using your favourite Editor ( Preferrably Visual Code Studio)

	1. open a terminal in server directory  and run the following command 
	 --   npm run dev
	 
	 1.a Create a local database in mongo db named edurexdb 
	 	----------- OR --------------
	b. Create a db of your own name and go to server/server.js and set your database path to the variable mongoURI

	 wait for the Database Connected and Server Running Message.

	2. open a terminal in client directory 

	a. Go to edurex-ui

		cd edurex-ui

	b. 	Start the client app

		ng serve

		-- your app will be ready and running on localhost 

		Go to http://localhost:4200
