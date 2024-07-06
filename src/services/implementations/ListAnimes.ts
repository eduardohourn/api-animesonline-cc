import puppeteer from 'puppeteer';

import { Animes } from '../../common/utils/Animes/Animes';
import { launchConfig } from '../../common/utils/PuppeteerLaunch/PuppeteerLaunch';

export class ListAnimes {
  async request(currentPage?: string) {
    const browser = await puppeteer.launch(launchConfig);

    const page = await browser.newPage();

    if (currentPage) {
      await page.goto(`https://animesonlinecc.to/anime/page/${currentPage}`);
    } else {
      await page.goto(`https://animesonlinecc.to/anime/`);
    }

    const animes = new Animes;
    const listAnimes = await animes.listAnimes(page);
    const totalPage = await animes.totalPage(page);
    
    await browser.close();

    return {
      listAnimes,
      totalPage
    };
  }

}
