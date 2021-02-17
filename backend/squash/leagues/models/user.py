from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField()
    # win_matches_count = models.IntegerField()

    def __repr__(self) -> str:
        return f'{self.__class__}_${self.username}'

    # class Meta:
    #     ordering = ["-win_matches_count"]
