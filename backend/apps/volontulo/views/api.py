# -*- coding: utf-8 -*-

"""
.. module:: api
"""

from django.conf import settings
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.db.utils import IntegrityError
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import authentication_classes
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import viewsets

from apps.volontulo import models
from apps.volontulo import permissions
from apps.volontulo import serializers
from apps.volontulo.authentication import CsrfExemptSessionAuthentication
from apps.volontulo.lib.email import send_mail
from apps.volontulo.models import UserProfile
from apps.volontulo.views import logged_as_admin


@api_view(['POST'])
@authentication_classes((CsrfExemptSessionAuthentication,))
@permission_classes((AllowAny,))
def login_view(request):
    """REST API login view."""
    if not request.user.is_authenticated():
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is None or not user.is_active:
            return Response(None, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)

        return Response(
            serializers.UserSerializer(user, context={
                'request': request
            }).data,
            status=status.HTTP_200_OK,
        )

    return Response(
        serializers.UserSerializer(request.user, context={
            'request': request
        }).data,
        status=status.HTTP_400_BAD_REQUEST,
    )

@api_view(['POST'])
@authentication_classes((CsrfExemptSessionAuthentication,))
@permission_classes((AllowAny,))
def register_view(request):
    """REST API register view."""
    if not request.user.is_authenticated():
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
            )
            user.is_active = False
            user.save()
            profile = UserProfile(user=user)
            ctx = {'token': profile.uuid, 'angular_root' : settings.ANGULAR_ROOT}
            profile.save()
            # sending email to user:
            send_mail(request, 'registration', [user.email], context=ctx)            
        except IntegrityError:
            #return Response(
            #    status=status.HTTP
            #)
            pass
                   
        return Response(
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializers.UserSerializer(request.user, context={
            'request': request
        }).data,
        status=status.HTTP_400_BAD_REQUEST,
    )

@api_view(['POST'])
@authentication_classes((CsrfExemptSessionAuthentication,))
@permission_classes((AllowAny,))
def activate(request):
    """View responsible for activating user account."""
    try:
        profile = UserProfile.objects.get(uuid=request.data.get('uuid'))
        profile.user.is_active = True
        profile.user.save()
        return Response(
            status=status.HTTP_201_CREATED,
        )
    except UserProfile.DoesNotExist:
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
        )


@api_view(['GET'])
@permission_classes((AllowAny,))
def logout_view(request):
    """REST API logout view."""
    if request.user.is_authenticated():
        logout(request)
        return Response(None, status=status.HTTP_200_OK)
    return Response(None, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((AllowAny,))
def current_user(request):
    """REST API view for current user."""
    if request.user.is_authenticated():
        return Response(
            serializers.UserSerializer(request.user, context={
                'request': request
            }).data,
            status=status.HTTP_200_OK,
        )

    return Response(None, status=status.HTTP_200_OK)


class OfferViewSet(viewsets.ModelViewSet):

    """REST API offers viewset."""

    serializer_class = serializers.OfferSerializer
    permission_classes = (permissions.OfferPermission,)

    def get_queryset(self):
        """Queryset depends on user role."""
        if logged_as_admin(self.request):
            return models.Offer.objects.get_for_administrator()
        return models.Offer.objects.get_weightened()


class OrganizationViewSet(viewsets.ModelViewSet):

    """REST API organizations viewset."""

    queryset = models.Organization.objects.all()
    serializer_class = serializers.OrganizationSerializer
    permission_classes = (permissions.OrganizationPermission,)
