from rest_framework.routers import DefaultRouter
from leagues.views.league import LeagueViewSet
from leagues.views.match import MatchViewSet

router = DefaultRouter()
router.register('leagues', LeagueViewSet, basename='leagues')
router.register('matches', MatchViewSet, basename='matches')

urlpatterns = router.urls
