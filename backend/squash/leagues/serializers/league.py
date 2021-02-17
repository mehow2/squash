# from django.contrib.auth.models import User
from leagues.models import User
from rest_framework import serializers
from leagues.models import League, Match

 
class UserSerializer(serializers.Serializer):
    username = serializers.CharField()


class MatchSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    opponent = UserSerializer()
    winner = UserSerializer(required=False)
    datetime = serializers.DateTimeField(read_only=True)
    league = serializers.CharField()

    def create(self, validated_data):
        winner = None
        creator = User.objects.get(**validated_data["creator"])
        opponent = User.objects.get(**validated_data["opponent"])
        league = League.objects.get(name=validated_data["league"])

        if validated_data.get("winner"):
            winner = User.objects.get(**validated_data["winner"])

        return Match.objects.create(
            league=league,
            creator=creator,
            opponent=opponent,
            creator_sets=validated_data["creator_sets"],
            opponent_sets=validated_data["opponent_sets"],
            winner=winner,
        )

    def to_representation(self, value):
        repr = super(MatchSerializer, self).to_representation(value)
        creator_sets = repr.pop("creator_sets")
        opponent_sets = repr.pop("opponent_sets")
        repr["sets"] = f"{creator_sets} : {opponent_sets}"
        return repr

    class Meta:
        model = Match
        fields = [
            "creator",
            "opponent",
            "winner",
            "creator_sets",
            "opponent_sets",
            "datetime",
            "league",
            "id",
            "is_confirmed",
        ]


class LeagueDetailsSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)
    matches = MatchSerializer(many=True)

    class Meta:
        model = League
        fields = ["name", "members", "matches"]


class LeagueListSerializer(serializers.ModelSerializer):
    matches_count = serializers.SerializerMethodField()
    members = UserSerializer(many=True, read_only=True)
    id = serializers.IntegerField(read_only=True)
    join = serializers.BooleanField(write_only=True)

    def get_matches_count(self, instance):
        return instance.matches.count()

    def create(self, validated_data):
        join = validated_data.pop("join")
        league = League.objects.create(**validated_data)

        if self.context['request'].user.is_authenticated and join:
            league.members.set([self.context['request'].user])

        return league

    class Meta:
        model = League
        fields = ["name", "matches_count", "members", "id", "join"]
