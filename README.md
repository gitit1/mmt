# track-my-series

 - how to devide the folder/files/component?
 - when login - need to load json file , if dosent find - open a sign up page
 for now i'm skipping this part



-----------------------------------------

 - add colors to server console

---
---

## API && DATABASE

😵😵😵😵😵😵😵😵

|API-SITE| -- |OUR-API| -- |FILE SYSTEM|
|:--:|:--:|:--:|:--:|:--:|
|• series, • episodes | --- | • User, • series  | --- | • Local series, • local episodes


### User

- Series:

- For each season:
    - watched

- For each episode:
    - saved
    - watched
    - if sub (**)


### Schemas

- [ ] User
  - IDs series - [id series] Series
  - series [Array]
    - saved episodes -  [id episodes] Episode (file system scanner)
    - wathced episodes - [id episodes] Episode


- [ ] Series
  - series api id
  - number of  seasons
  - series status
  - last udpate
  - series Name
  - episodes id - [id episodes] Episode

- [ ] Episode
  - episode api id
  - series api id  - [id series] Series
  - season
  - name

- ~~[ ] File System~~
  - ~~path~~
  - ~~series ids~~
  - ~~episodes ids~~
___

## Examples:

var theDate = new Date(1547227462 * 1000);
dateString = theDate.toGMTString();

```xml
    {
    "user": {
        "id": 1111,
        "name": "gitit",
        "language": "en",
		"general_location": "F://series"
        "series": {
            "199859": {
                "id": 311711,
				"lastUpdated": 1547227462,
				"status": "Continuing",
				"lastWatchedEpisode": "03X13",
                "Location": ""
                <!-- "seriesName": "The Good Place", -->
                "seasonsAndEpisodes": {
                    "season": {

						<!-- season: {
						"seasonId": '670811'
                        "seasonNumber": 1,
                        "numberOfEpisodes": 13,
						"last_update":12342432,
						"seriesId": 311711
						} -->
                        <!-- "episodes": [
                            {
                                "id": 5648788,
                                "airedSeasonID": 670811,
                                "airedEpisodeNumber": 1,
                                "saved": "false",
                                "watched": "true"
                            }
                        ] -->
						"updated seasonId": '670811'
                        "updated  watched_episodes": ['1111','2222'...]
                        "local_saved_episodes" : ['1111','2222'...]
                    }
                }
            }
        }
    }
}
```

**series info form api:**
https://api.thetvdb.com/series/311711

```xml
{
	"id": 311711,
	"seriesName": "The Good Place",
	"aliases": [],
	"banner": "graphical/5b7efe73ec3bd.jpg",
	"seriesId": "199859",
	"status": "Continuing",
	"firstAired": "2016-09-19",
	"network": "NBC",
	"networkId": "",
	"runtime": "25",
	"genre": ["Comedy", "Fantasy"],
	"overview": "Eleanor Shellstrop is an ordinary woman who, through an extraordinary string of events, enters the afterlife where she comes to realize that she hasn't been a very good person. With the help of her wise afterlife mentor, she's determined to shed her old way of living and discover the awesome (or at least the pretty good) person within.",
	"lastUpdated": 1547156594,
	"airsDayOfWeek": "Thursday",
	"airsTime": "9:30 PM",
	"rating": "TV-14",
	"imdbId": "tt4955642",
	"zap2itId": "EP02349044",
	"added": "2016-05-15 11:55:18",
	"addedBy": 235,
	"siteRating": 8.7,
	"siteRatingCount": 26,
	"slug": "the-good-place"
}
```
**episodes info form api:**

https://api.thetvdb.com/series/311711/episodes
https://api.thetvdb.com/series/311711/episodes?page=2

