import { Laforchetta2Page } from './app.po';

describe('laforchetta2 App', function() {
  let page: Laforchetta2Page;

  beforeEach(() => {
    page = new Laforchetta2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
