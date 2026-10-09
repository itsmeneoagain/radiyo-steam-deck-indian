import { getServer } from './fetchNC';
import { Station } from './interfaces';

export const showNowPlayingToast = (station: Station) => {
    getServer().toaster.toast({
        title: 'RadiYo!',
        body: `Now playing ${station.text}`,
        duration: 8000,
    });
};
