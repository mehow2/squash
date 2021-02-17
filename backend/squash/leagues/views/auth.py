from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_200_OK
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from django.contrib.auth import login, authenticate, logout, get_user_model
from leagues.serializers.auth import (
    UserLoginSerializer,
    UserSerializer,
)


class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(status=HTTP_200_OK, data=serializer.data)
        return Response({'message': 'Authentication credentials are not correct!'}, status=HTTP_400_BAD_REQUEST)


class RegisterView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = get_user_model()
    permission_classes = (AllowAny,)


class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response(status=HTTP_200_OK)

        return Response(status=HTTP_400_BAD_REQUEST)


class UserInfoView(APIView):
    def get(self, request):
        User = get_user_model()
        user = User.objects.get(username=request.user)
        serializer = UserSerializer(instance=user)

        return Response(data=serializer.data)
