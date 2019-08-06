xdescribe('Form', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:4444')
  })

  it('should have "Form TDD" on the page', async () => {
    await expect(page).toMatch('Form TDD')
  })

  it('should display success message on valid form submit', async () => {
    await expect(page).toFillForm('form[name="myForm"]', {
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
    await expect(page).toFillForm('form[name="myForm"]', {
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

  it('should validate email', async () => {
    await expect(page).toFillForm('form[name="myForm"]', {
      company: '42 PTY LTD',
      email: 'felixemail.com',
      password: '12345678910'
    })
    await page.keyboard.press('Enter')
    await page.screenshot({
      path: __dirname + '/../screenshots/validateEmail.png'
    })

    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    let backgroundColor = await page.$eval('#flash-error', el => el.style.backgroundColor)
    expect(errorMsg).toMatch(/felixemail.com is not a valid email/)
    expect(backgroundColor).toBe('red')
  })

  it('should check password length min 7 characters', async () => {
    await expect(page).toFillForm('form[name="myForm"]', {
      company: '42 PTY LTD',
      email: 'felix@email.com',
      password: '12345'
    })
    await page.keyboard.press('Enter')
    await page.screenshot({
      path: __dirname + '/../screenshots/validatePassword.png'
    })

    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    let backgroundColor = await page.$eval('#flash-error', el => el.style.backgroundColor)
    expect(errorMsg).toMatch(/password must be min 7 characters/)
    expect(backgroundColor).toBe('red')
  })

  it('should display multiple validation errors in a list', async () => {
    await expect(page).toFillForm('form[name="myForm"]', {
      email: 'felixemail.com',
      password: '12345'
    })
    await page.keyboard.press('Enter')
    await page.screenshot({
      path: __dirname + '/../screenshots/validateMultiple.png'
    })

    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    let backgroundColor = await page.$eval('#flash-error', el => el.style.backgroundColor)
    expect(errorMsg).toMatch(/password must be min 7 characters/)
    expect(errorMsg).toMatch(/company name required/)
    expect(errorMsg).toMatch(/felixemail.com is not a valid email/)
    expect(backgroundColor).toBe('red')
  })

  it('should clear error messages on success', async () => {
    await expect(page).toFillForm('form[name="myForm"]', {
      email: 'felix@email.com',
      password: '12345678910'
    })
    await page.keyboard.press('Enter')
    let errorMsg = await page.$eval('#flash-error', el => el.innerText)
    let errorBackgroundColor = await page.$eval('#flash-error', el => el.style.backgroundColor)
    expect(errorMsg).toMatch(/company name required/)
    expect(errorBackgroundColor).toBe('red')

    await expect(page).toFillForm('form[name="myForm"]', {
      company: 'Felix Pty Ltd',
      email: 'felix@email.com',
      password: '12345678910'
    })
    await page.keyboard.press('Enter')

    await page.screenshot({
      path: __dirname + '/../screenshots/validateSuccessAfterError.png'
    })

    let successMsg = await page.$eval('#flash-success', el => el.innerText)
    let successBackgroundColor = await page.$eval('#flash-success', el => el.style.backgroundColor)
    expect(successMsg).toBe('Success: Felix Pty Ltd')
    expect(successBackgroundColor).toBe('green')

    let newErrorMsg = await page.$eval('#flash-error', el => el.innerText)
    expect(newErrorMsg).toBe("")    
  })

})