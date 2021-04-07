APIs:

Out of Session:

SignUp:
URL: /api/auth/signup/participant
Type: POST
Example Request:
{
    "username": "km4aadaasdal",
    "password": "thaasadasdasdsadads",
    "firstname": "Talha",
    "lastname": "Waheed",
    "organization": "Pyx"
} 
Example Responses:
Success:
Status 201
{}
Error:
Status 400
{
    "errors": {
        "username": {
            "message": "Already exists",
            "valueReceived": "kasdal"
        }
    }
}
Error:
Status 400
{
    "errors": {
        "password": {
            "message": "Password should be atleast 7 characters long",
            "valueReceived": "tha"
        },
        "lastname": {
            "message": "Last name should have alphabets only",
            "valueReceived": "Waheed345"
        },
        "organization": {
            "message": "Organization is required"
        }
    }
}


SignIn

In Session:
