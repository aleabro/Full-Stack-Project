from rest_framework import serializers
from .models import Event, Favorite
from accounts.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    # The organizer field is a foreign key to the User model, so we can use UserSerializer to serialize it
    organizer = UserSerializer(read_only=True)
    is_favorited = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('id','title', 'description', 'image', 'date', 'location', 'is_upcoming', 'organizer', 'is_favorited', 'created_at')
        read_only_fields = ('organizer', 'is_upcoming', 'is_favorited')

    def get_is_favorited(self, obj):
        user = self.context.get('request').user
        if user.is_anonymous:
            return False
        return obj.favorites.filter(user=user).exists()

# This serializer is used to create or update a favorite for an event
class FavoriteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'event']
