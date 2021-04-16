const chalk = require('chalk');
const log = console.log;
const mongoose = require('../config/db_configuration');
const funcs = require('../helpers/functions');
const { APIENUMS } = require('../helpers/enums');
const { getSeriesDataFromAPI } = require('./thetvdbAPI');
const pLimit = require('p-limit');

exports.saveSeriesToUserSeries = async (req, res) => {
    log(chalk.magenta('[Controller - userData] saveSeriesToUserSeries'));


    try {
        console.log('email:', req.params.userEmail)
        console.log('id:', req.params.seriesId)
        const userData = await funcs.getUserData(req.params.userEmail);
        if (!userData) {
            log(chalk.rgb(252, 17, 17)('User Not Found!'));
            return res.status(404).send({ message: 'User Not Found' });
        }
        const newId = req.params.seriesId.replace('series-', '')

        const seriesData = await setSeriesDataObject(req.params.seriesId, newId)
        // console.log('seriesData:', JSON.stringify(seriesData, null, 4));
        await mongoose.dbSeries.collection(req.params.userEmail).insertOne(seriesData);
        res.status(200).send({ message: 'Saved to your Series!' });
    } catch (error) {
        console.log(`Error: \n${error}`)
    }
};

const setSeriesDataObject = async (fullId, seriesId) => {
    const generalData = await getSeriesDataFromAPI(APIENUMS.GET_SERIES, seriesId);
    const seasonsAndEpisodesData = await getSeasonsAndEpisodes(seriesId);

    return {
        id: Number(seriesId),
        full_id: fullId,
        series_name: generalData.name,
        series_name_heb: await getTranslatedGeneralData(generalData, seriesId, 'heb', 'name'),
        desc_eng: await getTranslatedGeneralData(generalData, seriesId, 'eng', 'overview'),
        desc_heb: await getTranslatedGeneralData(generalData, seriesId, 'heb', 'overview'),
        start_year: Number(generalData.firstAired.split('-')[0]),
        end_year: Number(generalData.lastAired.split('-')[0]),
        series_status: generalData.status.id === 1 ? 'Running' : generalData.status.id === 2 ? 'Ended' : generalData.status.name,
        genres: generalData.genres.map(genre => genre.name),
        characters: generalData.characters.map(character => (character.peopleType === 'Actor') && {
            name: character.name,
            actorId: character.peopleId,
            image: character.image
        }).filter(character => character.name !== null),
        lastUpdate: new Date().getTime(),
        lastAPIUpdate: new Date().getTime(),
        banners: generalData.artworks.map(art => (art.type === 1) && { image: art.image, thumb: art.thumbnail }).filter(Boolean),
        posters: generalData.artworks.map(art => (art.type === 2) && { image: art.image, thumb: art.thumbnail }).filter(Boolean),
        icons: generalData.artworks.map(art => (art.type === 5) && { image: art.image, thumb: art.thumbnail }).filter(Boolean),
        backgrounds: generalData.artworks.map(art => (art.type === 7 || art.type === 3) && { image: art.image, thumb: art.thumbnail }).filter(Boolean),
        hasExtras: seasonsAndEpisodesData[0],
        num_of_seasons: seasonsAndEpisodesData[0] ? seasonsAndEpisodesData[2].length - 1 : seasonsAndEpisodesData[2].length,
        next_episode_date: new Date(seasonsAndEpisodesData[1]).getTime(),
        seasons: [...seasonsAndEpisodesData[2]]
    }
}

const getTranslatedGeneralData = async (data, id, language, attr) => {
    if (data.nameTranslations.includes(language)) {
        const data = await getSeriesDataFromAPI(APIENUMS.GET_TRANSLATED_DATA, id, language);
        return data[attr] || '';
    }
    return '';
}

const getSeasonsAndEpisodes = async (id) => {
    const data = await getSeriesDataFromAPI(APIENUMS.GET_SERIES_EPISODES, id);
    const today = funcs.withoutTime(new Date())
    const limit = pLimit(1);
    let promises = [], seasons = [], num_of_seasons = 0, next_episode_date = null, hasExtras = false;

    data.episodes.forEach(episode => {
        promises.push(limit(async () => {
            let name_heb = '', overview_eng = '', overview_heb = '';
            if (today <= new Date(episode.aired).getTime() && !next_episode_date) {
                next_episode_date = episode.aired;
                return;
            } else if (today <= new Date(episode.aired).getTime() && next_episode_date) {
                return;
            }
            if (!hasExtras && episode.seasonNumber === 0) {
                hasExtras = true;
            }
            if (episode.seasonNumber > num_of_seasons) {
                num_of_seasons = episode.seasonNumber;
                seasons.push({
                    season_number: episode.seasonNumber,
                    episodes: []
                })
            }
            if (episode.nameTranslations.includes('heb')) {
                name_heb = await getSeriesDataFromAPI(APIENUMS.GET_EPISODE_TRANSLATED_DATA, episode.id, 'heb');
            }
            if (episode.overviewTranslations.includes('eng')) {
                overview_eng = await getSeriesDataFromAPI(APIENUMS.GET_EPISODE_TRANSLATED_DATA, episode.id, 'eng');
            }
            if (episode.overviewTranslations.includes('heb')) {
                overview_heb = await getSeriesDataFromAPI(APIENUMS.GET_EPISODE_TRANSLATED_DATA, episode.id, 'heb');
            }
            seasons[num_of_seasons - 1]['episodes'].push({
                id: episode.id,
                name: episode.name,
                name_heb: name_heb.name,
                overview_eng: overview_eng.overview,
                overview_heb: overview_heb.overview,
                aired: episode.aired,
                number: episode.number,
                image: [episode.image]
            });
            if (!seasons[num_of_seasons - 1]['id']) {
                const episodeData = await getSeriesDataFromAPI(APIENUMS.GET_EPISODE_EXTENDED_DATA, episode.id);
                seasons[num_of_seasons - 1]['id'] = episodeData.seasons.find(season => season.type.type === 'official').id
                const seasonData = await getSeriesDataFromAPI(APIENUMS.GET_SEASON_EXTENDED_DATA, seasons[num_of_seasons - 1]['id']);
                seasons[num_of_seasons - 1]['posters'] = seasonData.artwork.map(art => (art.type === 7) && { image: art.image, thumb: art.thumbnail })
            }
        }));
    });

    return await Promise.all(promises).then(async results => {
        // seasons[num_of_seasons - 1].number_of_episodes = seasons[num_of_seasons - 1]['episodes'].length;
        // console.log('hasExtras:', hasExtras);
        // console.log('next_episode_date:', next_episode_date);
        // console.log('seasons:', JSON.stringify(seasons, null, 4));

        return [hasExtras, next_episode_date, seasons]
    });
}

//TODO: IN ADVANCED VERSION ADD ACTORS HANDLER