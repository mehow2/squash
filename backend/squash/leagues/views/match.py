from rest_framework import mixins, viewsets
from rest_framework import status
from rest_framework.response import Response
from leagues.models import Match
from leagues.serializers.league import MatchSerializer

class MatchViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    serializer_class = MatchSerializer
    queryset = Match
