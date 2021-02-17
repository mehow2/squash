
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import mixins
from leagues.serializers.league import LeagueListSerializer, LeagueDetailsSerializer
from leagues.models import League


class LeagueViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    serializer_class = LeagueListSerializer
    queryset = League.objects.all()
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = LeagueDetailsSerializer(instance)
        return Response(serializer.data)
    
    @action(methods=['patch'], detail=True)
    def join_league(self, request, slug):
        instance = self.get_object()
        user = request.user
        if (instance.members.filter(username=user.username).exists()):
            return Response(status=HTTP_400_BAD_REQUEST)
        instance.members.add(user)
        return Response(status=HTTP_201_CREATED)
