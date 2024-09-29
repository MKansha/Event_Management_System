# events/admin.py

from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'capacity')  
    search_fields = ('title', 'location')  

    list_filter = ('date',)  

    
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'date', 'location', 'capacity')
        }),
    )

