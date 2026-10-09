export interface NowPlaying {
    title: string;
    artist: string;
    albumArtUrl: string;
}
export interface Station {
    id?: string;
    image?: string;
    subtext?: string;
    //title of station
    text: string;
    streamDownloadURL: string,
    //link to m3u file
    URL?: string,
    genre?: string
    nowPlaying?: {
        title: string;
        artist: string;
    }
    listenerCount?: number;
}

export interface FeaturedStation {
    title: string;
    description: string;
    stations: Station[];
}

// radio-browser.info API response (https://api.radio-browser.info), scoped to Indian stations
export interface RadioBrowserStation {
    stationuuid: string;
    name: string;
    url: string;
    url_resolved: string;
    favicon: string;
    tags: string;
    state: string;
    countrycode: string;
    clickcount: number;
}
export type Pages = 'home' | 'player' | 'search_results';
export interface Route {
    page: Pages,
    changePage: (page: Pages) => void
}