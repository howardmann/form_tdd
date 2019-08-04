describe('Form', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:4444')
  })

  it('should have "Form TDD" on the page', async () => {
    await expect(page).toMatch('Form TDD')
  })

  it('should display success message on valid form submit', async () => {
    await expect(page).toFillForm('form[name="myForm"', {
      company: 'Felix Pty Ltd',
      email: 'felixmann@email.com',
      password: '12345678910'
    })
    await page.keyboard.press('Enter')
    await page.screenshot({path: __dirname + '/../screenshots/success.png'})

    let successMsg = await page.$eval('#flash-success', el => el.innerText)
    let backgroundColor = await page.$eval('#flash-success', el => el.style.backgroundColor)    
    expect(successMsg).toBe('Success: Felix Pty Ltd')
    expect(backgroundColor).toBe('green')
  })
  
  it('should require company name', async () => {
    await expect(page).toFillForm('form[name="myForm"', {
      email: 'felix@email.com',
      password: '12345678910'
    })
    await page.keyboard.press('Enter')
    await page.screenshot({path: __dirname + '/../screenshots/validateCompany.png'})
    
    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    let backgroundColor = await page.$eval('#flash-error', el => el.style.backgroundColor)
    expect(errorMsg).toMatch(/company name required/)
    expect(backgroundColor).toBe('red')
  })

  xit('should check password length', async () => {
  })

})