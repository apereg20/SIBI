#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""

@author: antiapgg
"""

import spotipy
import spotipy.oauth2

credentials = spotipy.oauth2.SpotifyClientCredentials("client_id", "client_secret")
spotify = spotipy.Spotify(client_credentials_manager=credentials)
print (spotify.audio_features(['4ptmvueuWgilsYwI6u9V46']))