```xml
{
	"links": {
		"first": 1,
		"last": 3,
		"next": null,
		"prev": null
	},
	"data": [{
			"id": 5648788,
			"airedSeason": 1,
			"airedSeasonID": 670811,
			"airedEpisodeNumber": 1,
			"episodeName": "Everything is Fine",
			"firstAired": "2016-09-19",
			"guestStars": [],
			"director": "Drew Goddard",
			"directors": ["Drew Goddard"],
			"writers": ["Michael Schur"],
			"overview": "Newly-deceased Eleanor Shellstrop is sent to the Good Place, but only by mistake; Eleanor is determined to become a better person in her afterlife with help from friends Chidi and Janet; Eleanor tries to prove to Chidi that she's worthy of his help.",
			"language": {
				"episodeName": "en",
				"overview": "en"
			},
			"productionCode": "",
			"showUrl": "",
			"lastUpdated": 1510523318,
			"dvdDiscid": "",
			"dvdSeason": null,
			"dvdEpisodeNumber": 1,
			"dvdChapter": null,
			"absoluteNumber": 1,
			"filename": "episodes/311711/5648788.jpg",
			"seriesId": 311711,
			"lastUpdatedBy": 480497,
			"airsAfterSeason": null,
			"airsBeforeSeason": null,
			"airsBeforeEpisode": null,
			"thumbAuthor": 368086,
			"thumbAdded": "2016-09-20 06:42:17",
			"thumbWidth": "400",
			"thumbHeight": "225",
			"imdbId": "tt5789204",
			"siteRating": 7.9,
			"siteRatingCount": 14
		}, {
			"id": 5649281,
			"airedSeason": 1,
			"airedSeasonID": 670811,
			"airedEpisodeNumber": 2,
			"episodeName": "Flying",
			"firstAired": "2016-09-19",
			"guestStars": [],
			"director": "Michael McDonald",
			"directors": ["Michael McDonald"],
			"writers": ["Alan Yang"],
			"overview": "Eleanor tries to prove to Chidi that she is worthy of his help. Meanwhile, Tahani and Jianyu try to help Michael feel better about the unknown flaw in his Neighborhood.",
			"language": {
				"episodeName": "en",
				"overview": "en"
			},
			"productionCode": "",
			"showUrl": "",
			"lastUpdated": 1510523335,
			"dvdDiscid": "",
			"dvdSeason": null,
			"dvdEpisodeNumber": 2,
		 	"dvdChapter": null,
			"absoluteNumber": 2,
			"filename": "episodes/311711/5649281.jpg",
			"seriesId": 311711,
			"lastUpdatedBy": 480497,
			"airsAfterSeason": null,
			"airsBeforeSeason": null,
			"airsBeforeEpisode": null,
			"thumbAuthor": 368086,
			"thumbAdded": "2016-09-20 06:50:01",
			"thumbWidth": "400",
			"thumbHeight": "225",
			"imdbId": "tt5789208",
			"siteRating": 8.3,
			"siteRatingCount": 12
		}
	]
}
```
___

## TODO List:

## App Fncionality - per user
 - [ ] manage series
	- [ ] add serie
	- [ ] edit serie
	- [ ] delete series
	- [ ] option to mark episodes as watched
	- [ ] show each episode/ season id saved and where
	- [ ] if series dosen't have info - let me save info manually (?)
	- [ ] language control - heb/sub (?)
 - [ ] file system scanner - marked series/season/episode if saved
 - [ ] lists:
 	- [ ] list of latest episoded that aired
 	- [ ] list of unwached episodes
 	- [ ] list of unsaved seasons/episodes
 - [ ] later - file system - check for subtitle
 - [ ] Series search
	- [ ] work both on DB and API
	- [ ] filters - by year, genre,last updated....
	- [ ] directly add series from search (watch list)
	- [ ] watch status - "watched" , "watching" , "finished" , "On-Hold"
	- [ ] series status - "ended" , "running"
 - [ ]

## client:
 - [ ] fixing the current structure
 - [ ] 2
 - [ ] 3


## server:
- [ ]
- [ ] 2
- [ ] 3

## File System:
- [ ] 1
- [ ] 2
- [ ] 3

## DB:
- [ ] build schema to user
- [ ] build schema to series
- [ ] build schema to episodes
- [ ] connect them all (?)


## Other:
- [ ] UserId - as hashmaped
- [ ] 2
- [ ] 3
___
## Helpful Links:
 - **MarkDown:**
	- [Markdown-Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 - **Structure:**
  	- [node-folder-structure-options.md](https://gist.github.com/lancejpollard/1398757)
 - **TheTVDB API**
	- [TheTVDB API v2](https://api.thetvdb.com)
	- [TheTVDB.com](https://thetvdb.com)
- **Register/Authenticate/Login/Manage User**
  - [Register/Authenticate/Login/Manage User](https://www.sitepoint.com/user-authentication-mean-stack/)
___

![hello](https://media1.giphy.com/media/Cmr1OMJ2FN0B2/200w.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media3.giphy.com/media/ASd0Ukj0y3qMM/200.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media1.giphy.com/media/Cmr1OMJ2FN0B2/200w.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media2.giphy.com/media/DCOgUFTPoCWqGLoyc7/200w.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media3.giphy.com/media/ASd0Ukj0y3qMM/200.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media2.giphy.com/media/DCOgUFTPoCWqGLoyc7/200w.webp?cid=3640f6095c37c5096e573746325c6362)
![hello](https://media3.giphy.com/media/XYot661SFS62c/100.webp?cid=3640f6095c37c50a556d663677fa8be7)
![hello](https://media3.giphy.com/media/fTI9mBoWLef8k/200w.webp?cid=3640f6095c37c50a556d663677fa8be7)
![hello](https://media3.giphy.com/media/XYot661SFS62c/100.webp?cid=3640f6095c37c50a556d663677fa8be7)