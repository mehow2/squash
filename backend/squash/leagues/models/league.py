from django.db import models
from leagues.models import User

from django.utils.text import slugify

# Create your models here.
class League(models.Model):
    name = models.CharField(max_length=100, unique=True)
    members = models.ManyToManyField(User, related_name="leagues")
    slug = models.SlugField(unique=True)

    def __str__(self):
        return f"[League]_{self.name}"

    def save(self, *args, **kwargs) -> None:
        self.slug = slugify(self.name)
        super(League, self).save(*args, **kwargs)


class Match(models.Model):
    league = models.ForeignKey(
        "League", related_name="matches", on_delete=models.CASCADE
    )
    creator = models.ForeignKey(
        User, related_name="creators", on_delete=models.CASCADE
    )
    opponent = models.ForeignKey(
        User, related_name="opponents", on_delete=models.CASCADE
    )
    creator_sets = models.IntegerField()
    opponent_sets = models.IntegerField()
    winner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, related_name="win_matches")
    datetime = models.DateTimeField(auto_now_add=True)
    is_confirmed = models.BooleanField(default=False)
