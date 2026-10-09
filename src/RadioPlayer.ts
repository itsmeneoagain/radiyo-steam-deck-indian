import { fetchNC } from './fetchNC';
import { RadioBrowserStation, Station } from './interfaces';

export class RadioPlayer {
    public CURRENT_STATION: Station = {} as Station;
    // radio-browser.info is a free, community-maintained station directory with real
    // per-country data, unlike dar.fm which barely indexes Indian stations.
    static API_BASE = 'https://de1.api.radio-browser.info';
    static COUNTRY_CODE = 'IN';

    private static toStation(s: RadioBrowserStation): Station {
        const station: Station = {} as Station;
        station.id = s.stationuuid;
        station.text = s.name.trim();
        station.image = s.favicon || undefined;
        station.subtext = s.state || s.tags || undefined;
        station.genre = s.tags || undefined;
        station.streamDownloadURL = s.url_resolved || s.url;
        station.listenerCount = s.clickcount;
        return station;
    }

    static async search(query: string, limit: number | null = null, language?: string): Promise<Station[]> {
        const url = `${this.API_BASE}/json/stations/search?name=${encodeURIComponent(query)}&countrycode=${this.COUNTRY_CODE}&hidebroken=true${limit ? `&limit=${limit}` : ''}${language ? `&language=${encodeURIComponent(language)}` : ''}`;
        const results = await (await fetchNC(url)).json() as RadioBrowserStation[];
        return results.map(this.toStation);
    }

    static async searchByStationId(stationId: string): Promise<Station> {
        const url = `${this.API_BASE}/json/stations/byuuid/${stationId}`;
        const results = await (await fetchNC(url)).json() as RadioBrowserStation[];
        if (!results.length) {
            throw new Error(`Station ${stationId} not found`);
        }
        return this.toStation(results[0]);
    }

    static async getTopSongs(limit = 10): Promise<Station[]> {
        const url = `${this.API_BASE}/json/stations/search?countrycode=${this.COUNTRY_CODE}&hidebroken=true&order=clickcount&reverse=true&limit=${limit}`;
        const results = await (await fetchNC(url)).json() as RadioBrowserStation[];
        const random = results.sort(() => .5 - Math.random()).slice(0, 5);
        return random.map(this.toStation);
    }
}
