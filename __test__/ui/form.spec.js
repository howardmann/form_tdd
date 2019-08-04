describe('Form', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  it('should have "Form TDD" on the page', async () => {
    await expect(page).toMatch('Form TDD')
  })

  xit('should display success message on valid form submit', async () => {
  })
  
  xit('should require company and email', async () => {

  })

  xit('should check password length', async () => {
  })

})