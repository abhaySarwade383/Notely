from rest_framework import serializers
# Import DRF serializer classes (ModelSerializer, Serializer, etc.)

from django.contrib.auth.models import User
# Import Django's built-in User model for authentication.

from .models import Note
# Import the Note model you created.



# ---------------------------
# USER SERIALIZER
# ---------------------------
class UserSerializer(serializers.ModelSerializer):
    # Serializer for creating and returning User objects.
    # This handles the data for registration.



    class Meta:
        model = User
        # Use Django's built-in User model.

        fields = ['id', 'username', 'email', 'password']
        # These fields will be INCLUDED in the serialized output
        # and accepted during POST requests.

        extra_kwargs = {'password': {'write_only': True}}
        # write_only=True → password should NEVER be returned back to the frontend.
        # It's accepted in requests but hidden in responses.



    def create(self, validated_data):
        # Overriding the default create method.
        # validated_data = the cleaned & validated input from request.

        print(validated_data)
        # For debugging, prints data when a user is created.

        user = User.objects.create_user(**validated_data)
        # IMPORTANT: create_user() automatically hashes the password.
        # If you used User.objects.create(), password would NOT be hashed → BAD.

        return user
        # Return the created user object.



# ---------------------------
# NOTE SERIALIZER
# ---------------------------
class NoteSerializer(serializers.ModelSerializer):
    # Serializer for handling Note model data.
    # Converts Note objects into JSON and vice versa.



    class Meta:
        model = Note
        # Use Note model defined earlier.

        fields = ['id', 'title', 'content', 'created_at', 'author']
        # These fields are included in input/output of JSON.



        extra_kwargs = {'author': {'read_only': True}}
        # read_only=True → frontend CANNOT send "author" field.
        # The backend will automatically set the author as request.user
        # inside the view, ensuring each note is assigned correctly.
