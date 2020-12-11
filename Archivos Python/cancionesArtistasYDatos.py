"""
    
    @author: antiapgg
"""

import pandas as pd 
import spotipy 

# Nos conectamos a spotyfy con las credenciales https://beta.developer.spotify.com/
sp = spotipy.Spotify() 
from spotipy.oauth2 import SpotifyClientCredentials 
cid = "client_id"
secret = "client_secret"
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret) 
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager) 
sp.trace=False 

playlist = sp.user_playlist("client_id", "playlist_id", fields="tracks,next") 
tracks = playlist["tracks"] 
songs = tracks["items"]

ids = []
song = []
artist = []

for i in range(len(songs)): 
	s = songs[i]["track"]
    
	ids.append(s["id"]) 
	song.append(["https://open.spotify.com/embed/track/"+s["id"],s["name"],s["popularity"],s["album"]["images"][0]["url"],s["artists"][0]["id"],s["artists"][0]["name"]])
	a = sp.artist(s["artists"][0]["id"])
	img =""
	if len(a["images"]) >0:
		img = a["images"][0]["url"]

	artist.append([a["id"],a["name"],a["popularity"],a["followers"]["total"],img])

dataArtists = pd.DataFrame(artist)

features = sp.audio_features(ids) 
df = pd.DataFrame(features)

dataSongs = pd.DataFrame(song)
while tracks["next"]:	
	
	tracks = sp.next(tracks)
	songs = tracks["items"]
	
	ids = []
	song2 = []
	artist2 = []
	
	for i in range(len(songs)):
		s = songs[i]["track"]
		ids.append(s["id"])
        #song2.append([s["id"],s["name"],s["popularity"],s["album"]["id"],s["album"]["name"],s["album"]["images"][0]["url"],s["album"]["release_date"],s["artists"][0]["id"],s["artists"][0]["name"], s["genre"]])
		song2.append(["https://open.spotify.com/embed/track/"+s["id"],s["name"],s["popularity"],s["album"]["images"][0]["url"],s["artists"][0]["id"],s["artists"][0]["name"]])

		a = sp.artist(s["artists"][0]["id"])
		img = ""
		if len(a["images"]) >0:
			img = a["images"][0]["url"]
		artist2.append([a["id"],a["name"],a["popularity"],a["followers"]["total"],img])

	features2 = sp.audio_features(ids) 
	df2= pd.DataFrame(features2)
	df = pd.concat([df,df2])
	
	dataSongs2 = pd.DataFrame(song2)
	dataSongs = pd.concat([dataSongs,dataSongs2])
    
	dataArtists2 = pd.DataFrame(artist2)
	dataArtists = pd.concat([dataArtists,dataArtists2])

df.to_csv("caracteristicasCanciones", sep=',', encoding='utf-8')
dataSongs.to_csv("datosCanciones", sep=',', encoding='utf-8')
dataArtists.to_csv("datosArtistas", sep=',', encoding='utf-8')
