#Create a user profile 

def create_user_profile(username,email,password,first_name,last_name):
    username = input("Enter a username:")
    email = input("Enter your email:")
    password = input("Enter a password:")
    first_name = input("Enter your first name:")
    last_name = input("Enter your last name:")

#create user dictionary
        user_dict = {
            "username" : "username", "email" : "email", 
            "password" : "password", "first_name" : "first_name", 
            "last_name" : "last_name"
}