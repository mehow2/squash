from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "email",
            "date_joined",
            "first_name",
            "last_login",
            "last_name",
            "username",
            "password",
        )
        extra_kwargs = {
            'password': { 'write_only': True}
        }

    def create(self, validated_data):
        User = get_user_model()
        return User.objects.create_user(**validated_data)       