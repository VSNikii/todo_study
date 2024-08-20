describe('addItem', () => {
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?globals=backgrounds.grid:!false&id=additem-component--add-item-for-base-example&viewMode=story');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    })
})