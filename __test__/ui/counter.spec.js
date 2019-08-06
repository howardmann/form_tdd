describe('Counter', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:4444/counter')
  })

  it('should reset counter', async () => {
    await page.click('#reset')
    let counter = await page.$eval('#counter', el => el.innerText)
    expect(counter).toBe('0')
  })

  it('should increment counter', async () => {
    await page.click('#increment')  
    let counter = await page.$eval('#counter', el => el.innerText)
    expect(counter).toBe('1')

    await page.click('#increment')
    let newCounter = await page.$eval('#counter', el => el.innerText)
    expect(newCounter).toBe('2')
  })

  it('should decrement counter', async () => {
    await page.click('#decrement')
    let counter = await page.$eval('#counter', el => el.innerText)
    expect(counter).toBe('0')

    await page.click('#decrement')
    let counter2 = await page.$eval('#counter', el => el.innerText)
    expect(counter2).toBe('0')

    await page.click('#increment')
    await page.click('#increment')
    await page.click('#increment')
    let counter3 = await page.$eval('#counter', el => el.innerText)
    expect(counter3).toBe('3')

    await page.click('#decrement')
    let counter4 = await page.$eval('#counter', el => el.innerText)
    expect(counter4).toBe('2')
  })
})